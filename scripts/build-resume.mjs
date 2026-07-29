// Build-time only. Compiles resume/Kartik_Resume.tex -> public/Kartik_Resume.pdf with tectonic.
//
// Fully non-blocking by design: if the .tex is missing, tectonic isn't installed, or the
// compile fails, it prints a warning, leaves the existing public/Kartik_Resume.pdf untouched,
// and exits 0 — so `npm run build` NEVER breaks over the resume.
//
// This runs on your machine / CI at build time. It is NOT a server component — nothing here
// runs per-request; it just produces a static PDF like a compiler would.
import { existsSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tex = resolve(root, 'resume/Kartik_Resume.tex');
const outDir = resolve(root, 'resume/.out');
const target = resolve(root, 'public/Kartik_Resume.pdf');

const cleanup = () => rmSync(outDir, { recursive: true, force: true });

if (!existsSync(tex)) {
  console.log('[resume] no resume/Kartik_Resume.tex found — keeping the existing PDF.');
  process.exit(0);
}

try {
  execFileSync('tectonic', ['--version'], { stdio: 'ignore' });
} catch {
  console.warn(
    '\n[resume] tectonic not found on PATH — keeping the existing PDF.\n' +
      '         Install it to auto-build the resume: https://tectonic-typesetting.github.io\n',
  );
  process.exit(0);
}

try {
  mkdirSync(outDir, { recursive: true });
  execFileSync('tectonic', ['--outdir', outDir, tex], { stdio: 'inherit' });
  const built = resolve(outDir, 'Kartik_Resume.pdf');
  if (!existsSync(built)) throw new Error('tectonic ran but produced no Kartik_Resume.pdf');
  copyFileSync(built, target);
  cleanup();
  console.log('[resume] built public/Kartik_Resume.pdf from resume/Kartik_Resume.tex');
} catch (err) {
  cleanup();
  console.warn(
    `\n[resume] compile failed — keeping the existing PDF.\n         ${err?.message ?? err}\n`,
  );
  process.exit(0); // never break the site build over the resume
}
