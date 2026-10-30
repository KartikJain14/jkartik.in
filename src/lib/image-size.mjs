// Reads the pixel size of an image in public/ at BUILD time (pages are prerendered), so
// og:image:width/height are always real. Handles PNG, JPEG and WebP; returns null otherwise.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function imageSize(publicPath) {
  if (!publicPath.startsWith('/')) return null;
  let b;
  try {
    b = readFileSync(join(process.cwd(), 'public', decodeURIComponent(publicPath)));
  } catch {
    return null;
  }
  // PNG: IHDR width/height at bytes 16–23
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  // JPEG: walk the markers to the first SOFn frame header
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
        return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
    return null;
  }
  // WebP (VP8 / VP8L / VP8X)
  if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const n = b.readUInt32LE(21);
      return { width: (n & 0x3fff) + 1, height: ((n >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8X') return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
  }
  return null;
}

/** Image MIME type from the file's magic bytes (not its extension). */
export function imageType(publicPath) {
  try {
    const b = readFileSync(join(process.cwd(), 'public', decodeURIComponent(publicPath)));
    if (b.readUInt32BE(0) === 0x89504e47) return 'image/png';
    if (b[0] === 0xff && b[1] === 0xd8) return 'image/jpeg';
    if (b.toString('ascii', 8, 12) === 'WEBP') return 'image/webp';
  } catch {}
  return null;
}
