export const prerender = true;
export function GET() {
  const now = new Date();
  const exp = new Date(Date.UTC(now.getUTCFullYear() + 1, now.getUTCMonth(), now.getUTCDate()));
  const body = [
    '# Security policy for jkartik.in',
    'Contact: mailto:security@jkartik.in',
    'Expires: ' + exp.toISOString(),
    'Preferred-Languages: en',
    'Canonical: https://jkartik.in/.well-known/security.txt',
  ].join('\n') + '\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
