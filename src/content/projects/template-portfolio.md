---
title: "template-portfolio"
description: "A one-page portfolio template for students who have never written code: fill in one file, push, and it's online. Used by participants of ACM MPSTME's Programming For Everyone."
seoDescription: "A one-page portfolio template for students who have never written code: fill in one file, push, and it's online. Used at ACM's Programming For Everyone."
tag: "Community"
cover: "/projects/template-portfolio.png"
source: "https://github.com/KartikJain14/template-portfolio"
stack: ["Astro", "JavaScript", "GitHub Pages", "GitHub Actions"]
role: "Lead author"
year: 2026
status: "Used at PFE"
order: 21
---

Programming For Everyone (PFE) is ACM MPSTME's open programming program, and a portfolio is a natural first thing for its participants to put online. Most templates assume you already know a framework. This one assumes you know how to edit a text file.

## How it works

- **One file to edit.** Everything about you (name, photo, about, experience, achievements, projects, skills, contact links) lives in `src/data/portfolio.js`, split into numbered blocks with an example above each one. The README is a checklist that walks through them in order.
- **Sections that get out of the way.** Leave a block empty and that section disappears from the page and the menu, the remaining sections renumber themselves, and the buttons point somewhere that still exists.
- **One colour to choose.** Pick an accent colour, plus a brighter one for dark mode, and the buttons, links, favicon, app icons and link-preview image are generated from it.
- **Free hosting that deploys itself.** A GitHub Actions workflow publishes to GitHub Pages on every push. The one setting that trips everyone up (the base path for a project site) has its own section in the README.

## What I optimised for

Many of the people using it are new to programming, so what happens when something breaks matters more than the feature list. The README covers the three ways the page goes blank (a deleted quote, comma or bracket), what to check before sending the link to anyone, and how to test the WhatsApp preview card. It also generates a sitemap and `robots.txt`, so a student's first site is findable, not just online.

> A beginner's template is judged by the first thing that goes wrong, not the best thing it can do.
