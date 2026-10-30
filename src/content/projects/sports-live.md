---
title: "sports-live"
description: "A freelance build that ran a pickleball tournament: registration, a live player auction on a projector, fixtures, live scoring and standings. Used at ELEV8, where about 200 players were auctioned into 8 teams."
tag: "Realtime"
cover: "/projects/sports-live.png"
stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Realtime", "Vitest"]
role: "Solo, freelance"
year: 2026
status: "Used at a live tournament"
order: 11
---

A freelance client needed one system for a whole pickleball tournament: players sign up, organizers verify them, team owners bid for them in a live auction, and then the fixtures, scores and standings run on the day. I built it as a single Next.js app between August and October 2026, and it was used at **ELEV8**, where about **200 players** were auctioned into **8 teams**. The source is private, since it was client work.

## What it does

- **Registration and verification.** Players register with a photo and the details the organizers ask for. Each one is checked by an admin before they reach the auction pool, with pending, waitlist and rejected states for everyone who isn't approved yet.
- **A purse-based live auction.** Every team has a purse. The server works out each team's maximum legal bid, so a team can't spend so much on one player that it can't fill the rest of its squad, and an overspend is refused rather than corrected afterwards. Purses carry over between auction rounds.
- **A projector board.** A separate full-screen route shows the current lot, the sale and every team's purse to the room, and it reconnects on its own when the venue Wi-Fi drops.
- **Fixtures, live scoring and standings**, with public pages players can open on their phones during the event.

## Built for a real venue

Venue Wi-Fi is never as good as anyone promises, so the app has an offline write queue in IndexedDB. Actions taken while the connection is down are queued with an idempotency key, and when it comes back the queue drains in order without applying anything twice. Live updates come over Supabase Realtime with automatic retry.

Players hand over phone numbers and dates of birth to register, so public pages read only from views that leave those out. The base tables deny anonymous access entirely, every write goes through server code that checks the rules first, and every sale, undo and score edit lands in an audit log.

The rules that decide money and standings (purse maths, legal bids, fixture generation, scoring) are pure functions with Vitest tests, because those are the parts that can't be wrong in front of a room full of team owners. There's no default admin PIN: the first visit to the admin page asks you to create one.

> An auction is the worst possible time for a bug: everyone in the room is watching the same screen, and half of them just spent money.
