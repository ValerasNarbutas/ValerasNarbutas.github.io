---
title: "GitHub Copilot App – The Agent-Native Desktop Experience (Technical Preview)"
author: valeras
date: 2026-06-17 00:30:00 +0300
categories:
  - SharingIsCaring
  - GitHub
  - AI
tags:
  - GitHub Copilot
  - Build2026
  - Agents
  - CopilotApp
  - Developer Tools
pin: false
slug: github-copilot-app-agent-native-desktop
comments: true
image:
  path: /img/posts/github-copilot-app-2026.png
  alt: GitHub Copilot App Agent-Native Desktop Experience
---

## Summary

At **Microsoft Build 2026** (June 2, 2026), GitHub announced the **GitHub Copilot app** in technical preview — a dedicated desktop application that acts as a control centre for agentic development. If you have ever wished that GitHub Copilot could do more than assist inside an editor, this is the answer.

---

## What Is the GitHub Copilot App?

The GitHub Copilot app is described by GitHub as an **"agent-native desktop experience"**. It is a standalone application (available to all Copilot Pro, Pro+, Business, and Enterprise users) that surfaces agentic work happening across your repositories, issues, pull requests, and background automations in one unified place.

Think of it less like an IDE extension and more like a command centre where you direct multiple AI agents working in parallel.

---

## Key Features

### My Work View

The home screen of the app is **My Work** — a unified dashboard showing:

- Active coding sessions
- Open issues assigned to you or being handled by Copilot
- Pull requests in progress (human and agent-authored)
- Background automations that are running or scheduled

This view gives you situational awareness across everything Copilot is doing on your behalf.

### Canvases

**Canvases** are bidirectional work surfaces where agents and developers collaborate. A canvas can display:

- Plans and task breakdowns
- Active pull request diffs
- Browser sessions (for testing)
- Terminal output
- Custom dashboards

The key word is *bidirectional* — you can annotate, modify, or redirect what the agent is doing directly within the canvas, rather than going back to a chat interface.

### Cloud and Local Sandboxes

Every agent session runs in an **isolated environment**:

| Sandbox type | Details |
|---|---|
| **Cloud sandbox** | Isolated Linux environment; fully managed by GitHub |
| **Local sandbox** | Restricted local environment with scoped file and network access |

This means agents cannot read files they are not supposed to, and any side effects are contained to the sandbox.

### Agent Merge

One of the most interesting features: **Agent Merge**. Once a pull request is ready, Agent Merge can carry it through:

1. CI pipeline completion
2. Reviewer approval
3. Merge condition checks

…and merge automatically when all conditions are satisfied. You set the rules; the agent does the waiting and merging.

### Git Worktrees Integration

Each agent session gets its own **isolated branch copy via git worktrees** — so multiple sessions can work in parallel on the same repository without stepping on each other.

```bash
# The app manages this automatically, but under the hood it uses:
git worktree add ../session-42-branch feature/session-42
```

---

## GitHub Copilot SDK – Now Generally Available

Alongside the app, GitHub announced that the **GitHub Copilot SDK** is now **generally available** in six languages:

| Language | Package |
|---|---|
| Node.js / TypeScript | `@github/copilot-sdk` |
| Python | `github-copilot-sdk` |
| Go | `github.com/github/copilot-sdk-go` |
| .NET | `GitHub.Copilot.SDK` |
| Rust | `copilot-sdk` |
| Java | `com.github:copilot-sdk` |

The SDK exposes the **same agentic runtime** that powers the Copilot app itself. This means you can build your own tools and integrations that run within the same sandboxed, agent-aware environment.

### Quick Start (TypeScript)

```typescript
import { CopilotClient, createSession } from "@github/copilot-sdk";

const client = new CopilotClient({ token: process.env.GITHUB_TOKEN });

const session = await createSession(client, {
  repo: "my-org/my-repo",
  prompt: "Fix all failing tests in the auth module",
  sandbox: "cloud",
});

session.on("progress", (update) => console.log(update.message));
session.on("pr_ready", (pr) => console.log(`PR opened: ${pr.url}`));

await session.run();
```

---

## Copilot CLI Improvements

The Copilot CLI also received a significant upgrade at Build 2026:

- **Redesigned TUI** (in `/experimental` mode) with tabbed access to PRs, issues, and gists
- **Voice mode** — on-device speech-to-text with audio processing staying local
- **`/every` command** — schedule recurring prompts and background tasks

```bash
# Schedule a daily dependency audit
gh copilot /every "daily at 08:00" "Check for new security advisories in package.json and open an issue if any are found"
```

---

## Copilot Code Review Enhancements

Build 2026 brought several improvements to Copilot's code review capabilities:

| Feature | Description |
|---|---|
| **Medium tier review** | Routes PRs to a higher-reasoning model for better precision on complex logic |
| **`/security-review` skill** | Dedicated security-focused code evaluation |
| **`/rubberduck` skill (GA)** | Multi-model critique of your implementation; surfaces design issues |
| **Azure DevOps native support** | Copilot Code Review now works natively in Azure DevOps pipelines |

The Azure DevOps integration is particularly useful for teams who have not yet moved fully to GitHub — you can now get Copilot code review comments directly in your Azure DevOps pull requests.

---

## Scale Context

To appreciate why GitHub is investing so heavily here, consider the scale GitHub mentioned in the Build 2026 announcements:

- GitHub commits have **nearly doubled year-over-year**, crossing **1.4 billion per month**
- Over **2 billion GitHub Actions minutes per week**

At this scale, agentic tooling that handles routine automation, security scanning, and PR triage becomes essential infrastructure.

---

## Partner Agent Apps

At launch, the GitHub Copilot app integrates with partner agent apps from:
**LaunchDarkly, Bright, Amplitude, Sonar, Endor Labs, Octopus Deploy, Packfiles, PagerDuty, Miro**

More partners are expected to be announced ahead of general availability.

---

## Getting Started

1. **Access the app** — available now in technical preview to all GitHub Copilot Pro, Pro+, Business, and Enterprise subscribers.
2. **Install the Copilot SDK** — `npm install @github/copilot-sdk` (TypeScript/Node.js)
3. **Try the experimental CLI TUI** — run `gh copilot` with the `/experimental` flag
4. **Enable Azure DevOps code review** — check your organization's Copilot settings for the new ADO integration toggle.

---

## References

- [GitHub Copilot app – The agent-native desktop experience](https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/)
- [Microsoft Build 2026 Official Hub](https://news.microsoft.com/build-2026/)
