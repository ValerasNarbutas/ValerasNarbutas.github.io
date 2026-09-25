---
title: "Tip of the day – Choose the Right Copilot Component Display Mode"
author: valeras
date: 2026-09-15 16:00:00 +0300
categories:
  - TipOfTheDay
  - AI
  - Microsoft365
tags:
  - copilot-components
  - spfx
  - m365-copilot
  - user-experience
  - microsoft365
slug: copilot-components-display-modes
pin: false
comments: true
image:
  path: /img/posts/copilot_components_display_modes.png
  alt: Choosing inline or fullscreen display modes for Copilot Components
---

## Tip

When building a **Copilot Component**, declare both `inline` and `fullscreen` only when the experience genuinely supports both layouts. Use the compact mode for quick results and request the expanded mode only when the user needs a richer interaction.

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

### Choose `inline` for quick interactions

Use `inline` when the component can stay inside the conversation flow:

- A short status summary
- A small set of key metrics
- A few choices or confirmation buttons
- A compact result that does not need scrolling

Inline rendering keeps the conversation visible and reduces the visual interruption caused by opening a larger experience.

### Choose `fullscreen` for complex interactions

Use `fullscreen` when the user needs space for:

- Forms with several fields
- Wide tables or detailed reports
- Multi-step review flows
- Dashboards or richer visualizations

The component can request expansion when the interaction becomes more complex:

```typescript
await this.requestDisplayModeAsync('fullscreen');
```

The host owns the layout. Your component should read the current mode from the host context and respond when the host changes it. Do not assume that the component can always switch itself back to inline.

> Treat display mode as a UX contract with the Copilot host, not as a CSS breakpoint. Test the component in the actual Copilot experience and verify how it behaves when the host changes the mode.
{: .prompt-tip }

### Practical rule

My recommendation is to start with `inline`. Request `fullscreen` only at the moment when the user needs more room, and keep the important context or confirmation state visible during the transition. Design the component so it remains correct when the host, rather than your code, controls the return to inline mode.

Copilot Components are currently in preview, so APIs and behavior may change. Validate the experience in a test tenant before planning a production rollout.

## References

- [Overview of Copilot UX components](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/copilot/overview-copilot-apps)
- [SharePoint Copilot Apps public preview announcement](https://devblogs.microsoft.com/microsoft365dev/sharepoint-copilot-apps-now-in-public-preview-from-intent-to-action-in-microsoft-365-copilot/)
- [SharePoint Framework roadmap update: August 2026](https://devblogs.microsoft.com/microsoft365dev/sharepoint-framework-spfx-roadmap-update-august-2026/)

## Image Prompt

```text
Flat banner illustration: a small Copilot card expands into a large interactive form with charts and buttons. Soft light background with blue, cyan, and amber elements. Clear before-and-after composition, no text, no logos.
```
