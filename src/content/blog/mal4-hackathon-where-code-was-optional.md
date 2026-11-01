---
title: "We won a hackathon where the code was optional"
description: "MAL 4 judged architecture instead of demos. Here's how the format worked, why our first design lost to our own decision records, and why it beat every hackathon I've done before."
seoDescription: "MAL 4 judged architecture, not demos. How we won first prize at Paytm Mumbai, why our own decision records killed our first design, and what it taught me."
date: 2026-11-02
tag: "System design"
cover: "/blog/mal4-cover.jpg"
---

Most hackathons I've been to reward whatever looks best at the end. You build fast, you hide the rough parts, and you hope nobody clicks the wrong button while the judges are watching.

MAL 4 was the opposite. Working code was optional, and a login screen earned you nothing. What got scored was whether you could explain your system and defend it: what it promises, what happens when it breaks, and what you'd change when the requirements move.

[Manan Gandhi](https://manan.cloud), [Naitik Lodha](https://naitiklodha.in) and I won first prize, and ₹20,000 with it. The cash was nice. But I came away thinking I'd learnt things I might not have picked up in five years at a normal job, so this is what the day was and why I liked it so much.

## What MAL 4 was

[Mobile Architecture Lab](https://mobilearchitecturelab.com/) is a Mumbai engineering lab for senior mobile engineers. [MAL 4](https://mobilearchitecturelab.com/mal4) was its one-day hackathon, held on 1 November at Paytm in Mumbai from 10 to 6, with the theme "Architects in AI Era" and support from Measure, Google for Developers, Paytm and Ocean AI. Teams were up to three people, and the room had working professionals and experts as well as students like us.

Each team drew one of four domains at random: fintech, healthtech, proptech or martech. We got healthtech, which meant appointment coordination. Patients request slots, clinics confirm or decline them, and two business rules hold it together: a confirmed slot can't go to two patients, and a cancellation has to update availability consistently.

That's a small product. Which was the point: the event's line was to build something "small enough to finish—and thoughtful enough to defend."

## How it was different

| | A typical hackathon | MAL 4 |
|---|---|---|
| **You hand in** | A demo and a pitch | A one-page brief, a high-level design, a low-level design, decision records and walkthroughs |
| **Code** | The whole point | Optional. A prototype only earned extra credit |
| **Failure** | You steer the demo around it | You walk the judges through one, on purpose |
| **Features** | More is better | Feature count, framework names and code volume earn nothing on their own |
| **AI** | A way to go faster | Allowed, but your team has to understand and defend everything it wrote |
| **Hours** | Often overnight | 10 to 6, and everyone went home |

The rubric made the priorities obvious. **60% of the score was architecture**: problem framing, structure and boundaries, data and state, failure and recovery, trade-offs. The other 40% went to verification and observability, the core user journey, and how well you defended all of it under questioning. Nothing in it rewards a nice UI.

Judges also checked that your diagrams, decision records and walkthroughs agreed with each other. So you can't just paste in a clever diagram you don't believe in.

## I didn't know what an ADR was

I walked in with no idea what an Architecture Decision Record was. The briefing at the start explained it well enough that we could use it straight away, and it's the thing I'm taking with me.

An ADR is a short record of one decision: the context, the alternatives you considered, why this one won, what it costs you, and what would make you reopen it. We ended up with 19 of them. Here's one, cut down:

> **Decision:** Do not use Redis, or any second system, for slot locks.
>
> **Reasons:** The lock and the data live together, so they cannot disagree.
>
> **Reconsider when:** Measured lock contention on Postgres limits throughput after query and transaction tuning.

That last line is what changed how I think about this. A decision isn't permanent, and it isn't a matter of taste either. It comes with the evidence that would overturn it.

## Our first design lost to our own ADRs

We started with the design you draw when you want to impress someone: nine microservices on Kubernetes, a Redis lock per slot with fencing tokens, Kafka for events, ClickHouse for the audit log. It's all in the [production design](https://github.com/KartikJain14/mal-hackathon/blob/main/docs/architecture/production-design.md), and it does look serious.

Then we had to write down why, one decision at a time, and most of it didn't survive.

| First design | Decided instead | Why |
|---|---|---|
| Nine microservices | One modular API and one database | Confirming a slot is one local transaction. Split across services, it needs a saga, with "half-booked" states to detect and repair |
| Redis lock per slot | Postgres row locks and a unique index | A Redis lock can expire or fail over and disagree with the database |
| Kafka event bus | An outbox table and a polling worker | The change and its event commit together, so they can't disagree, and there's no broker to run |
| ClickHouse audit log | An audit table in Postgres | Audit is mostly writes and lookups by ID, and the row commits with the booking |

All of those tools are good, and none of them was earning its place yet. Every record has a condition for bringing the bigger option back, and we kept the big document as the reference for what a real launch would need later: regions, compliance, payments and the rollout.

If a normal hackathon had given me that same problem, I'd have built the microservices and been proud of them.

## One rule, enforced by the database

The most useful moment came early. Pending requests don't hold a slot, so any number of patients can ask for the same one. That moves the race: it doesn't happen when a patient taps Request, it happens when clinic staff tap Confirm.

So the design makes confirms take turns on a row lock on the slot, and the second one re-reads the slot and gets rejected without writing anything.

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/blog/mal4-race-m.png" />
    <img src="/blog/mal4-race.png" alt="Sequence diagram. Confirm A locks the slot row. Confirm B tries to lock it and waits. A books the slot and commits. B is granted the lock, re-reads the slot, finds it taken and is rejected with nothing written." />
  </picture>
  <figcaption>Two confirms on one slot. The lock makes them take turns.</figcaption>
</figure>

Behind the lock sits a backstop, in case a bug ever skips it:

```sql
-- at most one confirmed appointment per slot, enforced by Postgres itself
CREATE UNIQUE INDEX one_confirmation
  ON booking.appointments (slot_id)
  WHERE status = 'confirmed';
```

It's a *partial* index so a cancelled appointment doesn't block the slot from being booked again. A row lock and one index ended up doing the job I'd assumed needed Redis.

## The walkthroughs are where it got real

Every team had to walk through three things: the core journey, a failure, and a requirement change. These were the best part of the format, because you can't bluff them.

**The failure.** A patient taps Request, the server commits, and the phone loses signal before the response arrives. The app thinks it failed and retries. So the phone creates an idempotency key for each action, the server stores its answer against that key, and a retry gets the original answer instead of creating a second request. The same key with different content gets rejected, so a replay isn't a blind cache.

**The requirement change.** What if clinics want to hold a slot while a patient fills in a form? That directly challenges our rule that nothing holds a slot until it's confirmed. Because the decisions were written down, we could say exactly what moved: one new record narrowing that rule, two nullable columns on the slot, one extra check in the confirm path. The unique index and the lock order don't change at all.

Pointing at the exact records a change touches, and the ones it doesn't, is a very different experience from going quiet and thinking about your codebase.

## We built a prototype too

Code was optional, but a prototype earned extra credit, so we built one: a React Native and Expo app for patients, hospitals and doctors, an Express and TypeScript API, PostgreSQL, and the Measure SDK. After the event we checked it against the documents. We fired 2, 50 and then 200 simultaneous confirms at one slot, and each time exactly one was confirmed.

We also wrote down everything else that check found, because the rules told us not to claim guarantees we hadn't verified, and it would be strange to stop caring once we'd won. Of the 19 decisions, 8 are implemented, 4 partly, 1 differs and 6 aren't built. Sign-in is still role buttons, the phone doesn't retry on its own yet, and notifications are written to the outbox but never delivered.

It also found a real bug: a doctor can complete a visit that's still in the future, which reopens its slot, and then a second patient can be confirmed on it. Our own invariant query is what caught it. That's all in the [as-built record](https://github.com/KartikJain14/mal-hackathon/blob/main/docs/architecture/as-built.md), and I trust the project more because that page exists.

## Where AI fit in

The theme was architects in the AI era, and we used AI throughout. The production design started as an AI draft from our answers to scoping questions, and it helped with the other documents and the prototype too. The rules allowed all of it, with one condition: your team has to understand and defend everything you submit.

I think that condition is why this format makes sense now. Generating a long architecture document costs almost nothing today. Standing in front of experienced engineers and explaining why you *didn't* use Kafka still takes knowing the answer. The microservices version came easily. Throwing most of it away was the actual work.

## Why I'd pick this over a normal hackathon

I still like building things overnight, and I've judged and mentored at those hackathons too. But this one was better in ways I keep thinking about:

- **What you learn carries over.** Trade-offs, failure modes and source of truth apply to everything I build next. A rushed demo mostly teaches you how to rush a demo.
- **Failure is part of the assignment.** At most hackathons it's what you pray doesn't happen on stage.
- **You can't hide behind a demo.** Every teammate had to be able to defend the design, and "it works on my laptop" doesn't answer a question about lost responses.
- **What you make lasts.** The demo from a normal hackathon dies that night. Our [documents](https://github.com/KartikJain14/mal-hackathon/tree/main/docs) are still useful, and I'd use the same format on my next backend.
- **You get to sleep.** It ran 10 to 6, which turned out to be enough.

None of this happens without Manan and Naitik. Everything we submitted is [on GitHub](https://github.com/KartikJain14/mal-hackathon), there's a shorter summary on the [project page](/projects/mal-hackathon/), and I also [posted about the day on LinkedIn](https://lnkd.in/p/duK-fA2m).
