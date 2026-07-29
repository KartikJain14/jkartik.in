---
title: "captr"
description: "Point it at a topic and it builds you a research doc — searching, transcribing, and frame-grabbing video into something you can read and then chat with."
tag: "AI"
cover: "/projects/captr.png"
stack: ["Python", "FastAPI", "Gemini", "yt-dlp", "FFmpeg", "MongoDB", "Next.js"]
role: "Solo — full-stack"
year: 2025
status: "Personal project"
order: 9
---

Research from video is a slog — you scrub through hours to find the ninety seconds that mattered. captr does the scrubbing. Give it a topic and it goes out, watches the videos for you, and hands back a written, illustrated research document you can then interrogate like a chat.

## What it does

- **Topic in, queries out** — Gemini turns your topic into a set of YouTube search queries worth pulling.
- **Watches so you don't** — it downloads and transcribes the results (yt-dlp + transcript APIs), then uses the transcript to find the moments that matter.
- **Grabs the visuals** — FFmpeg extracts key frames at those highlight timestamps, so diagrams and demos make it into the doc, not just words.
- **Assembles and answers** — everything is stitched into a Markdown research doc backed by the source material, which you can then chat with for follow-ups.

## The pipeline

The interesting engineering is orchestration — a multi-stage pipeline where each step (search → transcribe → locate highlights → extract frames → synthesize) feeds the next, with the LLM used for judgment at the ends and plain tooling doing the heavy lifting in the middle.

Behind it sits a normal, real app: JWT + bcrypt auth, transactional email via Resend, and MongoDB persistence with search — with global exception handling and a consistent response envelope so the frontend never has to guess.

## What I'd do differently

Frame selection is timestamp-driven; a lightweight visual-dedup pass would stop near-identical slides from all making the cut and keep the docs tighter.

> The goal was to turn "watch these ten videos" into "read this one page" — and keep the receipts so you can always jump back to the source.
