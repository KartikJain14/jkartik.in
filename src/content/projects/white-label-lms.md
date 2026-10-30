---
title: "Rise Academy & eGuru"
description: "A white-label learning platform I built at VisionRise Technosoft: one TypeScript backend and one React Native app, shipped to Google Play as two branded apps."
seoDescription: "A white-label learning platform built at VisionRise Technosoft: one TypeScript backend and one React Native app, shipped on Google Play as two apps."
tag: "Backend & mobile"
cover: "/projects/white-label-lms.png"
live: "https://play.google.com/store/apps/details?id=tech.riseinstitute.app"
stack: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Drizzle", "React Native", "Expo", "FFmpeg", "Google Cloud Storage"]
role: "Software Engineer Intern, VisionRise Technosoft"
year: 2026
status: "Live on Google Play"
order: 2
---

During my internship at VisionRise Technosoft I built the company's learning platform end to end: the API, the database, the app, the video pipeline and the server it runs on. It is white-label by design, so the same codebase ships as two branded apps on Google Play: [Rise Academy](https://play.google.com/store/apps/details?id=tech.riseinstitute.app) and [eGuru](https://play.google.com/store/apps/details?id=app.eguru.lms). The source is private, so this page covers what it does and the decisions behind it.

## What it does

- **One app, two brands, three platforms.** A single React Native/Expo codebase runs on Android, iOS and the web. eGuru is a rebranded fork of the same code, not a second project.
- **A backend with real scope.** A Node.js/Express/TypeScript API with **276 routes** across **20 domain modules**: courses, modules, lessons, enrollments, quizzes, assignments, certificates, payments, live classes, notifications, analytics, reports, audit and more. PostgreSQL with Drizzle migrations underneath, and Zod validating every input at the boundary.
- **Auth for students who don't want another password.** Google Sign-In, or a PIN with the phone number verified over WhatsApp. JWT access and refresh tokens on top, role-based access for admins, instructors and students, and an audit log on admin actions.
- **Live classes.** I built the first version of live classes on Zoom: signature-verified webhooks, attendance, recordings, and quizzes generated from the class content with Gemini.
- **Everything a course business needs around the content.** UPI payment verification, bulk enrollment, push and email notifications, certificates, and over-the-air app updates so a fix doesn't wait for a store review.

## Protecting paid content

The content is what students pay for, so it shouldn't be one right-click away from a torrent. Uploaded videos go through an FFmpeg pipeline that transcodes them to **AES-128-encrypted HLS**. Playback needs a per-session token that the server checks on every segment request, and the files themselves sit behind short-lived signed Google Cloud Storage URLs. PDFs stream inside the app with no download button to find. Certificates carry a SHA-256 hash, so a certificate can be verified rather than just trusted.

None of this makes copying impossible, because a determined user can always film a screen. What it does is remove the easy paths: no shareable file URL, no token that outlives the session, no segment served to someone who isn't watching.

## Running it

I also ran the production side: an Ubuntu 24.04 LTS server with the apps and PostgreSQL deployed through Coolify, and automated backups to Google Cloud Storage. Alongside the platform I built the [eguru.app](https://eguru.app) marketing site (Next.js, static export) and a clickable government procurement prototype (FastAPI and React) for a client demo.

> The interesting part wasn't any single feature. It was keeping 276 routes consistent enough that a second brand could ship from the same code without a fork turning into a rewrite.
