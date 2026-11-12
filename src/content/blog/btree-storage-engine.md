---
title: "Building a database storage engine in Java: B-Trees, tombstones and compaction"
description: "How I built bad-db, a Java storage engine with a binary record format, an in-memory B-Tree index, tombstone deletes and compaction, and what it lacks for durability."
seoDescription: "Build a Java storage engine: binary records, an in-memory B-Tree index, tombstone deletes and compaction, with clear limits around crash recovery."
date: 2026-04-16
updated: 2026-11-13
tag: "Systems"
cover: "/projects/bad-db.png"
---

**A database storage engine turns keys into persistent records by defining a file format, locating records through an index, and reclaiming space after deletion.** In [bad-db](/projects/bad-db/), I implemented those pieces in Java using `RandomAccessFile`, an in-memory B-Tree mapping primary keys to byte offsets, tombstones, and compaction.

I built it to understand what happens after an `INSERT`, rather than to replace PostgreSQL. The records live on disk; the index is rebuilt when the file opens. The engine also has a small query language, BQL, and a REPL. This walkthrough follows the read, insert and delete paths, then explains why the absence of a write-ahead log makes this a learning project.

## How are database records stored in a file?

The first realization: a database file is just bytes, and *you* impose the meaning. bad-db stores records in a single file addressed by **byte offset** through Java's `RandomAccessFile`. Writing a record means serializing it, appending it, and remembering where it went. Reading it means seeking to that offset. No magic — just an agreement about layout that both the writer and reader honor.

```java
// bad-db's actual read path: look the key up, get an offset, seek, read (Table.java)
public Record searchByPrimaryKey(int key) throws IOException {
    Long offset = index.search(key);
    return offset == null ? null : fileManager.readRecord(offset, schema);
}
```

The moment you have "records live at offsets," the real question appears: given a primary key, how do you find its offset *without reading the whole file?*

## Why use a B-Tree index for primary-key lookups?

The lazy answer is a scan — read everything, check each key. That's O(n) per lookup and dies the instant the file is big. The next lazy answer is a hash map from key to offset. Fast for point lookups, but it can't do ranges (`id between 40 and 60`) and it has to fit in memory or spill awkwardly.

A **B-Tree** maintains sorted keys in a balanced structure, supporting logarithmic lookup and ordered traversal. bad-db uses it to map each primary key to a file offset. That describes the index structure; it does not mean bad-db implements a production database's disk-page index or a complete range-query optimizer.

<figure>
  <img src="/blog/diag-bad-db.png" alt="Read path: a BQL query is parsed, the key is looked up in the in-memory B-Tree which yields a file offset, then a single seek reads the record from the page file." />
  <figcaption>The read path. The B-Tree turns a key into a byte offset, so a lookup is one index traversal plus one file read — never a scan.</figcaption>
</figure>

## How does splitting keep a B-Tree balanced?

Insertion is where a B-Tree earns its balance, and where I learned the most. The invariant is that a node holds at most `2t − 1` keys. You never insert into a full node — you **split it first**, pushing its median key up to the parent, so growth happens at the root and the tree stays balanced by construction.

```java
// bad-db's real splitChild — the upper half and the median leave the full node (BTreeNode.java)
public void splitChild(int i, BTreeNode y) {
    BTreeNode z = new BTreeNode(y.t, y.leaf);
    for (int j = 0; j < t - 1; j++) {        // upper t-1 keys (and their offsets) -> new sibling z
        z.keys.add(y.keys.remove(t));
        z.values.add(y.values.remove(t));
    }
    if (!y.leaf) {                            // and their children too, if this isn't a leaf
        for (int j = 0; j < t; j++) z.children.add(y.children.remove(t));
    }
    children.add(i + 1, z);
    keys.add(i, y.keys.remove(t - 1));        // the median key rises into this (parent) node
    values.add(i, y.values.remove(t - 1));
}
```

The mirror of this is `insertNonFull`, which only ever descends into children it has already guaranteed aren't full. Get these two right and the tree is balanced for free — get them subtly wrong and you get a corrupted index that reads fine until, one insert later, it doesn't.

## How do tombstones and compaction handle deleted records?

Deleting a record by actually removing its bytes would mean rewriting everything after it. So bad-db does what real engines do: it writes a **tombstone** — a marker that says "the record at this offset is dead." Reads skip tombstoned records; the space is simply wasted for now.

That trades write cost for space, and the debt comes due eventually. **Compaction** is the collector: it walks the live records, copies them into a fresh file, and drops the tombstoned dead weight — then the index is rebuilt to point at the new offsets.

<div class="admonition warning">

**The index can be rebuilt from the record file.** On reopen, bad-db scans the file and reconstructs its B-Tree. This avoids persisting the index, at the cost of startup work proportional to the file size. It cannot repair damaged record bytes or make an interrupted write safe.

</div>

## Why is this storage engine unsuitable for production data?

I'll say the quiet part: bad-db is single-threaded and has **no write-ahead log**. If it crashes mid-write, a page can tear, and there's no recovery pass to make it whole again. That gap *is* the line between a teaching engine and one you'd trust with data — durability under failure is most of what "a real database" actually means, and it's the next rabbit hole.

But that's exactly why it was worth building. You don't feel the value of a WAL until you've written the engine that doesn't have one and understood precisely what breaks.

---

The full engine, including the BQL parser and REPL, is [the bad-db project](/projects/bad-db/) (source on GitHub). Write one of these once and you'll never read "the database persists your data" the same way again.
