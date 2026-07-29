---
title: "Certificate portal"
description: "A tool that batch-generates and emails event certificates from a CSV upload — no more hand-making a few hundred PDFs after every fest."
tag: "Tooling"
cover: "/projects/certificate-portal.png"
stack: ["Node.js", "PostgreSQL", "PDF", "CSV"]
role: "Contributor"
year: 2024
status: "Shipped"
order: 14
---

After an event, someone has to make a few hundred certificates and email them all out — a slow, error-prone afternoon done by hand. This portal turns it into a single CSV upload. It was a team build; I contributed to the generation-and-delivery side.

## What it does

- **Batch generation** — upload a CSV of recipients and get personalised certificates rendered from a template, all in one pass.
- **Automated delivery** — each certificate is emailed straight to its recipient, so there's no manual send step.

## Why it existed

Certificate day is a recurring chore across every fest and workshop on campus, and it's exactly the kind of repetitive work worth writing once and reusing. The value wasn't novelty — it was turning a predictable few-hundred-item slog into a job you kick off and walk away from.

> Not the flashiest tool I've worked on, but every event that used it got an afternoon back.
