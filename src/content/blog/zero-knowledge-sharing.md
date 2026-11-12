---
title: "End-to-end encrypted file sharing: GhostShare's browser encryption design"
description: "How I designed GhostShare's encrypted notes and file sharing with browser-side Argon2id, AES-256-GCM, direct uploads to Cloudflare R2 and explicit trust limits."
seoDescription: "How GhostShare encrypts files in the browser with Argon2id and AES-256-GCM before uploading to Cloudflare R2, and where the trust boundaries remain."
date: 2026-07-18
updated: 2026-11-13
tag: "Applied crypto"
cover: "/projects/ghostshare.png"
---

**End-to-end encrypted file sharing encrypts content on the sender's device and decrypts it on the recipient's device, keeping the content key away from the storage server.** In [GhostShare](/projects/ghostshare/), I implemented this in the browser: Argon2id derives a room key, AES-256-GCM encrypts notes and file chunks, and Cloudflare R2 stores the encrypted uploads.

The goal is specific: a database or object-storage leak should not reveal the shared content without the room secret. The design still trusts the client code delivered to the browser, exposes metadata, and grants access to anyone with the room link. Those boundaries matter as much as the encryption algorithm.

## What does GhostShare's encryption protect against?

The threat model covers an observer who can read stored ciphertext and server-side activity without obtaining the room secret. This includes a database leak, exposed objects, or an operator inspecting stored content. It does not cover an attacker who can change the JavaScript the browser executes; that attacker could steal the secret before encryption.

That single assumption dictates everything else. If the server is hostile, the key can never reach it — which means the key has to live and die in the browser.

<figure>
  <img src="/blog/diag-ghostshare.png" alt="Flow diagram: plaintext is encrypted in the browser with an Argon2id-derived key before anything crosses to the server, which only ever stores ciphertext and a room id." />
  <figcaption>The whole design in one line: encryption happens <em>before</em> the wire. Everything left of the dashed boundary is your browser; everything right of it only ever holds ciphertext.</figcaption>
</figure>

## How does a URL fragment keep the room secret out of HTTP requests?

A room is identified by a secret that lives in the URL fragment — the part after `#`, which browsers famously *don't* send to the server. From that secret, the client derives an AES-256 key with **Argon2id**, a memory-hard KDF, so even if a room secret is weak, brute-forcing it is expensive.

```ts
// the room secret lives in the URL fragment (#…) — which browsers never send to the server
const roomSecret = location.hash.slice(1);
// derive the AES key from it, in-browser, with Argon2id (memory-hard, params tuned for the browser)
const key = await argon2id({ password: roomSecret, salt });   // salt is per-room and isn't secret
```

Why Argon2id and not just `PBKDF2` or a raw hash? Because the room secret is the only thing standing between an attacker with the ciphertext and the plaintext. A memory-hard function makes an offline guessing attack cost real RAM per attempt, not just CPU.

## How are files encrypted before upload to Cloudflare R2?

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

## How does realtime synchronization work with encrypted content?

Collaboration is over Socket.IO with a Redis adapter so it scales past one node. But the realtime layer inherits the same rule: it moves **ciphertext**. A server relaying encrypted blobs between room members learns the shape of activity — who's connected, how often — but never content. That's an acceptable leak for this threat model; hiding metadata too is a much harder problem (and a different product).

Rooms are ephemeral by construction: every room carries a TTL, and an hourly job reaps whatever's expired. "Delete" isn't a favor the server does you later — it's the default state everything decays into.

## What are the limits of browser-based end-to-end encryption?

Zero-knowledge is a strong claim, so here's what it does *not* buy you:

- **Metadata is visible.** Connection timing, blob sizes, room lifetimes — the server sees all of it. Content is safe; patterns aren't.
- **The client is trusted.** If the page you're served is malicious, it's game over — the key is in that page. This is the fundamental limit of in-browser E2E: you're trusting the code delivery, so subresource integrity and a tight origin matter.
- **One key per room, for now.** Rotating keys on membership change (re-wrapping chunk keys) is the next step; today, a leaked link is a leaked room.

The defensible claim is that the storage and relay services do not receive plaintext content or the room key during the intended client flow. This is an architecture description, not a claim of an independent security audit. Encryption also cannot force a recipient to forget content or prove that every server-side copy was deleted after expiry.

---

See the [GhostShare project overview](/projects/ghostshare/) for the stack and application features. For another example of keeping policy enforceable on the server, read how I handled [booking rules in a college administration system](/blog/when-a-form-becomes-infrastructure/). Both projects start with the same question: which component actually enforces the promise?
