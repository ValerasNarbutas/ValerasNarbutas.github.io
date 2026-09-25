---
title: "Tip of the day – Give Your Coding Agent Microsoft 365 Context with Work IQ"
author: valeras
date: 2026-08-03 10:00:00 +0300
categories:
  - TipOfTheDay
  - AI
  - Microsoft365
tags:
  - work-iq
  - github-copilot
  - mcp
  - microsoft365
  - ai-coding-agents
  - copilot
slug: tip-work-iq-cli-m365-context
pin: false
comments: true
image:
  path: /img/posts/tip_work_iq_cli.png
  alt: Work IQ connecting an AI coding agent to Microsoft 365 context
---

## Tip

If your code task depends on a meeting, email, Teams conversation, or SharePoint document, connect your AI coding assistant to **Microsoft Work IQ** instead of copying the context into the chat manually.

Work IQ supports two useful modes:

- **CLI mode:** ask questions directly with `workiq ask`.
- **MCP mode:** let an AI assistant such as GitHub Copilot in VS Code or GitHub Copilot CLI query Microsoft 365 context while you work.

## Install with GitHub Copilot CLI

Microsoft's official Work IQ repository documents this quick-start flow:

```text
copilot
/plugin marketplace add microsoft/work-iq
/plugin install workiq@work-iq
```

Restart Copilot CLI, then ask questions such as:

```text
What are my upcoming meetings this week?
```

```text
Summarize emails from Sarah about the budget.
```

```text
Find documents I worked on yesterday.
```

## Or run Work IQ directly

Install it globally with npm:

```bash
npm install -g @microsoft/workiq
```

Then accept the End User License Agreement before using it:

```bash
workiq accept-eula
```

Ask a direct question:

```bash
workiq ask -q "What requirements did Sarah share about the customer portal authentication feature?"
```

Interactive mode is also available:

```bash
workiq ask
```

## Why it is useful for development

Suppose you are implementing a feature discussed in a planning meeting. Instead of searching several systems and pasting notes into your coding session, ask your assistant to find the relevant meetings, emails, documents, and decisions.

Example:

```text
Find the authentication requirements discussed in my recent meetings
and emails about the customer portal. Summarize the decisions and list
open questions before suggesting code changes.
```

This gives the agent more useful workplace context while keeping the coding task in the same workflow.

My recommendation is to ask Work IQ for the source decisions and unresolved questions before asking the coding agent to change code. That separates context gathering from implementation and makes unsupported assumptions easier to spot.

## Check access before using it

Work IQ access requires Node.js, a usage-based billing plan, and administrative consent for the Work IQ application in the Microsoft Entra tenant. Access remains permission-aware: Work IQ can retrieve only data that the signed-in user is allowed to access.

> Work IQ requires administrative consent and usage-based billing. Confirm your organization's security, privacy, and cost-management policies before enabling it.
{: .prompt-warning }

## References

- [Microsoft Work IQ CLI](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/cli)
- [Work IQ overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/)
- [Microsoft Work IQ repository](https://github.com/microsoft/work-iq)

## Image Prompt

```text
Wide horizontal blog banner, 40:21 aspect ratio. Flat illustration of a developer in a bright workspace asking an AI coding assistant for help, while floating Microsoft 365 context scenes show an email, meeting, Teams discussion, document, and people directory connected by a soft MCP bridge. Deep charcoal background with bright blue, cyan, and amber accents. Person and context scenes centered with safe space around them. No readable text, no logos. --ar 40:21 --style raw
```
