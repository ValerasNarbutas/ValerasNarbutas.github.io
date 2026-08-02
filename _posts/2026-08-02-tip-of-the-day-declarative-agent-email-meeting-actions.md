---
title: "Tip of the day – Declarative agents can now act on email and meetings (manifest 1.8)"
author: ValerasNarbutas
date: 2026-08-02 08:00:00 +0300
categories:
  - TipOfTheDay
  - AI
  - Microsoft365
tags:
  - m365-copilot
  - declarative-agents
  - copilot-extensibility
  - email-actions
  - meeting-actions
  - tipoftheday
pin: false
slug: tip-declarative-agent-email-meeting-actions-1-8
comments: true
image:
  path: /img/posts/declarative_agent_1_8_actions.png
  alt: Declarative agent manifest 1.8 adding email and meeting actions
---

## Tip

Until now, declarative agents in Microsoft 365 Copilot were great at *reading* and *answering* — but taking action on your mailbox or calendar meant wiring up API plugins. With **declarative agent manifest schema version 1.8** (July 2026), two new built-in capabilities change that: **`EmailActions`** and **`MeetingActions`**. Your agent can now triage mail and schedule meetings without custom plumbing.

---

## What's new in manifest 1.8

Schema 1.8 adds two capabilities on top of [version 1.7](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/declarative-agent-manifest-1.7):

| Capability | What it enables |
|---|---|
| **`EmailActions`** | Write operations on email — triage, supervised send, delete, inbox rules, auto-reply, and folder management |
| **`MeetingActions`** | Meeting and calendar actions — scheduling events, creating time-finding polls, and surfacing time insights |

Two smaller additions also landed this cycle:

- A `file` property on the worker agent object, as an alternative to `id`, so you can reference worker agents by **file path**.
- An `embedded_resource_snapshot_id` property on the embedded knowledge object.

---

## Adding the capabilities

Declarative agent capabilities are declared in the `capabilities` array of the manifest. Conceptually, enabling the new ones looks like this:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/copilot/declarative-agent/v1.8/schema.json",
  "version": "1.8",
  "name": "Inbox & Calendar Assistant",
  "description": "Helps triage email and schedule meetings.",
  "instructions": "You help the user keep their inbox tidy and set up meetings.",
  "capabilities": [
    { "name": "EmailActions" },
    { "name": "MeetingActions" }
  ]
}
```

> Always confirm the exact object shape for each capability against the official schema before you build — the manifest reference and JSON Schema links are below.
{: .prompt-tip }

---

## Why this is useful

- **Fewer moving parts** — common inbox/calendar actions are built in, so you don't need a custom API plugin for everyday scenarios.
- **Supervised send** — the agent can draft and send with the user in the loop, which is the right default for anything that leaves your mailbox.
- **Real assistant behaviour** — time-finding polls and scheduling turn a Q&A agent into something that actually books the meeting.

---

## Before you ship

- Set your manifest `version` to `1.8` and point `$schema` at the v1.8 schema.
- Review each capability's exact properties in the manifest reference.
- Remember that write actions on email and calendar deserve careful testing — start with supervised flows.

---

## References

- [Declarative agent schema 1.8](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/declarative-agent-manifest-1.8)
- [What's new for Microsoft 365 Copilot developers](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/whats-new)
- [v1.8 JSON schema](https://developer.microsoft.com/json-schemas/copilot/declarative-agent/v1.8/schema.json)

---

## Image Prompt

```
Clean flat 2D digital graphic, wide banner 16:9 aspect ratio.
Scene: a friendly robot assistant at the centre with two action panels beside it — an email envelope with triage arrows and an inbox rule, and a calendar with a scheduled event and a time-poll. Front-on view, simple geometric shapes.
Colour palette: soft blue (#4C8DFF), warm amber (#FFB454), on a dark charcoal background (#1E2128).
Style: minimal modern flat design, smooth solid colour shapes, crisp geometric edges, no outlines, no gradients, no shadows, no 3D, no hand-drawn or sketchy look.
Mood: helpful, capable, modern.
No text. No logos.
```
