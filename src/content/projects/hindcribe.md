---
title: "hindcribe"
description: "Offline Hindi speech-to-text and Hindi→English translation — no API keys, no cloud, built for a government grievances hackathon."
tag: "ML"
cover: "/projects/hindcribe.png"
stack: ["Python", "Flask", "Vosk", "Argos Translate", "FFmpeg"]
role: "Solo"
year: 2024
status: "Hackathon build"
source: "https://github.com/KartikJain14/hindcribe"
order: 12
---

Public-grievance audio comes in Hindi, and the systems that need to read it want English text — but you can't ship citizens' recordings off to a third-party cloud API. hindcribe does the whole pipeline on-device: upload a Hindi audio clip and get back both a Hindi transcript and an English translation, with nothing ever leaving the machine.

## What it does

- **Upload → transcript → translation** — drop an MP3, get Hindi text (Vosk) and an English rendering (Argos Translate) back.
- **Fully offline, open-source stack** — no OpenAI, no Google Cloud, no keys. Everything runs locally, which is the point for anything touching citizen data.
- **Normalizes messy input** — FFmpeg converts whatever audio format shows up into the WAV shape the recognizer expects before it ever hits the model.

## How it fits together

It's a small, honest pipeline where each stage does one thing: FFmpeg for audio prep, Vosk for offline ASR, Argos (vendored, so it works with no network) for translation, Flask to glue it into a web UI. Each utility has its own unit tests — for a hackathon build, having the transcription and translation steps individually verifiable saved a lot of "why is the output garbage" debugging.

## Context

Built for **DARPG 2024**, the government's public-grievances hackathon — where "don't send the data to a cloud you don't control" isn't a nice-to-have, it's the whole constraint.

> The interesting part wasn't the models — it was proving you can do useful Hindi ASR and translation with an entirely offline, auditable stack.
