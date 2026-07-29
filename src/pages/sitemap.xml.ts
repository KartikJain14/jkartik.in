import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { execSync } from 'node:child_process';

export const prerender = true;

const SITE = 'https://jkartik.in';

interface Entry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
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

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);

  // Blog posts keep their frontmatter `date` (the publish date you set on purpose).
  const postEntries = posts.map((p) => ({ id: p.id, lastmod: iso(p.data.date) }));
  // Projects, research and the résumé derive their date from git — edit + commit and it updates itself.
  const projectEntries = projects.map((p) => ({
    id: p.id,
    lastmod: gitDate(`src/content/projects/${p.id}.md`),
  }));

  const newestPost = posts[0] ? iso(posts[0].data.date) : today;
  const newestProject = maxDate(...projectEntries.map((p) => p.lastmod));
  const researchMod = gitDate('src/data/disclosures.ts');
  const resumeMod = gitDate('public/Kartik_Resume.pdf');
  // Home reflects the most recent meaningful change anywhere on the site.
  const homeMod = maxDate(newestPost, newestProject, researchMod);

  const entries: Entry[] = [
    { loc: `${SITE}/`, lastmod: homeMod, changefreq: 'weekly', priority: '1.0' },
    { loc: `${SITE}/blog/`, lastmod: newestPost, changefreq: 'weekly', priority: '0.7' },
    { loc: `${SITE}/projects/`, lastmod: newestProject, changefreq: 'monthly', priority: '0.7' },
    { loc: `${SITE}/research/`, lastmod: researchMod, changefreq: 'monthly', priority: '0.6' },
    { loc: `${SITE}/Kartik_Resume.pdf`, lastmod: resumeMod, changefreq: 'monthly', priority: '0.8' },
    ...postEntries.map((p): Entry => ({
      loc: `${SITE}/blog/${p.id}/`,
      lastmod: p.lastmod,
      changefreq: 'yearly',
      priority: '0.6',
    })),
    ...projectEntries.map((p): Entry => ({
      loc: `${SITE}/projects/${p.id}/`,
      lastmod: p.lastmod,
      changefreq: 'yearly',
      priority: '0.6',
    })),
  ];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map((e) =>
        [
          '  <url>',
          `    <loc>${e.loc}</loc>`,
          e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : '',
          e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : '',
          e.priority ? `    <priority>${e.priority}</priority>` : '',
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
