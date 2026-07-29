// Generates a flat, on-brand abstract cover image (data URI) for posts/projects
// that don't ship a real cover photo. Warm dark field + accent bar + faint mono motif.
// No gradients — matches the Ember design language.

type Swatch = { bg: string; accent: string; motif: string };

const PALETTE: Record<string, Swatch> = {
  'red team':   { bg: '29201c', accent: 'c14d3a', motif: '::' },
  research:     { bg: '211c16', accent: 'c85a34', motif: '~/' },
  backend:      { bg: '1f211a', accent: 'b39237', motif: '{}' },
  disclosure:   { bg: '2a1d1a', accent: 'c14d3a', motif: '()' },
  auth:         { bg: '201c17', accent: 'd8a24b', motif: '$_' },
  infra:        { bg: '1e201b', accent: 'b5502f', motif: '//' },
  tooling:      { bg: '1f1c1a', accent: 'c85a34', motif: ';;' },
  security:     { bg: '271d19', accent: 'c14d3a', motif: '#!' },
  payments:     { bg: '1f211a', accent: 'b39237', motif: '$' },
  apis:         { bg: '201c17', accent: 'd8a24b', motif: '{}' },
  realtime:     { bg: '29201c', accent: 'c14d3a', motif: ';' },
  notes:        { bg: '211c16', accent: 'e0a054', motif: '//' },
  default:      { bg: '211c16', accent: 'e0a054', motif: '::' },
};

export function coverFor(tag = '', height = 630): string {
  const p = PALETTE[tag.toLowerCase().trim()] ?? PALETTE.default;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 ${height}'>` +
    `<rect width='1200' height='${height}' fill='#${p.bg}'/>` +
    `<rect x='72' y='84' width='96' height='8' fill='#${p.accent}'/>` +
    `<text x='60' y='${height - 110}' font-family='monospace' font-size='360' font-weight='700' fill='#ffffff' fill-opacity='0.05'>${p.motif}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
