# CAREER.md: Kartik Jain's career database

> **What this is (for humans).** Everything about Kartik Jain's work in one file: roles, projects,
> security research, leadership, skills, numbers and links, with ready-made wording. It's built to be
> handed to any AI assistant, which can then write whatever is needed for a given target: a résumé, SOP,
> cover letter, LinkedIn text, bio, freelance proposal or project documentation.
>
> **How to use it.** Attach this file to any AI tool and say what you want and who it's for:
> - "Make a one-page résumé for this job: (paste the job description)"
> - "Write an SOP for the MS in Cybersecurity at (university). Word limit 1,000."
> - "Write a freelance proposal for a pentest of (client)'s web app."
>
> The AI asks for anything it needs that isn't here, such as a phone number.
>
> **Public on purpose.** It holds only what's already public through Kartik's résumé, jkartik.in, LinkedIn
> or GitHub, so it's safe to publish and to feed to any AI. Personal details are deliberately left out.
> **Looking for the résumé itself?** → https://jkartik.in/resume/ (every version) or
> https://jkartik.in/Kartik_Resume.pdf (the general one).
> Latest copy of this file: https://raw.githubusercontent.com/KartikJain14/jkartik.in/main/resume/CAREER.md
>
> Last full review: **2026-10-30** · Owner: Kartik Jain (career@jkartik.in)

---

## 0. Agent guide (read all of §0 before doing anything)

Assume you are an AI agent on **any machine or chat app**, with no memory of earlier sessions and no
guaranteed access to Kartik's repos, LinkedIn, chat history or even the internet. You may have no tools
at all. **This file is everything you know, and it is meant to be enough.**

### 0.0 Start here: any document, any target

The person giving you this file is normally Kartik, so ask them directly. If someone else gave it to you,
answer from this file and don't request the details in §0.7. Work in this order:

1. **Pin down the target.** What is the document, who reads it, what should it achieve, and what are the
   limits (length, format, deadline, tone)? If something missing would change the result, such as the
   job description, ask for it. Decide the rest yourself.
2. **Check freshness.** Compare today's date with "Last full review" above. If it's more than about 3
   months old, ask whether anything has changed (CGPA, current role, new projects). Work out the current
   year of study from §10 rather than assuming it.
3. **Ask for what's missing, all in one message** (§0.7). Personal details and personal stories are
   deliberately not in this file.
4. **Pick the facts** for that document type (§0.8). The rules in §12 apply to everything you write.
5. **Write it in the target's own form and voice.** §3–§8 are raw material: outside a résumé, turn bullets
   into proper prose instead of pasting them.
6. **Hand it over honestly.** Deliver the format asked for, or paste-ready text if you can't create files.
   Never claim a check you didn't run (page count, ATS score, live links). End by listing any placeholders
   to fill, assumptions you made, and target requirements Kartik doesn't meet.
7. **Keep this file current.** If you learn a new career fact, follow §0.3. If you can't edit the file,
   print the exact lines for Kartik to paste in. Never add the details listed in §0.7.

### 0.1 Ground rules (every task)

- **This file is the single source of truth.** Claim nothing that isn't in it. If a job or a request
  needs something that isn't here, ask Kartik. Never fill gaps with plausible-sounding facts.
- **This file is public, and so is most of what you write from it.** Every edit to this file, and anything
  you publish from it (website, public PDF, repo, post), must pass the public-safety checklist (§0.6).
- **Never guess** numbers, titles, dates or ownership. Ask instead.
- Résumés are always **one page**.

### 0.2 Building a résumé

1. Read **§1 Identity**, **§12 Rules** and **§14 Open questions** in full. The rules are non-negotiable.
2. Map the job description to an archetype in **§2** (A–F). If it mixes two, use the primary
   archetype's recipe and borrow bullets from the secondary.
3. Assemble from the banks:
   - Summary: **§3** (or drop it; students often go without one)
   - Experience: **§4**. Pick **one variant per bullet ID**, preferring the variant tagged for the archetype.
   - Leadership: **§5**
   - Projects: **§6**. Tier A first; choose by tags; 3–4 projects max.
   - Security research: **§7**
   - Achievements: **§8**
   - Skills: **§9**. Use the archetype's ATS line, intersected with the JD. **Never add a skill that isn't in §9.**
   - Education: **§10**. Always included, always at the top, always with CGPA.
4. **Mirror the JD's wording where it's true.** If the JD says "CI/CD pipelines" and Kartik built
   them, use that exact phrase (ATS keyword match). Never import a JD keyword without evidence here.
5. **Inside Kartik's repo,** build per **§13**: one page. Per-application versions go to `resume/variants/`
   (gitignored); role versions published on the site go to `resume/roles/`. **Never overwrite
   `public/Kartik_Resume.pdf`** unless Kartik asks for the general résumé to change. Run the ATS check (§13)
   until it passes. **Anywhere else,** output the finished text section by section, ready to paste, keeping
   §2's section order and the style rules below. Say that you haven't confirmed it fits one page.
6. Verify: exactly 1 page, links in **§11** still live (re-check them), no §12 violations, every
   number on the page appears in this file.
7. **Ask Kartik** when the JD wants something this file doesn't have, when you'd need a number that
   isn't here, or when an item in §14 matters for the role. Don't guess.
8. If Kartik gave you new facts along the way, follow §0.3 to record them, and log the résumé you built
   in **§17** (date, target role, file name).

**Style rules for résumé text:** no first person; start each bullet with a strong past-tense verb
(present tense for current roles); at least one number per role where a real one exists; max 4 bullets
per role, 1–3 per project; no hype words ("passionate", "crafting", "cutting-edge", "spearheaded").

### 0.3 Updating this file

**When:** Kartik reports something new (role, project, win, disclosure, number, link); a fact changes
(CGPA, status, a link dies); or he asks for a periodic re-survey.

**Procedure:**

1. **Get the fact from a trustworthy source**, in this order of authority: offer/experience letters
   → Kartik's direct statement → git history → LinkedIn → anything else. If sources conflict, use the
   most authoritative one, word the claim so it's true under every source (e.g. "team win"), and note
   the decision in §17.
2. **Verify what you can.** With no tools, skip this and record the source as "Kartik" in the §17 entry.
   With tools (needs `gh` authenticated, plus `curl`):
   - Code ownership:
     `gh api "repos/<owner>/<repo>/commits?author=KartikJain14&per_page=100" --jq length`,
     `gh api repos/<owner>/<repo>/contributors --jq '.[]|"\(.login) \(.contributions)"'`,
     `gh api repos/<owner>/<repo>/stats/contributors` (line counts; retry if it returns empty while
     GitHub computes). Map the result to the ownership key in §6 (Solo / Lead / Co-lead / Maintainer /
     Contributor). If his share is near zero, don't add it unless Kartik explains, and then keep the
     wording at team level.
   - Liveness: `curl -sL -m 20 -o /dev/null -w '%{http_code}' <url>`. Play Store:
     `https://play.google.com/store/apps/details?id=<package>`.
   - LinkedIn blocks scraping, so ask Kartik for a fresh profile export (More → Save to PDF).
   - Numbers come only from Kartik or a checkable source. Never estimate.
3. **Put it in the right place** (§0.4 map). New items get the **next free ID**. Never renumber or reuse
   an existing ID, because other sections and the changelog refer to them.
4. **Write bullets in the house format** (§0.5): at least two variants (one L/M, one S) for anything flagship.
5. **Update cross-references:**
   - §2 recipes if the item is a flagship for an archetype
   - §9 if it shows a new skill (with the "where it's used" evidence)
   - §11 for any link
   - §12 rule 12's number list for any new number
   - §14: remove answered questions, add new unknowns
   - §16 for a public repo
6. **Change, don't erase:** when a fact changes (CGPA, status), update it in place and log old → new in
   §17. If something stops being true (a project is discontinued, a link dies), mark it in its status
   column. Only delete an item when Kartik asks.
7. **Run the public-safety checklist (§0.6).**
8. **Add a §17 entry:** date, what changed, source ("Kartik", "gh commit stats", "LinkedIn export",
   "curl check"). Only change "Last full review" in the header after a full re-survey.
9. **Commit only if Kartik asked**, as `career: <what changed>`. Never commit `resume/variants/`.

### 0.4 Structure map (keep it exactly this way)

| § | Section | Format | IDs |
|---|---|---|---|
| — | Header | Human-facing "what this is / how to use it / public" quote block + last-review date | — |
| 0 | Agent guide | Rules and procedures (this section) | — |
| 1 | Identity & contact | One table | — |
| 2 | Role archetypes | Recipe table + "Recipe details" bullets | A–F |
| 3 | Summary bank | Bullets | `SUM-<archetype>` |
| 4 | Experience | One `###` per role: facts table, then "Bullet bank" | 2-letter prefix per employer (`VR`, `RU`, `FL`, `DF`) |
| 5 | Leadership & community | One `###` per organisation: role table + bullets | `LD-n` |
| 6 | Projects | 6.1 Tier A as detailed blocks · 6.2 Tier B as table rows · 6.3 Tier C as a plain list | `P<n>` |
| 7 | Security research | Table + compressed one-liner | `SR-n`, `DF-n` |
| 8 | Achievements | Table | `AW-n` |
| 9 | Skills | Evidence table + ATS lines per archetype + "don't list" | — |
| 10 | Education | Table + résumé line | — |
| 11 | Link registry | Table with status + "use?" | — |
| 12 | Rules | Numbered list | — |
| 13 | Build playbook | Bullets | — |
| 14 | Open questions | Table | `Q-<slug>` |
| 15 | LinkedIn reference | Short prose | — |
| 16 | GitHub footprint | Table of public repos + one line for private work | — |
| 17 | Changelog | Dated bullets, oldest first, append at the bottom | — |

**Conventions:**
- Section numbers and IDs are permanent: append, never renumber. A new employer gets a new 2-letter prefix.
- Dates are `Mon YYYY` (`Apr 2026`), ranges use an en dash (`Apr 2026 – Oct 2026`), and ongoing roles end in `present`.
- Write numbers exactly as they should appear on a résumé (`~4,000`, `16,000+`, `$1,500`).
- Record each fact once and point to it by ID elsewhere; don't duplicate.
- Use the §6 ownership words exactly. Record where each new fact came from in its §17 entry ("source:
  Kartik", "gh commit stats"), not inline in the body.
- Plain Markdown only (tables, bullets, bold, code spans); no HTML. Keep tables as tables.

### 0.5 Bullet format

```
- **<ID>: <short label>** `TAG TAG`
  - **a (L):** <verb-first sentence with tech + a number or outcome>
  - **b (S):** <one-line version>
```

**Tags:** `SEC` security · `BE` backend · `SWE` general/full-stack · `OPS` DevOps/SRE/cloud ·
`MOB` mobile · `AI` AI/LLM · `LEAD` leadership/community.
**IDs:** e.g. `VR-2b` = VisionRise, bullet 2, variant b. Variants say the same thing at different
lengths or angles; a résumé uses one per ID. **Length:** (S) one line · (M) ~1.5 lines · (L) 2 lines.

### 0.6 Public-safety checklist (this file and anything published from it)

This file is public on GitHub. **Never add, here or in any public output:**
- phone numbers, a street/locality (location is "Mumbai" only), or any email other than career@jkartik.in
  (contact@jkartik.in on the website)
- server IPs, admin-panel hostnames, credentials, tokens, internal URLs
- names of clients that haven't been publicly disclosed (the banking client, freelance clients)
- vulnerability details beyond what jkartik.in/research publishes, or any bug-report/case IDs
- private-repo paths of other organisations, or employers' internal code details beyond résumé level
- teammates' names or comparisons of who contributed how much
- "don't claim" lists, weaknesses, hedges ("assumed", "unverified", "didn't place") or unflattering raw
  metrics. Express every limit as a positive wording rule instead (ownership words, "participated",
  "team win", "describe by scope").

Quick scan (should print nothing; run it on this file and on anything you publish):
`grep -nE '[+]91|[0-9]{10}|([0-9]{1,3}[.]){3}[0-9]{1,3}|(password|secret|token|api[_-]?key) *[:=]|VULN-' <file>`

Per-application details (e.g. a phone number) go only in the document being written, such as a tailored
résumé under `resume/variants/` (gitignored). Never here.

### 0.7 Ask first: details that are not in this file

These are left out on purpose because this file is public. **Ask Kartik for them. Never guess, invent or
look them up online, and don't copy them from an old document without confirming.** Ask only for what the
target needs, all in one message. If Kartik skips one, leave a visible placeholder such as
`[PHONE: Kartik to add]`, never a made-up value.

| Category | Examples | Notes |
|---|---|---|
| **Contact** | Phone number, personal email | Default email is career@jkartik.in. Leave the phone out of anything public (a website, a repo, a public PDF) unless Kartik says otherwise. |
| **Location** | Street, locality, PIN code, permanent address, hometown | "Mumbai, India" is fine by default. Ask if the target wants more. |
| **Identity** | Date of birth, age, gender, nationality, passport, visa or work authorization, government IDs, photo, signature | Only when a form or application requires it. |
| **Family & background** | Parents' details, family income, category or reservation status, disability, first-generation status | Sensitive. Ask only if the target explicitly requires it, and never infer it. |
| **Academic records** | Semester marks, Class 10/12 scores, test scores (GRE, TOEFL, IELTS, JEE), transcripts, class rank, coursework | §10 holds only the degree and CGPA. |
| **Job logistics** | Current or expected pay, freelance rates, notice period, start date, availability, relocation, work mode | |
| **References** | Recommenders and referees, their contact details, how they know Kartik | |
| **Personal story** | Motivation, why this field, long-term goals, turning points, hardships, opinions, what a project taught Kartik | **Never invent these.** Ask, or leave a marked placeholder such as `[Kartik: why this program?]`. |
| **The target** | Job description, program and university, essay prompt, word limit, recipient's name, client scope, budget | |
| **Anything else not here** | Any number, tool, title or date this file doesn't state, and anything in §14 the target depends on | |

### 0.8 What to use for each document

| Document | Draw from | Also ask for | How to write it |
|---|---|---|---|
| **Résumé** | §0.2, §2–§10 | The job description; phone if it's a direct application | One page, no first person, ATS-safe plain layout |
| **CV (academic or long)** | §4–§10 | Page limit, coursework, test scores | Longer than a résumé only when the target asks for it |
| **Cover letter** | §3, the 2–3 strongest bullets for the role | Company, role, job description, recipient | Under one page, first person, specific to the company |
| **SOP / personal statement / scholarship essay** | §4–§8, §10 as evidence | Program, university, prompt, word limit, motivation, goals, why this program | First-person narrative, not a résumé in sentences. The reasons must be Kartik's own, and every achievement must come from this file |
| **Recommendation letter draft** | Only what that person could know first-hand | Recommender's name, title, relationship, what they'd vouch for | Written in the recommender's voice, as a draft for them to change and approve |
| **Email, cold outreach, referral request** | §3, one or two relevant proof points | Recipient, why them, the ask | Short, one clear ask |
| **LinkedIn text** | §3, §4, §15 | Which section, target audience | First person, plain language |
| **Bio or speaker intro** | §1, §3, §5, §8 | Length, event or publication | Third person, using the name "Kartik" |
| **Freelance proposal or pitch** | §7, §9, §6, §4.3 | Client, scope, timeline, price | Lead with relevant proof. Only name clients shown on jkartik.in/hire; rates aren't stored here |
| **Project documentation, case study, README** | §6 and the matching §4 entry | Repo or source access, audience | This file is résumé-level only. Don't invent architecture or internals; ask for the code |
| **Interview preparation** | The exact bullets on the résumé being used | Role, company, round type | Likely questions per bullet, flagging which answers need Kartik's own detail |
| **Official documents** (experience letter, bonafide, NOC) | §4, §10 | Issuer and purpose | These must come from the issuer. Draft only on request, clearly marked as a draft for the issuer to review. Never imitate a letterhead or signature |
| **Anything else** | Whichever sections fit | Whatever §0.7 says the target needs | Follow §0.0 |

**In every document:** Kartik must be able to explain anything you claim, in an interview or to a client.
Don't stretch a fact to fit a target. If the target wants something this file doesn't show, say so and
offer the closest true experience instead.

---

## 1. Identity & contact

| Field | Value | Notes |
|---|---|---|
| Name | **Kartik Jain** | |
| Location | **Mumbai, India** | City only. If a target needs more, **ask Kartik** (§0.7). |
| Email | **career@jkartik.in** | Use on every résumé |
| Phone | not stored here | **Ask Kartik** (§0.7). Never put it in `public/Kartik_Resume.pdf` or anything else public. |
| Website | jkartik.in | Also /projects/, /research/, /blog/ |
| GitHub | github.com/KartikJain14 | |
| LinkedIn | linkedin.com/in/kartikjain1410 | |
| X / Instagram | x.com/kartikjain1410 · instagram.com/kartikjain1410 | Profile metadata only (site `sameAs`); not on résumés or in the site menu |
| Languages | English (full professional), Hindi, Marwari (native) | Only if the JD asks |
| Status | B.Tech IT student, graduating Apr 2028 | Open to internships and freelance (web-app security testing, backend) |
| Interests | Cybersecurity first, then backend, DevOps and full-stack | Target order: AppSec, backend, penetration testing, DevOps, full-stack (from job-market research, Oct 2026) |
| Community | Open-source contributor | Say it without naming specific projects |
| Motivation (his words) | "I like to break stuff." | A seed for SOPs and interviews. Ask him to expand it; never invent the rest of the story |

---

## 2. Role archetypes → résumé recipes

| | Archetype | Typical JD titles | Header title line | Section order (after header) |
|---|---|---|---|---|
| **A** | Security | Security Analyst / AppSec / VAPT / Pentest / Security Engineer intern, SOC intern | `Security Engineer · Backend Developer` | Education → Experience → Security Research → Projects → Achievements → Skills → Leadership |
| **B** | Backend | Backend / SDE / API developer intern | `Backend Engineer · Security Researcher` | Education → Experience → Projects → Security Research (2–3 lines) → Achievements → Skills → Leadership |
| **C** | SWE / full-stack | SDE intern, full-stack, product engineer | `Software Engineer · Backend & Security` | Education → Experience → Projects → Achievements → Security Research (2 lines) → Skills → Leadership |
| **D** | DevOps / SRE / cloud | DevOps / SRE / Platform / Cloud / Infra intern | `DevOps & Backend Engineer` | Education → Experience → Projects (infra-heavy) → Security Research (2 lines) → Skills → Leadership |
| **E** | Mobile | React Native / mobile app developer | `Software Engineer · Mobile & Backend` | Education → Experience → Projects → Achievements → Skills → Leadership |
| **F** | AI / LLM security | AI security / red team / LLM eng intern | `Security Engineer · LLM Red Teaming` | Education → Experience → Security Research + AI wins → Projects → Skills → Leadership |

*Hackathon wins are supporting evidence, not the headline (rule 15). Most résumés get at most one combined line.*

*Kartik's default order puts **Education & Leadership at the top**. For his general résumé, use
Education then a one-line Leadership entry (LD-0) right under it, and drop Leadership from the bottom.*

**Recipe details:**

- **A Security.** Must include: all R.U.D.R.A bullets (RU-1..4), the WhatsApp $1,500 bounty, MSRC,
  CERT-In, the chat.win 1st place, DF-1 (freelance incident response). VisionRise: VR-2, VR-3, VR-5,
  VR-6, plus VR-1b for scope. Projects: GhostShare, Fool The LLM, event/payment backends (HMAC
  webhooks, access control), conc-qr. Skills: §9 line **A**.
- **B Backend.** VisionRise first and longest (VR-1c, VR-2a, VR-3a, VR-4a/b, VR-5b). Freelance entry
  (FL-2a + DF-1b) if space allows. Projects: GhostShare, Railway Concession, event & payment backends,
  then P27 (MAL 4: concurrency, HLD/LLD, ADRs) and bad-db. Keep R.U.D.R.A to 2–3 bullets. Skills: line **B**.
- **C SWE.** Like B, but add bad-db (CS fundamentals: B-Tree, parser), P27 only if it reads stronger than what it would replace, FL-2 (a client product used at a
  live event), and say "single codebase for Android, iOS and web". Skills: line **C**.
- **D DevOps.** Must include: VR-5a, VR-6a, DF-1, the ACM Webmaster infra (LD-2a: Coolify + Mailcow
  shared by several committees, GitHub org + CI/CD), RU-1 (BBOT automation). Projects: committee infra
  (P14), the jkartik.in pipeline (P15), GhostShare (Docker, Redis scale-out, backup/restore scripts),
  Railway Concession (runs a 4,000-student system), P27d as one line (reliability design). Skills: line **D**.
- **E Mobile.** VR-1a up top (single React Native/Expo codebase, 2 apps on Google Play, OTA updates,
  push notifications). Supporting: Taqneeq 17.0 Flutter integration, the Delego backend. Skills: line **E**.
- **F AI/LLM.** chat.win 1st (global), Fool The LLM (built it and started the event), CSAW LLMAC'25
  (participation), VR-4a (Gemini auto-quiz), usb-ai, captr, hindcribe, the blog post "Where LLM
  guardrails break". Skills: line **F**.

**Always one page** (Kartik's decision, 2026-10-30). Overflow goes to jkartik.in, which the header
links to. A 2-page CV only for research/scholarship applications that explicitly ask for one, kept
as a separate file.

---

## 3. Summary bank

Pick one or drop the section. 2–3 lines max. No pronouns: open with a noun phrase, then verbs.

- **SUM-A (Security):** Security engineer who also ships production backends. Awarded a $1,500 bug
  bounty by Meta (WhatsApp); reported vulnerabilities to Microsoft (MSRC) and the Mumbai Police (via
  CERT-In); found two high-severity flaws in a banking portal as a security intern. Builds with
  Node.js, FastAPI, PostgreSQL and Docker.
- **SUM-B (Backend):** Backend engineer with a security background. Built a white-label LMS
  (Node.js, TypeScript, PostgreSQL) that ships as two Google Play apps, and maintains a college
  system used by ~4,000 students; payment, event and check-in backends for NMIMS's largest student
  events. $1,500 Meta bug bounty.
- **SUM-C (SWE):** Software engineer who takes products from database to app store: a cross-platform
  LMS (React Native, Node.js, PostgreSQL) on Google Play, an end-to-end-encrypted sharing app, and a
  from-scratch Java storage engine. Security-minded, with a $1,500 Meta bug bounty.
- **SUM-D (DevOps):** DevOps-minded backend engineer with an offensive-security background. Hardened
  and operated a company's production server (Ubuntu, Coolify CI/CD, PostgreSQL, GCS backups), led
  ransomware recovery for a 16,000+ user platform, and built self-hosted infrastructure shared by
  several college committees.
- **SUM-E (Mobile):** Mobile and backend engineer. Built and published a React Native/Expo learning
  app to Google Play as two branded apps from one codebase (OTA updates, push notifications), on a
  self-built Node.js/PostgreSQL backend.
- **SUM-F (AI security):** LLM red-teamer and builder: 1st place on the global leaderboard of chat.win's
  AI Jailbreakathon; built and ran Fool The LLM, a prompt-injection contest platform; $1,500 Meta bug
  bounty.

---

## 4. Experience

### 4.1 VisionRise Technosoft Pvt. Ltd.: Software Engineer Intern

| | |
|---|---|
| **Title** | **Software Engineer Intern** (as on the offer letter; résumés always use this) |
| Dates | **Apr 2026 – Oct 2026**, Mumbai |
| Company context | Edtech/software company; brands **Rise Academy / Rise Institute** (riseinstitute.tech) and **eGuru** (eguru.app); company site risetechnosoft.com |
| Ownership | Created and wrote nearly all of the LMS v2 codebase and the eGuru fork; contributed to the earlier team-built LMS (v1) |
| Scale facts (LMS v2) | ~40k lines TypeScript backend + ~45k lines app; **276 API routes**; **20 backend domain modules** (admin, ai, analytics, assignments, audit, auth, calendar, certificates, courses, enrollments, lessons, live-classes, media, modules, notifications, payments, quizzes, reports, settings, users); 25 test files |
| Live | **Rise Academy** on Google Play (`tech.riseinstitute.app`); **eGuru** on Google Play (`app.eguru.lms`); eguru.app; riseinstitute.tech |
| How to describe it | By **scope**: 276 routes, 20 modules, Android/iOS/web from one codebase, two branded apps on Google Play. |
| Live classes | Kartik built **Live Classes v1**: Zoom orchestration, attendance, recordings, Gemini auto-quiz. Describe live classes at that scope. |

**Bullet bank**

- **VR-1: Core build** `BE SWE MOB`
  - **a (L):** Built a white-label learning platform end to end: a Node.js/Express/TypeScript API
    (276 routes, PostgreSQL + Drizzle) and a single React Native/Expo codebase for Android, iOS and
    web. Shipped it as two branded apps on Google Play (Rise Academy, eGuru).
  - **b (S):** Built and shipped a white-label LMS (Node.js, TypeScript, PostgreSQL, React Native) as
    two Google Play apps from one codebase.
  - **c (L, BE):** Designed the backend of a white-label LMS: 20 domain modules, 276 REST endpoints,
    Zod-validated inputs, JWT access/refresh auth, role-based access and audit logging on PostgreSQL
    with Drizzle migrations.
- **VR-2: Content security** `SEC BE`
  - **a (L):** Protected paid video with AES-128-encrypted HLS (FFmpeg transcoding pipeline),
    per-session playback tokens validated on every segment, and short-lived signed Google Cloud
    Storage URLs. PDFs stream in-app with no download surface.
  - **b (M):** Secured paid content with encrypted HLS streaming, per-session playback tokens, signed
    cloud-storage URLs and SHA-256-verifiable certificates.
- **VR-3: Auth & access** `SEC BE`
  - **a (M):** Implemented Google Sign-In, PIN login with WhatsApp phone verification, JWT
    access/refresh tokens, role-based access for admins, instructors and students, and audit logs on
    admin actions.
  - **b (S):** Built auth (Google Sign-In, WhatsApp-verified PIN, JWT refresh tokens) with RBAC and audit logging.
- **VR-4: Features & integrations** `BE AI MOB`
  - **a (M):** Integrated Zoom live classes (signature-verified webhooks, attendance, recordings) and
    generated quizzes from class content with Gemini.
  - **b (M):** Shipped courses, quizzes, assignments, UPI payment verification, push and email
    notifications, bulk enrollment and over-the-air app updates.
- **VR-5: Production server** `OPS SEC`
  - Facts: **Ubuntu 24.04 LTS**, **Coolify** (CI/CD + deployments), PostgreSQL, **automated backups to
    Google Cloud Storage**, hardening (SSH key-only access, firewall, unattended security upgrades,
    fail2ban) and container/app logs via Coolify/Docker.
  - **a (L):** Provisioned and hardened the company's primary production server on Ubuntu 24.04 LTS
    (SSH key-only access, firewall, unattended security upgrades), running the apps and PostgreSQL behind
    Coolify CI/CD, with automated backups to Google Cloud Storage.
  - **b (S):** Ran production on a hardened Ubuntu 24.04 server: Coolify CI/CD, PostgreSQL, automated GCS backups.
- **VR-6: IT administration** `OPS SEC`
  - Facts: Google Workspace directory of **35+ accounts** (35–50 over the internship); GitHub
    organization with **15 repositories** and ~5–10 members.
  - **a (M):** Administered the company's GitHub organization (15 repositories) and its Google Workspace
    directory of 35+ accounts (accounts, access and permissions).
  - **b (S):** Administered the GitHub org (15 repos) and Google Workspace (35+ accounts).
- **VR-7: Legacy LMS** `BE`
  - **a (M):** Contributed to the earlier LMS: CI/CD, timezone-safe class scheduling (Postgres session
    pinned to IST), course invite and access-request flows, Zoom fixes.
- **VR-8: Other deliverables** `SWE`
  - **a (M):** Built a government procurement-management prototype (FastAPI + React) for a client
    demo, and the eguru.app marketing site (Next.js static export).

### 4.2 R.U.D.R.A Cybersecurity Pvt. Ltd.: Security Engineer Intern

| | |
|---|---|
| **Title** | **Security Engineer Intern** (as on the offer letter) |
| Dates | **May 2025 – Jul 2025** (3 months), Mumbai |
| Company | Mumbai-based VAPT / offensive-security firm |

**Bullet bank**

- **RU-1: BBOT** `SEC OPS`
  - **a (M):** Automated recurring external attack-surface monitoring with BBOT, cutting manual recon
    and saving ~$20,000/year.
  - **b (S):** Automated attack-surface monitoring with BBOT (~$20k/yr saved).
- **RU-2: Semgrep** `SEC`
  - **a (M):** Single-handedly built a custom Semgrep (SAST) module with Neo4j-based graph
    visualisation for large-scale code analysis.
- **RU-3: Banking client** `SEC`
  - **a (L):** Found and reported 2 high-severity vulnerabilities (LFI, broken access control) in a
    banking client's web portal through manual code review, then automated their detection with
    custom Nuclei templates.
  - **b (M):** Found 2 high-severity vulnerabilities (LFI, broken access control) in a bank's web
    portal; wrote custom Nuclei templates to detect them.
- **RU-4: Red/purple team** `SEC`
  - **a (S):** Deployed and operated the Sliver C2 framework for purple-team exercises emulating
    real-world intrusions.
- **RU-5:** retired (the ID stays reserved).
- **RU-6: Dependency scanning** `SEC OPS`
  - **a (S):** Ran dependency scanning (SCA) to find known-vulnerable packages. (If a target asks which tool, ask Kartik.)

### 4.3 Freelance: Backend & Security Engineer

| | |
|---|---|
| **Title** | **Freelance Backend & Security Engineer** (self-employed; descriptive title) |
| Dates | **May 2025 – Oct 2026** (two separate engagements, not continuous) |
| Engagement 1 (May – Jun 2025) | **A political party's web platform with 16,000+ users** (Flask + MongoDB). Hardened its server infrastructure; when it was hit by **ransomware**, led the incident response, contained it and restored service through rapid backup-and-recovery. |
| Engagement 2 (Aug – Oct 2026) | **sports-live** (P9): a pickleball tournament platform built for a client and **used at ELEV8**, a pickleball tournament with **~200 players auctioned into 8 teams**. |
| Client names | **Never name the political party.** ELEV8 and the clients on jkartik.in/hire may be named. "A political party" is optional context; default to neutral wording ("a 16,000-user web platform"). |
| Other client websites | KHOY, Schon Zapato and Marketing Machines (P22–P24). These are named on jkartik.in/hire, so they may be named. |

- **DF-1: Incident response & hardening (2025)** `SEC OPS`
  - **a (L):** Hardened the infrastructure of a 16,000-user web platform for a freelance client and led
    the incident response to a ransomware attack, restoring service through rapid backup and recovery.
  - **b (M):** Led ransomware incident response for a 16,000-user platform, restoring service via
    backup and recovery, and hardened its infrastructure.
  - **c (M, with client type):** Hardened a political party's 16,000-user web platform and led its
    recovery from a ransomware attack through rapid backup and restore.
- **FL-2: Tournament platform (2026)** `SWE BE`
  - **a (L):** Built the platform behind ELEV8, a ~200-player, 8-team pickleball tournament: player
    registration and verification, a purse-based live player auction with a projector board, fixtures, live
    scoring and standings (Next.js, Supabase Postgres + Realtime), with an offline write queue for patchy venue Wi-Fi.
  - **b (M):** Delivered a live player-auction and scoring platform (Next.js, Supabase Postgres + Realtime)
    used at ELEV8, a ~200-player, 8-team pickleball tournament, with an offline write queue for unreliable venue Wi-Fi.
  - **c (S):** Built a live-auction and scoring platform used at a ~200-player pickleball tournament (Next.js, Supabase Realtime).
- **Placement:** as its own Experience entry ("Freelance · Backend & Security Engineer · May 2025 – Oct 2026")
  with DF-1 + FL-2 when there's room. When space is tight, DF-1b moves into Security Research as its
  "Defensive" line and FL-2 is dropped.

---

## 5. Leadership, committees & community

All committees are at **SVKM's NMIMS MPSTME, Mumbai**. Default compressed résumé line:

> **LD-0 (M):** **Chairperson**, ACM MPSTME (Jun 2026–present); previously Head of Technical Department at
> **Taqneeq**, **Mumbai MUN**, **Social Conclave** and **Sattva** (2025–26).

### 5.1 ACM MPSTME (student chapter): Jul 2024 – present

| Role | Dates | Facts |
|---|---|---|
| **Chairperson** | Jun 2026 – present | ~**250 members** incl. **50 core**; led recruitment; restructured departments and created new ones; **Programming For Everyone (PFE)**: record **~500 learners**, first time run as a **5-day program open to students from other colleges**, workshops on C, Python, cybersecurity, web dev, web hosting, DSA, AI, Git/GitHub; personally mentored C, cybersecurity and web hosting; partnered with **SNDT ACM-W**; **Semicolon** (intro event): record footfall over 2 days; alumni networking event for **70–80** members + alumni; **every member gets an @mpstmeacm.com mailbox** on the chapter's self-hosted Mailcow (no per-seat licence cost); **members-only Minecraft server (2026–27)**: players must link their Minecraft account to Discord through the ACM bot, which exists only in the ACM Discord server, so only members can link and play; ACM **Discord server with custom bots** that onboard new members and grant channel access by position and department |
| **Supercore: Webmaster** | Jul 2025 – Jun 2026 | Set up the **GitHub organization**, GitHub Apps and **CI/CD**; built **self-hosted infrastructure on Coolify**; set up a **Mailcow mail server** (SPF, DKIM, DMARC configured himself), later **shared by 7–9 college committees** with good deliverability; wrote problem statements for and **judged/mentored an overnight hackathon**; set competitive-programming problems; **started Fool The LLM** (adversarial AI contest); committee of **120+** |
| **Sub-Head Technicals (Competitive Programming)** | Jul 2024 – Jul 2025 | Discord server + onboarding bot (auto-roles, real-name renaming, acceptance emails); taught first-years C++ by building a CLI game (**C++ teacher at PFE-24**); certificate portal with verification + add-to-LinkedIn; set CP contest problems; designed a **CTF** for freshers |

- **LD-1a (M):** Chair a ~250-member ACM chapter; grew Programming For Everyone to a record ~500
  learners as a 5-day program open to other colleges, and restructured the chapter's departments.
- **LD-2a (M) `OPS`:** As Webmaster, built ACM's self-hosted infrastructure (Coolify, and a Mailcow mail
  server with SPF/DKIM/DMARC that now serves 7+ college committees), the GitHub organization and CI/CD.
- **LD-2c (S) `OPS`:** Built ACM's Coolify + Mailcow servers: @mpstmeacm.com mail for all members and 7+ committees.
- **LD-4a (M) `OPS BE`:** Run members-only services for the ~250-member chapter: an @mpstmeacm.com mailbox
  for every member, a Minecraft server gated by Discord account linking through the chapter's bot, and
  Discord bots that onboard members and assign channel access by position and department.
- **LD-2b (S) `AI SEC`:** Started Fool The LLM, a prompt-injection contest, and judged and mentored an overnight hackathon.

### 5.2 Taqneeq (NMIMS MPSTME tech fest)

| Role | Dates | Facts |
|---|---|---|
| **Head of Technical Department** | Aug 2025 – May 2026 (Taqneeq 18.0) | Led the revamp of the fest app + backend; **led the team that built photo discovery with facial recognition** (attendees upload event photos and find the ones they appear in); gamified points redeemable for coupons/merch; **Taqneeq website** (taqneeqfest.com) and **Students' Council website** (mpstmestudentcouncil.com, contributor); department classifier; Discord ecosystem; email + servers on the ACM self-hosted infra; set problems for and mentored at **CyberCypher**, Taqneeq's cybersecurity hackathon |
| **Technical Sub Head** | Oct 2024 – May 2025 (Taqneeq 17.0) | **Loyalty/credits backend** (lead author; P3-T); Flutter app integration; **Discord bot that onboarded 1,100+ hackathon participants** (unique invites, real-name renaming, auto team channels); certificate generation script |

- **LD-3a (M) `LEAD SEC`:** Headed Taqneeq's technical department: led the fest-app revamp, including
  facial-recognition photo discovery, and set problems for and mentored at CyberCypher, its security hackathon.
- **LD-3b (S) `BE`:** Built a Discord bot that onboarded 1,100+ hackathon participants automatically.

### 5.3 MUN Society MPSTME (runs Mumbai MUN)

| Role | Dates | Facts |
|---|---|---|
| **Head of Department: Technical** | Jun 2025 – May 2026 | Revamped the committee's app (Delego) and backend; **migrated SQLite → PostgreSQL**; set up transactional email; server maintenance; custom Discord bot (`muncord`); **Muntree** (Linktree-style site for the MUN community) |
| **Executive (Technicals)** | Jul 2024 – Jun 2025 | Magic-link password reset; QR scanning + food-usage page; documented the backend; fixed Flutter build/SDK issues; ran a GitHub & LinkedIn workshop |

### 5.4 Social Conclave: Head of Technical Department, Aug 2025 – May 2026
Built **conc-qr** solo (P3-C): QR access control for **500+ delegates** across checkpoints, shipped for
the event on **Jan 25, 2026**.

### 5.5 Sattva NMIMS (MPSTME cultural fest): Head of Technical Department, Sep 2025 – May 2026
Fest website, registration forms, CI workflows; **AI-enabled adaptive department classifier** (a quiz
that adapts its questions to earlier answers); promo reels.

### 5.6 NeuroTechh
Maintains the **Railway Concession** system (P2), used by ~4,000 students.

### 5.7 Teaching & community (for "community"/"mentoring" asks)
PFE mentor (C, cybersecurity, web hosting); C++ teacher at PFE-24; GitHub & LinkedIn workshop
(MUNSoc); hackathon judge/mentor (ACM overnight hackathon, CyberCypher); problem setter (CP contests,
CyberCypher); built a freshers' CTF; `template-portfolio` (P18) used by PFE participants.

---

## 6. Projects catalog

**Ownership key:** *Solo* = all his · *Lead* = majority author · *Co-lead* = major share ·
*Maintainer* = took over an existing system · *Contributor* = minority share.
**Tier A** = résumé-ready flagship · **B** = strong for specific roles · **C** = not for résumés.

### 6.1 Tier A

**P1. GhostShare**: Solo · 2026 · `SEC BE SWE OPS`
- **What:** end-to-end-encrypted, ephemeral realtime sharing: anonymous rooms, no accounts; the database
  and object storage only ever hold ciphertext.
- **Stack:** TypeScript (strict), Next.js 15, React 19, Fastify 5, Socket.IO 4 + Redis adapter,
  PostgreSQL 16 + Drizzle, BullMQ, Redis 7, Cloudflare R2, Web Crypto AES-256-GCM, Argon2id (hash-wasm),
  pnpm + Turborepo, Docker Compose behind Coolify, Pino, Sentry.
- **Facts:** keys derived in-browser (Argon2id), never stored or sent; contents and filenames encrypted
  with AES-256-GCM before upload; selectable TTL (1d/3d/1w/1m) +
  hourly purge of expired rooms and orphaned storage; **5 MiB chunked encryption, 4-way parallel
  direct-to-R2 uploads, exponential-backoff retry, resumable**; offline-first (IndexedDB queue drains on
  reconnect); Socket.IO scales horizontally via the Redis adapter; helmet + rate limiting; backup/restore scripts.
- **Links:** live at **share.jkartik.in**; source is private; write-up at jkartik.in/projects/ghostshare/;
  blog jkartik.in/blog/zero-knowledge-sharing/.
- **P1a (L):** Built an end-to-end-encrypted, zero-knowledge file and note sharing app: keys are derived
  in-browser with Argon2id and data is sealed with AES-256-GCM, so the server stores only ciphertext.
- **P1b (L) `BE OPS`:** Streamed encrypted 5 MiB chunks straight to Cloudflare R2 with parallel,
  resumable uploads; realtime sync over Socket.IO with a Redis adapter for horizontal scaling.
- **P1c (S):** E2E-encrypted, zero-knowledge sharing app (Argon2id + AES-256-GCM, Fastify, Redis, R2).

**P2. Railway Concession (MPSTME's official system)**: Maintainer · Jul 2026 – present · `BE SWE OPS`
- **What:** the college's official online railway-concession form, collection-slot booking and admin
  office tools, used by **~4,000 students**.
- **Ownership:** the original 2025 version was built by the NeuroTechh team. Kartik took it over in
  Jul 2026 and now **maintains it solo**. Say "took over / maintain / extended", not "built from scratch".
- **His work:** migrated it to **PostgreSQL**; **server-side IST-aware sliding booking window**; admin tools
  (SAP-ID search with full profile + history, mark collected for any date, block SAP IDs, holidays,
  booking-window tuning, Excel export); **automated daily collection-report email** to the office;
  student confirmation emails; patched vulnerable dependencies; SEO.
- **Stack:** Next.js, PostgreSQL, Drizzle ORM, Nodemailer.
- **Links:** live at **concession.mpst.me**; blog jkartik.in/blog/when-a-form-becomes-infrastructure/.
- **P2a (L):** Took over and now solely maintain MPSTME's official railway-concession system used by
  ~4,000 students: migrated it to PostgreSQL, enforced an IST-aware booking window server-side, and
  built admin tools and automated daily reports for the college office.
- **P2b (S):** Maintain the college's official railway-concession system (Next.js, PostgreSQL) for ~4,000 students.

**P3. Event & payment backends**: one combined résumé entry, or separate items · `BE SEC`
- **P3-T Taqneeq 17.0 credits/loyalty backend:** *Lead author*. Source: github.com/KartikJain14/qrshooter-backend.
  Flask, Firestore, JWT, Vercel. Phone-OTP login, role-based (`SALES`/`ADMIN`) credits ledger, referrals
  with abuse handling, **leaderboard cached with a short TTL** so crowd reads don't hit the DB, admin
  portal. The fest draws thousands of attendees.
- **P3-D Delego (Mumbai MUN, 2024–25 editions) backend:** *Lead backend author* for those editions.
  Source: github.com/munsoc-mpstme/mundra. FastAPI, PostgreSQL, JWT magic links/OTP, per-delegate QR for
  check-in + meals, rate limiting, scheduled DB backups, CSV import/export. **600+ delegates**; the app
  shipped on the App Store and Play Store (those listings have since been taken down). The 2026 edition
  of Delego was built by the next team, so Kartik's work is the **2024–25 editions only**, with no store link.
- **P3-P PFE paid registration:** *Co-lead*. Source: github.com/MPSTME-ACM/pfe-regi. Next.js/Node,
  PostgreSQL, **Cashfree** payments confirmed only by **HMAC-verified webhooks**, QR tickets emailed on
  confirmation, **idempotent gate check-ins**, admin sales dashboard, Google Sheets sync, magic-link login, RBAC.
- **P3-C conc-qr (Social Conclave):** *Solo*. Source: github.com/Social-Conclave/conc-qr. TypeScript,
  Express, Next.js, PostgreSQL, Sequelize, JWT, Docker. **500+ delegates**; check-ins are race-free
  because a **Postgres `UNIQUE(participant, access_type, day)` constraint** is the source of truth; the access
  matrix (day → checkpoint → roles) is **editable live mid-event without a redeploy**; phone-camera
  scanning with manual fallback; built in under 2 weeks. Blog: /blog/what-conc-qr-taught-me-about-myself/.
- **P3a (L):** Lead backend author for NMIMS event apps: Taqneeq's credits/loyalty engine (OTP auth,
  referrals, cached live leaderboard) and Mumbai MUN's Delego backend (FastAPI, PostgreSQL), which
  shipped to the App Store and Play Store for 600+ delegates.
- **P3b (M) `SEC`:** Co-led paid event registration on Cashfree: tickets are issued only on
  HMAC-verified payment webhooks, with QR tickets and idempotent gate check-ins.
- **P3c (M):** Built QR access control for 500+ delegates; check-ins are race-free because a Postgres
  unique constraint enforces them, and role permissions can be edited live mid-event.

**P4. Fool The LLM**: Solo · 2026 · `AI SEC`
- Prompt-injection contest platform: escalating levels where a Gemini model guards a secret codeword;
  token-streamed chat; organizer console (levels, participants, live chat logs, force unlock/reset);
  JWT + magic-link sign-in; **per-player token rate limiting**. Model safety filters are deliberately
  off: the guardrails *are* the game. Kartik **started the event** as ACM Webmaster (run by ACM +
  GDG MPSTME).
- Stack: TypeScript, Next.js, Express, Prisma, PostgreSQL, Gemini. Source private. Blog:
  /blog/where-llm-guardrails-break/.
- Participants: **~70** in the most recent edition.
- **P4a (M):** Built and ran Fool The LLM, a prompt-injection contest for ~70 participants: guarded
  Gemini levels, token-streamed chat, an organizer console with live logs, and per-player token budgets.

**P5. bad-db**: Solo · 2026 · github.com/KartikJain14/bad-db · `SWE BE`
- Java storage engine from scratch: binary on-disk format (`RandomAccessFile`), hand-rolled **B-Tree**
  primary-key index rebuilt on open, insert/read/update/delete/upsert, tombstone deletes + **compaction**,
  automatic file-format upgrade, its own query language **BQL** with a parser + CLI.
  Blog: /blog/btree-storage-engine/.
- **P5a (M):** Wrote a database storage engine from scratch in Java: custom on-disk format, a hand-rolled
  B-Tree index, tombstone deletes with compaction, and its own query language and parser.

**P27. NeuroTechh: clinic appointment platform (MAL 4 first prize)**: Team of 3 · Nov 2026 · github.com/KartikJain14/mal-hackathon · `BE SWE MOB`
- **What:** the first-prize entry at the MAL 4 hackathon (AW-9). Healthtech track: patients request appointment slots and clinics confirm or decline them. The rule the design protects: a confirmed slot belongs to exactly one patient, and a cancellation reopens the slot consistently.
- **Documents (judged):** one-page problem brief, production design, HLD, LLD, **19 Architecture Decision Records** and three walkthroughs (core path, failures, a new requirement).
- **Key decisions:** one modular API rather than the nine microservices first proposed; Postgres row locks and a partial unique index rather than Redis locks; a transactional outbox rather than Kafka; pending requests hold no slot, so the race happens at clinic confirm; phone-created idempotency keys.
- **Prototype (for extra credit):** React Native + Expo app, Express + TypeScript API, PostgreSQL, Redis, Measure SDK, Docker Compose. Patient, hospital and doctor flows; QR check-in; family profiles; record uploads. Booking rule checked with **2, 50 and 200 concurrent confirms on one slot: exactly one confirmed each time.** Integration tests cover booking and workflows.
- **Links:** github.com/KartikJain14/mal-hackathon; write-up at jkartik.in/projects/mal-hackathon/; blog jkartik.in/blog/mal4-hackathon-where-code-was-optional/.
- **Wording:** "team of 3", "prototype". It's a hackathon design and prototype with no live users. The repo's `docs/architecture/as-built.md` records what the code does and where it differs from the design.
- **P27a (L):** Designed a clinic appointment platform with a 3-person team (HLD, LLD, 19 ADRs), winning first prize at MAL 4: Postgres row locks and a partial unique index guard each slot, and 200 concurrent confirms produced exactly one booking.
- **P27b (M) `BE`:** Prototyped the booking API (Express, TypeScript, PostgreSQL) with idempotency keys, version checks and an outbox written in the same transaction; 200 concurrent confirms on one slot produced exactly one booking.
- **P27c (S):** First-prize architecture and React Native prototype for clinic booking: HLD, LLD, 19 ADRs (team of 3).
- **P27d (S) `OPS`:** Failure and recovery design, first prize at MAL 4: idempotent retries, transactional outbox, HLD/LLD, ADRs (team of 3).

### 6.2 Tier B (use when the role fits)

| ID | Project | Ownership · year | Link | Best for | Facts | Status / note |
|---|---|---|---|---|---|---|
| **P6** | **meven**: MPSTME Event & Facility Requisition Portal | Solo · 2026 | private | BE, SWE | Replaces the paper approval chain (faculty mentor → institutional approver → admin allotment → Joint Registrar escalation) with numbered permission documents + full audit trail; one application covers rooms/refuge/canopy/guest/participant categories, each decided separately. pnpm monorepo, Next.js, **Express 5 API + background worker**, PostgreSQL, Redis (queue/rate limit), Cloudflare R2, SMTP, Docker + Coolify on Ubuntu | **In development.** If used, say "in development"; promote to Tier A once it ships |
| **P7** | **GrouPay**: multi-tenant billing for housing societies | Solo · 2025 | github.com/KartikJain14/groupay | BE, SWE | 3-tier tenancy (super-admin → channel-admin → residents), tenancy checks in middleware, invoices + public invoice links, audit log, OTP + password auth; ~15k lines pnpm monorepo, 8 migrations; Next.js, Express, Drizzle, PostgreSQL | Personal project |
| **P8** | **ballast**: treasury "reserve juggler" for a digital bank | Solo · Oct 2026 | github.com/KartikJain14/ballast | BE, SWE, fintech | Python; hourly decisions on how much cash to keep liquid vs sweep into yield tiers for a bank moving ~$20M/hour; cost-ordered fallback funding waterfall; replays 5 policies; stress tests (incl. an SVB-style run); **52 tests** (no-look-ahead, ledger reconciliation); web app + Streamlit console; optional Gemini summary | **Hackathon project** (pitched to the judges). Wording: "hackathon project" |
| **P9** | **sports-live**: pickleball tournament, live auction & scoring platform | Solo · **freelance** · Aug – Oct 2026 | private | SWE, BE | Next.js 16, Supabase (Postgres + Realtime + Storage, RLS), purse-based live auction + projector board, fixtures/scoring/standings, player verification, server-side image processing, **offline write queue** (IndexedDB), vitest | **Used at a real tournament.** Résumé bullets: FL-2 (§4.3) |
| **P10** | **captr**: video → research-doc pipeline | Solo · 2025 | private | AI, BE | Gemini turns a topic into YouTube queries → yt-dlp + transcripts → highlight timestamps → FFmpeg key frames → Markdown research doc you can chat with; FastAPI, MongoDB, JWT + bcrypt, Resend, Next.js | Personal project |
| **P11** | **usb-ai**: fully offline coding assistant in one .exe | Solo · 2026 | github.com/KartikJain14/usb-ai | AI, SEC | Quantized Gemma-2-2B GGUF embedded in a PyInstaller onefile exe; no network code at all; llama.cpp; streaming Markdown terminal UI | Personal project |
| **P12** | **hindcribe**: offline Hindi ASR + Hindi→English translation | Solo · 2024 | github.com/KartikJain14/hindcribe | AI | Vosk + Argos Translate + FFmpeg + Flask, fully offline (citizen-data constraint), unit tests per stage | Built for the **DARPG 2024** government grievances hackathon |
| **P13** | **Discord automation bots** | Solo | taqneeq/tq-dc-bot, MPSTME-ACM/acm-cord, muncord | BE, OPS | Onboarded **1,100+ hackathon participants** (unique invites, real-name renaming, auto team channels); exec onboarding with auto-roles + acceptance emails | Best as one bullet under leadership |
| **P14** | **Self-hosted infra for college committees** | Solo (as ACM Webmaster, then Chairperson) · 2025–present | n/a | **OPS**, SEC | Coolify PaaS; **Mailcow mail server (SPF/DKIM/DMARC) shared by 7–9 college committees and fests (incl. Taqneeq, Sattva, Social Conclave)** with good deliverability, plus **an @mpstmeacm.com mailbox for every ACM member (~250)**; members-only Minecraft server (2026–27) gated by Discord account linking via the ACM bot; Discord bots for onboarding and position/department-based channel access; GitHub org + Apps + CI/CD; hosts mpstmeacm.com, concession.mpst.me, share.jkartik.in | Blog post on jkartik.in |
| **P15** | **jkartik.in pipeline** | Solo · 2026 | github.com/KartikJain14/jkartik.in | **OPS**, SWE | Astro static site; multi-stage Docker (node build → nginx-alpine, ~97 MB); GitHub Actions + buildx cache → GHCR (`:sha` + `:latest`); **Watchtower pull-based auto-deploy** (no SSH secrets in CI); nginx + certbot TLS; RFC 9116 security.txt; Person/ProfilePage JSON-LD, sitemap, RSS, llms.txt; Lighthouse (mobile, Oct 2026) **97–100** performance and **100** accessibility, best practices and SEO | Live |
| **P16** | **Department classifier**: adaptive AI quiz | Solo/lead | Sattva, Taqneeq, Social Conclave versions | AI, SWE | Helps prospective volunteers find their best-fit department; questions adapt to earlier answers | |
| **P17** | **Certificate portal** | Contributor | private | BE | Event certificate variants, CSV upload, high-res rendering, MJML bulk email; Kartik did the Docker/Coolify deploy, email sending and fixes | Say "contributed to" |
| **P18** | **template-portfolio** | Lead · 2026 | github.com/KartikJain14/template-portfolio | community | Fill-one-file portfolio template **used by PFE participants** | Half a line under Leadership at most |
| **P19** | **mpstme.pics** | Scaffold + DevOps + some backend · 2025 | n/a | OPS | Scaffolded the repo, Dockerized it, set up CI/CD (GitHub Actions + Watchtower), built several access-control endpoints | Domain lapsed, so no link. Say "set up and deployed", not "built" |
| **P20** | **Government procurement prototype** | VisionRise deliverable | n/a | SWE | FastAPI + SQLite + React/Vite/Tailwind/shadcn clickable prototype for a client demo (departments, vendors, purchase requests, tenders, bids) | Covered by VR-8a |
| **P21** | **flap**: Flappy-style arcade game played over SSH (one game per connection, shared leaderboard; not multiplayer) | Solo · 2026 | github.com/KartikJain14/flap | personality / Go | Go; server-authoritative game state (clients can't submit scores), cell-diffed terminal stream, half-block pixel art, leaderboard; **playable with `ssh jkartik.in`** (also `ssh flap.jkartik.in`) | Featured on jkartik.in; a "fun" line or an interview chat |
| **P22** | **KHOY**: launch store for a premium shirt label | Solo · 2026 | khoy.in | Client work, SWE | Custom-built Shopify theme (Liquid) presenting the first collection like an editorial lookbook; site credits Kartik in its footer | Client site. Featured on jkartik.in/hire |
| **P23** | **Schon Zapato**: store for a vegan-leather footwear label | Solo (store revamp) | schonzapato.com | Client work | Revamped Shopify storefront (Liquid, Minimog theme) | Client site. Featured on jkartik.in/hire |
| **P24** | **Marketing Machines**: site for a SaaS growth coach | Co-built with a teammate · 2025 | marketingmachines.io | Client work, SWE | Next.js, Tailwind CSS, Nodemailer, Vercel; service pages, success stories, blog, contact form that emails enquiries | Client site. Always say co-built |
| **P25** | **VisionRise Technosoft company site** | Lead · 2026 (during the internship) | risetechnosoft.com | Client work, SWE | React, Vite, TypeScript, Tailwind CSS; capabilities, past work, enterprise enquiries, and the privacy and account-deletion pages its Play Store app needs | Shown on jkartik.in/hire |
| **P26** | **AI4HCE Symposium site** | Lead developer · 2025 | ai4hce-mpstme.nmims.edu | Client work, SWE | Next.js, TypeScript, Tailwind CSS; official site for a two-day international NMIMS symposium: speakers, schedule, advisory board, call for papers | Shown on jkartik.in/hire |

### 6.3 Tier C: not for résumés
Older or small personal repos: xoer, deja-file, notepad, CloudFrost, MindMarket, doppler, preztyl,
SiteSentry, DigitRecognize, webmail-lyte, relay-server, confessions, ngl-link, LoxProx, b2g,
bhram-mail, identity-provider, usb-bro, tq-bot, globalhost, muntree (mention only inside the MUNSoc
leadership role).

---

## 7. Security research

| ID | Target | Finding | Channel | Résumé framing |
|---|---|---|---|---|
| **SR-1** | **WhatsApp (Meta)** | Privilege escalation | Meta bug bounty: **$1,500 awarded** (2022) | "Awarded a **$1,500** bug bounty by Meta for a privilege-escalation vulnerability in WhatsApp." Keep the technical detail at "privilege escalation". |
| **SR-2** | **Microsoft** (Intune, Entra/Azure, Exchange Admin Center) | Access-control and information-disclosure issues: org data served before authorization checks (TOCTOU across Intune/Entra/Azure); restricted users editing directory name fields and joining closed groups via the Exchange admin portal | Reported to **MSRC** | "Reported access-control and information-disclosure flaws in Microsoft Intune and Exchange Admin to **MSRC**." Wording: "reported to MSRC"; no case IDs anywhere. |
| **SR-3** | **Mumbai Police** website | Stored XSS | Coordinated via **CERT-In** | "Responsibly disclosed a stored XSS on the Mumbai Police website in coordination with CERT-In." |
| **SR-4** | **The Souled Store** | Exposed staging infrastructure (potential full compromise) | Reported | "Reported exposed staging infrastructure at The Souled Store." |
| **SR-5** | **Belgian Waffle Co.** | Source-code + credential leak (potential CRM takeover) | Reported | "Reported a source-code and credential leak at Belgian Waffle Co." |
| **SR-6/7** | Banking client (R.U.D.R.A engagement) | LFI + broken access control, both high severity | Reported to the client | Covered by RU-3. **Never name the bank.** |
| **DF-1** | Freelance client platform (16,000+ users), 2025 | Ransomware incident + hardening | n/a | See §4.3. As a Security Research line: "**Defensive:** led ransomware incident response for a 16,000-user platform, restoring service via backup and recovery, and hardened its infrastructure." |

Compressed one-liner (for B/C/D/E résumés where research gets 1–2 lines):
> **SR-X (M):** $1,500 Meta (WhatsApp) bug bounty; vulnerabilities reported to Microsoft (MSRC),
> the Mumbai Police (via CERT-In), The Souled Store and Belgian Waffle Co.

---

## 8. Achievements & awards

| ID | Achievement | Notes |
|---|---|---|
| **AW-1** | **1st place (global leaderboard)**, AI Jailbreakathon by **chat.win**: LLM prompt attack & defence, won with the fewest tokens; $250 prize | Strong for SEC/AI |
| **AW-9** | **First prize (Champions), MAL 4 hackathon**, Mobile Architecture Lab, Paytm, Mumbai, 1 Nov 2026; supported by Measure, Google for Developers, Paytm and Ocean AI; **₹20,000**; team of 3; competing against working professionals and students | Architecture was 60% of the score and code was optional, so it's real system-design evidence. Use it where system design matters, usually through P27, not as a stand-alone boast (rule 15) |
| **AW-2** | **1st place, CodeForge 2026** (Taqneeq × FOSS MPSTME): 3-person team; NIFTY options-analytics platform | Wording: "1st place, CodeForge 2026: built and pitched a NIFTY options-analytics platform with a 3-person team." No repo link |
| **AW-3** | **$1,500 bug bounty from Meta** | Usually lives in Security Research (SR-1) |
| **AW-4** | **Rank 1**, Smart India Hackathon (SIH) internal college round | Say "internal round" |
| **AW-5** | **Finalist (top 15 of 230 teams)**, GDG AI Hackathon | |
| **AW-6** | CSAW LLM Attack Challenge (LLMAC) '25, NYU | Wording: "participated" |
| **AW-7** | DARPG 2024 hackathon (hindcribe) | Participation |
| **AW-8** | HackerRank Problem Solving (Basic), Java (Basic) | Low signal; leave off résumés |
| — | Competitive-programming profiles (LeetCode, Codeforces) | Not used on résumés |

---

## 9. Skills: evidence-backed inventory + ATS lines

**Depth:** **S** = strong, used in production · **W** = working, used in a project.

| Area | Skill | Depth | Where it's used |
|---|---|---|---|
| Languages | TypeScript | S | VisionRise LMS, GhostShare, meven, GrouPay, conc-qr |
| | JavaScript | S | across projects |
| | Python | S | Delego (FastAPI), Taqneeq (Flask), ballast, captr, hindcribe, usb-ai, bots |
| | SQL | S | PostgreSQL across projects |
| | Java | W | bad-db |
| | Go | W | flap |
| | C++ / C | W | taught C++ at PFE-24, mentored C at PFE |
| | Bash | W | backup/restore scripts, server ops |
| | Dart/Flutter | W (light) | Delego/Taqneeq integration + fixes; don't headline it |
| Backend | Node.js, Express | S | LMS (Express 5), meven, conc-qr, GrouPay, FTL |
| | Fastify | W | GhostShare |
| | FastAPI | S | Delego backend |
| | Flask | S | Taqneeq backend, hindcribe |
| | Next.js | S | GhostShare, Railway Concession, conc-qr, sports-live, meven, PFE registration |
| | REST API design | S | 276-route LMS |
| | WebSockets / Socket.IO | W | GhostShare |
| | Auth: JWT, OAuth 2.0 / Google Sign-In, OTP, magic links | S | LMS, Delego, FTL, PFE registration |
| | RBAC / access control | S | LMS, conc-qr, GrouPay, Taqneeq |
| | Payments: Cashfree (HMAC webhooks), UPI verification | W | PFE registration, LMS |
| | Queues / background workers: BullMQ | W | GhostShare, meven |
| | ORMs: Drizzle, Prisma, Sequelize | S/W | LMS + GhostShare (Drizzle), FTL (Prisma), conc-qr (Sequelize) |
| | Validation: Zod | S | LMS, GhostShare |
| | Testing: unit/integration tests (Vitest, pytest-style) | W | LMS, ballast (52 tests), sports-live |
| | System design: HLD, LLD, Architecture Decision Records (ADRs) | W | MAL 4 first prize (P27) |
| | Concurrency & reliability: row locks, partial unique indexes, optimistic versioning, idempotency keys, transactional outbox | W | P27 |
| Data | PostgreSQL | S | most projects; SQLite → PostgreSQL migration (MUNSoc) |
| | Redis | W | GhostShare (pub/sub, presence, queues), meven |
| | MongoDB | W | captr, freelance work |
| | Firebase / Firestore, FCM | W | Taqneeq backend; LMS push notifications |
| | Supabase | W | sports-live |
| | Neo4j | W | Semgrep visualisation (R.U.D.R.A) |
| Cloud / storage | Google Cloud Storage (signed URLs, backups) | S | LMS media, VisionRise server backups |
| | Cloudflare R2 | W | GhostShare, meven |
| | Vercel | W | Taqneeq backend |
| DevOps | Docker, Docker Compose | S | everywhere |
| | Linux server administration (Ubuntu 24.04 LTS), hardening | S | VisionRise server, ACM infra, freelance |
| | Coolify (self-hosted PaaS) | S | VisionRise, ACM, GhostShare, meven |
| | CI/CD: GitHub Actions, GHCR, Watchtower | S | jkartik.in, mpstme.pics, ACM GitHub org |
| | Nginx, Caddy, reverse proxies, TLS (certbot) | W | jkartik.in, LMS deploy configs |
| | Email infrastructure: Mailcow, SMTP, SPF/DKIM/DMARC | W | ACM mail server serving 7–9 committees |
| | Backups & disaster recovery | S | VisionRise GCS backups, freelance ransomware recovery, Delego scheduled backups |
| | Logging / observability: Pino, Sentry | W | GhostShare, VisionRise |
| | Git, GitHub org administration | S | ACM, VisionRise |
| | Google Workspace administration | W | VisionRise |
| Frontend | HTML, CSS, Tailwind CSS | W | GhostShare, sports-live, meven (Tailwind in each; all three sole-authored per git) |
| Mobile | React Native, Expo (EAS, OTA updates), Google Play publishing | S | VisionRise (2 apps) |
| Security | Web application penetration testing, VAPT | S | R.U.D.R.A, disclosures |
| | OWASP Top 10 (XSS, broken access control, LFI, info disclosure) | S | SR-1..7 |
| | SAST: Semgrep (custom module) | S | R.U.D.R.A |
| | Vulnerability scanning: Nuclei (custom templates) | S | R.U.D.R.A |
| | Dependency scanning (SCA) | W | R.U.D.R.A |
| | Attack-surface management / recon: BBOT | S | R.U.D.R.A |
| | Red/purple team: Sliver C2 | W | R.U.D.R.A |
| | Manual code review | S | R.U.D.R.A banking findings |
| | Burp Suite | S | web-app pentesting, bug bounty work |
| | Nmap | W | recon / network scanning |
| | Responsible/coordinated disclosure | S | Meta, MSRC, CERT-In |
| | Incident response | W | freelance ransomware recovery |
| | Applied cryptography: AES-GCM, Argon2id, HLS AES-128, HMAC, signed URLs, SHA-256 | S | GhostShare, LMS, PFE registration |
| | CTF design | W | ACM freshers' CTF |
| AI / LLM | LLM red teaming / prompt injection | S | chat.win win, FTL, CSAW |
| | Gemini API | S | LMS auto-quiz, FTL, captr, ballast |
| | llama.cpp / local LLMs (GGUF) | W | usb-ai |
| | Speech (Vosk), translation (Argos) | W | hindcribe |

**ATS-ready skills lines** (ordered by recruiter scan priority; trim to fit the JD):

- **A, Security:**
  `Security:` Web Application Penetration Testing, VAPT, OWASP Top 10, Burp Suite, Nmap, SAST/DAST, Semgrep, Nuclei, BBOT, Sliver C2, Manual Code Review, Responsible Disclosure, Incident Response ·
  `Languages:` Python, TypeScript, JavaScript, SQL, Bash, Java ·
  `Backend & Infra:` Node.js, FastAPI, Flask, REST APIs, JWT/OAuth 2.0, PostgreSQL, Redis, Docker, Linux, Nginx, CI/CD (GitHub Actions)
- **B, Backend:**
  `Languages:` TypeScript, JavaScript, Python, SQL, Java ·
  `Backend:` Node.js, Express, Fastify, FastAPI, Flask, REST APIs, WebSockets, JWT/OAuth 2.0, RBAC, Zod, System Design (HLD/LLD, ADRs) ·
  `Data:` PostgreSQL, Redis, MongoDB, Drizzle ORM, Prisma ·
  `Infra:` Docker, Linux, CI/CD (GitHub Actions), Coolify, Nginx, Google Cloud Storage, Cloudflare R2
- **C, SWE:**
  `Languages:` TypeScript, JavaScript, Python, Java, SQL, Go, C++ ·
  `Frameworks:` Node.js, Express, Next.js, React, React Native (Expo), FastAPI ·
  `Data & Infra:` PostgreSQL, Redis, MongoDB, Docker, Linux, Git, CI/CD ·
  `Concepts:` REST APIs, Data Structures & Algorithms, Authentication, System Design (HLD/LLD, ADRs)
- **D, DevOps:**
  `DevOps:` Docker, Docker Compose, Linux (Ubuntu) Server Administration, CI/CD (GitHub Actions), GHCR, Coolify, Nginx, TLS, Backups & Disaster Recovery, Logging ·
  `Cloud:` Google Cloud Storage, Cloudflare R2, Vercel ·
  `Languages:` Bash, Python, TypeScript, SQL, Go ·
  `Security:` Server Hardening, Vulnerability Assessment, Incident Response, Email Infrastructure (Mailcow, SPF/DKIM/DMARC)
- **E, Mobile:**
  `Mobile:` React Native, Expo (EAS, OTA Updates), Push Notifications, Google Play Publishing ·
  `Languages:` TypeScript, JavaScript, Python, SQL ·
  `Backend:` Node.js, Express, REST APIs, PostgreSQL, Firebase, Docker
- **F, AI/LLM security:**
  `AI Security:` LLM Red Teaming, Prompt Injection, Guardrail Design, Adversarial Testing ·
  `AI:` Gemini API, llama.cpp, Local LLMs (GGUF), Speech-to-Text (Vosk) ·
  `Security:` Web App Pentesting, OWASP Top 10, Burp Suite, Semgrep, Nuclei ·
  `Languages/Backend:` Python, TypeScript, FastAPI, Node.js, PostgreSQL, Docker

Anything a job asks for that isn't in this table: ask Kartik before listing it (rule 11).

---

## 10. Education

| Degree | Institution | Dates | Score |
|---|---|---|---|
| **B.Tech, Information Technology** | **SVKM's NMIMS Mukesh Patel School of Technology Management & Engineering (MPSTME)**, Mumbai | Jul 2024 – Apr 2028 (expected) | **CGPA 8.34 / 10.0** (as of Oct 2026; check whether it's been updated before reusing) |
| Junior college (HSC) | KC College, Mumbai | 2022 – 2024 | Leave off résumés |
| School | HVB Global Academy, Mumbai | until 2022 | Leave off résumés |

Résumé line: `B.Tech, Information Technology, NMIMS MPSTME, Mumbai · CGPA 8.34/10.0 · 2024–2028`.

---

## 11. Link registry (checked 2026-10-30; re-check before every résumé)

| URL | Status | Use? |
|---|---|---|
| jkartik.in, /projects/, /research/, /blog/ | ✅ | Yes, header |
| github.com/KartikJain14 | ✅ | Yes, header |
| linkedin.com/in/kartikjain1410 | ✅ | Yes, header |
| share.jkartik.in (GhostShare) | ✅ | Yes |
| concession.mpst.me (Railway Concession) | ✅ | Yes |
| mpstmeacm.com · neurotechh.mpst.me | ✅ | Optional |
| github.com/KartikJain14/bad-db | ✅ public | Yes |
| github.com/KartikJain14/mal-hackathon | ✅ public | Yes (P27; docs and winner photo) |
| mobilearchitecturelab.com/mal4 | ✅ | Optional (event page) |
| github.com/KartikJain14/qrshooter-backend | ✅ public | Yes (Taqneeq credits backend) |
| github.com/munsoc-mpstme/mundra | ✅ public | Yes (Delego backend) |
| github.com/MPSTME-ACM/pfe-regi | ✅ public | Yes |
| github.com/Social-Conclave/conc-qr | ✅ public | Yes |
| github.com/KartikJain14/groupay, /ballast, /usb-ai, /hindcribe, /flap, /template-portfolio | ✅ public | If the project is used |
| play.google.com/store/apps/details?id=tech.riseinstitute.app | ✅ | Yes (VisionRise) |
| play.google.com/store/apps/details?id=app.eguru.lms | ✅ | Yes (VisionRise) |
| eguru.app · riseinstitute.tech · risetechnosoft.com | ✅ | Optional |
| taqneeqfest.com · munsocietympstme.com | ✅ | Optional (committee proof). taqneeqfest.com now shows a later team's edition, so name the edition Kartik worked on when linking it |
| khoy.in · schonzapato.com · marketingmachines.io · ai4hce-mpstme.nmims.edu · sports-live.in | ✅ | Yes for client work (P22–P24, P26, P9) |
| Taqneeq Fest App Store listing | ✅ | **No** (Kartik's call) |
| socialconclave.org | ✅ | Optional (committee proof). The old socialconclave.in no longer resolves |
| muntree.munsocietympstme.com · mpstmestudentcouncil.com | ❌ not resolving or parked | No |
| mpstme.pics | ❌ domain lapsed | No |
| Delego store listings (2024–25 app) | ❌ taken down | No |

---

## 12. Rules: never break these

1. **Claim only what's in this file.** Any new project, role or number must be verified (commit
   history / ownership / Kartik's confirmation) and added here *before* it goes on a résumé.
2. **Titles follow the offer letters:** Software Engineer Intern (VisionRise), Security Engineer
   Intern (R.U.D.R.A).
3. **Ownership wording is fixed:** Railway Concession = "took over / maintain"; PFE registration = "co-led";
   the earlier VisionRise LMS = "contributed"; certificate portal = "contributed"; mpstme.pics = "set up
   and deployed"; Delego = "2024–25 editions"; CodeForge = "team win"; MAL 4 = "team of 3", "prototype".
4. **MSRC:** say "reported to MSRC"; never include case IDs.
5. **CSAW LLMAC'25:** say "participated".
6. **WhatsApp:** the $1,500 bounty is confirmed; keep the technical detail at "privilege escalation".
7. **Never name the banking client or the political-party client.** Clients shown on jkartik.in/hire may be named.
8. **Describe Rise Academy / eGuru by scope** (routes, modules, platforms, two branded apps).
9. **No dead links** (§11). Re-check them before every build.
10. **No phone number in `public/Kartik_Resume.pdf`.** Ask Kartik for it when a direct-application
    variant needs it.
11. **Skills must come from §9.**
12. **Every number used must appear here:** $1,500 · ~$20,000/yr · 2 high-severity · 16,000+ users ·
    276 routes · 20 modules · ~4,000 students · 600+ delegates · 500+ delegates · 1,100+ participants ·
    ~250 members · 50 core · ~500 learners · 120+ committee · 70–80 alumni event · 8.34/10 · 52 tests ·
    top 15 of 230 · ~70 FTL participants · 35+ Workspace accounts · 7+ committees on the mail server ·
    2022 (WhatsApp bounty year) · 15 repositories (VisionRise GitHub org) · ₹20,000 (MAL 4) · 19 ADRs · 200 concurrent confirms · 3 hackathon wins (MAL 4, chat.win, CodeForge) · ~200 players / 8 teams (ELEV8).
13. **Personal details are asked for, never stored or invented** (§0.7). That includes motivations and
    personal stories in SOPs and essays.
14. **Every claim must be something Kartik can walk through in an interview.** If he says he can't, take it
    out or reword it, whatever this file says.
15. **Don't lean on hackathon wins.** A résumé shouldn't look like it needs one. Add a win only where it's relevant
    to the role and reads well, and never add a line just for it or put it in a summary. Otherwise use one
    combined line: "Won 3 hackathons: MAL 4 (Paytm, team of 3), chat.win AI Jailbreakathon (global), CodeForge
    2026 (team)". Update the count when a new win comes in. Lead with the engineering; the prize is a few words at most.

---

## 13. Build & output playbook

*This section only applies if you're working inside Kartik's repo. Everywhere else, follow §0.0. The LaTeX
template is public at https://github.com/KartikJain14/jkartik.in/blob/main/resume/Kartik_Resume.tex if you
need to produce LaTeX.*

- **Tools needed** (any machine): `tectonic` (LaTeX engine, fetches its packages on first run),
  `poppler-utils` (`pdfinfo`, `pdftotext`, `pdftoppm`), `curl`, Node 22+ (for `npm run resume`), and
  an authenticated `gh` for the verification steps in §0.3.
- **Template:** `resume/Kartik_Resume.tex`: A4, single column, XCharter via `fontspec` with common
  ligatures off (so parsers never see "ﬁ"), `\role{Org}{Title}{Dates}` and
  `\proj{Name}{What}{Stack}{Links}` one-line headers with right-aligned dates/links, plain `itemize`
  bullets. ATS-safe: no tables, columns or icons; standard headings. Copy its preamble for every variant.
- **Where things build** (`npm run resume`, or `npm run resume -- <substring>` for one file):
  `resume/Kartik_Resume.tex` → `public/Kartik_Resume.pdf`; `resume/roles/*.tex` and
  `resume/portfolio/*.tex` → `public/resume/*.pdf`. The site's `/resume/` page lists them
  (`src/data/resumes.ts`).
- **ATS check (must pass before publishing):**
  `node scripts/ats-check.mjs <pdf> --role <general|backend|security|appsec|devops|fullstack|mobile|ai-security> --links`.
  It scores parseability, contact, headings, dates, bullet quality and keyword coverage (keyword lists in
  `scripts/ats-keywords.json`; "claimable" = backed by this file). Target: VERY GOOD or better, no ✘.
- **Public résumé** (linked from jkartik.in): edit `resume/Kartik_Resume.tex` → `npm run resume` →
  writes `public/Kartik_Resume.pdf` → commit both. This is the general backend + security résumé
  (archetype B, borrowing from A).
- **Tailored résumés:** copy the template to `resume/variants/<yyyy-mm>-<company>-<role>.tex`
  (gitignored), then compile:
  `tectonic --outdir resume/variants/out resume/variants/<file>.tex`
  Never copy them into `public/`.
- **Paper size:** the template is A4. For a US application, switch a variant to `letterpaper` and
  re-check that it still fits on one page.
- **Verify every build:**
  - `pdfinfo <pdf> | grep Pages` → must be `1`
  - `pdftotext -layout <pdf> -` → read it the way an ATS will (order, no garbled glyphs, dates parse)
  - render it (`pdftoppm -r 80 -png <pdf> <out>`) and look at it (spacing, bold, no orphan lines)
  - curl every link (§11)
- The first `tectonic` run downloads its bundle (~1–2 min); later runs are fast.

---

## 14. Open questions (ask Kartik before relying on these)

| ID | Question | Unlocks |
|---|---|---|
| **Q-coursework** | Relevant coursework? | §10 |
| **Q-mal-role** | What did Kartik personally own in MAL 4 (which documents, which parts of the prototype, who presented)? | A first-person P27 bullet instead of team wording |

---

## 15. LinkedIn reference

LinkedIn (linkedin.com/in/kartikjain1410) carries the long-form version of each role in §4–§5.
Headline focus: freelance web-application security testing + backend development; student at NMIMS
MPSTME '28. Top skills: Penetration Testing, Web Application Security, Vulnerability Assessment.
Honors: WhatsApp (Meta) Bug Bounty; XSS on Mumbai Police.
When writing LinkedIn text, reuse the long bullet variants (L) and §5 tables. Résumé titles always
follow the offer letters (§12.2).

---

## 16. GitHub footprint (public repos with Kartik's work)

**Organizations:** MPSTME-ACM, munsoc-mpstme, Social-Conclave, NeuroTechh, Sattvafest,
VisionRise-Technosoft, taqneeq (contributor).

| Repo | Role |
|---|---|
| KartikJain14/bad-db, groupay, ballast, usb-ai, hindcribe, flap, template-portfolio, jkartik.in | Solo / lead |
| KartikJain14/qrshooter-backend | Lead author (Taqneeq 17.0 credits backend) |
| KartikJain14/mal-hackathon (also NeuroTechh/mal-hackathon) | Team of 3 (MAL 4 first prize; P27) |
| munsoc-mpstme/mundra | Lead backend author for the 2024–25 Delego editions |
| MPSTME-ACM/pfe-regi | Co-lead |
| Social-Conclave/conc-qr | Solo |
| taqneeq/tq-dc-bot | Solo |
| MPSTME-ACM/acm-cord, munsoc-mpstme/muncord | Solo |
| taqneeq/mpstmestudentcouncil.com, MPSTME-ACM/mpstmeacm.com | Contributor |

Private work (not linkable): VisionRise LMS + eGuru, GhostShare source, meven, sports-live, captr,
Fool The LLM, Railway Concession source, certificate portal, department classifiers.

---

## 17. Changelog

- **2026-10-30**: Created from a full GitHub survey (7 orgs + personal repos), the LinkedIn profile
  export, the VisionRise codebases and Kartik's answers. Decisions: titles follow the offer letters;
  $1,500 WhatsApp bounty confirmed; CGPA 8.24/10 (corrected to 8.34 later the same day); one-page résumés; Education & Leadership at the top;
  no MSRC case IDs; Taqneeq App Store link dropped.
- **2026-10-30**: VisionRise server = Ubuntu 24.04 LTS + Coolify + GCS backups, hardened; 16,000-user ransomware response was a freelance project; Railway Concession
  serves ~4,000 students; meven is in development. Made public: phone, district, server addresses,
  private repo paths and teammate details removed. Hosting for GhostShare / Railway Concession / ACM
  site is back up.
- **2026-10-30**: Added the human-facing header and the agent guide (§0.1–0.6: update procedure,
  structure map, bullet format, public-safety checklist). New facts *(per Kartik)*: freelance
  engagement = a political party's platform in 2025 (unnamed) plus sports-live (freelance, used at a
  real tournament), so a Freelance experience entry was added (§4.3, FL-2). Burp Suite and Nmap are
  confirmed; Metasploit, Wireshark and ZAP are dropped. CodeForge: Kartik built and presented the platform;
  worded as a team win with no repo link. FTL had ~70 participants. WhatsApp bounty was in 2022. 35+
  Workspace accounts. Kartik led the Taqneeq facial-recognition photo team. ballast was a hackathon
  project (pitched to judges). Mailcow with SPF/DKIM/DMARC serves 7–9 committees. Not active on
  CP sites.
- **2026-10-30**: New facts *(per Kartik)*: VisionRise GitHub org = 15 repositories, ~5–10 members
  (VR-6); sports-live was used at ELEV8, ~200 players in 8 teams (FL-2); ACM: every member gets an
  @mpstmeacm.com mailbox on Mailcow, a members-only Minecraft server with membership authentication
  (2026–27), Discord bots for onboarding and position/department access (LD-4a, P14); flap is playable at
  `ssh jkartik.in` (P21). Résumé system: general résumé rewritten (A4, XCharter, ATS-checked 98/100),
  role résumés in `resume/roles/`, long-form portfolio in `resume/portfolio/`, all served from
  jkartik.in/resume/; added `scripts/ats-check.mjs`. Answered Q-github-org and Q-sports; added Q-mc-auth.
- **2026-10-30**: CGPA corrected 8.24 → **8.34/10.0** *(per Kartik)* in §10, §12 and every résumé.
- **2026-10-30**: Freelance dates set to **May 2025 – Oct 2026** (§4.3): the political-party engagement ran May – Jun 2025, about one month *(per Kartik)*. Q-freelance-stack narrowed to the stack only.
- **2026-10-30**: Résumé audit across all six versions. Added HTML/CSS/Tailwind to §9 from sole-authored repos. flap (P21) corrected: not multiplayer. ~200 players kept approximate. CodeForge marked as a team win, Technical Head roles shown as past, graduation shown as Expected Apr 2028.
- **2026-10-30**: Made this file a standalone database for any AI tool and any document *(per Kartik)*: new header, §0.0 (start here), §0.7 (ask first), §0.8 (what to use per document), rules 13–14, and an Interests row in §1.
- **2026-10-30**: Added dependency scanning at R.U.D.R.A (RU-6, §9) and open-source contributor (§1) *(per Kartik)*.
- **2026-10-30**: Published version (Kartik keeps the repo public and wants this file public and AI-ready):
  `MARKET.md` removed from the repo, inline source
  notes moved out of the body (sources live in this changelog), limits rewritten as positive wording rules,
  RU-5 retired, X kept for profile metadata only (not in the site menu). GhostShare wording stays as is (Kartik's call).
- **2026-10-30**: Answers *(per Kartik)*: Minecraft access = Discord account linking through the ACM bot, which only exists in the ACM server (LD-4a, P14); ~250 member mailboxes; committees sharing the mail server include Taqneeq, Sattva and Social Conclave; the 2025 political-party platform was Flask + MongoDB; motivation "I like to break stuff" (§1). Closed Q-mc-auth and Q-freelance-stack. /hire/ rebuilt as a client-facing showcase; the client and committee sites Kartik listed may be named there.

- **2026-10-30**: Six client testimonials approved for jkartik.in/hire (KHOY, Schon Zapato, ELEV8, Marketing Machines, AI4HCE Symposium, Social Conclave; source: Kartik). Quotes live in `src/data/hire.ts`; use them in proposals and cover letters with the same attributions.
- **2026-10-30**: Added client and company sites P22–P26 from the verified jkartik.in/hire showcase (source: git history, site credits, Kartik's list). §11: mpstmestudentcouncil.com marked parked; client sites added.
- **2026-10-30**: Schon Zapato revamp (P23) confirmed solo (source: Kartik).
- **2026-10-30**: jkartik.in/hire now links fest sites by their real domains (Social Conclave, Sattva, Mumbai MUN, Taqneeq), with screenshots of the edition Kartik worked on (source: Kartik). Added Taqneeq to the showcase.
- **2026-11-02**: Won first prize at MAL 4 (AW-9), with P27 added as Tier A. New skills: system design (HLD/LLD/ADRs), concurrency and reliability patterns. Sources: Kartik, the winner's cheque photo, mobilearchitecturelab.com/mal4, the repo's docs and `as-built.md`. Commit history is one team commit plus Kartik's documentation commit, so ownership stays at team level until Q-mal-role is answered.
- **2026-11-02**: Rule 15 added (source: Kartik): hackathon wins go only where they read well, otherwise one combined count.

