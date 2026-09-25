---
title: "Building Teams Agents with the Microsoft 365 Agents Toolkit and Teams SDK"
author: valeras
date: 2026-09-25 22:00:00 +0300
categories:
  - SharingIsCaring
  - AI
  - Microsoft365
tags:
  - microsoft-teams
  - ai-agents
  - agents-toolkit
  - teams-sdk
  - teams-ai-library
  - mcp
  - microsoft-365
slug: teams-agents-toolkit-teams-sdk
pin: false
comments: true
image:
  path: /img/posts/teams_agents_toolkit_sdk.png
  alt: Microsoft Teams agent development with the Agents Toolkit and Teams SDK
---

## Summary

Teams agents are becoming a practical way to put task-oriented AI inside the collaboration surfaces where work already happens. The Microsoft documentation now describes several complementary building blocks:

- **Microsoft 365 Agents Toolkit** for project scaffolding, configuration, local debugging, and deployment workflows.
- **Teams SDK** for building Teams apps and agents with current Teams platform capabilities.
- **Teams AI Library** for conversational AI patterns and Teams-specific abstractions.
- **Microsoft 365 Agents SDK** when an agent needs a broader Microsoft 365 agent runtime.
- **MCP integrations** when an agent needs tools and external context.

These are not interchangeable product names. The right choice depends on whether you need an app-development workflow, a conversational abstraction, or a runtime for a more autonomous agent.

## Start with the job, not the framework

Before creating a project, describe the job the agent should perform:

| Job shape | Example | First question |
| --- | --- | --- |
| Conversational assistant | Answer questions about a team process | What trusted knowledge can it use? |
| Task agent | Create a project update from recent work | Which actions require confirmation? |
| Workflow agent | Route an issue and notify the owner | What are the allowed transitions? |
| Collaborative agent | Help several people in a shared conversation | Which user and conversation context is authoritative? |

This distinction matters because a prompt-only bot, a tool-using agent, and a multi-step workflow have very different testing and governance requirements.

## What the Agents Toolkit provides

The Microsoft 365 Agents Toolkit is the development workflow around an agent project. The official documentation describes support for creating a project, configuring the target environment, debugging locally, and provisioning or deploying the required resources.

At a high level, the workflow is:

````text
Create project
    -> Configure the agent and environment
    -> Run locally and debug
    -> Provision required resources
    -> Deploy and test in Teams
```

The toolkit is useful when the team needs repeatable project setup instead of manually assembling manifests, environment files, bot registration, and deployment steps.

> Treat generated configuration as code. Review identity, endpoint, permissions, and environment values before provisioning resources.
{: .prompt-warning }

## Teams SDK and Teams AI Library

The Teams SDK is the current platform-oriented path for building Teams applications and agents. The Teams AI Library remains useful for conversational patterns and AI integrations documented for Teams.

Use the **Teams SDK** when you want the current Teams app-development model and platform integrations. Consider the **Teams AI Library** when you need its conversational abstractions, prompt handling, or existing Teams AI examples. If you are starting a new project, check the current documentation and package guidance rather than copying an older sample unchanged.

This is especially important for JavaScript and TypeScript projects. SDKs, package names, supported Node.js versions, and manifest requirements can change independently of the conceptual agent pattern.

## A minimal agent architecture

A maintainable Teams agent usually has these boundaries:

````text
Teams client
    -> Teams app or bot endpoint
        -> Agent orchestration
            -> Model and instructions
            -> Approved tools and data sources
            -> Business actions
        -> Response, card, or task result
```

Keep business actions outside the prompt text. A tool should have a typed input, a clear permission check, an auditable result, and an explicit failure path.

For example, an agent that prepares a weekly project update might:

1. Read approved project sources.
2. Draft a summary.
3. Show the draft to the user.
4. Ask for confirmation.
5. Publish only after the user approves.

The confirmation step is not unnecessary friction. It prevents a model from turning an ambiguous request into an irreversible action.

## Adding tools with MCP

MCP is a useful boundary when the agent needs tools that are maintained separately from the Teams application. The Teams documentation includes MCP integration guidance for AI-enabled Teams applications.

An MCP server can expose capabilities such as:

- Querying a project system
- Looking up internal documentation
- Retrieving structured operational data
- Calling a controlled business operation

Keep the tool catalog small and task-focused. A long list of vaguely described tools makes it harder for the model to select the right operation and harder for administrators to review the data boundary.

> An MCP tool is part of your security boundary. Document what data it can read, what actions it can perform, and which identity is used for each request.
{: .prompt-tip }

## Designing for shared conversations

An agent in Teams may operate in a one-to-one chat, a group chat, or a channel. Those contexts are not equivalent:

| Context | Design consideration |
| --- | --- |
| One-to-one chat | The user may expect personalized context and direct actions. |
| Group chat | The agent should be clear about which participant requested an action. |
| Channel | The response may become part of a durable team record. |
| Meeting context | Timing, participants, and permissions need careful handling. |

Do not infer authorization from the fact that a message is visible in a conversation. Check the user's permission for the underlying resource and avoid exposing private content merely because another participant mentioned it.

For actions affecting a team, identify the actor, target, approval state, and resulting record. The agent should make those values visible before execution.

## Testing beyond happy-path prompts

Test an agent with a matrix rather than a few sample questions:

| Test area | Example |
| --- | --- |
| Grounding | Does it distinguish a source document from an unsupported assumption? |
| Permissions | What happens when the user cannot access the referenced item? |
| Ambiguity | Does it ask which project or person is intended? |
| Tool failure | Does it report a timeout instead of inventing success? |
| Duplicate request | Is the action idempotent? |
| Prompt injection | Does untrusted content change the tool policy? |
| Shared context | Does it avoid leaking one participant's private data? |

Log tool calls and outcomes without storing more sensitive content than necessary. Build a replayable set of representative conversations so SDK, model, and prompt changes can be evaluated consistently.

## Deployment and governance checklist

Before making the agent available to a team, verify:

- The app manifest and bot configuration target the intended environment.
- Entra identity and consent are configured for the required scopes only.
- Tool endpoints validate the caller and the requested resource.
- Destructive operations require confirmation.
- Secrets are stored in the platform-approved secret store.
- Telemetry excludes unnecessary message content and tokens.
- The owner, support path, and disable procedure are documented.
- The agent is tested in a non-production environment with representative permissions.

The toolkit can simplify provisioning, but it does not decide whether the resulting permissions or actions are appropriate for your organization.

## Choosing a starting point

Use this quick guide:

1. Need a guided Teams project workflow? Start with **Microsoft 365 Agents Toolkit**.
2. Need current Teams app and agent platform capabilities? Start with **Teams SDK**.
3. Need conversational Teams abstractions or an existing AI pattern? Evaluate **Teams AI Library**.
4. Need a broader Microsoft 365 agent runtime? Evaluate **Microsoft 365 Agents SDK**.
5. Need reusable external tools? Add **MCP** behind a narrow, governed interface.

The most reliable implementation is usually incremental: first answer questions, then add read-only tools, then add confirmed actions, and only later consider autonomous workflow steps.

## References

- [Build a Teams agent with Microsoft 365 Agents Toolkit](https://learn.microsoft.com/microsoftteams/platform/agents-in-teams/build-agent-toolkit)
- [Microsoft 365 Agents Toolkit overview](https://learn.microsoft.com/microsoftteams/platform/toolkit/agents-toolkit-fundamentals)
- [Teams Platform tools and SDKs](https://learn.microsoft.com/microsoftteams/platform/concepts/build-and-test/teams-tools)
- [Teams AI Library overview](https://learn.microsoft.com/en-us/microsoftteams/platform/teams-ai-library/teams/overview)
- [Microsoft 365 Agents SDK](https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/)
- [Build an agent with Teams SDK](https://learn.microsoft.com/microsoftteams/platform/teams-sdk/in-depth-guides/ai-integrations/build-agent)
- [MCP server integration for Teams SDK](https://learn.microsoft.com/microsoftteams/platform/teams-sdk/in-depth-guides/ai-integrations/mcp-server)

## Image Prompt

```text
Flat banner illustration: a friendly AI agent helps several people in a shared Teams conversation, connected to tools and a security shield. Bright cyan background with blue, amber, and dark charcoal shapes. Friendly modern style, no text, no logos.
```
