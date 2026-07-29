---
# ══════════════════════════════════════════════════════════════
#  PROJECT TEMPLATE — copy me, then delete what you don't need.
#
#  1. Copy this file to a slug:  src/content/projects/my-project.md
#  2. It publishes at:           /projects/my-project/
#  3. Files starting with "_" are ignored, so THIS file never shows up.
#
#  The meta bar (role/year/status), the Live/Source buttons, and the
#  tech chips are all rendered from the frontmatter below — you only
#  write the case-study prose in the body.
# ══════════════════════════════════════════════════════════════

title: "Project name"
description: "One-line summary. Shows on the card, the /projects/ listing, and as the page subtitle."
tag: "Backend"                       # drives the auto cover art: Backend · Payments · APIs · Tooling · Realtime · Infra …
stack: ["Node.js", "PostgreSQL", "Redis"]   # rendered as chips under the cover
role: "Backend & infra"              # shown in the meta bar
year: 2026                           # shown in the meta bar
status: "In production"              # e.g. In production · Shipped · Prototype
# live: "https://example.com"        # OPTIONAL → renders a "Demo ↗" button
# source: "https://github.com/you/repo"  # OPTIONAL → renders a "Source ↗" button
# cover: "/projects/my-cover.jpg"    # OPTIONAL. Put it in public/projects/. Omit → auto art from the tag.
featured: false                      # true → this becomes the big featured card at the top of /projects/
order: 10                            # sort order across projects (lower = earlier)
---

Open with the problem this project solves — the first paragraph gets a drop cap.
Keep it human: what was broken, who it was for, why it mattered.

## What it does

- The headline capabilities
- one bullet each
- keep them concrete

## How it works

Explain the interesting decision or two. Code blocks render on a dark card:

```js
app.get("/health", (_, res) => res.json({ ok: true }));
```

Everything the blog theme styles works here too — **bold**, `inline code`,
> block-quotes,

tables, images (`![alt](/projects/shot.jpg)`, files in `public/projects/`), and
`---` dividers.

## What I'd do differently

A short, honest reflection reads better than a victory lap. Delete the sections
you don't need and the project page is done.
