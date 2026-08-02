---
title: "conc-qr"
description: "Role-based QR check-in system for Social Conclave — a live-editable permission matrix, phone-camera scanning with a manual fallback, and race-free attendance tracking."
tag: "Backend"
cover: "/projects/conc-qr.png"
stack: ["TypeScript", "Express", "Next.js", "PostgreSQL", "Sequelize", "JWT"]
role: "Solo — full-stack"
year: 2026
status: "Shipped"
source: "https://github.com/Social-Conclave/conc-qr"
order: 11
---

[Social Conclave](https://socialconclave.in) hands every attendee a QR-coded badge, scanned repeatedly across the event — at the door, at food, at high tea. conc-qr is the system behind those scans: who gets in, who's already eaten, and who's allowed to say yes in the first place. Built solo, in under two weeks, shipped for the event on January 25, 2026. I wrote about the build in more detail on [the blog](/blog/what-conc-qr-taught-me-about-myself/).

## What it does

- **Role-based scanning** — four staff roles (`HOSPI`, `RND`, `MGMT`, `SECURITY`), none of them hardcoded to a checkpoint. A JSON access matrix in Postgres maps `day → checkpoint → allowed roles`, editable by an admin mid-event with no redeploy.
- **Camera scan with a manual fallback** — `html5-qrcode` reads badges off a phone camera at speed; a manual-entry input covers the cases a dim hall or a damaged sticker can't.
- **Race-free check-ins** — a Postgres `UNIQUE (participant_id, access_type, day)` constraint, not an application-level check, is what actually stops the same badge being scanned twice.
- **JWT auth, role middleware** — staff log in once per shift; every scan and admin route is gated by role at the middleware layer, not in each handler.

## Under the hood

Express + TypeScript on the backend, Sequelize against Postgres, a Next.js scanning app the whole staff runs off their own phones. The scan endpoint does an optimistic insert straight into the `scans` table and reads the outcome from whatever Postgres throws back: a unique-constraint violation means "already scanned today," a foreign-key violation means "unknown participant," success means the badge is now marked used for that checkpoint. No pre-check, no separate lookup — the database is the single source of truth for whether a scan is new. The access matrix itself is cached in memory for five minutes so a scan never waits on a config read, and the whole thing is one Docker image (Postgres + Express + Next.js) deployed for a three-day window.

## What I'd do differently

The access-matrix cache is process-local — fine for a single container, a real problem the moment this needs to run on more than one instance. It's the kind of shortcut that's correct for exactly the scale it was built for and wrong the moment that changes.

> The QR code was never the hard part. The hard part was making sure "who's allowed to scan this" could change three times during the event without anyone touching a deploy.
