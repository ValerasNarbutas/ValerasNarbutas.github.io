---
title: "Tip of the day – Tell Your AI Agent to Use the SPFx Upgrade Command"
author: valeras
date: 2026-08-12 11:00:00 +0300
categories:
  - TipOfTheDay
  - AI
  - GitHub
tags:
  - spfx
  - ai-coding-agents
  - github-copilot
  - cli-for-microsoft-365
  - heft
  - gulp
  - sharepoint
slug: tip-spfx-agent-upgrade-command
pin: false
comments: true
image:
  path: /img/posts/tip_spfx_agent_upgrade.png
  alt: AI coding agent using the SPFx project upgrade command
---

## Tip

When asking an AI coding agent to upgrade a SharePoint Framework project, do not ask it only to “update the packages.” Tell it to inspect the current version and use the **CLI for Microsoft 365** `spfx project upgrade` command.

```text
Inspect the current SPFx version and Node.js compatibility.
Use CLI for Microsoft 365's spfx project upgrade command to generate
and apply the version-specific changes in order. Then run a clean build
and report any remaining issues.
```

## Why this works better

SPFx upgrades can include more than dependency changes. The move from the legacy gulp toolchain to Heft, configuration updates, and version-specific migration steps all need to be applied in the correct order.

Microsoft's SPFx Dev Skills evaluation compared a baseline upgrade with one where the agent was explicitly directed to use the CLI command. In the reported SPFx 1.21.1-to-1.22.2 scenario:

- Dependency currency improved from **34/50 to 50/50**.
- Configuration correctness improved from **38/85 to 83/85**.

The lesson is simple: an agent may have access to a useful tool without deciding to use it. Make the important tool part of the request.

My recommendation is to ask for the generated upgrade report before accepting any edits. It gives you a version-specific checklist to compare with the final diff instead of trusting a generic package update.

## A safe workflow

1. Create a branch or backup before upgrading.
2. Ask the agent to detect the source and target SPFx versions.
3. Check Node.js and TypeScript compatibility.
4. Run `spfx project upgrade` and review its generated report.
5. Apply the changes in order.
6. Run a clean build and the project's tests.
7. Review the diff before deploying to SharePoint.

For SPFx 1.22.0 and later, verify that the project uses **Heft**. Older SPFx projects may still use the legacy **gulp** toolchain.

> SPFx Dev Skills and the related guidance are in preview. Review generated changes and test them before committing or deploying.
{: .prompt-warning }

## References

- [Use the SPFx development skill with AI coding agents](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/agent-skills)
- [Behind SPFx Dev Skills: testing what agents know and fixing what they miss](https://devblogs.microsoft.com/microsoft365dev/behind-spfx-dev-skills-testing-what-agents-know-and-fixing-what-they-miss/)
- [CLI for Microsoft 365](https://aka.ms/cli-m365)

## Image Prompt

```text
Wide horizontal blog banner, 40:21 aspect ratio. Flat illustration of a developer and an AI coding assistant reviewing a SharePoint project together on a large screen, with a glowing upgrade gate and green build result behind them. Light cyan background with dark charcoal, blue, and amber shapes. People and screen centered with safe space around them. No readable text, no logos. --ar 40:21 --style raw
```
