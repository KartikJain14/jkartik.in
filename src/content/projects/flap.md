---
title: "flap"
description: "A Flappy-style arcade game you play over SSH, with collectible wings, second chances and a shared leaderboard. Nothing to install. Try it: ssh flap.jkartik.in"
tag: "Game"
cover: "/projects/flap.png"
live: "ssh://jkartik.in"
source: "https://github.com/KartikJain14/flap"
stack: ["Go", "SSH (x/crypto/ssh)", "Bubble Tea", "SQLite", "systemd"]
role: "Solo"
year: 2026
status: "Live over SSH"
order: 4
---

<div class="play-cta"><p class="play-cta-label">Play it now, from any terminal</p><pre><code>ssh flap.jkartik.in</code></pre><p class="play-cta-note">Works with the SSH client already on macOS, Linux and Windows 10/11; <code>ssh flap.jkartik.in</code> reaches the same game. <kbd>Space</kbd> to flap, <kbd>W</kbd> to spend wings on a revive after a crash, <kbd>L</kbd> for the leaderboard, <kbd>Q</kbd> to quit. Connect with an SSH key and the key becomes your account; without one you play as a guest.</p></div>

flap is a tiny arcade game that lives entirely in your terminal. There's no app, no browser and no account form: if you have `ssh`, you can play. Everyone who connects gets their own game on the same server, and every run lands on one shared leaderboard.

<figure>
  <img src="/projects/flap-welcome.png" alt="flap's welcome screen in a terminal: the FLAP title in pixel art, a blue pixel bird, a leaderboard preview with the player's row highlighted, and flap.jkartik.in in the status bar" />
  <figcaption>The welcome screen. It's all terminal cells: half-block characters give square pixels and twice the vertical resolution.</figcaption>
</figure>

## Wings and second chances

Every 15th pipe has a pair of white angel wings glowing gold in its gap. Touch them to collect a wing; just passing the pipe doesn't count. Pickups sparkle, burst into gold particles and add to your balance immediately.

You start with 3 wings. After a crash, you have 5 seconds to press **W** and spend wings to continue the same flight, or **Space** to save the run and start fresh. Revives cost 1, 2, 4, 8… wings within a run, resetting to 1 for each new flight. A revive brings a gold feather burst, a countdown and 3 seconds of invincibility under a pulsing halo, so you have time to find your rhythm again.

Wings stay with your SSH key between visits; guests keep them for their session.

## How it works

- **The server is the game.** Your terminal only sends key presses. The server runs the simulation at a fixed 60 Hz and streams back only the cells that changed, so scores are computed server-side and there's no client to tamper with.
- **Pixel art from text.** Sky, sun, moon, stars, parallax hills and a tilting bird, drawn with half-block characters. It picks truecolor, 256 or 16 colours from your terminal and has a pure-ASCII mode for old consoles.
- **Fair at any window size.** Physics run in normalised units, so resizing never changes the game. Very wide or tall terminals are letterboxed so nobody gets extra look-ahead.
- **Your SSH key is your login.** The server stores only an HMAC of your public key, never the key itself, so a leaked database can't be matched against public key lists. Scores live in SQLite with idempotent writes, so a run interrupted by a disconnect is still saved exactly once.

<figure>
  <img src="/projects/flap-nightfall.png" alt="flap gameplay at night: a blue pixel bird between green pipes under a moon, with a score of 52" />
  <figcaption>The sky changes as your score climbs, and the game speeds up a little with every point.</figcaption>
</figure>

## The part I cared about

Putting an SSH server on the public internet is the opposite of what a security person normally does, so the game had to be boring to attack. flapd is its own SSH server built on Go's `x/crypto/ssh`, not OpenSSH with a locked-down shell. It accepts exactly one thing, a terminal session that starts the game. Commands, SFTP, port forwarding and agent forwarding are refused, and there's no code path that runs a command at all.

Connection limits, per-IP rate limits and temporary bans are checked before any cryptography, so an abusive client costs a socket and little else. In a load test with the repo's own load generator, a burst of 300 simultaneous connections was almost entirely turned away by those limits, and repeat bursts didn't grow memory or file descriptors. It runs as an unprivileged systemd service with no capabilities and a read-only filesystem apart from its data directory.

> I wanted a small project where the fun part and the security part were the same part. A game anyone on the internet can connect to turned out to be exactly that.
