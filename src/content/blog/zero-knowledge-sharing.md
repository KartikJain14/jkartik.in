---
title: "The server can't read this: designing zero-knowledge sharing"
description: "How GhostShare shares notes and files in real time while making the server mathematically unable to read them — in-browser key derivation, AES-GCM, and direct-to-R2 encrypted uploads."
date: 2026-07-18
tag: "Applied crypto"
cover: "/projects/ghostshare.png"
---

Almost every "private" sharing tool has the same asterisk: the server *could* read your data, it just promises not to. That's a policy, not a guarantee — one breach, one subpoena, one rogue admin, and the promise is gone. [GhostShare](/projects/ghostshare/) is built to remove the asterisk. The server never sees plaintext, so "please don't read this" is replaced by "the server can't."

This post is how that actually works, and where the sharp edges are.

## Start from the threat model, not the feature

The design question isn't "how do I add encryption." It's "who am I defending against, and what do they get to see." For GhostShare the answer is deliberately aggressive: **assume the server is hostile.** Assume the database leaks, the object storage is public, and the operator is reading logs. If the design survives all of that, it survives the boring cases too.

That single assumption dictates everything else. If the server is hostile, the key can never reach it — which means the key has to live and die in the browser.

<figure>
  <img src="/blog/diag-ghostshare.png" alt="Flow diagram: plaintext is encrypted in the browser with an Argon2id-derived key before anything crosses to the server, which only ever stores ciphertext and a room id." />
  <figcaption>The whole design in one line: encryption happens <em>before</em> the wire. Everything left of the dashed boundary is your browser; everything right of it only ever holds ciphertext.</figcaption>
</figure>

## The key is derived, never transmitted

A room is identified by a secret that lives in the URL fragment — the part after `#`, which browsers famously *don't* send to the server. From that secret, the client derives an AES-256 key with **Argon2id**, a memory-hard KDF, so even if a room secret is weak, brute-forcing it is expensive.

```ts
// the room secret lives in the URL fragment (#…) — which browsers never send to the server
const roomSecret = location.hash.slice(1);
// derive the AES key from it, in-browser, with Argon2id (memory-hard, params tuned for the browser)
const key = await argon2id({ password: roomSecret, salt });   // salt is per-room and isn't secret
```

Why Argon2id and not just `PBKDF2` or a raw hash? Because the room secret is the only thing standing between an attacker with the ciphertext and the plaintext. A memory-hard function makes an offline guessing attack cost real RAM per attempt, not just CPU.

## Encrypt in the page, upload the ciphertext

Once the key exists, every write is encrypted with AES-256-GCM before it leaves the tab. GCM matters here specifically because it's **authenticated** — it doesn't just hide the content, it detects tampering, so a hostile server can't flip bits in your ciphertext and have you decrypt garbage that looks valid.

```ts
const iv = crypto.getRandomValues(new Uint8Array(12));   // fresh per message
const ciphertext = await crypto.subtle.encrypt(
  { name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext),
);
// what the server receives — an opaque blob and an IV, nothing it can read
await POST(`/rooms/${roomId}`, { iv, blob: ciphertext });
```

Files take the same idea and stream it. Instead of sending a file through the app server, the client chunks it (~5 MiB), encrypts each chunk, and uploads directly to Cloudflare R2 with parallel PUTs, retries, and resume. The app server hands out short-lived signed upload URLs and otherwise never touches the bytes — which keeps big transfers off the origin *and* keeps them encrypted end to end.

<div class="admonition info">

**Don't roll your own crypto — compose vetted primitives.** Nothing here invents an algorithm. It's Argon2id + AES-GCM from the platform's Web Crypto and a reviewed WASM build, wired together carefully. The engineering is in the *protocol* — where keys live, what crosses the wire — not in the math.

</div>

## Realtime without giving anything away

Collaboration is over Socket.IO with a Redis adapter so it scales past one node. But the realtime layer inherits the same rule: it moves **ciphertext**. A server relaying encrypted blobs between room members learns the shape of activity — who's connected, how often — but never content. That's an acceptable leak for this threat model; hiding metadata too is a much harder problem (and a different product).

Rooms are ephemeral by construction: every room carries a TTL, and an hourly job reaps whatever's expired. "Delete" isn't a favor the server does you later — it's the default state everything decays into.

## Where it's honest about limits

Zero-knowledge is a strong claim, so here's what it does *not* buy you:

- **Metadata is visible.** Connection timing, blob sizes, room lifetimes — the server sees all of it. Content is safe; patterns aren't.
- **The client is trusted.** If the page you're served is malicious, it's game over — the key is in that page. This is the fundamental limit of in-browser E2E: you're trusting the code delivery, so subresource integrity and a tight origin matter.
- **One key per room, for now.** Rotating keys on membership change (re-wrapping chunk keys) is the next step; today, a leaked link is a leaked room.

Naming the limits is the point. "The server can't read this" is a precise, defensible claim — not a vibe — and the value is in knowing exactly how far it reaches.

---

The code lives in [the GhostShare project](/projects/ghostshare/). The one-sentence takeaway: if you want a system nobody has to trust, don't build trust in — build it *out*, and let the architecture make the promise for you.
