---
title: "bad-db"
description: "A storage engine written from scratch in Java — on-disk format, a hand-rolled B-Tree index, compaction, and its own query language."
tag: "Systems"
cover: "/projects/bad-db.png"
stack: ["Java", "B-Tree", "RandomAccessFile"]
role: "Solo"
year: 2026
status: "Personal project"
source: "https://github.com/KartikJain14/bad-db"
order: 4
---

I wanted to actually understand what happens between `INSERT` and the disk, so I stopped reading about databases and wrote one. bad-db is a real storage engine — its own binary file format, a B-Tree index I implemented node-split and all, compaction, and a small query language with a parser and a REPL on top.

## What it does

- **A real on-disk format** — records live in a binary file addressed by offset through `RandomAccessFile`, not a serialized blob it reloads whole.
- **A hand-written B-Tree** — the primary-key index is a from-scratch B-Tree (proper `insertNonFull` and node splitting) mapping keys to file offsets, so lookups don't scan.
- **Durable CRUD** — updates and deletes use tombstone markers; compaction later reclaims the dead space, and the index rebuilds itself on reopen.
- **BQL** — a small query language with its own tokenizer and parser, driven from an interactive REPL.

## The part I'm proud of

The B-Tree is where the learning was. Getting `insertNonFull` and the split-child logic right — keeping the tree balanced as keys arrive in any order — is the difference between "a file with data in it" and "a database."

I wrote about the on-disk format, the B-Tree split logic, and compaction in [A B-Tree on disk: writing a storage engine from scratch](/blog/btree-storage-engine/).

## What I'd do differently

It's single-threaded and has no write-ahead log, so a crash mid-write can tear a page. A WAL and a proper recovery pass are what separate a teaching engine from one you'd trust — that's the next rabbit hole.

> Named honestly. It's not fast and it's not safe yet — but every layer, from the byte offsets to the query parser, is one I now understand because I had to build it.
