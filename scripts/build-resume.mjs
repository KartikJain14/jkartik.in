// Build-time only. Compiles the résumé .tex sources to PDFs in public/ with tectonic:
//
//   resume/Kartik_Resume.tex      -> public/Kartik_Resume.pdf   (the general résumé; URL never changes)
//   resume/roles/<Name>.tex       -> public/resume/<Name>.pdf   (role-specific résumés)
//   resume/portfolio/<Name>.tex   -> public/resume/<Name>.pdf   (long-form portfolio document)
//
// Only top-level .tex files in roles/ and portfolio/ are compiled; put \input partials in a subfolder.
// Pass a substring to build only matching files:  npm run resume -- Security
//
// Fully non-blocking by design: if a .tex is missing, tectonic isn't installed, or a compile
// fails, it prints a warning, leaves the existing PDF untouched, and exits 0 — so
// `npm run build` NEVER breaks over a résumé.
//
// This runs on your machine / CI at build time. It is NOT a server component — nothing here
// runs per-request; it just produces static PDFs like a compiler would.
import { existsSync, mkdirSync, copyFileSync, rmSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const filter = process.argv[2];

const texIn = (dir) => {
  const abs = resolve(root, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((f) => f.endsWith('.tex'))
    .map((f) => ({ tex: resolve(abs, f), target: resolve(root, 'public/resume', f.replace(/\.tex$/, '.pdf')) }));
};

const jobs = [
  { tex: resolve(root, 'resume/Kartik_Resume.tex'), target: resolve(root, 'public/Kartik_Resume.pdf') },
  ...texIn('resume/roles'),
  ...texIn('resume/portfolio'),
].filter((j) => existsSync(j.tex) && (!filter || basename(j.tex).includes(filter)));

if (jobs.length === 0) {
  console.log('[resume] nothing to build — keeping the existing PDFs.');
  process.exit(0);
}

try {
  execFileSync('tectonic', ['--version'], { stdio: 'ignore' });
} catch {
  console.warn(
    '\n[resume] tectonic not found on PATH — keeping the existing PDFs.\n' +
      '         Install it to auto-build the résumés: https://tectonic-typesetting.github.io\n',
  );
  process.exit(0);
}

for (const { tex, target } of jobs) {
  const name = basename(tex, '.tex');
  // One output dir per file, so parallel builds of different résumés never collide.
  const outDir = resolve(root, 'resume/.out', name);
  const rel = (p) => p.slice(root.length + 1);
  try {
    mkdirSync(outDir, { recursive: true });
    execFileSync('tectonic', ['--outdir', outDir, tex], { stdio: 'inherit' });
    const built = resolve(outDir, `${name}.pdf`);
    if (!existsSync(built)) throw new Error(`tectonic ran but produced no ${name}.pdf`);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(built, target);
    console.log(`[resume] built ${rel(target)} from ${rel(tex)}`);
  } catch (err) {
    console.warn(`\n[resume] ${rel(tex)} failed to compile — keeping the existing PDF.\n         ${err?.message ?? err}\n`);
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
}
