---
title: "Railway Concession"
description: "Official railway concession workflow for MPSTME — student submissions, slot booking, admin operations, and collection reporting."
tag: "Backend"
cover: "/projects/railway-concession.png"
live: "https://concession.mpst.me"
stack: ["Next.js", "PostgreSQL", "Drizzle ORM", "Nodemailer"]
role: "Lead Developer"
year: 2026
status: "In active use"
order: 2.5
---

The MPSTME Railway Concession system is an official student-facing service built with [NeuroTechh](https://neurotechh.mpst.me). I now maintain it solo, working with the administration team to keep the process reliable as its real-world requirements change.

## What it does

- **Student submissions** — validated personal, academic, railway, and collection details with a clear confirmation flow.
- **Booking windows** — configurable lead time, holidays, blocked weekdays, collection dates, and per-slot capacity.
- **Admin operations** — date and SAP ID search, student profiles, submission history, collection tracking, Excel export, and blocked SAP IDs.
- **Operational email** — confirmation emails for students and daily reports for administrators, including out-of-schedule collections.

## The part that matters

The system has to handle the process as it actually happens: missed slots, late collections, changed rules, and students who need help after the happy path has ended. The server remains authoritative for booking and validation, while the admin tools make exceptions visible instead of silently rewriting history.

I wrote about the engineering and responsibility behind maintaining an official system in [When a form becomes infrastructure](/blog/when-a-form-becomes-infrastructure/).

> The form is what students see. The real product is the process and support behind it.
