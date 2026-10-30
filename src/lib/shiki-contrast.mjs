// Shiki transformer: keeps every syntax-highlighted token readable on the site's own warm
// code card (--code-bg in global.css). The vitesse themes are tuned for their own backgrounds,
// so several tokens (comments, punctuation, strings) fall below WCAG AA here. Any colour under
// 4.5:1 is nudged toward black/white until it passes, which keeps its hue. Runs at build time
// on every token, so new posts and new languages are covered without touching this file.

const LIGHT_BG = '#efe9dd'; // :root[data-theme="light"] --code-bg
const DARK_BG = '#100e0b'; // :root --code-bg
const TARGET = 4.6; // a hair over AA's 4.5, so rounding can't drop a token below it

const rgb = (hex) => {
  const h = hex.replace('#', '');
  const alpha = h.length === 8 ? parseInt(h.slice(6), 16) / 255 : 1;
  return { c: [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)), alpha };
};
const channel = (v) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const toHex = (c) => `#${c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

const cache = new Map();

/** The colour unchanged if it already passes on `bg`, else the nearest opaque colour that does. */
export function readable(color, bg) {
  const key = `${color}|${bg}`;
  if (cache.has(key)) return cache.get(key);
  const back = rgb(bg).c;
  const { c, alpha } = rgb(color);
  const flat = c.map((v, i) => v * alpha + back[i] * (1 - alpha)); // alpha blended over the card
  let out = color;
  if (contrast(flat, back) < TARGET) {
    const toward = lum(back) > 0.5 ? 0 : 255; // light card: darken; dark card: lighten
    let mixed = flat;
    for (let t = 0.02; t <= 1 && contrast(mixed, back) < TARGET; t += 0.02) {
      mixed = flat.map((v) => v + (toward - v) * t);
    }
    out = toHex(mixed);
  }
  cache.set(key, out);
  return out;
}

export const codeContrast = {
  name: 'code-contrast',
  span(node) {
    const style = node.properties?.style;
    if (typeof style !== 'string') return;
    node.properties.style = style
      .replace(/--shiki-light:(#[0-9a-f]+)/i, (_, c) => `--shiki-light:${readable(c, LIGHT_BG)}`)
      .replace(/--shiki-dark:(#[0-9a-f]+)/i, (_, c) => `--shiki-dark:${readable(c, DARK_BG)}`);
  },
};
