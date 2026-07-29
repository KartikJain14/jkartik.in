---
# ══════════════════════════════════════════════════════════════
#  BLOG POST TEMPLATE — copy me, then delete what you don't need.
#
#  1. Copy this file to a slug:  src/content/blog/my-post.md
#  2. It publishes at:           /blog/my-post/
#  3. Files starting with "_" are ignored, so THIS file never shows up.
#
#  Everything below the second "---" is the post body (Markdown).
#  Every element the theme styles is demonstrated once — keep what you
#  use, delete the rest.
# ══════════════════════════════════════════════════════════════

title: "Your headline goes here"
description: "One or two sentences. Used on the card, the /blog/ listing, and social/OG previews."
date: 2026-08-01                # YYYY-MM-DD. Controls ordering and the displayed date.
tag: "Backend"                  # Backend · Security · Research · Red team · Infra · Auth · Tooling · Notes …
# cover: "/blog/my-cover.jpg"   # OPTIONAL. Put the image in public/blog/. Omit → cover art is auto-generated from the tag.
# draft: true                   # OPTIONAL. true = hidden everywhere (site + sitemap) and not built. Delete to publish.
---

This first paragraph automatically gets a decorative drop cap, so open with a
strong sentence. Reading time is calculated for you from the length of the post —
you don't set it.

## A section heading

Headings use `##` and get a small § marker. Text supports **bold**, *italics*,
~~strikethrough~~, and `inline code`. Link to
[another post](/blog/why-your-jwt-setup-probably-leaks/), a
[project](/projects/mpstme-pics/), the [research page](/research/), or an
[external site](https://example.com).

### A smaller sub-heading

Use `###` for sub-points under a section.

## Lists

- Bulleted lists look like this
- Markers are accent-coloured
- Nest by indenting two spaces
  - like this

1. Numbered lists
2. work the same way
3. and keep their numbering

A GitHub-style task list:

- [x] Something done
- [ ] Something still to do

## Quotes and code

> Block-quotes render large and serif-italic — perfect for one punchy takeaway.

Inline code is `like this`. A fenced code block keeps monospace on a dark card:

```js
// language after the backticks is optional
export function greet(name) {
  return `hi, ${name}`;
}
```

## Images

Drop the file in `public/blog/` and reference it with an absolute path:

![Always write descriptive alt text](/blog/example.jpg)

For a caption, use raw HTML (Markdown allows it) — you get a centred `<figcaption>`:

<figure>
  <img src="/blog/example.jpg" alt="Describe the image for screen readers" />
  <figcaption>A caption sits centred and muted beneath the image.</figcaption>
</figure>

## Tables

| Method | Path         | Notes           |
| ------ | ------------ | --------------- |
| GET    | `/api/users` | list users      |
| POST   | `/api/users` | create a user   |

## Dividers

Three dashes make a subtle centred divider:

---

Close with a wrap-up paragraph. When you've swapped in your own words and removed
the examples you don't need, the post is done — nothing else to wire up.
