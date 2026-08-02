---
title: "Building conc-qr, Social Conclave's check-in system"
description: "The system behind Social Conclave's badge scanning with role-based access, a live-editable permission matrix, and a race condition I fixed by accident while chasing latency."
date: 2026-08-03
tag: "Backend"
cover: "/blog/conc-qr-cover.jpg"
---

Last year, [Social Conclave](https://socialconclave.in) handed every attendee (12–16 year old kids) a QR code, and someone had to build the thing that decides whether a scan means yes or no, at the door, at food, at high tea. This year that someone was me. Solo, less than two weeks, mostly after everyone else had gone to sleep. The result is [conc-qr](/projects/conc-qr/): an Express/TypeScript API, a Postgres database, and a Next.js scanning app staff run off their own phones ([source](https://github.com/Social-Conclave/conc-qr)).

<figure>
  <img src="/blog/conc-qr-login.jpg" alt="conc-qr login screen on a phone - email and access code fields under a Conclave logo" />
  <figcaption>Role based login, pick a day and checkpoint.</figcaption>
</figure>

Since I had no one to bounce ideas off, I did something I don't normally bother with: before writing a line of code, I first wrote out, in full sentences, who'd be using it and how. People call that a prompt now; I call it a spec doc, and given how short the runway was, it was the only planning I had time for.

## the part that isn't obvious: who's allowed to scan what

The interesting design problem wasn't the QR code, it was the permissions behind it. Four roles exist: `HOSPI`, `RND`, `MGMT`, `SECURITY` and none of them are hardcoded to a specific checkpoint. Instead there's an access matrix, a plain JSON blob stored in Postgres, shaped roughly like:

```json
{
  "day1": { "FOOD": ["HOSPI"], "DELEGATE_KIT": ["HOSPI", "MGMT"] },
  "day2": { "LUNCH": ["HOSPI"], "HIGH_TEA": ["HOSPI", "RND"] }
}
```

An admin can edit this mid-event without a deploy reassign who scans what, add a checkpoint on day two that didn't exist on day one. The scan endpoint checks the caller's JWT role against `matrix[day][accessType]` on every request, with a five-minute in-memory cache so I'm not hitting Postgres on every single tap. It's a small decision, but it's the one that actually mattered: fest logistics change faster than I can push code, so the permission model had to be data, not `if` statements.

<figure>
  <img src="/blog/conc-qr-scanning.jpg" alt="Scan screen showing a phone camera pointed at a QR code badge" />
  <figcaption>Point, scan, done. Speed matters here so attendees don't end up queuing at every checkpoint.</figcaption>
</figure>

It didn't always work first try. Dim halls, a few damaged stickers, staff trying to keep a line moving, an edge case I'd planned for from the start. That's why there's a manual-entry fallback, typed in by hand for the cases the camera couldn't handle:

<figure>
  <img src="/blog/conc-qr-manual.jpg" alt="Manual verification input for typing a participant ID by hand" />
  <figcaption>Without this, a single bad sticker turns into a stalled line.</figcaption>
</figure>

Scan works, get a green card:

<figure>
  <img src="/blog/conc-qr-success.jpg" alt="Access granted screen showing a participant name after a successful scan" />
  <figcaption>A real scan against a real badge, not a mockup.</figcaption>
</figure>

## the bug I didn't notice writing

The actual hard part underneath all of this is "has this badge already been used today." My first pass did the obvious thing: look it up, and if it's not there, create it. I wrote it without thinking twice, it was maybe the tenth small decision that hour, and I was more focused on the next screen than this one.

```ts
const existing = await Scan.findOne({ where: { participant_id, access_type, day } });
if (existing) throw new Error('DUPLICATE_SCAN');
await Scan.create({ participant_id, access_type, day, scanned_by: userId });
```

That's also a textbook race condition. Two scans close enough together can both see "not used yet" before either finishes writing. At a real check-in desk, that's two plates of food off one wristband, and a row of inconsistent data for me to explain later.

I didn't catch this by reviewing my own code. I found it a few nights later while trying to shave a database round-trip off the scan path, worried about lag with an actual line forming. The fix for "faster" turned out to be the fix for "correct," too, drop the lookup, just attempt the insert, and let a unique constraint on `(participant_id, access_type, day)` be the thing that says no:

```ts
try {
  return await Scan.create({ participant_id, access_type, day, scanned_by: userId });
} catch (err) {
  if (err instanceof SequelizeUniqueConstraintError) throw new Error('DUPLICATE_SCAN');
  throw err;
}
```

<figure>
  <img src="/blog/conc-qr-duplicate.jpg" alt="Amber 'Repeat Entry' screen after scanning the same badge twice" />
  <figcaption>Same badge, scanned twice. The constraint doing its job, not a crash.</figcaption>
</figure>

I'll take that fix. I just wish I could say I went looking for it on purpose, it arrived disguised as a performance tweak, and I only noticed afterward that it had also closed the gap I'd walked past the first time.

---

It held. Nobody got fed twice, nobody got turned away. The permission matrix meant the one last-minute request I got like "can HOSPI also scan high tea on day two" and it was a two-minute admin-panel change, not a redeploy. And the correctness bug that could've actually hurt someone's night got fixed almost by accident, while I was busy worrying about something else entirely.
