---
title: "meven"
description: "In development: a portal to replace MPSTME's paper chain of approvals for event rooms and entry permissions with one tracked application and a full audit trail."
seoDescription: "In development: a portal replacing MPSTME's paper chain of approvals for event rooms and entry permissions with one tracked application and an audit trail."
tag: "Backend"
cover: "/projects/meven.png"
stack: ["TypeScript", "Next.js", "Express 5", "PostgreSQL", "Redis", "Cloudflare R2", "Docker"]
role: "Solo"
year: 2026
status: "In development"
order: 14
---

<div class="admonition info">

**In development.** meven isn't in use yet. This page describes what I'm building and how, not a shipped system.

</div>

Every student committee at MPSTME that wants a classroom, a refuge area, a canopy, or entry for a guest or outside participants goes through the same approval chain: faculty mentor, then an institutional approver, then the administrative office for allotment, and sometimes the Joint Registrar. Today that chain runs on paper. meven (the MPSTME Event & Facility Requisition Portal) is my attempt to move it online without changing the chain itself.

## What it does

- **One application, many requests.** A committee files a single application that can carry any mix of categories (rooms, refuge, canopy, guest entry, participant entry) under one reference number. Each category is decided separately at the allotment stage, so a "yes" on rooms doesn't wait on a "no" on a canopy.
- **The existing chain, unchanged.** The portal routes each application through the same approvers in the same order. It replaces the paper, not the people.
- **An official result.** An approved application ends in a numbered permission document, with a full audit trail of who decided what and when.

## How it's built

A pnpm monorepo in TypeScript: a Next.js portal, an Express 5 API, and a separate background worker for email and other slow work. PostgreSQL is the single source of truth; Redis only holds queue and rate-limit state, so losing it loses nothing that matters. Attachments go to Cloudflare R2, all authorization is server-side role-based access, and it deploys with Docker on Coolify.

> An approval workflow is mostly an audit log with a form on top. If the log is right, the rest is UI.
