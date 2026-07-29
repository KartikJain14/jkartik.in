---
title: "Delego — Mumbai MUN app"
description: "The delegate companion app for Mumbai MUN, one of India's largest — I built the FastAPI backend behind it, shipped to the App Store and Play Store for 600+ delegates."
tag: "APIs"
cover: "/projects/delego-mun.png"
source: "https://github.com/munsoc-mpstme/mundra"
stack: ["FastAPI", "PostgreSQL", "JWT", "Flutter", "QR"]
role: "Backend"
year: "2024–2025"
status: "Shipped"
order: 2
---

Mumbai MUN is one of the largest Model UN conferences in India — hundreds of delegates, dozens of committees, three days of chaos to coordinate. Delego is the app that runs it, and I built the backend the whole thing leans on. It shipped to the App Store and Play Store and carried the conference for 600+ delegates.

## What it does

The Flutter app is the delegate's companion — schedule, committee study guides, venue info, sponsors, and a QR identity used at entry and meals. My side is the API behind all of it:

- **Passwordless auth** — magic links and one-time codes over JWT, so delegates don't manage another password.
- **Delegate profiles & assignments** — registration, committee/country allocations, and organizer-side verification.
- **QR identity** — per-delegate QR generation and scan endpoints powering check-in and food distribution, tracked in real time.
- **Organizer tooling** — CSV import/export, manual verification, rate limiting, and scheduled database backups.

## Why it had to be boring and reliable

An event backend gets exactly one chance — the conference happens on a fixed date whether the API is ready or not. So the design optimized for *predictable*: a typed FastAPI surface the mobile team could generate against, validation at the boundary, self-generating OpenAPI docs, and rate limiting so a room full of delegates hammering check-in at 9am doesn't take it down.

> An event backend's whole job is to be invisible on the one day it matters. This one was — the source is the `mundra` service linked above.
