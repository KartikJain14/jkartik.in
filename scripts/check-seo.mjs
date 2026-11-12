import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { imageSize } from '../src/lib/image-size.mjs';

const root = resolve('dist');
assert(existsSync(join(root, 'sitemap.xml')), 'Run npm run build first.');
const site = 'https://jkartik.in';
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({
  url: match[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
  modified: match[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
}));
assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length, 'Duplicate sitemap URLs.');
const titles = new Set();
const descriptions = new Set();
const now = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
let pages = 0;
let articles = 0;

function localFile(url) {
  const file = join(root, decodeURIComponent(url.pathname));
  if (existsSync(file) && statSync(file).isFile()) return file;
  if (existsSync(join(file, 'index.html'))) return join(file, 'index.html');
  if (existsSync(`${file}.html`)) return `${file}.html`;
  return null;
}

for (const entry of entries) {
  assert(entry.url?.startsWith(`${site}/`), `Invalid sitemap URL: ${entry.url}`);
  assert(entry.modified && /^\d{4}-\d{2}-\d{2}$/.test(entry.modified) && entry.modified <= now, `Invalid lastmod: ${entry.url}`);
  assert(localFile(new URL(entry.url)), `Sitemap target missing: ${entry.url}`);
}

for (const name of readdirSync(root, { recursive: true }).filter((name) => name.endsWith('.html'))) {
  const html = readFileSync(join(root, name), 'utf8');
  const meta = (key) => [...html.matchAll(/<meta\b[^>]*>/g)]
    .find((match) => match[0].includes(`name="${key}"`) || match[0].includes(`property="${key}"`))?.[0]
    .match(/content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  if (meta('robots')?.includes('noindex')) {
    assert(!entries.some((entry) => entry.url === canonical), `Noindex URL in sitemap: ${name}`);
    continue;
  }
  pages++;
  const expected = `${site}/${name.replace(/index\.html$/, '').replaceAll('\\', '/')}`;
  assert.equal(canonical, expected, `Incorrect canonical in ${name}`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `Expected one H1: ${name}`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title && !titles.has(title), `Missing or duplicate title: ${name}`);
  titles.add(title);
  const description = meta('description');
  assert(description && !descriptions.has(description), `Missing or duplicate description: ${name}`);
  descriptions.add(description);
  assert(meta('robots')?.includes('max-image-preview:large'), `Large previews disabled: ${name}`);
  assert(entries.some((entry) => entry.url === canonical), `Indexable page absent from sitemap: ${name}`);

  const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap((match) => {
      const schema = JSON.parse(match[1]);
      return schema['@graph'] ?? [schema];
    });
  assert(graph.some((node) => node['@type'] === 'WebSite'), `Missing site identity: ${name}`);
  const article = graph.find((node) => node['@type'] === 'BlogPosting');
  if (article) {
    articles++;
    assert.equal(article.url, canonical);
    assert.equal(article.datePublished, meta('article:published_time'));
    assert.equal(article.dateModified, meta('article:modified_time'));
    assert(article.dateModified >= article.datePublished, `Revision precedes publication: ${name}`);
    assert.equal(entries.find((entry) => entry.url === canonical).modified, article.dateModified.slice(0, 10));
    assert(html.includes(`datetime="${article.datePublished}"`) && html.includes(`datetime="${article.dateModified}"`), `Dates are not visible: ${name}`);
    const image = new URL(article.image.url ?? article.image);
    const size = imageSize(image.pathname);
    assert(size && size.width >= 1200 && size.width * size.height > 300000, `Article needs a large representative image: ${name}`);
    assert.equal(meta('og:image'), image.href);
    assert(graph.some((node) => node['@type'] === 'Person' && node['@id'] === article.author['@id']), `Unresolved author: ${name}`);
  }

  for (const match of html.matchAll(/<(?:a|img|link)\b[^>]*\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(?:data:|mailto:|tel:|ssh:|javascript:)/.test(value)) continue;
    const url = new URL(value, canonical);
    if (url.origin !== site || url.pathname === '/404') continue;
    const file = localFile(url);
    assert(file, `Missing local target ${value} in ${name}`);
    if (url.hash && file.endsWith('.html')) {
      const target = readFileSync(file, 'utf8');
      const fragment = decodeURIComponent(url.hash.slice(1));
      assert(target.includes(`id="${fragment}"`) || target.includes(`name="${fragment}"`), `Missing anchor ${value} in ${name}`);
    }
  }
}

assert(readFileSync(join(root, 'robots.txt'), 'utf8').includes(`Sitemap: ${site}/sitemap.xml`));
assert(readFileSync(join(root, 'rss.xml'), 'utf8').includes('<rss'));
console.log(`SEO audit passed: ${pages} indexable pages, ${articles} articles, ${entries.length} sitemap URLs; metadata, dates, structured data, large article images and local links.`);
