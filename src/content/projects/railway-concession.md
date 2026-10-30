---
title: "Railway Concession"
description: "MPSTME's official railway concession system, used by ~4,000 students: submissions, slot booking, admin operations and collection reporting. I took it over in 2026 and maintain it."
seoDescription: "MPSTME's railway concession system, used by ~4,000 students: submissions, slot booking, admin tools and reports. I took it over in 2026 and maintain it."
tag: "Backend"
cover: "/projects/railway-concession.png"
live: "https://concession.mpst.me"
stack: ["Next.js", "PostgreSQL", "Drizzle ORM", "Nodemailer"]
role: "Maintainer"
year: "2026–present"
status: "In active use"
order: 3
---

The MPSTME Railway Concession system is the college's official online concession process, used by about **4,000 students**. The original version was built in 2025 by the [NeuroTechh](https://neurotechh.mpst.me) team. I took it over in July 2026 and now maintain it solo, working with the administration team to keep the process reliable as its real-world requirements change.

Since taking it over I've moved it to PostgreSQL, made the booking window server-authoritative and IST-aware, built the admin tools and the automated daily collection report, added student confirmation emails, and patched vulnerable dependencies.

## What it does

- **Student submissions** — validated personal, academic, railway, and collection details with a clear confirmation flow.
- **Booking windows** — configurable lead time, holidays, blocked weekdays, collection dates, and per-slot capacity.
- **Admin operations** — date and SAP ID search, student profiles, submission history, collection tracking, Excel export, and blocked SAP IDs.
- **Operational email** — confirmation emails for students and daily reports for administrators, including out-of-schedule collections.

## The part that matters

The system has to handle the process as it actually happens: missed slots, late collections, changed rules, and students who need help after the happy path has ended. The server remains authoritative for booking and validation, while the admin tools make exceptions visible instead of silently rewriting history.

I wrote about the engineering and responsibility behind maintaining an official system in [When a form becomes infrastructure](/blog/when-a-form-becomes-infrastructure/).

> The form is what students see. The real product is the process and support behind it.
