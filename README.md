# jkartik.in

Personal site, blog, and project showcase. Built with [Astro](https://astro.build) —
static output, no client framework, the "Ember" design system (warm editorial dark/light,
one accent, film grain, scroll motion, no gradients).

## Develop

```bash
npm install      # once
npm run dev      # local dev server at http://localhost:4321
npm run build    # static build → dist/
npm run preview  # serve the built dist/ locally
```

## Project layout

```
public/                     static assets served at the site root
  Kartik_Resume.pdf         résumé — compiled from resume/Kartik_Resume.tex at build
  favicon.ico, kartik.png   icons / OG image
  robots.txt, llms.txt      crawler files
  site.webmanifest
  .well-known/security.txt
src/
  styles/global.css         the whole Ember design system
  layouts/Base.astro        <head>/SEO, nav, footer, motion, console easter egg
  components/               Nav, Footer, PostCard, ProjectCard
  lib/covers.ts             generates the abstract SVG cover art
  content/
    blog/*.md               one markdown file per post
    projects/*.md           one markdown file per project
  content.config.ts         frontmatter schema for both collections
  pages/                    index, blog/, blog/[slug], projects/, projects/[slug], 404
```

## Add a blog post

**Copy `src/content/blog/_template.md`** to `src/content/blog/<slug>.md`, then delete
what you don't need. It publishes at `/blog/<slug>/`. The template demonstrates every
supported feature (all frontmatter fields + drop cap, headings, lists, task lists,
quotes, code, images, captioned figures, tables, strikethrough, dividers) so you never
have to implement anything — just edit and delete.

Files whose name starts with `_` (like `_template.md`) are **ignored** — they never
build, never appear in listings, and never hit the sitemap. Same for `draft: true`.

That's it — the homepage "Writing" grid, the `/blog/` listing (newest = featured),
the sitemap, and prev/next links all update automatically.

Images: drop the file in `public/blog/` and reference it as `/blog/your-image.jpg`.

### Authoring features (all shown in `_template.md`)

- **Syntax highlighting** — put a language after the code fence; colours are automatic.
- **Copy button** — appears on hover over any code block.
- **Callouts** — `<div class="admonition info|warning|error|success">` (see template).
- **Embeds** — YouTube `<iframe>` and self-hosted `<video>` (file in `public/blog/`).
- **Live preview** — open **`/blog/preview/`** on a laptop: a client-side split-pane
  editor (edit Markdown, see it rendered in the real theme). Personal, desktop-only,
  `noindex`, not linked, not in the sitemap — no server component.

## Add a project

**Copy `src/content/projects/_template.md`** to `src/content/projects/<slug>.md`, then
delete what you don't need. It publishes at `/projects/<slug>/`. The meta bar
(role/year/status), the Live/Source buttons, and the tech chips all render from the
frontmatter — you just write the case-study body. The frontmatter fields:

```markdown
---
title: "Project name"
description: "One-line summary."
tag: "Backend"                 # drives the auto cover art
stack: ["Node.js", "PostgreSQL", "Redis"]
role: "Backend & infra"
year: 2026
status: "In production"
live: "https://example.com"    # optional → renders a "Live site" button
source: "https://github.com/…" # optional → renders a "Source" button
featured: true                 # optional → this is the big card on /projects/
order: 1                       # sort order (lower = earlier)
---
```

## Cover art

If a post/project doesn't set `cover:`, `src/lib/covers.ts` generates a flat, on-brand
SVG cover from its `tag`. To use a real image, drop it in `public/` and point `cover:` at it.

## When facts change

Update `public/llms.txt` (machine-readable profile) and the JSON-LD in
`src/pages/index.astro`. The sitemap is generated at build time by
`src/pages/sitemap.xml.ts` (served at `/sitemap.xml`) — it reads the collections,
so new posts/projects appear automatically.

## Résumé

The résumé served at `/Kartik_Resume.pdf` is a **committed file** — the build just serves it.

- Source: `resume/Kartik_Resume.tex` (edit this).
- Compile it **locally** with `npm run resume` (uses
  [tectonic](https://tectonic-typesetting.github.io) — install it once via
  `sudo pacman -S tectonic` / `apt` / `brew` / `cargo install tectonic`), then commit the
  updated `public/Kartik_Resume.pdf`.
- The site build and CI do **not** compile the PDF — no LaTeX toolchain in the pipeline.

## Docker

One multi-stage image builds the site, then ships only nginx + the static `dist/`
(~97 MB, no app server — consistent with the site being 100% static).

```bash
docker compose up --build      # → http://localhost:8080
# or
docker build -t jkartik-in .
docker run -p 8080:80 jkartik-in
```

- The **build stage** installs `git` (so the sitemap can date each page from git history),
  runs `npm run build`, then is discarded.
- `.git` is intentionally **kept** out of `.dockerignore` — the sitemap's `lastmod` values
  come from each file's last commit, so the build needs history.

## Deploy (GHCR + Watchtower on your Ubuntu server)

Pull-based — **no SSH keys or deploy secrets in GitHub, no inbound access to the server:**

- **CI** (`.github/workflows/publish.yml`) — on push to `main`, builds the image and pushes
  `ghcr.io/kartikjain14/jkartik.in:<sha>` + `:latest` to GHCR (Actions layer cache keeps it
  fast). PRs build only.
- **The server** runs the app container **plus Watchtower** (`compose.prod.yml`). Watchtower
  polls GHCR and, when a new `:latest` appears, pulls it and recreates the container itself.

The only GitHub credential involved is the automatic `GITHUB_TOKEN` (for pushing to GHCR).

**One-time server setup (Ubuntu):**

```bash
# Docker + compose plugin
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker "$USER"          # then log out and back in

# grab compose.prod.yml — the only file the server needs
mkdir -p ~/apps/jkartik.in && cd ~/apps/jkartik.in
curl -O https://raw.githubusercontent.com/KartikJain14/jkartik.in/main/compose.prod.yml
```

Push once so the image exists, then make the GHCR package **public** (GitHub → your profile →
Packages → `jkartik.in` → Package settings → visibility → Public) so the server pulls without
auth. (To keep it private, `docker login ghcr.io` on the server with a PAT instead.) Then:

```bash
docker compose -f compose.prod.yml up -d   # app on 127.0.0.1:8080 + Watchtower
```

**Front it with your existing nginx + TLS** (jkartik.in → the container):

```nginx
server {
    server_name jkartik.in;
    location / {
        proxy_pass         http://127.0.0.1:8080;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo certbot --nginx -d jkartik.in       # HTTPS via Let's Encrypt
```

After that, **just push to `main`** — CI publishes, and within ~60s Watchtower updates the live
container. Nothing else to run.

**Rollback** — revert the commit and push (CI rebuilds `:latest`, Watchtower picks it up), or
pin an old image immediately on the server:

```bash
cd ~/apps/jkartik.in
docker compose -f compose.prod.yml stop watchtower
docker run -d --name jkartik-in --restart unless-stopped -p 127.0.0.1:8080:80 \
  ghcr.io/kartikjain14/jkartik.in:<old-sha>
```

> Watchtower mounts the Docker socket (`/var/run/docker.sock`) — effectively host root. That's
> the standard trade-off for auto-updates; `--label-enable` scopes it to just this container.
