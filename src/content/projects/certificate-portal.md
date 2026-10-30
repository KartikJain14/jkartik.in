---
title: "Certificate portal"
description: "A tool that batch-generates and emails event certificates from a CSV upload — no more hand-making a few hundred PDFs after every fest."
tag: "Tooling"
cover: "/projects/certificate-portal.png"
stack: ["TypeScript", "Next.js", "Elysia", "PostgreSQL", "Drizzle", "Redis", "MJML", "Docker"]
role: "Contributor"
year: "2025–2026"
status: "Shipped"
order: 22
---

After an event, someone has to make a few hundred certificates and email them all out — a slow, error-prone afternoon done by hand. This portal turns it into a single CSV upload. It was a team build; I contributed the Docker and Coolify deployment, the email sending, and fixes.

## What it does

- **Batch generation** — upload a CSV of recipients and get personalised certificates rendered from a template, all in one pass.
- **Automated delivery** — each certificate is emailed straight to its recipient, so there's no manual send step.

## Why it existed

Certificate day is a recurring chore across every fest and workshop on campus, and it's exactly the kind of repetitive work worth writing once and reusing. The value wasn't novelty — it was turning a predictable few-hundred-item slog into a job you kick off and walk away from.

> Not the flashiest tool I've worked on, but every event that used it got an afternoon back.
