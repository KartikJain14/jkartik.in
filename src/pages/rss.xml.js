import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const feedUrl = new URL('/rss.xml', context.site).href;

  return rss({
    title: 'Kartik Jain — Writing',
    description:
      'Notes on backend engineering and security research by Kartik Jain, a security engineer and backend developer in Mumbai.',
    site: context.site,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
      author: 'contact@jkartik.in (Kartik Jain)',
      categories: [p.data.tag],
    })),
    customData: [
      '<language>en</language>',
      `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
      '<managingEditor>contact@jkartik.in (Kartik Jain)</managingEditor>',
      '<webMaster>contact@jkartik.in (Kartik Jain)</webMaster>',
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      '<image><url>https://jkartik.in/kartik.png</url><title>Kartik Jain — Writing</title><link>https://jkartik.in/</link></image>',
    ].join(''),
  });
}
