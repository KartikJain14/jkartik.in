#!/usr/bin/env node
// ATS readiness check for a résumé PDF. Reads the PDF the way applicant-tracking systems do
// (plain text extraction with poppler's pdftotext in three modes), then scores:
//
//   parse     30  one page, extractable text, no broken glyphs/ligatures, fonts with ToUnicode,
//                 all three extraction modes agree, contact block first
//   contact   10  name, email, LinkedIn, GitHub, location (phone is optional: public PDFs omit it)
//   sections  10  standard headings (Education, Experience, Projects, Skills) in a sane order
//   dates      5  experience dates parse and use one consistent format
//   content   20  action verbs, numbers, bullet length, word count, no pronouns or buzzwords
//   keywords  25  coverage of the role's JD keywords (scripts/ats-keywords.json); judged against
//                 the keywords Kartik can honestly claim (found in resume/CAREER.md)
//
// Bands: >=90 EXCELLENT · >=80 VERY GOOD · >=70 GOOD · >=60 FAIR · else POOR. A failed hard
// check (not one page, no email, unextractable text) caps the band at FAIR.
//
// Usage: node scripts/ats-check.mjs <file.pdf> [--role general|backend|security|appsec|devops|
//        fullstack|mobile|ai-security] [--links] [--json] [--quiet]
//   --links  also curl every link annotation (slow)
// Exit code: 0 if the band is VERY GOOD or better with no failed checks, else 1.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f, d) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const pdf = args.find((a) => a.endsWith('.pdf'));
const KEYWORDS = JSON.parse(readFileSync(resolve(root, 'scripts/ats-keywords.json'), 'utf8'));
const roles = Object.keys(KEYWORDS).filter((k) => !k.startsWith('_'));
const role = opt('--role', 'general');

if (flag('--help') || !pdf) {
  console.log(`usage: node scripts/ats-check.mjs <file.pdf> [--role ${roles.join('|')}] [--links] [--json] [--quiet]`);
  process.exit(pdf ? 0 : 2);
}
if (!existsSync(pdf)) { console.error(`no such file: ${pdf}`); process.exit(2); }
if (!KEYWORDS[role]) { console.error(`unknown role "${role}" (have: ${roles.join(', ')})`); process.exit(2); }

const run = (cmd, a) => execFileSync(cmd, a, { encoding: 'utf8', maxBuffer: 1 << 24 });
const text = {
  layout: run('pdftotext', ['-layout', pdf, '-']),
  raw: run('pdftotext', ['-raw', pdf, '-']),
  plain: run('pdftotext', [pdf, '-']),
};
const info = run('pdfinfo', [pdf]);
const fonts = run('pdffonts', [pdf]);
let urls = [];
try { urls = run('pdfinfo', ['-url', pdf]).split('\n').slice(1).map((l) => l.trim().split(/\s+/).pop()).filter(Boolean); } catch {}

const norm = (s) => s.replace(/[‐-―−]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
const T = norm(text.raw);
const words = T.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));

const checks = [];
const add = (group, name, weight, pass, detail = '', level = pass === true ? 'pass' : pass === 'warn' ? 'warn' : pass ? 'pass' : 'fail', hard = false) => {
  const pts = level === 'pass' ? weight : level === 'warn' ? weight / 2 : 0;
  checks.push({ group, name, weight, pts, level, detail, hard });
};

// ---------- parse (30) ----------
const pages = Number((info.match(/Pages:\s+(\d+)/) || [])[1]);
add('parse', 'exactly one page', 8, pages === 1, `${pages} page(s)`, undefined, true);
add('parse', 'text is extractable', 6, words.length > 250, `${words.length} words`, undefined, true);
const bad = (T.match(/[ﬀ-ﬆ�]|\(cid:\d+\)|[\u0000-\u0008\u000E-\u001F]/g) || []);
add('parse', 'no ligature/garbled glyphs', 5, bad.length === 0, bad.length ? `found ${[...new Set(bad)].join(' ')}` : 'clean');
const fontRows = fonts.split('\n').slice(2).filter(Boolean);
const noUni = fontRows.filter((r) => { const c = r.trim().split(/\s+/); return c.at(-3) !== 'yes' || c.at(-5) !== 'yes'; });
add('parse', 'fonts embedded with ToUnicode maps', 4, noUni.length === 0, noUni.length ? `${noUni.length} font(s) missing emb/uni` : `${fontRows.length} fonts ok`);
const bag = (s) => new Set(norm(s).toLowerCase().split(/[^a-z0-9$%+#.]+/).filter((w) => w.length > 2));
const [bl, br, bp] = [bag(text.layout), bag(text.raw), bag(text.plain)];
const agree = Math.min(...[[bl, br], [br, bp]].map(([a, b]) => [...a].filter((w) => b.has(w)).length / Math.max(a.size, b.size)));
add('parse', 'extraction modes agree (no hidden/overlaid text)', 3, agree >= 0.97 ? true : agree >= 0.9 ? 'warn' : false, `${(agree * 100).toFixed(1)}% overlap`);
const firstLines = T.split('\n').slice(0, 6).join(' ');
add('parse', 'contact block at the top', 4, /@/.test(firstLines), 'email within the first 6 lines');

// ---------- contact (10) ----------
const nameLine = T.split('\n').find((l) => l.trim());
add('contact', 'name is the first line', 2, /^[A-Z][a-z]+ [A-Z][a-z]+/.test(nameLine?.trim() ?? ''), nameLine?.trim());
const email = T.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
add('contact', 'email', 3, !!email, email?.[0] ?? 'missing', undefined, true);
add('contact', 'LinkedIn URL', 2, /linkedin\.com\/in\//i.test(T), '');
add('contact', 'GitHub / portfolio URL', 2, /github\.com\/|\.in\b|\.dev\b|\.com\b/i.test(firstLines), '');
add('contact', 'location', 1, /Mumbai|India|Bengaluru|Pune|Remote/i.test(firstLines), '');
const phone = /(\+\d{1,3}[\s-]?)?\d{5}[\s-]?\d{5}/.test(T);
checks.push({ group: 'contact', name: 'phone (optional)', weight: 0, pts: 0, level: 'info', detail: phone ? 'present' : 'absent: fine for the public PDF; add one for direct applications' });

// ---------- sections (10) ----------
const HEAD = {
  education: /^(education|education & leadership|academics)$/i,
  experience: /^(experience|work experience|professional experience|employment)$/i,
  projects: /^(projects|selected projects|personal projects)$/i,
  skills: /^(skills|technical skills|skills & tools)$/i,
  summary: /^(summary|professional summary|profile)$/i,
  achievements: /^(achievements|awards|honors|achievements & awards|awards & achievements)$/i,
  leadership: /^(leadership|leadership & activities|leadership & community|activities)$/i,
  research: /^(security research|research|publications|disclosures)$/i,
  certifications: /^(certifications|certificates)$/i,
};
// Sections and bullets are read from the -layout text, where indentation survives.
const L = norm(text.layout).split('\n');
const lines = L.map((l) => l.trim());
const found = [];
lines.forEach((l, i) => { for (const [k, re] of Object.entries(HEAD)) if (re.test(l) && !found.some((f) => f.k === k)) found.push({ k, i, l }); });
const has = (k) => found.some((f) => f.k === k);
const req = ['education', 'experience', 'projects', 'skills'];
const missing = req.filter((k) => !has(k));
add('sections', 'standard headings present', 6, missing.length === 0, missing.length ? `missing: ${missing.join(', ')}` : found.map((f) => f.l).join(' → '));
const nonStd = found.filter((f) => f.k === 'research');
add('sections', 'headings an ATS recognises', 2, nonStd.length ? 'warn' : true, nonStd.length ? `"${nonStd[0].l}" is non-standard (fine for humans; ATS files it under "other")` : 'all standard');
const idx = (k) => found.find((f) => f.k === k)?.i ?? 1e9;
add('sections', 'experience before projects', 2, idx('experience') < idx('projects'), '');

// ---------- dates (5) ----------
const section = (k) => {
  const s = idx(k); if (s === 1e9) return '';
  const next = Math.min(...found.filter((f) => f.i > s).map((f) => f.i), lines.length);
  return L.slice(s + 1, next).join('\n');
};
const MON = '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\\.?';
const rangeRe = new RegExp(`(${MON}\\s+\\d{4}|\\d{4})\\s*(-|to)\\s*(${MON}\\s+\\d{4}|\\d{4}|present|current|now)`, 'gi');
const exp = section('experience');
const ranges = exp.match(rangeRe) || [];
add('dates', 'experience entries have date ranges', 3, ranges.length >= 2 ? true : ranges.length ? 'warn' : false, ranges.join(' | ') || 'none found');
const styles = new Set(ranges.map((r) => (new RegExp(`^${MON}\\s+\\d{4}`, 'i').test(r) ? 'Mon YYYY' : 'YYYY')));
add('dates', 'one consistent date format', 2, styles.size <= 1, [...styles].join(' + ') || 'n/a');

// ---------- content (20) ----------
const bulletsOf = (block) => {
  const out = []; let cur = null; let indent = 0;
  for (const l of block.split('\n')) {
    const m = l.match(/^(\s*)[•●▪◦]\s+(.*)$/);
    if (m) { if (cur) out.push(cur); cur = m[2]; indent = m[1].length; }
    else if (cur !== null && l.trim() && /^\s+/.test(l) && l.match(/^\s*/)[0].length > indent) cur += ' ' + l.trim();
    else if (cur !== null) { out.push(cur); cur = null; }
  }
  if (cur) out.push(cur);
  return out.map((b) => b.replace(/\s+/g, ' ').trim()).filter(Boolean);
};
const allBullets = bulletsOf(L.join('\n'));
const expBullets = bulletsOf(exp);
const VERBS = new Set(('accelerated achieved added administered analyzed analysed architected audited authored automated '
  + 'built chaired co-led configured contained contributed coordinated created cut debugged decreased defined delivered deployed '
  + 'designed developed devised discovered drove enabled engineered established exploited extended found founded grew hardened identified '
  + 'implemented improved integrated introduced launched led maintain maintained managed mentored migrated modernized monitored operated '
  + 'optimized optimised orchestrated organized owned patched performed planned produced protected provisioned published ran rebuilt '
  + 'reduced refactored replaced reported researched resolved restored reverse-engineered revamped rewrote run scaled secured set shipped '
  + 'simplified solved standardized started streamlined taught tested took tripled triaged upgraded wrote chair run build design ship '
  + 'administer harden operate own lead mentor teach').split(/\s+/));
const firstWord = (b) => b.split(/\s+/)[0].toLowerCase().replace(/[^a-z-]/g, '');
const verbRatio = expBullets.length ? expBullets.filter((b) => VERBS.has(firstWord(b))).length / expBullets.length : 0;
add('content', 'experience bullets start with action verbs', 4, verbRatio >= 0.9 ? true : verbRatio >= 0.75 ? 'warn' : false,
  `${Math.round(verbRatio * 100)}% (${expBullets.filter((b) => !VERBS.has(firstWord(b))).map((b) => b.split(' ')[0]).join(', ') || 'all verbs'})`);
const numRatio = allBullets.length ? allBullets.filter((b) => /\d|\$|%/.test(b)).length / allBullets.length : 0;
add('content', 'bullets quantified (numbers, $, %)', 4, numRatio >= 0.6 ? true : numRatio >= 0.45 ? 'warn' : false, `${Math.round(numRatio * 100)}% of ${allBullets.length} bullets`);
const lens = allBullets.map((b) => b.split(/\s+/).length);
const longOnes = lens.filter((n) => n > 42).length;
const avg = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
add('content', 'bullet length 12–40 words', 3, longOnes === 0 && avg >= 12 && avg <= 34 ? true : longOnes <= 1 ? 'warn' : false, `avg ${avg.toFixed(1)} words, ${longOnes} over 42`);
add('content', 'total length fits one page well (380–720 words)', 3, words.length >= 380 && words.length <= 720 ? true : 'warn', `${words.length} words`);
const pron = T.match(/(^|[\s(])(I|me|my|we|our)(?=[\s,.;:)])/gm) || [];
add('content', 'no first-person pronouns', 2, pron.length === 0, pron.length ? `found: ${[...new Set(pron.map((p) => p.trim()))].join(', ')}` : 'none');
const BUZZ = /\b(passionate|synerg\w*|hard-?working|team player|go-getter|results-driven|detail-oriented|self-starter|spearhead\w*|cutting-edge|leverag\w*|seamless\w*|crafting|guru|ninja|rockstar|dynamic individual|think outside)\b/gi;
const buzz = T.match(BUZZ) || [];
add('content', 'no buzzwords / hype', 2, buzz.length === 0, buzz.length ? [...new Set(buzz)].join(', ') : 'none');
const verbCount = {};
expBullets.forEach((b) => { const v = firstWord(b); verbCount[v] = (verbCount[v] || 0) + 1; });
const repeated = Object.entries(verbCount).filter(([, n]) => n > 2);
add('content', 'varied verbs (none starts >2 bullets)', 2, repeated.length === 0, repeated.map(([v, n]) => `${v}×${n}`).join(', ') || 'ok');

// ---------- keywords (25) ----------
const career = existsSync(resolve(root, 'resume/CAREER.md'))
  ? norm(readFileSync(resolve(root, 'resume/CAREER.md'), 'utf8'))
      .replace(/^### 12\.1[\s\S]*?(?=^## )/m, '') // internal notes never make a skill claimable
      .split('\n').filter((l) => !/don't list/i.test(l)).join('\n')
  : '';
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const reFor = (term) => {
  const prefix = term.endsWith('*');
  const t = esc(prefix ? term.slice(0, -1) : term).replace(/\\?\s+/g, '\\s+');
  const tail = prefix ? '' : '(?:s|es)?(?![A-Za-z0-9])';
  return new RegExp(`(?<![A-Za-z0-9])${t}${tail}`, term.replace('*', '').length <= 4 ? '' : 'i');
};
const hit = (variants, hay) => variants.some((v) => reFor(v).test(hay));
const score = (list) => list.map((k) => {
  const v = Array.isArray(k) ? k : [k];
  return { kw: v[0], on: hit(v, T), claimable: hit(v, career) };
});
const core = score(KEYWORDS[role].core);
const bonus = score(KEYWORDS[role].bonus || []);
const claim = core.filter((k) => k.claimable);
const claimCov = claim.length ? claim.filter((k) => k.on).length / claim.length : 0;
const rawCov = core.filter((k) => k.on).length / core.length;
const kwPts = Math.round(25 * Math.min(1, claimCov / 0.95) * 10) / 10;
checks.push({ group: 'keywords', name: `${role} core keywords you can claim`, weight: 25, pts: kwPts,
  level: claimCov >= 0.9 ? 'pass' : claimCov >= 0.75 ? 'warn' : 'fail',
  detail: `${Math.round(claimCov * 100)}% of claimable (${claim.filter((k) => k.on).length}/${claim.length}); raw JD match ${Math.round(rawCov * 100)}%` });

// ---------- links ----------
if (flag('--links')) {
  const dead = [];
  for (const u of urls.filter((x) => x.startsWith('http'))) {
    let code = '000';
    try { code = run('curl', ['-sL', '-m', '20', '-o', '/dev/null', '-w', '%{http_code}', '-A', 'Mozilla/5.0', u]); } catch {}
    if (!/^(2|3)/.test(code) && !/linkedin\.com/.test(u)) dead.push(`${u} (${code})`);
  }
  add('parse', 'all links resolve', 0, dead.length === 0, dead.join(', ') || `${urls.length} links ok`, dead.length ? 'fail' : 'pass');
}

// ---------- report ----------
const total = Math.round(checks.reduce((a, c) => a + c.pts, 0));
const hardFail = checks.some((c) => c.hard && c.level === 'fail') || checks.some((c) => c.name === 'all links resolve' && c.level === 'fail');
let band = total >= 90 ? 'EXCELLENT' : total >= 80 ? 'VERY GOOD' : total >= 70 ? 'GOOD' : total >= 60 ? 'FAIR' : 'POOR';
if (hardFail && total >= 60) band = 'FAIR';
const ok = !hardFail && total >= 80 && !checks.some((c) => c.level === 'fail');

if (flag('--json')) {
  console.log(JSON.stringify({ pdf, role, total, band, ok, checks, keywords: { core, bonus }, urls }, null, 2));
} else {
  const icon = { pass: '✔', warn: '~', fail: '✘', info: 'i' };
  console.log(`\nATS check · ${pdf} · role: ${role}\n`);
  for (const g of ['parse', 'contact', 'sections', 'dates', 'content', 'keywords']) {
    const cs = checks.filter((c) => c.group === g);
    const got = cs.reduce((a, c) => a + c.pts, 0), max = cs.reduce((a, c) => a + c.weight, 0);
    console.log(`${g.toUpperCase().padEnd(9)} ${String(Math.round(got * 10) / 10).padStart(4)}/${max}`);
    if (!flag('--quiet')) for (const c of cs) console.log(`  ${icon[c.level]} ${c.name}${c.detail ? ` · ${c.detail}` : ''}`);
  }
  const miss = claim.filter((k) => !k.on).map((k) => k.kw);
  const gap = core.filter((k) => !k.claimable && !k.on).map((k) => k.kw);
  console.log(`\nkeywords present : ${core.filter((k) => k.on).map((k) => k.kw).join(', ')}`);
  console.log(`missing, claimable (add if true for this role): ${miss.join(', ') || 'none'}`);
  console.log(`missing, NOT in CAREER.md (skill gaps, never add): ${gap.join(', ') || 'none'}`);
  console.log(`bonus present    : ${bonus.filter((k) => k.on).map((k) => k.kw).join(', ') || 'none'}`);
  console.log(`\nSCORE ${total}/100 · ${band}${ok ? '' : ' · not yet passing (needs VERY GOOD+ and no ✘)'}\n`);
}
process.exit(ok ? 0 : 1);
