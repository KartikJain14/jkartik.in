// Build-time helpers for the /hire/ showcase (pages are prerendered, so this never runs on a server).
// Screenshots may land after the data does: every image is checked on disk, and a missing one
// falls back to a typographic placeholder instead of a broken <img>.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { imageSize } from '../../lib/image-size';
import type { ShowcaseItem } from '../../data/showcase';

export interface Shot {
  src: string;
  width: number;
  height: number;
}

const resolve = (src: string | undefined, fallback: { width: number; height: number }): Shot | null => {
  if (!src || !src.startsWith('/')) return null;
  if (!existsSync(join(process.cwd(), 'public', decodeURIComponent(src)))) return null;
  const dims = imageSize(src) ?? fallback;
  return { src, ...dims };
};

export interface ResolvedItem extends ShowcaseItem {
  desktopShot: Shot | null;
  mobileShot: Shot | null;
  domain: string;
  group: string;
}

/** "https://www.khoy.in/shop" → "khoy.in" */
export const domainOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

export const resolveItem = (item: ShowcaseItem, groupOf: (cat: string) => string): ResolvedItem => ({
  ...item,
  desktopShot: resolve(item.images?.desktop, { width: 1200, height: 750 }),
  mobileShot: resolve(item.images?.mobile, { width: 780, height: 1688 }),
  domain: domainOf(item.url),
  group: groupOf(item.category),
});
