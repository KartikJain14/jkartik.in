---
title: "mpstme.pics"
description: "A photo-sharing platform for campus clubs — I set up the project and its infrastructure, and built several of the backend access-control features."
tag: "Backend"
cover: "/projects/mpstme-pics.png"
stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Redis", "Amazon S3", "Docker"]
role: "Scaffold, DevOps & backend features"
year: 2025
status: "Shipped"
order: 7
---

Campus clubs shoot thousands of photos at every event and then have nowhere good to put them. mpstme.pics gives each club its own gallery with real auth and access control. It's a team project — I set the codebase up and owned the deployment side, plus a handful of the backend features.

## What I actually built

- **The project scaffold** — I created the repo and its initial structure, so the rest of the team had a shape to build into.
- **The deployment pipeline** — Dockerized the app and wired up CI/CD (GitHub Actions plus Watchtower for auto-deploys), so merges shipped without manual steps.
- **Access-control & backend features** — a club photo-count endpoint, a superadmin "list all clubs" route, and album slug editing scoped to club-admins and superadmins (with the Committee→Club rename that went with it).

## How the platform fits together

The backend is a modular Express/TypeScript service — Drizzle ORM on PostgreSQL, Redis for caching, and S3 for image storage, behind JWT auth with role-based access (superadmin, club-admin). My contributions sat mostly at the two ends I care about most: the infrastructure that keeps it deployable, and the authorization rules that decide who can touch what.

> Being the person who scaffolds a project and owns its deploy pipeline is underrated — you don't write the most lines, but you set the shape everyone else builds inside.
