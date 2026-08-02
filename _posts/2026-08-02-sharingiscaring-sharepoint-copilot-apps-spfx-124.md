---
title: "SharePoint Copilot Apps: build interactive Copilot UI with SPFx (preview)"
author: valeras
date: 2026-08-02 09:00:00 +0300
categories:
  - SharingIsCaring
  - AI
  - Microsoft365
tags:
  - sharepoint
  - spfx
  - copilot-apps
  - m365-copilot
  - declarative-agents
  - sharingiscaring
pin: false
slug: sharepoint-copilot-apps-spfx-124-preview
comments: true
image:
  path: /img/posts/sharepoint_copilot_apps.png
  alt: SharePoint Copilot Apps rendering interactive UI inside Microsoft 365 Copilot
---

## Summary

For years SPFx has been the way to extend the *SharePoint* experience. With **SharePoint Copilot Apps** — shipping in the **SharePoint Framework v1.24 preview** — you can now use those exact same skills to extend **Microsoft 365 Copilot** with custom, interactive UI. Instead of Copilot replying with plain text, your solution can render a rich, branded component right inside the Copilot conversation. This post explains what Copilot Apps are, how they relate to web parts, and how to get started.

> SharePoint Copilot Apps are in **preview** and subject to change. Don't use them in production — APIs, schemas, and the \"SharePoint Copilot Apps\" working name may change before GA.
{: .prompt-warning }

---

## What is a SharePoint Copilot App?

A **SharePoint Copilot App** packages two things together:

1. One or more **Copilot components** — client-side UI components that render *inside* Microsoft 365 Copilot.
2. A **declarative agent** definition that makes those components discoverable and callable from within a Copilot conversation.

You build them with the **same toolchain you already know**: `heft`, TypeScript, SCSS, and the `@microsoft/sp-*` libraries. You package them as a standard SharePoint solution package (`.sppkg`) and deploy them through the **SharePoint app catalog** you already use.

Where SPFx web parts and extensions extend the *SharePoint* UX, Copilot Apps extend the *Microsoft 365 Copilot* UX.

---

## Build once, reach every surface

The key SPFx idea still applies: your UX components aren't tied to a single host. SPFx separates the **hosting** concern from the **UI** concern using different base classes:

| Base class | Hosts your UI in |
|---|---|
| `BaseCopilotComponent` | The Microsoft 365 Copilot canvas |
| `BaseClientSideWebPart` | A SharePoint page |

Each base class adapts the component to its host, but what they host can be the **same underlying UX component** (React, Angular, Vue, or Svelte). Factor your interface, business logic, and styling into shared, framework-agnostic components, and reuse them across **Copilot, SharePoint, and Teams** for a consistent experience wherever people work.

Because a Copilot App is still just an `.sppkg`, you can **move it between tenants** by deploying the same package to another tenant's app catalog.

---

## What you can do with them

- **Render rich, interactive UI inside Copilot** — surface custom, branded experiences instead of plain text.
- **Ship agent logic and UI together** — one package contains both the declarative agent definition and the components it renders.
- **Reuse your SPFx skills** — same project structure, build tooling, and deployment pipeline.
- **Move across tenants easily** — standard `.sppkg` deployment.
- **Share the same UX across surfaces** — build once, reuse in Copilot, SharePoint, and Teams.

---

## How to get started

1. Set up an SPFx **v1.24 preview** development environment.
2. Scaffold a **Copilot component** and its declarative agent definition.
3. Run and test it locally in the **Copilot Workbench**.
4. Package as `.sppkg` and deploy to your tenant's app catalog.
5. Surface it in Microsoft 365 Copilot.

Microsoft has a step-by-step tutorial — *Build your first SharePoint Copilot App* — linked in the references below.

---

## Preview limitations to know before you build

- **Rollout:** end-user availability rolled out globally and was expected to be fully functional worldwide by **July 20, 2026**.
- **Copilot canvas only (for now):** in this initial preview, components render only in the Copilot UX; support for more surfaces is in the works.
- **Duplicate tool names:** if two solutions register a tool with the same name, Copilot loads the first one it finds. This is a known preview-only issue with a fix targeted for **August 2026**.
- **Store not supported:** distributing Copilot Apps through the store isn't supported during public preview.
- **Preview software:** capabilities, APIs, and the working name may change before GA.

---

## Why this matters

If your team already ships SPFx web parts, Copilot Apps are the shortest path to a genuinely interactive Copilot experience — no new hosting model, no new build pipeline, no separate app to maintain. You reuse the components, the `.sppkg`, and the app catalog you already run. That's a big deal for M365 shops that want Copilot to *do* something visual and branded, not just answer in text.

---

## References

- [Overview of SharePoint Copilot Apps](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/copilot/overview-copilot-apps)
- [Build your first SharePoint Copilot App (tutorial)](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/copilot/get-started/build-your-first-copilot-app)
- [SharePoint Framework v1.24 release notes](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.24.0)
- [Going beyond text in Microsoft 365 Copilot: Introducing SharePoint Copilot Apps](https://devblogs.microsoft.com/microsoft365dev/going-beyond-text-in-microsoft-365-copilot-introducing-sharepoint-copilot-apps/)

---

## Image Prompt

```
Clean flat 2D digital graphic, wide banner 16:9 aspect ratio.
Scene: a Copilot chat window on the right rendering a rich interactive UI card, on the left an SPFx package block connected by clean lines feeding into it, small SharePoint and Teams surface tiles reusing the same card. Front-on view, simple geometric shapes.
Colour palette: soft blue (#4C8DFF), warm amber (#FFB454), on a dark charcoal background (#1E2128).
Style: minimal modern flat design, smooth solid colour shapes, crisp geometric edges, no outlines, no gradients, no shadows, no 3D, no hand-drawn or sketchy look.
Mood: modern, capable, developer-friendly.
No text. No logos.
```
