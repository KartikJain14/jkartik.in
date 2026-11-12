import { readFile } from 'node:fs/promises';

const site = new URL('https://jkartik.in');
const key = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim();
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Invalid IndexNow key.');
const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll('&amp;', '&'));
if (!urlList.length || urlList.length > 10000) throw new Error('Build a sitemap with 1–10,000 URLs before submitting.');
if (urlList.some((url) => new URL(url).origin !== site.origin)) throw new Error('Sitemap contains another origin.');
const payload = { host: site.host, key, keyLocation: new URL('/indexnow-key.txt', site).href, urlList };

if (!process.argv.includes('--submit')) {
  console.log(JSON.stringify({ mode: 'dry-run', ...payload }, null, 2));
} else {
  const proof = await fetch(payload.keyLocation, { signal: AbortSignal.timeout(15000), redirect: 'error' });
  if (!proof.ok || (await proof.text()).trim() !== key) throw new Error('Deploy the matching key file before submission.');
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30000),
  });
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow rejected the request: ${response.status} ${await response.text()}`);
  console.log(`IndexNow accepted ${urlList.length} URLs (HTTP ${response.status}). This is not an indexing guarantee.`);
}
