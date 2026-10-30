---
title: "MPSTME ACM infrastructure"
description: "The self-hosted platform I set up as ACM MPSTME's Webmaster and now run as Chairperson: Coolify for deploys, a Mailcow mail server shared by 7–9 college committees, an @mpstmeacm.com inbox for every member, and members-only Discord and Minecraft."
seoDescription: "The self-hosted platform I run for ACM MPSTME: Coolify deploys, a Mailcow server shared by college committees, member inboxes, Discord and Minecraft."
tag: "Infra"
cover: "/projects/acm-infrastructure.png"
stack: ["Coolify", "Mailcow", "Docker", "Linux", "SPF / DKIM / DMARC", "GitHub Actions", "Python"]
role: "Webmaster, now Chairperson"
year: "2025–present"
status: "In use"
order: 10
---

A student chapter's tech usually lives on whoever's personal accounts set it up, and leaves when they graduate. When I became ACM MPSTME's Webmaster in 2025, I moved the chapter onto infrastructure it runs itself. I still run it now as Chairperson, and it has grown well past ACM.

## What it runs

- **Coolify, a self-hosted PaaS.** The chapter's apps deploy from the chapter's GitHub organization, which I set up along with its GitHub Apps and CI/CD. It hosts the [chapter website](https://mpstmeacm.com), the Discord bot, and apps for other committees and clubs, including the college's [Railway Concession](/projects/railway-concession/) system.
- **Mailcow, our own mail server.** I configured SPF, DKIM and DMARC myself so mail from it is actually delivered. It now handles mail for **7–9 college committees**.
- **An @mpstmeacm.com address for every member.** Each ACM member gets their own mailbox on that server. Because it's self-hosted, adding a member doesn't add a per-seat licence.
- **A members-only Discord.** Custom bots onboard new members and grant channel access by position and department, so nobody hands out roles by hand. More on that on the [Discord bots](/projects/discord-bots/) page.
- **A members-only Minecraft server** for 2026–27: players must link their Minecraft account to Discord through the chapter's bot, which exists only inside the ACM Discord server, so only members can get in.

## Why it matters

None of these is hard on its own. What matters is that the chapter owns them: the domain, the mailboxes, the deploy platform and the community spaces stay with ACM when a committee hands over to the next one, and other committees can use them without each paying for their own.

I wrote the full story (what I set up, what I learnt about email deliverability, and who depends on it now) in [Running MPSTME ACM on its own infrastructure](/blog/running-mpstme-acm-on-its-own-infrastructure/).

> Self-hosting doesn't remove the cost. It turns a monthly bill into a responsibility, and someone has to take that responsibility on.
