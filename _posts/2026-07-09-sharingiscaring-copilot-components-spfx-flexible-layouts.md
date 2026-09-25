---
title: "Copilot Components: Bringing SPFx Experiences into the Copilot Canvas"
author: ValerasNarbutas
date: 2026-07-09 18:00:00 +0300
categories:
  - SharingIsCaring
  - AI
  - Microsoft365
tags:
  - sharepoint
  - spfx
  - copilot-components
  - copilot-apps
  - m365-copilot
  - react
  - mcp
slug: copilot-components-spfx-copilot-canvas
pin: false
comments: true
image:
  path: /img/posts/copilot_components_spfx.png
  alt: SPFx Copilot Components rendering interactive experiences in the Copilot canvas
---

## Summary

The SharePoint Framework is extending beyond SharePoint pages. **Copilot Components** let developers package interactive client-side experiences that can render directly inside Microsoft 365 Copilot, together with a declarative agent that makes those experiences discoverable.

Microsoft previously announced this capability as **SharePoint Copilot Apps**. The August 2026 roadmap update says that **Copilot Components** is the likely name going forward, but the name is not final before general availability.

> Copilot Components are in **preview**. APIs, schemas, tooling, licensing, and naming may change. Do not use the preview in production.
{: .prompt-warning }

## From an answer to an outcome

Text is not enough for many business processes. An approval, incident triage, onboarding checklist, project review, or procurement request needs structured fields, validation, visible choices, and a dependable action.

Copilot Components split the experience into two complementary parts:

- **Microsoft 365 Copilot** understands intent and provides context.
- **The component** provides the interactive UI that helps the user review information and complete the operation.

That can be a data grid, form, dashboard, scheduler, approval panel, or another web experience that fits the workflow.

## The SPFx model still applies

You use familiar SPFx technologies:

- JavaScript and TypeScript
- React or another supported web UI approach
- Fluent and standard client-side libraries
- SPFx packaging and deployment
- MCP Apps for the interactive Copilot experience

The component and its declarative agent can be packaged in a standard `.sppkg` solution and deployed through the SharePoint App Catalog. With `includeClientSideAssets` enabled, the client-side assets are hosted through the tenant's existing SPFx hosting model rather than requiring a separate CDN or Azure Storage deployment.

## Reuse the UX across surfaces

SPFx separates the host from the underlying user interface. A Copilot component uses `BaseCopilotComponent`, while a SharePoint web part uses `BaseClientSideWebPart`. The host-specific base classes are different, but the shared React, business logic, and styling can be factored into reusable components.

Conceptually, this enables a **build once, reuse across Microsoft 365** approach:

| Surface | Host-specific entry point |
| --- | --- |
| Microsoft 365 Copilot | `BaseCopilotComponent` |
| SharePoint page | `BaseClientSideWebPart` |
| Microsoft Teams | A Teams host such as a tab |

The current preview documentation is more specific than the long-term direction: Copilot Components render in the Microsoft 365 Copilot experience during preview, while support for additional surfaces is still evolving. Do not describe cross-surface rendering as fully available today.

## Inline and full-screen display modes

A component can declare the layouts it supports in its manifest:

```json
{
  "capabilities": {
    "availableDisplayModes": [
      "inline",
      "fullscreen"
    ]
  }
}
```

- **Inline** is compact and stays in the conversation flow.
- **Fullscreen** gives a richer experience more room for forms, tables, or dashboards.

The host owns the layout. The component can request fullscreen when the interaction needs more space, but returning to inline is host-initiated.

## Multiple tools, one package

A single solution can expose multiple tools. For example, one component could provide:

- A status view
- A reporting view
- A review or approval action

Each tool can define a properties schema. Copilot passes those values into the component, allowing the same UI to render different initial states without creating a separate component for every scenario.

```typescript
protected render(): void {
  const message: string = this.properties.message;
  // Render the initial state from the tool properties.
}
```

The declarative agent remains important: it contains the instructions, conversation starters, and actions that connect the agent's intent to the component tools.

## How this relates to flexible SharePoint sections

Modern SharePoint pages already use flexible sections and columns to arrange web parts. Copilot Components are related in spirit because both rely on a host-owned layout and reusable UI, but they are not the same feature:

- **Flexible sections** arrange web parts on a SharePoint page.
- **Copilot Components** render tools inside the Copilot canvas.

Do not assume that a component can automatically edit a SharePoint page's sections, columns, or web-part configuration. The component is an interactive Copilot experience; page layout remains governed by the SharePoint page model and its supported APIs.

This distinction is useful when designing a solution. Reuse the same business UI where it makes sense, but adapt the interaction to the host rather than forcing a page layout into a chat canvas.

## Declarative agent synchronization

The solution can contain the component source and the declarative agent definition together. After an administrator enables the `.sppkg` in the SharePoint App Catalog, the agent can be synchronized to the tenant agent catalog through the documented deployment flow.

The package typically includes:

````text
copilot/
  manifest.json
  declarativeAgent.json
  ai-plugin.json
  instruction.txt
src/
  copilotComponents/
```

Updating or removing the app also affects the corresponding agent. Include versioning and deployment checks in the same release process as the component code.

## Preview availability and roadmap

The August 2026 SPFx roadmap update describes the public preview as:

- Available worldwide to all customers
- Open without a special allow-list
- Available without a Copilot license during preview
- Available without consumption-based costs during preview
- Supported by SPFx 1.24 Beta 3

Microsoft says licensing and cost details for general availability will be confirmed later. The roadmap targets **October 2026** for SPFx 1.24 general availability and Copilot Components general availability. That is a target, not a completed release as of this post's date.

The roadmap also confirms React 18 support is coming in SPFx 1.24, and the Copilot Component React templates are already updated for the preview. Test third-party libraries carefully because React 18's stricter rendering behavior can expose compatibility issues.

## A sensible first experiment

Choose a workflow where the user needs to review data and make a decision:

1. Install the SPFx 1.24 preview toolchain.
2. Start with Microsoft's Copilot Component samples.
3. Run the experience in the Copilot Workbench.
4. Inspect the declarative agent and component manifests.
5. Test both inline and fullscreen behavior.
6. Validate parameters, permissions, and error states.
7. Package the solution and deploy it only to a test tenant or test audience.
8. Record feedback before planning a production migration.

Avoid beginning with a broad “do everything” agent. A small approval or status scenario makes it easier to evaluate the component's tool contract and the user experience.

## Why this matters

Copilot Components make the Copilot canvas a potential host for the interactive experiences that Microsoft 365 teams already know how to build with SPFx. The opportunity is not to replace SharePoint pages or flexible sections. It is to choose the right surface:

- Use a SharePoint page for persistent navigation and content.
- Use flexible sections to arrange page web parts.
- Use Copilot Components when a conversational request should lead to a guided, interactive action.

That separation produces better experiences than treating every Copilot request as either plain text or a full SharePoint page.

## References

- [Overview of Copilot UX components](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/copilot/overview-copilot-apps)
- [SharePoint Framework roadmap update: August 2026](https://devblogs.microsoft.com/microsoft365dev/sharepoint-framework-spfx-roadmap-update-august-2026/)
- [SharePoint Copilot Apps public preview announcement](https://devblogs.microsoft.com/microsoft365dev/sharepoint-copilot-apps-now-in-public-preview-from-intent-to-action-in-microsoft-365-copilot/)
- [SharePoint Framework 1.24 release notes](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.24.0)

## Image Prompt

```text
Flat banner illustration: one reusable app card connects a SharePoint page, a Copilot chat, and a Teams window. Dark charcoal background with bright blue, cyan, and amber accents. Minimal geometric shapes, clean modern style, no text, no logos.
```
