---
title: "GhostShare"
description: "Encrypted, ephemeral realtime sharing — anonymous rooms, no accounts, and storage the server can't read."
tag: "Applied crypto"
cover: "/projects/ghostshare.png"
live: "https://share.jkartik.in"
stack: ["TypeScript", "Next.js", "Fastify", "Socket.IO", "PostgreSQL", "Redis", "Cloudflare R2"]
role: "Solo — full-stack"
year: 2026
status: "Live"
featured: true
order: 1
---

Most "private" sharing tools still hold your plaintext — they just promise not to look. GhostShare is built so it *can't*. Keys are derived in the browser, the server only ever sees ciphertext, and rooms evaporate on a timer. It's the project where I stopped trusting the server, including my own.

## What it does

- **Anonymous rooms, no accounts** — open a link, share notes and files, done. Nothing ties a room to a person.
- **Zero-knowledge by construction** — the AES-256-GCM key is derived in-browser with Argon2id and never leaves the client. The backend stores only encrypted blobs.
- **Direct-to-R2 encrypted uploads** — files are chunked, encrypted, and streamed straight to object storage in parallel, with retry and resume, so the app server never touches the bytes.
- **Ephemeral** — every room carries a TTL, and an hourly job reaps whatever's expired.
- **Realtime + offline-first** — edits sync over Socket.IO (Redis-backed so it scales horizontally), and queue locally in IndexedDB when you're offline.

## The part that mattered

The whole design falls apart if the key ever hits the wire, so it doesn't. Encryption happens before anything is sent — the server is handed an opaque blob and a room id, and that's all it ever knows.

I wrote up the full threat model and the crypto protocol in [The server can't read this: designing zero-knowledge sharing](/blog/zero-knowledge-sharing/).

## What I'd do differently

Key rotation per room is the next step — right now a room is one key for its whole life. Rotating on membership change (with re-wrapped chunk keys) would make "someone screenshotted the link an hour ago" a non-event.

> The point wasn't to build another pastebin. It was to build one where "trust me" isn't part of the threat model.
