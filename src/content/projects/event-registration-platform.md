---
title: "Event registration platform"
description: "Paid event registration end to end: Cashfree payments with verified webhooks, QR tickets emailed on confirmation, and an admin sales dashboard."
tag: "Payments"
cover: "/projects/event-registration-platform.png"
stack: ["Node.js", "PostgreSQL", "Cashfree", "QR", "Nodemailer"]
role: "Full-stack (co-lead)"
year: 2025
status: "Shipped"
order: 8
---

Taking money for events sounds simple until you realise the browser lies — users close the tab mid-payment, lose signal on the success page, and double-click checkout. This platform runs paid registration from checkout to the gate, and most of the care goes into making sure a ticket exists exactly when a payment does. I co-led the build.

## What it does

- **Cashfree payments with verified webhooks** — a registration is confirmed only when Cashfree's HMAC-signed webhook says the payment cleared, not when the user lands on the success page.
- **QR tickets** — generated and emailed on confirmation, then validated at the gate with idempotent check-ins so a re-scan can't mark someone in twice.
- **An admin dashboard** for live sales and attendance, with registrations synced out to Google Sheets for the organizers who live in spreadsheets.
- **Magic-link login** for members, so there's no extra password to manage.

## The part that matters

The payment webhook is the source of truth, not the browser. Confirmation, ticket generation, and the email all hang off the verified webhook — so a closed tab or a flaky connection never leaves someone charged without a ticket, or holding a ticket they didn't pay for.

> Anything that decides whether money changed hands belongs on the server, behind a signed webhook — never on a redirect the user's browser might never reach.
