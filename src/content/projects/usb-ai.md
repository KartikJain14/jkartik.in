---
title: "usb-ai"
description: "A coding assistant that runs fully offline — the whole language model shipped inside a single Windows .exe that never touches the network."
tag: "AI"
cover: "/projects/usb-ai.png"
stack: ["Python", "llama.cpp", "Gemma-2", "PyInstaller"]
role: "Solo"
year: 2026
status: "Personal project"
source: "https://github.com/KartikJain14/usb-ai"
order: 10
---

Every "local" AI tool I tried still phoned home for something. usb-ai doesn't — it *can't*. It's a coding assistant where the model itself is baked into one Windows executable you can carry on a USB stick, run on an air-gapped machine, and trust to never send a byte anywhere.

## What it does

- **The model ships inside the binary** — a quantized Gemma-2-2B GGUF is embedded into a single PyInstaller `--onefile` `.exe`. No install, no download, no runtime dependencies.
- **Genuinely offline** — there is no network code. On an air-gapped box it behaves exactly the same as online, because "online" was never a state it has.
- **A real terminal chat** — streaming token output with live Markdown rendering and syntax highlighting, multiline editing, and slash commands, all in the console.

## The interesting bit

Embedding a multi-hundred-MB model into a onefile binary and loading it at runtime meant working *with* PyInstaller's extraction, not against it — resolving the GGUF out of the temporary `_MEIPASS` bundle, patching Windows console handles so the rich TTY UI behaves, and silencing llama.cpp's C-level stderr so the chat stays clean.

## What I'd do differently

The embedded model is fixed at build time; a small loader that reads a GGUF sitting next to the exe would let you swap models without a rebuild — trading the "single file" purity for flexibility. For the air-gapped use case, I still like the purity.

> The whole pitch is a threat model, not a feature list: a coding assistant you can run somewhere with no network and be certain it isn't exfiltrating your code, because there's nothing in it that could.
