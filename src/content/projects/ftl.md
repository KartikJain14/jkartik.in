---
title: "Fool The LLM"
description: "A prompt-injection contest platform — players jailbreak guarded LLM levels to extract hidden secrets, with a full organizer console behind it."
tag: "Security"
cover: "/projects/ftl.png"
stack: ["TypeScript", "Next.js", "Express", "Prisma", "PostgreSQL", "Gemini"]
role: "Solo — full-stack"
year: 2026
status: "Built for a live event"
order: 5
---

Prompt injection is easier to *feel* than to explain, so I built a game out of it. Fool The LLM is a jailbreak contest: each level is an LLM guarding a secret codeword, and your job is to talk it into leaking. I built the platform that runs the whole thing — the guarded levels, the live chat, and the console the organizers drive it from.

## What it does

- **Escalating guarded levels** — each level wraps a Gemini model in progressively tighter instructions and guardrails; players chat against it trying to extract the hidden codeword.
- **Real-time play** — responses stream token-by-token, so a clever prompt visibly starts to crack before it finishes.
- **An organizer console** — manage levels, participants, and contest state; watch chat logs live; force-unlock or reset when a room gets stuck.
- **Access that fits an event** — JWT with magic-link sign-in and per-player token rate limiting, so one participant can't burn the whole model budget.

## The interesting tension

The app deliberately runs the model with safety filters off — the *game* is the guardrail. All the defense lives in the system prompt and the surrounding logic, which is exactly the surface real prompt-injection targets. Building the attacker's playground taught me more about defending these systems than any blog post did.

I wrote about what actually cracks LLM guardrails — and what it means for defending them — in [Where LLM guardrails break](/blog/where-llm-guardrails-break/).

## Context

Built as my own take on **FoolTheLLM**, an AI-security event run by ACM and GDG at MPSTME — and it plugged straight into my interest in how these models actually fail under adversarial pressure.

> The best way to learn where an LLM's guardrails break is to hand a few hundred people a scoreboard and a reason to break them.
