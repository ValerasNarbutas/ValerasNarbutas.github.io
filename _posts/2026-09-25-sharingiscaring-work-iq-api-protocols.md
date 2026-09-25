---
title: "Work IQ API: Choosing Between A2A, MCP, and REST"
author: ValerasNarbutas
date: 2026-09-25 21:00:00 +0300
categories:
  - SharingIsCaring
  - AI
  - Microsoft365
tags:
  - work-iq
  - microsoft365
  - mcp
  - a2a
  - rest-api
  - copilot
  - ai-agents
  - governance
slug: work-iq-api-a2a-mcp-rest
pin: false
comments: true
image:
  path: /img/posts/work_iq_api_protocols.png
  alt: Work IQ API protocols for agents and Microsoft 365 applications
---

## Summary

When an agent needs to reason over Microsoft 365 work data, the hard part is not only calling an API. The application also needs permission-aware context, governance, authentication, and a way to operate across email, meetings, documents, Teams, people, and enterprise search.

The **Microsoft Work IQ API** provides a workplace intelligence layer for that scenario. It exposes multiple protocols so you can choose the interaction model that fits your architecture:

- **A2A** for agent-to-agent delegation
- **MCP** for tool-based access from AI assistants
- **REST** for service-hosted applications and orchestrators

Microsoft announced the API endpoints for general availability on **June 16, 2026**, with usage independent of Microsoft 365 Copilot licensing and managed through consumption-based billing.

## What Work IQ provides

Work IQ combines four related capabilities:

| Capability | What it provides |
| --- | --- |
| Chat | Conversational responses and continuity |
| Context | Grounded work context assembled across organizational data |
| Tools | Composable actions over Microsoft 365 data |
| Workspaces | Persistent working storage for longer-running workflows |

The purpose is to reduce the amount of retrieval, indexing, synchronization, and compliance infrastructure each agent team must build themselves.

Work IQ can reason over email, meetings and calendars, OneDrive and SharePoint documents, Teams messages, people and organizational context, Planner plans, and enterprise search results.

## Choose the protocol by caller

The protocols are recommendations rather than hard restrictions:

| Protocol | Use it when | Typical caller |
| --- | --- | --- |
| A2A | Another agent needs to delegate a structured task | An autonomous agent |
| REST | An application or backend needs a programmatic request/response API | A web app or service |
| MCP | An AI assistant needs to invoke Work IQ as a tool for the user | An LLM client, IDE, or CLI |

This separation makes the architecture easier to reason about. A service does not need to pretend to be an IDE tool, and an agent does not need to build a custom REST orchestration layer simply to ask for user context.

## A2A for agent delegation

Use A2A when one agent delegates work to Work IQ and needs a structured result. The API uses a JSON-RPC envelope and supports multi-turn conversations through a `contextId`.

Conceptually, an operations agent might ask Work IQ:

````text
Investigate the latest discussions, meetings, and documents about the
deployment regression. Summarize the likely cause and list the owners
of the unresolved actions.
```

The response can be treated as a task with a status and artifacts, rather than a loosely formatted string. For time-sensitive queries, the API documentation also describes sending location metadata such as time zone information.

## REST for applications and services

REST is a natural choice when your application owns the user experience and needs to call Work IQ programmatically. For example, a service could send a question, render the response in its own UI, and combine the result with application-specific data.

Use REST when you need:

- A service-hosted integration
- A request/response interaction
- Explicit control over the application UI
- Integration with an existing orchestrator

The Work IQ API still runs in the signed-in user's context and enforces Microsoft 365 permissions and policies.

## MCP for AI assistants

MCP is optimized for an AI assistant that decides when to use Work IQ as a tool. The assistant can pull context dynamically instead of requiring the user or developer to construct a large prompt manually.

For local MCP, the Work IQ CLI can be configured as a stdio server:

```json
{
  "workiq": {
    "type": "stdio",
    "command": "workiq",
    "args": ["mcp"]
  }
}
```

This is useful in IDEs and CLIs where the developer is already asking questions while implementing a feature. Work IQ can retrieve relevant meetings, emails, Teams discussions, and documents when the assistant needs them.

## The generic-tool model

Work IQ MCP reduces hundreds of operations to a compact set of generic tools. Simple verbs such as fetch, create, and update work with resource paths that describe the data being accessed.

The `getSchema` capability lets agents discover how a data source is structured at runtime. Instead of hard-coding every entity model and integration, the agent can inspect the available structure and adapt its request.

This is a useful design trade-off:

- The tool surface stays smaller.
- New data sources can fit the resource model.
- Agents can discover structure when needed.
- Governance can be centralized instead of repeated in every connector.

Dynamic discovery does not mean unrestricted access. The request still runs through authorization and policy checks.

## Security and governance

Work IQ uses Microsoft Entra ID delegated authentication. Requests run in the signed-in user's context, and on-behalf-of flows are supported. Application-only authentication is not supported according to the current API documentation.

Microsoft describes several layers of protection:

- Existing Microsoft 365 permissions are enforced.
- Sensitivity labels and compliance policies remain applicable.
- A Rego-based policy engine can evaluate resource paths, methods, identity, and content.
- Tool invocations are logged for auditability, usage analytics, rate limiting, and compliance enforcement.

The practical rule is still least privilege. Do not treat a generic tool surface as a reason to request broad access. Define the intended operations, test with representative users, and have administrators review policy and consent requirements.

## Licensing and cost

Work IQ API access is independent of Microsoft 365 Copilot licensing and uses a consumption-based model with Copilot Credits. Microsoft 365 Copilot licensed users can use Work IQ in Copilot experiences and agents, while custom and third-party agents are billed based on usage. Users without a Copilot license are also billed based on usage.

Cost controls and governance are managed through the Microsoft 365 admin center. Set up billing, access policies, limits, and alerts before enabling a custom or third-party agent for a broad audience.

## A simple selection guide

Use this decision path when starting a new integration:

1. Is another autonomous agent delegating a structured task? Start with **A2A**.
2. Does your application or backend own the user experience? Start with **REST**.
3. Is an AI assistant selecting tools while a user works in an IDE or CLI? Start with **MCP**.
4. Do you need more than a response, such as persistent intermediate results? Evaluate **Workspaces** with the selected protocol.
5. In every case, define the user identity, permissions, data boundary, cost controls, and audit requirements before production use.

## Why this matters

Work IQ is not simply another connector. It is an attempt to make enterprise context a reusable platform capability for agents, while preserving the user's permissions and giving administrators a central governance point.

The protocol choice should follow the caller and the workflow. A clear A2A, MCP, or REST boundary makes it easier to test the agent, monitor its behavior, and explain how Microsoft 365 data moves through the system.

## References

- [Microsoft Work IQ API](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/api-overview)
- [Work IQ overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/)
- [Work IQ: Production-ready intelligence for every agent](https://devblogs.microsoft.com/microsoft365dev/work-iq-production-ready-intelligence-for-every-agent/)
- [Microsoft Work IQ CLI](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/cli)

## Image Prompt

```text
Flat banner illustration: a central intelligence hub branches to three different paths for agents, apps, and assistants. Deep charcoal background with blue, cyan, amber, and green connection lines. Bold architectural composition, no text, no logos.
```
