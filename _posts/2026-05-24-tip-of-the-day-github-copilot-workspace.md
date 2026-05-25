---
title: "Tip of the day – GitHub Copilot Workspace: Build entire features from one prompt"
author: valeras
date: 2026-05-24 08:00:00 +0800
categories:
  - TipOfTheDay
  - AI
  - GitHub
tags:
  - GitHubCopilot
  - CopilotWorkspace
  - AI
  - tipoftheday
  - GitHub
  - Microsoft
  - Copilot
  - Agents
  - DevTools
pin: false
slug: tip-day-github-copilot-workspace-build-features
comments: true
image:
  path: /img/posts/tip_github_copilot_workspace.png
  alt: GitHub Copilot Workspace – Build entire features from one prompt
---

## Summary

GitHub Copilot Workspace — now generally available after Build 2026 — lets you describe a feature in plain English and get a complete multi-file implementation plan with code changes ready to review and merge. Here's how to start using it today.

---

## What is GitHub Copilot Workspace?

Copilot Workspace is an **agentic development environment** built into GitHub. Unlike inline code suggestions, Workspace works at the **task level** — you give it a goal and it figures out which files to change, writes the implementation plan, generates the code, and opens a pull request.

Think of it as the difference between asking someone *"complete this line of code"* vs *"build me this feature"*.

---

## How to Access It

You can access Copilot Workspace from three places:

1. **From a GitHub Issue** — open any issue and click **"Open in Workspace"**
2. **From a GitHub repository** — use the Copilot icon in the top navigation
3. **From VS Code** — via the GitHub Copilot extension (Workspace mode)

> **Requirement:** GitHub Copilot Individual, Business, or Enterprise subscription. Workspace is enabled by default as of May 2026.

---

## Step-by-Step: Build a Feature from a Prompt

### Step 1 – Open an Issue or Start Fresh

Go to your repository on GitHub. Either:
- Open an existing issue that describes the feature/bug
- Click the **Copilot** icon → **New Workspace session**

### Step 2 – Describe Your Task

Type your task in the prompt box. Be specific about the goal, not the implementation:

```
Add a new "Export to CSV" button on the SharePoint list web part that downloads 
the visible rows as a CSV file when clicked.
```

### Step 3 – Review the Plan

Copilot Workspace will generate a **multi-step plan** showing:
- Which files it intends to modify or create
- A plain-English description of each change
- Estimated scope

✅ **Edit the plan before proceeding.** You can remove steps, reword them, or add new ones. This is the most important step — the plan is your instruction set.

### Step 4 – Generate the Code

Click **"Generate code"**. Workspace applies all planned changes across your files simultaneously. You'll see a full diff with:
- New files created
- Existing files modified
- Clear colour-coded diff view

### Step 5 – Review and Create PR

Iterate on individual changes if needed (click any file → edit inline), then click **"Create pull request"**. Copilot drafts the PR title, description, and links back to the original issue automatically.

---

## Practical Tips

| Tip | Detail |
|---|---|
| **Be goal-oriented, not code-oriented** | Say "add pagination to the list" not "add a useState hook and map function" |
| **Use issues as input** | Issues written as user stories work best — Workspace understands context from labels and comments |
| **Edit the plan first** | Always review and trim the plan before generating code to avoid unwanted changes |
| **Iterate in small steps** | For large features, break into multiple Workspace sessions rather than one giant prompt |
| **Combine with Copilot chat** | After generating code, open Copilot chat in VS Code to refine specific functions |

---

## Real M365 Dev Use Cases

Here are scenarios where Copilot Workspace shines for Microsoft 365 developers:

- **SPFx web parts:** Describe a new web part property or UI behaviour — Workspace generates the TypeScript, SCSS, and manifest changes
- **Teams apps:** Add a new command to a Teams bot from a prompt — Workspace handles the handler, routing, and Teams manifest update
- **Power Automate custom connectors:** Generate a new connector action from an OpenAPI spec description
- **SharePoint Framework extensions:** Scaffold a new Application Customizer or Field Customizer from a description

---

## What It Does Not Do (Yet)

- Cannot deploy or run code — it only generates and creates PRs
- Does not understand build/test results automatically (though CI feedback integration is on the roadmap)
- Complex architectural changes across many files still benefit from human review of the plan
- Does not have access to your local environment — it works entirely from the GitHub repository

---

## Quick Reference

```
1. Open issue or repo → Copilot icon
2. Describe your task (goal-first)
3. Review + edit the generated plan
4. Generate code
5. Review diff → iterate if needed
6. Create PR
```

---

## Resources

- [GitHub Copilot Workspace docs](https://docs.github.com/en/copilot/github-copilot-workspace)
- [Copilot Workspace – Build 2026 announcement](https://github.blog/2026-05-19-copilot-workspace-generally-available/)
- [GitHub Next – Copilot Workspace project page](https://githubnext.com/projects/copilot-workspace)

---

*Have you tried Copilot Workspace yet? Share your experience in the comments!*
