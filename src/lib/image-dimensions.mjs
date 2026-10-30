// Build step: adds real width/height to images in the finished HTML (mainly those written inside
// Markdown), so pages don't shift while images load. Only touches files under public/; existing
// attributes are left alone.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { imageSize } from './image-size.mjs';

const withSize = (tag, attr) => (match, before, src, after) => {
  if (/\swidth=/.test(match)) return match;
  const size = imageSize(src);
  return size ? `<${tag}${before}${attr}="${src}"${after} width="${size.width}" height="${size.height}">` : match;
};

const addSizes = (html) =>
  html
    .replace(/<img\b([^>]*?)\bsrc="(\/[^"]+)"([^>]*?)\s*\/?>/g, withSize('img', 'src'))
    .replace(/<source\b([^>]*?)\bsrcset="(\/[^"\s,]+)"([^>]*?)\s*\/?>/g, withSize('source', 'srcset'));

export function imageDimensions() {
  return {
    name: 'image-dimensions',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        const pages = readdirSync(root, { recursive: true }).filter((f) => String(f).endsWith('.html'));
        for (const page of pages) {
          const file = join(root, String(page));
          const html = readFileSync(file, 'utf8');
          const sized = addSizes(html);
          if (sized !== html) writeFileSync(file, sized);
        }
      },
    },
  };
}
