---
title: "An inbox for every member: running MPSTME ACM on its own infrastructure"
description: "How I set up Coolify and a Mailcow mail server for ACM MPSTME as Webmaster, what email deliverability actually takes, how Discord onboarding and a members-only Minecraft server fit in, and why seven to nine committees now depend on it."
date: 2026-10-30
tag: "Infra"
cover: "/blog/acm-infra-cover.png"
---

A student chapter changes hands every year. The people who set things up graduate, and whatever lived on their personal accounts tends to leave with them: the hosting, the domain settings, the one inbox everybody used, the bot running on someone's laptop.

When I became ACM MPSTME's Webmaster in July 2025, I wanted the chapter's tools to belong to the chapter. So I set up infrastructure that ACM runs itself: **Coolify** to deploy things, and **Mailcow** to handle mail. A year later I'm the chapter's Chairperson and I still run it, and it has grown well beyond ACM. It now handles mail for **seven to nine college committees**, and every ACM member gets their own **@mpstmeacm.com** address on it.

This is what that setup is, what I learnt putting it together, and why I think it's one of the more useful things the chapter owns.

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/blog/acm-infra-stack-m.png" />
    <img src="/blog/acm-infra-stack.png" alt="Three boxes. Coolify, a self-hosted PaaS for app deploys and TLS, runs the chapter website, committee and club apps, and the Discord bot. Mailcow, the chapter's own mail server with SPF, DKIM and DMARC, gives every member an @mpstmeacm.com inbox and handles mail for 7–9 committees. Members-only spaces, Discord and Minecraft, give roles by position and department and check membership at login. Footer: no per-seat licence for any of it." />
  </picture>
  <figcaption>Two platforms and two members-only spaces. None of it is billed per person.</figcaption>
</figure>

## A place to deploy: Coolify

[Coolify](https://coolify.io) is an open-source, self-hosted platform-as-a-service. You give it a server, point it at a repository or a Dockerfile, and it builds the app, runs it in a container, and puts it behind a reverse proxy with HTTPS certificates it renews on its own. It's the Vercel or Heroku experience on hardware you control.

I set up the chapter's GitHub organization at the same time, with its GitHub Apps and CI/CD, so the code and the place it runs both belong to ACM rather than to whoever happened to write it. Coolify now runs the chapter website, the chapter's Discord bot, and apps for other committees and clubs, including the college's [Railway Concession](/projects/railway-concession/) system.

One detail from this setup worth copying is the health check. A Discord bot has no web server, so by default there's nothing for the platform to probe, and a bot that has lost its connection to Discord still looks "running". So [acm-cord](https://github.com/MPSTME-ACM/acm-cord), our bot, serves a tiny endpoint that reports whether it's actually connected:

```python
async def health(_request):
    ready = bot.is_ready() and not bot.is_closed()
    return web.json_response(
        {"status": "ok" if ready else "starting", "ready": bot.is_ready()},
        status=200 if ready else 503,
    )
```

The Docker image's `HEALTHCHECK` probes it every 30 seconds, so "running" in the dashboard means connected to Discord, not just that the process exists.

## A place for mail: Mailcow

[Mailcow](https://mailcow.email) is an open-source mail server suite that runs in Docker: Postfix to send and receive, Dovecot for mailboxes, Rspamd for spam filtering, and a webmail client, managed from one admin panel.

Running it is the easy part. Getting mail from it into people's inboxes instead of their spam folders is the actual work, because email is a reputation system. A receiving server has no reason to trust a message from a domain it has never heard of, so you have to give it reasons. That comes down to three DNS records, which I configured myself:

```txt
mpstmeacm.com.          TXT  "v=spf1 mx ~all"
dkim._domainkey         TXT  "v=DKIM1; k=rsa; p=MIIBIjANBg…"   (2048-bit key)
_dmarc                  TXT  "v=DMARC1; p=quarantine; rua=mailto:…; fo=1"
```

- **SPF** lists which servers may send mail for the domain. Ours says: only the domain's own mail server, and treat anything else with suspicion.
- **DKIM** is a signature. Mailcow signs every outgoing message with a private key, and receivers check it against the public key published in DNS, so they know the message wasn't altered and really came from us.
- **DMARC** ties the two together and tells receivers what to do when a message claiming to be from us fails both. Ours says quarantine it, and send us reports. Those reports are how you find out who is sending mail in your name, including people who shouldn't be.

The DNS records are only the minimum, though. They make your mail *eligible* to be trusted; they don't make it trusted. Reputation builds up from how the server behaves over time, and since seven to nine committees now send through the same server, it's a shared reputation. One committee blasting a stale mailing list affects everyone else's deliverability, so running the server also means paying attention to how it's being used.

<div class="admonition info">

**The records above are public.** Anyone can look up a domain's SPF, DKIM and DMARC records, and checking them for a domain you care about is a good habit. Nothing in this post goes beyond what DNS already publishes.

</div>

## An inbox for every member

Because the mail server is ours, every ACM member gets their own **@mpstmeacm.com** address, hosted and managed on that same Mailcow.

Hosted email is priced per seat. For a chapter of about 250 members, a mailbox each would be a monthly bill the chapter could never justify. Self-hosted, a new mailbox costs a few clicks in the admin panel and no licence fee. Members get an address that says they're writing on behalf of the chapter, and the chapter decides what happens to those addresses, not a billing page.

## Discord: onboarding without a registration desk

The chapter's Discord is organised around departments and positions, so access matters: a Tech executive should see the Tech channels, and what else they see depends on their position. Handing that out by hand to every new member at the start of the year is a slow evening with a lot of mistakes, so a bot does it.

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/blog/acm-infra-onboarding-m.png" />
    <img src="/blog/acm-infra-onboarding.png" alt="Onboarding flow in six steps: register a member with a command or webhook (department, email, name); 1, the bot creates a unique invite that expires in 7 days; 2, the invite link is emailed to them; 3, they join and the bot works out which invite was used; 4, it assigns their position role (Exec, Core or SC) and department role and sets their nickname to [Dept] Real Name; 5, it deletes the invite so the link can't be passed on." />
  </picture>
  <figcaption>The bot does in seconds what a registration desk does in a queue.</figcaption>
</figure>

An organizer registers a member with a command, or a script registers a whole intake from a CSV through a webhook. For each person the bot creates a unique invite that expires after seven days, saves it against their name, department and position in PostgreSQL, and emails it to them. When someone joins, the bot looks at which of its invites was just used, finds the member it belongs to, gives them their position role (executive, core or supercore) and their department role, renames them to their real name with a department tag, and deletes the invite.

It's a heuristic rather than a guarantee: Discord doesn't tell a bot which invite a new member used, so the bot infers it from invite use counts, and two joins in the same instant could be mixed up. In exchange, nobody has to match usernames to people by hand.

acm-cord isn't the first version of this idea. I wrote the first one in Java for the 2024–25 committee, and the same pattern has run the MUN Society's Discord and Taqneeq's CyberCypher hackathon, where it onboarded **1,100+ participants** into their team channels. The [Discord bots](/projects/discord-bots/) page has the details of each.

## A Minecraft server, for members only

For 2026–27 the chapter also runs a Minecraft server that only ACM members can play on. Knowing the address isn't enough: before you can play, you have to link your Minecraft account to your Discord account, and the only way to do that is through the chapter's Discord bot.

That bot lives only in the ACM server, so nobody outside the chapter can even message it. Being in the ACM Discord is already proof of membership, because onboarding is how you get in, so the Minecraft server doesn't need a member list of its own. It reuses the one the chapter already maintains.

It's the least "infrastructure" thing on this list, but it follows the same rule as everything else here. Access comes from being a member of the chapter, and the chapter controls the list.

## Who depends on it now

What started as ACM's setup has become shared infrastructure:

- **ACM itself**: the chapter website, a mailbox for every member, the Discord bot and the Minecraft server.
- **Seven to nine college committees and fests**, including Taqneeq, Sattva and Social Conclave, that send and receive their mail through the same Mailcow server.
- **Apps for other committees and clubs**, deployed on Coolify, including the Railway Concession system that MPSTME students use.

That changes what a mistake costs. When it was only ACM's mail, a bad day was ACM's problem. Now a mistake on that server reaches committees I'm not part of.

## What I learnt

**Self-hosting doesn't remove the cost, it changes who pays it.** Instead of a monthly bill there's an operator: someone who patches the server, watches the mail queue and answers when a committee's mail stops arriving. I wrote about the same idea from a different angle in [When a form becomes infrastructure](/blog/when-a-form-becomes-infrastructure/). The software is only half of what you're responsible for.

**Email is the part that never stays done.** Not because Mailcow is difficult, but because deliverability isn't something you configure once. SPF, DKIM and DMARC get you in the door; how the server is used decides whether you stay.

**Automate the people work.** Some of the most useful code in this setup isn't infrastructure at all. It's the bot that turns "please give me access to the Tech channels" from a message someone has to answer into something that has already happened by the time they join.

**The real test is the handover.** None of this matters if it only works while I'm around. The whole point of moving the chapter onto infrastructure it owns is that the next team can pick it up, so it has to make sense to someone other than the person who built it.

The project summary is on [the MPSTME ACM infrastructure page](/projects/acm-infrastructure/).
