---
title: "Discord onboarding bots"
description: "Bots that replace the registration desk on college Discord servers: one unique invite per person, and roles, channels and real-name nicknames set automatically the moment they join. One of them onboarded 1,100+ hackathon participants."
tag: "Automation"
cover: "/projects/discord-bots.png"
source: "https://github.com/MPSTME-ACM/acm-cord"
stack: ["Python", "discord.py", "PostgreSQL", "SQLModel", "SMTP", "Docker"]
role: "Solo"
year: "2024–2026"
status: "In use"
order: 16
---

Every committee I've been part of runs on Discord, and every one of them had the same problem at the start of the year: a few hundred new people join, nobody knows which username is which person, and someone on the committee spends an evening handing out roles by hand. I've written the same fix a few times now, for different groups.

## The idea

Instead of one public invite link, the bot makes a **unique invite for each person** and sends it to them. When someone joins, the bot works out which invite they used, looks up who it belonged to, and sets them up: their real name as the nickname, the right roles, and access to the right channels. Then it deletes the invite, so the link can't be passed on.

Organizers register people with a `!register` command, or in bulk from a CSV through a webhook, so a whole intake can be queued up before anyone joins.

## The bots

- **[tq-dc-bot](https://github.com/taqneeq/tq-dc-bot)** for CyberCypher, Taqneeq's cybersecurity hackathon. It onboarded **1,100+ participants**: each one renamed with their team ID and name, and given access to their own team's voice channel, which it created on demand. Discord caps a server at 250 roles, so one role per team was impossible; instead each team channel gets per-member permission overwrites, plus one organizer role that can drop into any channel to check on a team.
- **[acm-cord](https://github.com/MPSTME-ACM/acm-cord)** for ACM MPSTME. It onboards the chapter's executives, core and supercore members: a role for their position, a role for their department (which opens that department's channels), a nickname like `[Tech] Name`, and an HTML invite email. It stores members in PostgreSQL and ships as a Docker image with a health check, so the platform it's deployed on can tell when it's actually connected to Discord. It replaced my earlier Java bot ([acm_bot](https://github.com/MPSTME-ACM/acm_bot)) from 2024–25.
- **[muncord](https://github.com/munsoc-mpstme/muncord)** for the MUN Society, the same design adapted to its departments and positions.

I wrote about how acm-cord fits into the rest of the chapter's setup in [Running MPSTME ACM on its own infrastructure](/blog/running-mpstme-acm-on-its-own-infrastructure/).

> The registration desk at a hackathon exists to match a face to a name to a team. A unique invite link does the same job, and it doesn't need a table.
