---
title: "NeuroTechh"
description: "First prize at the MAL 4 hackathon: a clinic appointment platform designed with a team of three, judged on its architecture. A brief, HLD, LLD and 19 decision records, plus a React Native prototype."
seoDescription: "First prize at the MAL 4 architecture hackathon at Paytm Mumbai: a clinic booking design with HLD, LLD and 19 decision records, plus a working prototype."
tag: "System design"
cover: "/projects/mal-hackathon.png"
source: "https://github.com/KartikJain14/mal-hackathon"
stack: ["React Native", "Expo", "Express", "TypeScript", "PostgreSQL", "Redis", "Measure", "Docker Compose"]
role: "Team of 3"
year: 2026
status: "First prize, MAL 4 · prototype"
order: 3.5
---

NeuroTechh is what [Manan Gandhi](https://manan.cloud), [Naitik Lodha](https://naitiklodha.in) and I designed at [MAL 4](https://mobilearchitecturelab.com/mal4), the Mobile Architecture Lab's one-day hackathon at Paytm in Mumbai on 1 November 2026, supported by Measure, Google for Developers, Paytm and Ocean AI. It won first prize.

This wasn't a build-the-best-demo event. Code was optional and architecture was 60% of the score, so the design documents are the main work here, and the prototype is the supporting evidence. I wrote about the day itself in [We won a hackathon where the code was optional](/blog/mal4-hackathon-where-code-was-optional/).

<figure>
  <img src="/blog/mal4-cover.jpg" alt="The three team members holding the MAL Hackathon first-prize champions cheque for 20,000 rupees, in front of a Paytm logo on a marble wall." width="960" height="504" loading="lazy" />
  <figcaption>With the first-prize cheque at Paytm, Mumbai.</figcaption>
</figure>

## The problem

We drew the healthtech track: patients can't see real availability, and clinics can't control it reliably, so slots get double-promised and cancelled ones go unused. The design makes one promise: **a confirmed slot belongs to exactly one patient, and a cancellation returns the slot to everyone, consistently.**

## What we submitted

- **[Problem brief](https://github.com/KartikJain14/mal-hackathon/blob/main/docs/problem-brief.md):** users, the core journey, scope, assumptions and success conditions on one page.
- **[Production design](https://github.com/KartikJain14/mal-hackathon/blob/main/docs/architecture/production-design.md):** the long-term picture, including regions, compliance, payments and rollout.
- **[High-level](https://github.com/KartikJain14/mal-hackathon/blob/main/docs/architecture/hld.md) and [low-level design](https://github.com/KartikJain14/mal-hackathon/blob/main/docs/architecture/lld.md):** components, data flows, state machines, and the confirm flow in detail.
- **[19 decision records](https://github.com/KartikJain14/mal-hackathon/blob/main/docs/adr/README.md):** each with its alternatives, consequences and what would reopen it.
- **[Walkthroughs](https://github.com/KartikJain14/mal-hackathon/blob/main/docs/adr/walkthroughs.md):** the core path, three failures and a new requirement.

## The decisions that mattered

- **One modular API, not microservices.** Confirming a slot is one local transaction. Spread across services it would need a saga, with half-booked states to detect and repair.
- **The database decides who owns a slot.** Postgres row locks make confirms take turns, and a partial unique index is the backstop if a bug ever skips the lock. No Redis locks, because a lock that lives elsewhere can disagree with the data.
- **Pending requests hold nothing.** Any number of patients can ask for one slot, so the race moves to the moment a clinic confirms, which is where the design protects it.
- **Retries are safe.** The phone creates an idempotency key per action, and the server returns its stored answer on a replay and rejects the same key with different content.
- **An outbox instead of Kafka.** The change and its event are written in one transaction, so they can't disagree.

## The prototype

A React Native and Expo app for patients, hospitals and doctors, on an Express and TypeScript API with PostgreSQL. It covers booking for yourself or family, clinic approvals, doctor availability, QR check-in, and visit notes and records. The Measure SDK is wired in for mobile monitoring, though the app doesn't send it custom events yet.

We checked the booking rule by firing **2, 50 and 200 simultaneous confirms at one slot**, and exactly one was confirmed each time. Integration tests cover the booking and workflow paths.

It's a prototype, and the repo says so plainly. The [as-built record](https://github.com/KartikJain14/mal-hackathon/blob/main/docs/architecture/as-built.md) lists what's implemented, what differs from the design, and the known gaps, including one that lets a slot be re-booked after a future visit is completed.
