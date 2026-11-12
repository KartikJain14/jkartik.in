---
title: "Building a QR check-in system: PostgreSQL race conditions and role-based access"
description: "How I built Social Conclave's QR check-in system for 500+ delegates, with editable role permissions, manual scanning fallback and PostgreSQL duplicate prevention."
seoDescription: "Build reliable QR check-ins with PostgreSQL unique constraints, role-based permissions and manual fallback: lessons from Social Conclave's conc-qr."
date: 2026-08-03
updated: 2026-11-13
tag: "Backend"
cover: "/blog/conc-qr-cover.jpg"
---

**A reliable QR check-in system must authorize the scanner, validate the checkpoint, and prevent duplicate admission atomically.** Checking whether a badge has already been used and then inserting a record is unsafe under concurrent requests. In conc-qr, a PostgreSQL unique constraint enforces one scan per participant, checkpoint and day.

I built [conc-qr](/projects/conc-qr/) solo in under two weeks for Social Conclave, supporting check-ins for 500+ delegates. It combines an Express/TypeScript API, PostgreSQL, and a Next.js scanner that staff use on their phones. The [source is public](https://github.com/Social-Conclave/conc-qr). The difficult parts were changing permissions during the event and making two near-simultaneous scans produce one admission.

<figure>
  <img src="/blog/conc-qr-login.jpg" alt="conc-qr login screen on a phone - email and access code fields under a Conclave logo" />
  <figcaption>Role based login, pick a day and checkpoint.</figcaption>
</figure>

Before implementation, I wrote down who would scan each badge and which actions each role could perform. That short specification separated three concerns: identifying the participant, authorizing staff at a checkpoint, and recording whether access had already been used.

## How do editable role permissions work at each checkpoint?

The interesting design problem wasn't the QR code, it was the permissions behind it. Four roles exist: `HOSPI`, `RND`, `MGMT`, `SECURITY` and none of them are hardcoded to a specific checkpoint. Instead there's an access matrix, a plain JSON blob stored in Postgres, shaped roughly like:

```json
{
  "day1": { "FOOD": ["HOSPI"], "DELEGATE_KIT": ["HOSPI", "MGMT"] },
  "day2": { "LUNCH": ["HOSPI"], "HIGH_TEA": ["HOSPI", "RND"] }
}
```

An admin can change the matrix during the event without deploying code: reassign a role or add a checkpoint for another day. The scan endpoint checks the caller's JWT role against `matrix[day][accessType]`, using a five-minute in-memory cache to reduce database reads. That cache also means a permission change may take up to five minutes to appear in a process still using its cached matrix. Editable policy and immediate revocation are separate requirements.

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

## How do PostgreSQL unique constraints prevent duplicate QR scans?

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

The useful result was a workflow staff could operate: phone scanning for the normal case, manual entry for damaged badges, and configurable roles when logistics changed. Duplicate prevention belongs in the database because the rule must hold even when requests overlap.

The same distinction appears in our [clinic-booking architecture](/blog/mal4-hackathon-where-code-was-optional/): a UI can guide users, but a database constraint must enforce exclusive use. For the full scope and stack, see the [conc-qr project](/projects/conc-qr/).
