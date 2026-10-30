import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const prerender = true;

const SITE = 'https://jkartik.in';

interface Entry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  images?: string[];
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
const today = iso(new Date());

// Last commit date (YYYY-MM-DD) that touched a path. Computed at BUILD time only —
// `prerender = true` means this runs during `astro build`, never per request, so it is
// NOT a server component. Requires git history at build (in CI, check out with
// fetch-depth: 0). Falls back to the build date for files with no commit yet.
const gitDate = (path: string): string => {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${path}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || today;
  } catch {
    return today;
  }
};

// Most recent of a set of YYYY-MM-DD strings (lexical sort == chronological).
const maxDate = (...ds: string[]) => ds.filter(Boolean).sort().at(-1) ?? today;

const xml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p: string) => new URL(encodeURI(p), SITE).href;

// ── Every other page under src/pages is discovered automatically ─────────────────────
// (e.g. /hire/, /resume/, a future /about/), so a new page lands in the sitemap without
// touching this file. Pages handled explicitly below, and noindex/utility pages, are skipped.
const pageFiles = import.meta.glob('./**/*.astro');
const SKIP = new Set([
  './index.astro',
  './404.astro',
  './blog/index.astro',
  './blog/preview.astro', // noindex editor
  './blog/[...slug].astro',
  './projects/index.astro',
  './projects/[...slug].astro',
  './research/index.astro',
]);
// Priorities for known pages (everything else gets 0.5).
const PRIORITY: Record<string, string> = { '/hire/': '0.9', '/resume/': '0.9', '/about/': '0.9' };

const routeFor = (file: string, params: Record<string, string | undefined> = {}) => {
  let r = file.replace(/^\./, '').replace(/\.astro$/, '').replace(/\/index$/, '');
  r = r.replace(/\[(?:\.\.\.)?([^\]]+)\]/g, (_, k) => params[k] ?? '');
  r = r.replace(/\/+/g, '/');
  return r.endsWith('/') ? r : `${r}/`;
};

async function discoveredPages(): Promise<Entry[]> {
  const out: Entry[] = [];
  for (const [file, load] of Object.entries(pageFiles)) {
    if (SKIP.has(file) || /\/_/.test(file)) continue;
    const src = `src/pages/${file.slice(2)}`;
    const lastmod = gitDate(src);
    if (!file.includes('[')) {
      const loc = routeFor(file);
      out.push({ loc: `${SITE}${loc}`, lastmod, changefreq: 'monthly', priority: PRIORITY[loc] ?? '0.5' });
      continue;
    }
    // dynamic route: ask the page for its paths (same call Astro makes at build)
    try {
      const mod: any = await load();
      const paths: any[] = (await mod.getStaticPaths?.({ paginate: () => [] })) ?? [];
      for (const p of paths.flat()) {
        const loc = routeFor(file, p?.params ?? {});
        out.push({ loc: `${SITE}${loc}`, lastmod, changefreq: 'monthly', priority: '0.5' });
      }
    } catch {
      /* a page whose paths can't be resolved here is simply left out */
    }
  }
  return out;
}

// Every PDF in public/resume/ (role résumés, portfolio) — globbed at build time, so a new
// PDF shows up here automatically.
function resumePdfs(): Entry[] {
  const dir = join(process.cwd(), 'public', 'resume');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .sort()
    .map((f) => ({
      loc: abs(`/resume/${f}`),
      lastmod: gitDate(`public/resume/${f}`),
      changefreq: 'monthly',
      priority: '0.6',
    }));
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);

  // Blog posts keep their frontmatter `date` (the publish date you set on purpose).
  const postEntries = posts.map((p) => ({ id: p.id, lastmod: iso(p.data.date), cover: p.data.cover }));
  // Projects, research and the résumé derive their date from git — edit + commit and it updates itself.
  const projectEntries = projects.map((p) => ({
    id: p.id,
    lastmod: gitDate(`src/content/projects/${p.id}.md`),
    cover: p.data.cover,
  }));

  const newestPost = posts[0] ? iso(posts[0].data.date) : today;
  const newestProject = maxDate(...projectEntries.map((p) => p.lastmod));
  const researchMod = gitDate('src/data/disclosures.ts');
  const resumeMod = gitDate('public/Kartik_Resume.pdf');
  // Home reflects the most recent meaningful change anywhere on the site.
  const homeMod = maxDate(newestPost, newestProject, researchMod, gitDate('src/pages/index.astro'));

  const entries: Entry[] = [
    {
      loc: `${SITE}/`,
      lastmod: homeMod,
      changefreq: 'weekly',
      priority: '1.0',
      images: [`${SITE}/kartik.png`, `${SITE}/og/kartik-jain.jpg`],
    },
    ...(await discoveredPages()),
    { loc: `${SITE}/research/`, lastmod: researchMod, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE}/projects/`, lastmod: newestProject, changefreq: 'monthly', priority: '0.7' },
    { loc: `${SITE}/blog/`, lastmod: newestPost, changefreq: 'weekly', priority: '0.7' },
    { loc: `${SITE}/Kartik_Resume.pdf`, lastmod: resumeMod, changefreq: 'monthly', priority: '0.8' },
    ...resumePdfs(),
    ...postEntries.map((p): Entry => ({
      loc: `${SITE}/blog/${p.id}/`,
      lastmod: p.lastmod,
      changefreq: 'yearly',
      priority: '0.6',
      images: p.cover ? [abs(p.cover)] : undefined,
    })),
    ...projectEntries.map((p): Entry => ({
      loc: `${SITE}/projects/${p.id}/`,
      lastmod: p.lastmod,
      changefreq: 'yearly',
      priority: '0.6',
      images: p.cover ? [abs(p.cover)] : undefined,
    })),
  ];

  // de-duplicate by URL (first wins)
  const seen = new Set<string>();
  const unique = entries.filter((e) => (seen.has(e.loc) ? false : (seen.add(e.loc), true)));

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    unique
      .map((e) =>
        [
          '  <url>',
          `    <loc>${xml(e.loc)}</loc>`,
          e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : '',
          e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : '',
          e.priority ? `    <priority>${e.priority}</priority>` : '',
          ...(e.images ?? []).map((i) => `    <image:image><image:loc>${xml(i)}</image:loc></image:image>`),
          '  </url>',
        ]
          .filter(Boolean)
          .join('\n'),
      )
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
