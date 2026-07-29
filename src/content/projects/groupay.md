---
title: "GrouPay"
description: "Multi-tenant billing for societies and communities — invoices, payment tracking, and an audit trail, with clean role isolation top to bottom."
tag: "SaaS"
cover: "/projects/groupay.png"
stack: ["TypeScript", "Next.js", "Express", "Drizzle", "PostgreSQL"]
role: "Solo — full-stack"
year: 2025
status: "Personal project"
source: "https://github.com/KartikJain14/groupay"
order: 6
---

Every housing society runs its maintenance billing on a WhatsApp group and a spreadsheet someone's cousin owns. GrouPay is the boring-but-correct version: multi-tenant billing where a super-admin runs the platform, each society runs itself, and every rupee has a paper trail.

## What it does

- **Three tiers of tenancy** — a super-admin manages *channels* (societies/buildings) and their admins; each channel-admin manages their own residents. Nobody sees across the boundary.
- **Invoices & payments** — issue invoices, track who's paid and who's pending, and expose a public invoice-view link residents can open without an account.
- **Audit everything** — every state change lands in an activity log, so "who marked this paid?" always has an answer.
- **Auth that suits money** — OTP plus password sign-in, with role-scoped routes across the whole API surface.

## Under the hood

The domain model is enforced in the schema, not just the UI — payment and invoice states are typed enums, and the row-level tenancy checks sit in middleware so a mis-scoped query can't leak another society's ledger. It's ~15k lines across a pnpm monorepo, with the schema tracked through eight migrations as the model tightened.

## What I'd do differently

Online settlement is scaffolded but deliberately parked behind manual confirmation for now — flipping on the Razorpay path with proper webhook reconciliation is the step that turns it from a ledger into a payment product.

> The hard part of billing software was never the invoice. It was making sure two societies sharing one deployment can never, ever see each other's books.
