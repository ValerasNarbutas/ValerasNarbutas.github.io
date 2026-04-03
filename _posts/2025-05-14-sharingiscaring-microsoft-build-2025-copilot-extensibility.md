---
title: "Microsoft Build 2025 – Key M365 Copilot Extensibility Highlights"
author: valeras
date: 2025-05-14 18:00:00 +0800
categories:
  - SharingIsCaring
  - AI
tags:
  - M365 Copilot
  - AI
  - Build2025
  - Teams Toolkit
  - Declarative Agent
pin: false
slug: build-2025-copilot-extensibility-highlights
comments: true
image:
  path: /img/posts/build2025.png
  alt: Microsoft Build 2025 Copilot Extensibility Highlights
---

## Summary

Microsoft Build 2025 delivered a packed agenda for M365 developers, with Copilot extensibility front and centre. From declarative agents and API plugins to expanded Teams Toolkit capabilities and improved Microsoft Graph connectors, there is plenty to unpack. This post walks through the announcements that matter most if you are building on Microsoft 365.

---

## Copilot Extensibility: Declarative Agents Take Centre Stage

The biggest shift at Build 2025 is the move away from the classic "bot" mental model toward **declarative agents** — lightweight, configuration-driven agents that run inside Microsoft 365 Copilot without requiring any hosted service.

A declarative agent is defined entirely in a manifest file. You specify:

- **Instructions** – the system prompt that shapes the agent's behaviour and persona.
- **Capabilities** – which knowledge sources the agent can access (SharePoint, Graph connectors, web search).
- **Actions** – API plugins or Power Platform connectors that the agent can invoke.

### Sample `declarativeAgent.json`

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/copilot/declarative-agent/v1.2/schema.json",
  "version": "v1.2",
  "name": "Contoso HR Agent",
  "description": "Answers HR policy questions using internal SharePoint knowledge.",
  "instructions": "You are the Contoso HR assistant. Answer questions about company policies using the provided knowledge sources. Always cite the source document.",
  "capabilities": [
    {
      "name": "OneDriveAndSharePoint",
      "items_by_url": [
        { "url": "https://contoso.sharepoint.com/sites/HR/Shared%20Documents" }
      ]
    }
  ],
  "actions": [
    {
      "id": "leaverequest",
      "file": "leaverequest-plugin.json"
    }
  ]
}
```

This manifest can be packaged as a Teams app and uploaded via Teams Admin Center or deployed organisation-wide through the Microsoft 365 admin center.

---

## API Plugins: Connecting Copilot to Your Data

API plugins allow Copilot to call your existing REST APIs at reasoning time. At Build 2025, Microsoft announced **first-class support for OAuth 2.0** in plugin authentication, meaning you can now secure your plugin endpoints with your own identity provider rather than relying solely on Entra ID app registrations.

### Plugin manifest snippet

```json
{
  "schema_version": "v2.1",
  "name_for_human": "Leave Balance API",
  "description_for_model": "Returns the current leave balance for the authenticated user.",
  "auth": {
    "type": "oauth2",
    "authorization_url": "https://login.contoso.com/oauth2/authorize",
    "token_url": "https://login.contoso.com/oauth2/token",
    "scope": "leave.read"
  },
  "api": {
    "type": "openapi",
    "url": "https://api.contoso.com/leave/openapi.yaml"
  }
}
```

Key Build 2025 improvements to API plugins:

- **Streaming responses** – long-running operations can now stream partial results back to the user.
- **Adaptive Card rendering** – plugin responses can include Adaptive Card payloads that Copilot renders inline.
- **Plugin chaining** – Copilot can now orchestrate multiple plugins in a single user turn.

---

## Teams Toolkit v6: Scaffolding for the Copilot Era

Teams Toolkit received a major update at Build 2025. Version 6 introduces dedicated scaffolding templates for:

| Template | Description |
|---|---|
| Declarative Agent | Basic agent with SharePoint knowledge source |
| Declarative Agent + API Plugin | Agent wired to a custom REST API |
| Copilot Connector | Graph connector with semantic search |
| AI-Powered Tab | React tab with Teams AI Library integration |

### Scaffolding a new declarative agent

```bash
# Install or update Teams Toolkit CLI
npm install -g @microsoft/teamsfx-cli@latest

# Create a new declarative agent project
teamsapp new --template DeclarativeAgent --language TypeScript
```

The generated project includes a `.env.dev` file, a pre-configured `appPackage/` folder, and a `teamsapp.yml` that handles provisioning and deployment in a single command:

```bash
teamsapp provision --env dev
teamsapp deploy --env dev
```

---

## Microsoft Graph Connectors: Semantic Improvements

Graph connectors bridge external content (Confluence, Jira, ServiceNow, your custom database) into Microsoft 365 search and Copilot reasoning. Build 2025 announcements include:

- **Semantic labels on steroids** – new labels such as `iconUrl`, `containerName`, and `activityType` improve how content surfaces in Copilot responses.
- **Incremental crawl API** – connectors can now push only changed items using the new `/external/connections/{id}/items/{itemId}` PATCH endpoint, dramatically reducing crawl time for large data sets.
- **Copilot prioritisation** – administrators can now mark specific connectors as "Copilot-preferred", meaning results from those connectors are weighted higher during Copilot reasoning.

### Pushing an item to a Graph connector

```http
PUT https://graph.microsoft.com/v1.0/external/connections/contosocrm/items/customer-42
Content-Type: application/json

{
  "@odata.type": "microsoft.graph.externalItem",
  "acl": [
    { "type": "everyone", "value": "everyone", "accessType": "grant" }
  ],
  "properties": {
    "title": "Contoso Ltd",
    "accountManager": "Jane Smith",
    "lastContact": "2025-04-30T00:00:00Z"
  },
  "content": {
    "value": "Contoso Ltd is a key enterprise account managed by Jane Smith...",
    "type": "text"
  }
}
```

---

## What's Next for Developers

1. **Try the new Teams Toolkit templates** – scaffold a declarative agent locally and test it in the Teams desktop client using Developer Preview mode.
2. **Review the Copilot extensibility schema v1.2** – the JSON schema for `declarativeAgent.json` has new fields; update existing manifests before the v1.0 deprecation window closes in Q4 2025.
3. **Explore the Copilot developer portal** – Microsoft announced a unified portal at [aka.ms/CopilotDevPortal](https://aka.ms/CopilotDevPortal) for managing plugins, agents, and connectors in one place.

---

## Conclusion

Build 2025 signals a clear direction: Microsoft wants developers to extend Copilot through configuration-first, low-code-friendly patterns wherever possible, while still providing powerful programmatic APIs for complex scenarios. Declarative agents lower the barrier to entry enormously, and the improvements to Teams Toolkit and Graph connectors make the full extensibility stack more approachable than ever. Start exploring, and ship something!

---

## References

- [Declarative agents overview – Microsoft Learn](https://learn.microsoft.com/microsoft-365-copilot/extensibility/overview-declarative-agent)
- [API plugins for Microsoft 365 Copilot](https://learn.microsoft.com/microsoft-365-copilot/extensibility/overview-api-plugins)
- [Teams Toolkit overview](https://learn.microsoft.com/microsoftteams/platform/toolkit/teams-toolkit-fundamentals)
- [Microsoft Graph connectors overview](https://learn.microsoft.com/graph/connecting-external-content-connectors-overview)
- [Microsoft Build 2025 Book of News](https://news.microsoft.com/build-2025-book-of-news/)
