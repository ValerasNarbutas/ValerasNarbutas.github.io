---
title: "Microsoft Ignite 2025 – Top Announcements for M365 Developers"
author: valeras
date: 2025-10-05 12:00:00 +0800
categories:
  - SharingIsCaring
  - AI
tags:
  - Ignite2025
  - M365
  - AI
  - SharePoint
  - Teams
  - Copilot
pin: false
slug: ignite-2025-highlights-m365-developers
comments: true
image:
  path: /img/posts/ignite2025.png
  alt: Microsoft Ignite 2025 Top Announcements for M365 Developers
---

## Summary

Microsoft Ignite 2025 continued the company's AI-first momentum with a wave of announcements across the M365 developer platform. From new Copilot extensibility APIs and SharePoint Premium AI enhancements to the Teams AI Library v2 and Viva suite updates, here is a developer-focused roundup of what was announced and what it means for your projects.

---

## 1. Microsoft 365 Copilot: New Extensibility APIs

### Copilot Connectors (GA)

Previously in preview as "Graph connectors for Copilot", **Copilot Connectors** reached general availability at Ignite 2025. The key developer-facing change is a unified SDK:

```bash
npm install @microsoft/copilot-connectors-sdk
```

The SDK wraps the Graph API connector endpoints and adds:
- Local testing with a `connectors-dev-proxy` tool.
- Automatic schema validation against the Copilot content schema.
- Built-in retry and throttling handling.

### Copilot Agents API (Preview)

The new **Copilot Agents API** allows programmatic creation and management of declarative agents through Microsoft Graph:

```http
POST https://graph.microsoft.com/beta/copilot/agents
Content-Type: application/json

{
  "displayName": "Procurement Assistant",
  "description": "Helps employees navigate procurement policies.",
  "instructions": "You assist with procurement-related questions...",
  "capabilities": [
    {
      "type": "sharePointSearch",
      "siteUrls": ["https://contoso.sharepoint.com/sites/Procurement"]
    }
  ]
}
```

This opens up scenarios where agents can be provisioned dynamically as part of site or team provisioning workflows.

---

## 2. SharePoint Premium AI Enhancements

### Document Understanding 3.0

SharePoint Premium (formerly Syntex) received its most significant model update at Ignite 2025. Document Understanding 3.0 introduces:

- **Zero-shot extraction** — extract fields from document types without training a custom model, using natural language field definitions.
- **Multi-page forms** — the extraction engine can now handle forms that span multiple pages with cross-page field references.
- **Confidence scores in Power Automate** — the `Apply model` action now returns a per-field confidence score, enabling conditional routing based on extraction accuracy.

### Content Assembly with Copilot

Content Assembly (the template-based document generation feature) now integrates with Copilot to auto-populate template fields from natural language instructions:

> *"Generate a service agreement for Fabrikam Ltd, 12-month term, starting 1 January 2026, using the standard IT Services template."*

This dramatically reduces the manual effort of filling in long contract templates.

---

## 3. Teams AI Library v2

The [Teams AI Library](https://github.com/microsoft/teams-ai) hit v2.0 at Ignite. Headline changes:

### Streaming responses

v2 adds native streaming support, so bot responses can appear word-by-word rather than waiting for the full generation:

```typescript
import { Application, TurnState } from '@microsoft/teams-ai';

const app = new Application<TurnState>();

app.message('/ask', async (context, state) => {
  await context.sendActivity({ type: 'typing' });
  
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: context.activity.text }],
    stream: true
  });

  let response = '';
  for await (const chunk of stream) {
    response += chunk.choices[0]?.delta?.content ?? '';
  }
  
  await context.sendActivity(response);
});
```

### Multi-agent orchestration

v2 introduces an **AgentOrchestrator** that routes user messages to specialised sub-agents based on intent classification:

```typescript
const orchestrator = new AgentOrchestrator({
  agents: [
    { name: 'hr', agent: hrAgent, description: 'HR policies and leave' },
    { name: 'it', agent: itAgent, description: 'IT support and software requests' },
    { name: 'finance', agent: financeAgent, description: 'Expenses and procurement' }
  ]
});
```

---

## 4. Viva Suite Developer Updates

### Viva Connections Dashboard APIs (Preview)

A new set of REST APIs allows programmatic management of the Viva Connections dashboard — adding, removing, and reordering cards without navigating the SharePoint admin UI:

```http
POST https://graph.microsoft.com/beta/sites/{siteId}/pages/{pageId}/dashboardCards
Content-Type: application/json

{
  "webPartType": "AdaptiveCardExtension",
  "webPartId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "position": { "zoneIndex": 1, "sectionIndex": 1 }
}
```

### Viva Amplify API

Viva Amplify (the corporate communications tool) exposes a new Graph API endpoint for creating and scheduling campaigns programmatically — useful for building custom communication portals.

---

## 5. Graph API: What's New

| Feature | Status | Endpoint |
|---|---|---|
| Calendar sharing improvements | GA | `GET /me/calendars` with new `isShared` filter |
| Teams channel moderation API | GA | `PATCH /teams/{id}/channels/{id}` |
| Sensitivity label API for Teams | Preview | `POST /teams/{id}/sensitivityLabel` |
| Copilot interaction history | Preview | `GET /me/copilot/interactionHistory` |

The **Copilot interaction history** endpoint is particularly exciting — it lets you build admin dashboards showing how your organisation is using M365 Copilot, which agents and topics are most popular, and where escalations occur most frequently.

---

## 6. Developer Tooling

- **Microsoft Graph Developer Proxy v2** — released with new presets for Copilot throttling simulation, making it easier to test how your solutions handle 429 responses from Graph.
- **Kiota SDK updates** — the Graph SDK generator now supports TypeScript 5.5 and produces smaller bundles by default.
- **Dev Tunnels GA** — the `devtunnel` tool is generally available and fully integrated into Visual Studio and VS Code, simplifying local testing of bots and webhooks.

---

## Conclusion

Ignite 2025 reinforced that the M365 developer platform is in a period of rapid, high-quality iteration. The GA of Copilot Connectors and the preview of the Copilot Agents API are particularly significant for developers building Copilot extensibility solutions. Start by exploring the new Teams AI Library v2 streaming capabilities and the Copilot Agents API — these will unlock experiences that simply were not possible before.

---

## References

- [Microsoft Ignite 2025 Book of News](https://news.microsoft.com/ignite-2025-book-of-news/)
- [Teams AI Library on GitHub](https://github.com/microsoft/teams-ai)
- [SharePoint Premium (Syntex) documentation](https://learn.microsoft.com/microsoft-365/syntex/)
- [Microsoft Graph changelog](https://developer.microsoft.com/graph/changelog)
- [Viva Connections developer documentation](https://learn.microsoft.com/viva/connections/viva-connections-overview)
- [Microsoft Graph Developer Proxy](https://learn.microsoft.com/microsoft-cloud/dev/dev-proxy/overview)
