---
title: "Taqneeq fest backend"
description: "The gamified loyalty-and-credits engine behind NMIMS's tech fest — OTP login, role-based point allocation, referrals, and a cached live leaderboard for a crowd of thousands."
tag: "Backend"
cover: "/projects/taqneeq-backend.png"
live: "https://taqneeqfest.com"
stack: ["Python", "Flask", "Firestore", "JWT", "Vercel"]
role: "Lead backend"
year: 2025
status: "Shipped"
order: 3
---

Taqneeq is NMIMS's flagship tech fest — three days, thousands of attendees, and a fest-wide game where people earn and spend credits. I was the lead author of the backend that runs that game: sign-ins, points, a referral loop, and a leaderboard that stays live without melting the database.

<figure>
  <img src="/projects/taqneeq-site.jpg" alt="The live Taqneeq 18.0 tech-fest website" />
  <figcaption>Taqneeq — the fest this backend runs behind, drawing thousands of attendees each year.</figcaption>
</figure>

## What it does

- **Phone-OTP login** — attendees authenticate with a one-time code, no passwords in the mix.
- **Role-based credits** — `SALES` and `ADMIN` roles allocate points to attendees; attendees redeem them, all against a per-user transaction ledger (who did what, when).
- **Referrals** — auto-generated referral codes with `referred_by` tracking, and the abuse handling that shows up the instant there's an incentive.
- **A live leaderboard** and a server-rendered admin portal at a configurable secret path.

## The scaling detail

At a fest, everyone opens the leaderboard at once. Reading Firestore on every request would be both slow and expensive, so the leaderboard is cached with a short TTL — the crowd hits the cache, and the database only gets touched a couple of times a minute regardless of how many people are watching.

## Why Firestore + Flask

For an event that exists for three days, operational simplicity beats theoretical scale. Flask blueprints per domain (auth, credits, admin) kept it readable, Firestore removed schema-migration risk during a fast build, and a Vercel deploy meant no servers to babysit during the fest itself.

> The whole system had a three-day window to be perfect in. The credits, the leaderboard, and the ledger all held — you can see the fest it ran at, live, above.
