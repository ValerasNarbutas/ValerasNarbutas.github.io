---
title: "SharePoint Copilot Apps: build interactive Copilot UI with SPFx (preview)"
author: ValerasNarbutas
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

## Anatomy of a Copilot App

A Copilot App project looks a lot like an SPFx solution you've built before, with a couple of new pieces. The declarative agent definition lives in a dedicated `copilot` folder, and the component source sits under `src/copilotComponents`.

The `copilot` folder holds the agent side of the app:

| File | Purpose |
|---|---|
| `manifest.json` | The Teams / Microsoft 365 app manifest that registers the declarative agent (name, description, icons, identifiers). |
| `declarativeAgent.json` | The agent definition — name, instructions, conversation starters, and actions. You get the **full** declarative agent schema here, not a reduced subset. |
| `ai-plugin.json` | Describes the agent's actions to the model. |
| `instruction.txt` | Natural-language instructions that shape the agent's behaviour. |

Because you author `manifest.json` and `declarativeAgent.json` yourself, a Copilot App is a *full* declarative agent — you can add knowledge sources, extra actions, and conversation starters. The SPFx components are one part of a broader agent you control. Components are grouped into the agent through `copilot-agent.json`, and at build time the toolchain merges your agent definition with the components (and their tools/properties) into the `.sppkg`.

---

## Key concepts worth knowing up front

### Two display modes

A Copilot component declares the layouts it supports via the `availableDisplayModes` capability in its manifest:

- **`inline`** — renders compactly within the conversation flow (the default).
- **`fullscreen`** — expands to take over the Copilot surface for richer interactions.

The host owns layout. Your component reads the current mode from `this.hostContext.displayMode` and can *request* expansion with `this.requestDisplayModeAsync('fullscreen')`; collapsing back is always host-initiated and arrives via `onHostContextChanged`.

```json
// component manifest (excerpt)
"capabilities": {
  "availableDisplayModes": ["inline", "fullscreen"]
}
```

### Multiple tools in one package

One Copilot App can expose **multiple tools** from a single package. Each component declares one or more tools in its manifest, and each tool becomes an action the declarative agent can invoke — so you can group related capabilities (e.g. a "status" tool and a "reporting" tool) into one deployable unit that shares build output, hosting, and lifecycle.

### Parameterized initial rendering

Each tool can define a properties schema. When the agent invokes a tool, Copilot passes those properties into the component, which reads them from `this.properties` to drive its first render — so the same component can serve many scenarios without shipping a separate component for each.

```ts
protected render(): void {
  const message: string = this.properties.message;
  // ...use properties to drive the initial render
}
```

### Automatic hosting in the customer tenant

Set `includeClientSideAssets` to `true` in `package-solution.json` and the component's JavaScript is bundled into the `.sppkg` and hosted **inside the customer's own tenant** — no external CDN, Azure Storage, or separate hosting to provision.

```json
"solution": {
  "includeClientSideAssets": true
}
```

### Declarative agent synced to the tenant agent catalog

When you deploy the package to the **SharePoint app catalog**, the declarative agent is automatically synced to the tenant's agent catalog — there's no separate publish step in Copilot or the Teams admin center. Updating or removing the app updates or removes the agent too.

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
2. Scaffold a new Copilot App with the SharePoint Framework generator. It offers **three starter templates**, just like web parts:
   - **Minimal** — the leanest starting point, only the code needed to render a component.
   - **No framework** — plain TypeScript, no UI framework, full control over rendering.
   - **React** — a React-based starting point for teams already on React.
3. Run your dev server with `heft start --nobrowser` and open the **Copilot Workbench** at `/_layouts/15/copilotworkbench.aspx` on any site in your tenant (e.g. `https://yourtenant.sharepoint.com/_layouts/15/copilotworkbench.aspx`). The debug build of your component loads there for a fast inner loop — iterate on rendering, display modes, and tool parameters against a real Copilot surface without a full deploy.
4. Package as `.sppkg` and deploy to your tenant's app catalog. Select **Add to Teams** to deploy the declarative agent to the tenant agent catalog.
5. Surface it in Microsoft 365 Copilot.

Microsoft has a step-by-step tutorial — *Build your first SharePoint Copilot App* — linked in the references below.

> **Dev tip:** whenever you change the agent side (`declarativeAgent.json`, instructions, conversation starters, or actions), **bump the declarative agent `version`**. If the version stays the same, Copilot may keep using the previously synced agent even after you redeploy.
{: .prompt-tip }

---

## Preview limitations to know before you build

- **Rollout:** end-user availability rolled out globally and was expected to be fully functional worldwide by **July 20, 2026**.
- **Copilot canvas only (for now):** in this initial preview, components render only in the Copilot UX; support for more surfaces is in the works.
- **Duplicate tool names:** if two solutions register a tool with the same name, Copilot loads the first one it finds. This is a known preview-only issue with a fix targeted for **August 2026**.
- **Store not supported:** distributing Copilot Apps through the store isn't supported during public preview.
- **Agent sync can lag:** deployment of the agent to the tenant agent catalog can take some time; improvements are planned.
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
