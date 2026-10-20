---
title: "Finding a bug's siblings: what I measured about AI for variant analysis"
description: "I built VARSEER and a benchmark of 49 real vulnerability families mined from git history to test whether clone matching, code embeddings, or an LLM is the right tool for finding a patched bug's unpatched siblings. The gains were modest, and two results went against what I expected."
date: 2026-10-20
tag: "Research"
cover: "/blog/varseer-cover.png"
---

When a vulnerability gets patched, the fix usually covers the one place someone noticed. The mistaken assumption behind it is often still sitting somewhere else in the code base. Google's year-in-review counted [17 of the 41 in-the-wild 0-days of 2022](https://blog.google/threat-analysis-group/0-days-exploited-wild-2022/) as variants of bugs that had already been reported, and Project Zero [argued](https://projectzero.google/2022/06/2022-0-day-in-wild-exploitationso-far.html) that many could have been prevented with more comprehensive patching and regression tests.

Starting from one confirmed bug and hunting for its siblings is called **variant analysis**. It is one of the most useful things a defender can do, because each finding is a bug an attacker could otherwise have found by reading the same patch.

There has been a lot of excitement about AI doing this. Google's [Big Sleep](https://projectzero.google/2024/10/from-naptime-to-big-sleep.html) agent found an exploitable bug in SQLite after being given a recent fix as a starting point. Sean Heelan [used o3 to find a Linux kernel SMB bug](https://sean.heelan.io/2025/05/22/how-i-used-o3-to-find-cve-2025-37899-a-remote-zeroday-vulnerability-in-the-linux-kernels-smb-implementation/), but also reported that the model found a known bug in only 8 of 100 runs while producing 28 false-positive reports. These are case studies. They do not tell you which technique to trust, how many functions you need to read before you find a variant, or how much an LLM adds over cheaper retrieval.

I wanted numbers for those questions. So I built **VARSEER**, a pipeline for ranking likely variants, and a benchmark to measure it against. I wrote the full study up as a paper. This post is the readable version: what I built, what I measured, and where my expectations were wrong.

<div class="admonition info">

**The short version.** On 49 real variant families across 12 C projects:

- Fusing many cheap code signals put a real variant in the top 50 for **38.8%** of families, out of about 9,400 functions on average. That was the best result, but only modestly ahead of plain clone matching and embeddings.
- Querying with the **abstracted root cause** alone was *worse* than querying with the whole function. That was my core design idea, and the data did not support it.
- The LLM worked as a **filter, not a ranker**: the functions it flagged were 5.4× more likely to be real variants, but it did not significantly improve the ranking.
- Directed fuzzing **confirmed nothing**.

</div>

## A clone is not a variant

This is the distinction everything else depends on. Here is a real pair from my benchmark, taken from libarchive's zip writer in 2012:

```diff
  /* SEED: path_length() */
  path = archive_entry_pathname(entry);
+ if (path == NULL)
+     return (0);
  if (... (path[strlen(path) - 1] != '/'))   /* abridged */

  /* VARIANT, fixed later: write_path() */
  path = archive_entry_pathname(entry);
+ if (path == NULL)
+     return (ARCHIVE_FATAL);
  ret = __archive_write_output(archive, path, strlen(path));
```

Both fixes are the same two-line change, a missing `NULL` check on the result of `archive_entry_pathname()`. But they live in different functions that do different jobs, and the second fix landed after the first. A whole-function clone matcher sees two unrelated pieces of code.

What they share is the **root cause**: a value that can be `NULL` flows into `strlen` without a check. A clone shares text. A variant shares a violated safety condition. Clone detectors like VUDDY, MOVERY and V1SCAN are built around the first, even when they are patch-aware.

## Turning the question into something measurable

I framed the task the way a defender actually experiences it:

> Given one fixed bug and the code base as it was on the day of the fix, rank every function so the ones still hiding the same mistake come first.

The input is the **seed**: the vulnerable function, its patch, and the commit message. The output is a ranked list. Scoring is about analyst effort, because the real cost of variant analysis is reading code:

- **Hit@k**: did at least one real variant appear in the top *k*? If I read 50 functions, do I find anything?
- **Recall@k**: what fraction of a family's variants appear in the top *k*?
- **MRR**: how high up the first real variant appears.

Ground truth comes from history. A function counts as a variant if maintainers *later* fixed it for the same root cause, and its vulnerable code was already present when the seed was fixed. You are predicting the future from the past, which is exactly the position a defender is in. It also undercounts, because a variant nobody has fixed yet is scored as a miss.

### Building the benchmark

I could not find a public benchmark that asks this question directly, so I mined one from git history.

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/blog/varseer-benchmark-m.png" />
    <img src="/blog/varseer-benchmark.png" alt="A funnel: 18 C projects on GitHub, narrowed to 6,289 function-level fix records, then 813 records that add a guard protecting a sink, then 200 candidate seed-to-variant pairs in 72 families, and finally 126 variants in 49 families after blind LLM adjudication kept 63 percent." />
  </picture>
  <figcaption>From security commits to a benchmark. The last step mattered most: structural similarity between patches alone over-labels badly.</figcaption>
</figure>

I took security-keyword commits (CVE IDs, overflow, use-after-free, sanitizer names) from 18 C projects, parsed the before and after versions with tree-sitter, and kept small function-level fixes that **add a guard protecting a dangerous operation**. Fixes were grouped into families by project, bug class, guard kind and sink category. The earliest member became the seed, and the search pool became every function in the repository at the seed's fix commit.

A matching structural key is only a proxy for "same root cause", so I had each of the 200 candidate pairs judged blind: nine LLM adjudicators saw only the two patches, with no names, paths or retrieval results. They confirmed **126 of 200 (63%)**. The pass rate swung from 7/7 for libexpat to 1/6 for freetype, which told me structural matching on its own over-labels.

The final benchmark has **49 families and 126 variants across 12 projects**, including libxml2, OpenSSL, FFmpeg, SQLite, curl and libarchive. The average search pool is **9,393 functions** (median 5,238). A random ranking would find about 0.5–2% of variants in its top 50.

## How VARSEER works

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/blog/varseer-pipeline-m.png" />
    <img src="/blog/varseer-pipeline.png" alt="VARSEER pipeline in six boxes: a seed fix flows into 1 root cause abstraction, 2 retrieval over token, AST and data-flow views plus clone and sink signals, 3 rank fusion to a top 30, 4 LLM triage, and 5 validation with ASan and directed fuzzing. About 9,400 functions become 30 shortlisted and about 2 flagged." />
  </picture>
  <figcaption>Stages 1–3 are cheap and use no LLM. The model only ever sees a 30-function shortlist.</figcaption>
</figure>

**1. Root-cause abstraction.** Compare the vulnerable and patched versions of the seed and find the condition that exists only in the patch: the guard that was added. Its variables are the ones that needed protecting. Then collect every dangerous use of them (array indexes, `memcpy`-style call arguments, pointer dereferences, arithmetic) plus a two-hop backward slice of where they came from. It is a lightweight code property graph built straight from the syntax tree.

**2. Multi-view retrieval.** Every function in the snapshot is represented three ways: by its **tokens**, its **AST shape**, and its **data flow**, recorded as tokens like `call-result → arg:strlen:unguarded`. Each view is queried twice, once with the abstracted slice and once with the whole seed function. On top of those six, there is a **clone score** (how many of the seed's vulnerable lines appear in the candidate, MOVERY/VUDDY-style) and two **structural scores** (how many sinks of the seed's kind the candidate has, and how many use unguarded variables). Nine signals in total.

**3. Rank fusion.** The nine signals have nothing in common in terms of scale, so I combined them with reciprocal rank fusion, which only looks at ranks:

```text
score(f) = Σ  1 / (60 + rank_i(f))      over all nine signals
```

A function rises when several independent signals agree on it. Nothing in this stage is trained on labels.

**4. LLM triage.** The top 30 functions go to an LLM along with the seed's vulnerable function, patch and commit subject. Candidates are anonymised (name replaced, path removed) and shuffled, and the prompt tells the model to be skeptical. It returns a verdict, a confidence, and the specific unguarded operation it thinks is the variant. Flagged candidates move to the top.

**5. Validation.** Flagged or top-ranked candidates are built with AddressSanitizer and fuzzed with libFuzzer's directed mode (`-focus_function`). A candidate is only confirmed if the sanitizer fires inside its code.

Some departures from the original design: the sandbox I ran this in blocked HuggingFace, CodeQL and Joern. So the embeddings are TF-IDF + LSA fitted on each snapshot rather than a pretrained code model, the code graph is my own tree-sitter def-use construction, and the "CodeQL-style" baseline is my own structural query. The LLM parts ran as Claude subagents reading anonymised JSON, using about 0.87M tokens for adjudication and 2.83M for triage (roughly 1.9k tokens per candidate).

## What the numbers say

### Fusion wins, by less than I hoped

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/blog/varseer-hit50-m.png" />
    <img src="/blog/varseer-hit50.png" alt="Horizontal bar chart of Hit@50. VARSEER fusion 38.8 percent, whole-function embedding 30.6, clone matching 30.6, learned ranker 26.5, root-cause slice only 24.5, size and sink prior 22.4, structural query 16.3, random 6.1." />
  </picture>
  <figcaption>Hit@50 per method. Fusion finds a variant in the top 50 for 19 of 49 families. The slice-only retriever, my original bet, sits below both plain baselines.</figcaption>
</figure>

Fusion had the best depth: **Hit@50 of 38.8%** and **Recall@50 of 26.1%**, against 30.6% / 18.8% for clone matching and 30.6% / 21.8% for whole-function embeddings. Every method was far above random: the median rank of the first real variant was 256 for fusion against 1,471 for random. A gradient-boosted ranker trained on the same features (leave-one-project-out) did not beat the unsupervised fusion, which is not surprising with only 126 positives.

At the very top, though, plain clone matching held its own. Its MRR was 0.142 against fusion's 0.139, and its Hit@10 was higher (22.4% against 16.3%). In practice: **if you will only read ten functions, clone matching is as good as anything here. If you will read fifty, fusion helps.**

### How sure is that gain?

With 49 families the uncertainty is large, and showing the bars without it would be misleading.

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/blog/varseer-confidence-m.png" />
    <img src="/blog/varseer-confidence.png" alt="Forest plot of VARSEER minus baseline in percentage points with 95 percent paired bootstrap intervals. Hit@50: versus size and sink prior +16.3 (6.1 to 28.6), versus whole-function embedding +8.2 (2.0 to 16.3), versus clone matching +8.2 (0.0 to 18.4). Recall@50: versus clone matching +7.3 (1.2 to 13.9), versus whole-function embedding +4.3 (-0.5 to 9.6)." />
  </picture>
  <figcaption>Paired bootstrap over families (2,000 resamples). Hollow points are intervals that touch or cross zero.</figcaption>
</figure>

Fusion's Hit@50 is 38.8% with a 95% interval of [24.5, 53.1]. Clone matching's is 30.6% [18.4, 42.9]. Those overlap heavily. Paired comparisons are tighter, but two of them still reach zero. The gain over a size-based prior is clear. The gain over clone and embedding retrieval is real but borderline.

So the claim I can defend is narrow: **fusion is the best point estimate for finding variants at depth, and it reliably beats weak baselines. It does not dominate clone matching or embeddings.**

### My root-cause idea did not pull its weight

The whole design started from one hypothesis: querying with the *abstracted root cause* (the guard, the sink, the def-use slice) should beat querying with the whole function, because the root cause is what a variant shares.

The data did not support it.

- On its own, slice-only retrieval reached **24.5%** Hit@50, below whole-function embedding at 30.6%.
- Removing the slice views from fusion changed nothing measurable (Recall@50 went from 26.1% to 26.6%).
- Removing the **whole-function** views hurt: Recall@50 dropped to 23.3% and Hit@50 to 34.7%. Removing the structural-sink signals hurt about as much.
- Removing the clone signal lowered MRR (0.139 → 0.114) but not depth. Removing the data-flow views actually *raised* MRR to 0.170.

My best explanation is that a short slice makes a sparse, noisy query, while the whole function carries the context that makes code risky: parsing loops, buffers, length arithmetic. The size/sink prior supports this. It knows nothing about the seed and just ranks large functions with many dangerous operations first, yet it still reaches 22.4% Hit@50. **Part of what makes a function a likely variant is its neighbourhood, not just the bug.**

### The LLM is a filter, not a ranker

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/blog/varseer-triage-m.png" />
    <img src="/blog/varseer-triage.png" alt="Waffle chart of 1,470 shortlisted functions. 9 were flagged by the LLM and are real variants, 18 real variants were missed, 81 were flagged but are not variants, and 1,362 were correctly left alone. Precision on flagged candidates is 10.0 percent against a 1.8 percent base rate, 5.4 times denser." />
  </picture>
  <figcaption>Every function the LLM saw, one square each. It made the list much shorter, and it also missed two-thirds of the variants it was shown.</figcaption>
</figure>

The 30-function shortlists added up to 1,470 candidates and contained 27 of the 126 variants. That is the ceiling for triage, since the model cannot flag what it never sees. The LLM flagged 90 functions, about two per family. **9 were real variants, 81 were not, and it missed 18.**

That is 10.0% precision against a 1.8% base rate: a list of 30 becomes a list of about two that is **5.4× denser** in real variants. When reading code is the expensive part, that is useful.

As a ranker, it did not help significantly. Recall@10 went from 9.5% to 11–12% and Hit@10 from 16.3% to 18–20%, but the paired intervals cross zero. When I let the model fully reorder by its own confidence, MRR *dropped* to 0.107, because it sometimes pushed down a true variant that fusion had already placed first.

The way I would use it: **let the LLM tell you which two functions to read first, and do not let it reorder the rest.** Its precision is also a lower bound, since some of those 81 "false positives" may be variants nobody has fixed yet.

Difficulty also varied a lot by project. Hit@50 was 0% for FFmpeg (pools of up to 28k functions) and SQLite, and around 60% for libxml2 and libarchive. By bug class, NULL-dereference families were easiest (46%), then out-of-bounds (37%) and integer overflow (29%).

### Fuzzing confirmed nothing

The last stage was supposed to turn a ranked guess into a confirmed bug. I tried it on libxml2, the project with the most families, at four seed snapshots (2020, 2021, 2022 and 2025): clang 18, AddressSanitizer, a multi-target libFuzzer harness, and 45–60 seconds of directed fuzzing per target.

| Targets | Reached / linked | Sanitizer errors |
| --- | --- | --- |
| 6 confirmed variants | 5 / 6 | 0 |
| 17 top-ranked by pipeline | 7 / 14 | 0 |
| 17 random controls | 3 / 10 | 0 |

**Zero sanitizer errors across 40 targets.** There were 10 libFuzzer aborts, but they were timeouts and memory-limit kills from expensive inputs, not memory-safety violations.

The one encouraging signal is reachability. Of the targets actually linked into the harness, it reached 5 of 6 known variants and 7 of 14 top-ranked functions, against 3 of 10 random controls. That fits the ranking pointing at input-reachable parsing code, but with numbers this small I would not call it significant.

Three things explain the negative result. Many of the labelled variants are missing checks on **allocation-failure paths**, and an input-driven fuzzer cannot make `malloc` fail. The harness only covers part of libxml2's API. And a minute per target is short. Until fault injection and per-target harnesses are in place, "confirmed by sanitizer" remains a design goal this study could not demonstrate.

## What I would tell someone doing variant analysis today

<div class="admonition success">

**Cheap retrieval over many signals, an LLM only on a short list, and dynamic confirmation before believing anything.**

</div>

- **Start with clone matching** for the first handful of candidates. It is cheap and strong at the very top.
- **Fuse signals if you will read deeper.** No single view was best everywhere, and rank fusion lets them cover for each other without training data.
- **Keep the whole function in the query.** The context around a bug carried more signal than I expected.
- **Use the LLM to cut, not to order.** Read what it flags first, and keep the retrieval ranking for everything else.
- **Plan for fault injection.** Many real NULL-dereference variants sit on error paths a normal fuzzer never reaches.

## Where this could be wrong

<div class="admonition warning">

**There are no human labels.** Ground truth is "later fixed for the same reason, confirmed by an LLM adjudicator", and the adjudicator and the triage model come from the same model family, so their mistakes may correlate.

</div>

- **Unfixed variants count as misses**, so every precision figure here is a lower bound.
- **Memorisation is possible.** These are well-known open-source projects that probably appear in model training data. The retrieval results are unaffected because they use no LLM.
- **Some choices were informed by the data.** The signal set and the shortlist size came partly from a first pass on an earlier, unadjudicated 28-family version, and I compared six signal subsets on the final benchmark (Hit@50 from 32.7% to 38.8%). The fusion's advantage may be slightly optimistic.
- **The scope is narrow.** 12 C projects, mostly parsers and libraries. Retrieval is function-level and intra-procedural, so variants that span functions are out of scope. Mining for FFmpeg and gpac was cut short for time.

All the code and history used here are public, the benchmark only contains fixes maintainers had already shipped, and the fuzzing ran locally against historical snapshots. Any new, unfixed variant would go privately to the maintainers first. None is claimed here.

The next version needs a larger benchmark with human-audited labels, pretrained code encoders in the fusion, inter-procedural slices, and fault-injection validation for the allocation-failure cases.

---

I went in expecting a smart root-cause abstraction and an LLM to do most of the work. What actually helped was a set of cheap signals agreeing with each other, plus a model that was good at saying "read these two first". No single technique solved variant analysis, and the honest numbers are smaller than the case studies suggest. That is worth knowing before trusting any tool that says it can find a bug's siblings.
