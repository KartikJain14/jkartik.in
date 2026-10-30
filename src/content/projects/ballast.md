---
title: "ballast"
description: "A hackathon build: a treasury engine that decides, every hour, how much of a digital bank's cash to keep liquid and how much to put to work, and explains every move."
tag: "Fintech"
cover: "/projects/ballast.png"
source: "https://github.com/KartikJain14/ballast"
stack: ["Python", "FastAPI", "Streamlit", "pandas", "pytest", "Gemini"]
role: "Solo"
year: 2026
status: "Hackathon build"
order: 15
---

The hackathon brief: a digital bank moves about **$20M an hour** in deposits and withdrawals. Cash kept instantly available earns nothing; cash swept into yield-bearing tiers earns interest but can't pay a customer at 2 a.m. ballast is my answer, a "reserve juggler" that decides every hour how much to keep liquid and how much to sweep, and funds every payout through a priced fallback plan instead of pretending one buffer can cover everything. I built it over the hackathon and pitched it to the judges.

## What it does

- **Hourly sizing from the data's own risk.** The liquid buffer is sized from the realized risk in the history it has seen so far, separately for different times of the week. The data showed Friday and Saturday nights draining far more cash than any other night, so one pooled buffer would either waste money five nights a week or fall short on the two that matter.
- **A cost-ordered funding waterfall.** When the buffer isn't enough, payouts are funded from the cheapest source first, with overdraft treated as a hard last resort rather than just another cost to optimise.
- **Replays and stress tests.** It replays a full year against four other policies (never sweep, a grid-searched static buffer, a classic cash-management model and a perfect-foresight oracle as the upper bound) and stress-tests the book against scenarios including an SVB-style bank run.
- **An explanation for every move.** A web app shows each decision and its cost, with a Streamlit console for the raw detail. Gemini can write an executive summary of the computed numbers, and it falls back to a fixed template without an API key.

## Keeping it honest

A treasury simulation is easy to fool yourself with, so the test suite (**52 tests**) checks the things that would quietly make the results a lie: that no decision ever sees data from the future, that the double-entry ledger reconciles every hour, and that the oracle really is optimal. Every number in the README is produced by running the code.

The result is a real but modest improvement over the best-tuned static buffer in calm conditions, and the repository says exactly that instead of rounding it up.

> The most useful line in the README is the one that says the margin is small, and why.
