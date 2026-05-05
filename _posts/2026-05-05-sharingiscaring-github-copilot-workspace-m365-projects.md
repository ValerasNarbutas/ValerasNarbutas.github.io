---
title: "Sharing is Caring – GitHub Copilot Workspace for M365 Projects"
author: valeras
date: 2026-05-05 08:00:00 +0800
categories:
  - SharingIsCaring
  - AI
tags:
  - GitHub Copilot
  - AI
  - SPFx
  - M365
  - TypeScript
  - Developer
  - Copilot
  - Workspace
pin: false
slug: sharingiscaring-github-copilot-workspace-m365-projects
comments: true
image:
  path: /img/posts/gh_copilot_workspace_m365.png
  alt: GitHub Copilot Workspace for M365 Projects
---

## Summary

**GitHub Copilot Workspace** is the agentic evolution of GitHub Copilot — instead of completing a single line or answering a single question, it takes an issue or task description and plans, implements, and iterates across multiple files in your repository. For M365 developers working with SPFx, PnP PowerShell, and Teams solutions, Workspace dramatically reduces the repetitive scaffolding and boilerplate work that slows development down.

This post walks through three real M365 scenarios where Copilot Workspace made a meaningful difference: upgrading an SPFx web part, refactoring a PnP PowerShell module, and implementing a Teams message extension.

---

## What Is GitHub Copilot Workspace?

Copilot Workspace is accessed directly from a GitHub issue or from the Copilot tab in a repository. Instead of you writing code, you:

1. **Describe the task** — in plain language, in a GitHub issue, or by selecting a file and choosing "Open in Workspace".
2. **Review the plan** — Copilot generates a step-by-step plan for what files to create, edit, or delete.
3. **Approve and iterate** — you can edit the plan, regenerate individual steps, and ask follow-up questions before committing.
4. **Create a PR** — Workspace can open a pull request with the generated changes ready for review.

> Copilot Workspace is available to GitHub Copilot Individual, Business, and Enterprise subscribers. Access it from [githubnext.com/projects/copilot-workspace](https://githubnext.com/projects/copilot-workspace) or directly from any repository issue.
{: .prompt-tip }

---

## Scenario 1: Upgrading an SPFx Web Part to SPFx 1.21

### The starting point

You have an SPFx 1.18 web part that uses `sp-http` for REST calls. You want to upgrade it to 1.21 and migrate the data calls to use the **Graph SDK v4** (`@microsoft/microsoft-graph-client`).

### Opening the task in Workspace

1. Open your repository on GitHub.
2. Create an issue:

```
Title: Upgrade HelloWorldWebPart to SPFx 1.21 and Graph SDK v4

The web part at src/webparts/helloWorld/HelloWorldWebPart.ts currently uses 
SPHttpClient for all Graph calls. 

Requirements:
- Upgrade package versions in package.json to SPFx 1.21 compatible versions
- Replace all SPHttpClient Graph calls with @microsoft/microsoft-graph-client v4
- Update getPropertyPaneConfiguration to use modern PnP property controls
- Add proper TypeScript types for all API responses
- Update README with new local setup instructions
```

3. Click **Open in Copilot Workspace** from the issue.

### What Workspace produces

Copilot Workspace generates a plan like:

```
Plan:
1. Update package.json — bump @microsoft/sp-core-library, @microsoft/sp-webpart-base, 
   and related packages to SPFx 1.21 compatible versions. Add @microsoft/microsoft-graph-client v4.
2. Update HelloWorldWebPart.ts — replace SPHttpClient references with GraphClient. 
   Add type imports from @microsoft/microsoft-graph-client.
3. Create types/GraphTypes.ts — define interfaces for User, Group, DriveItem response shapes.
4. Update HelloWorldWebPart.tsx — update component props and state types.
5. Update README.md — update node version requirement and setup steps.
```

You can **edit each step** before Workspace implements it. For example, if you want to keep SPHttpClient for SharePoint REST calls (but only swap Graph calls), you can annotate step 2 with that constraint.

### The result

Workspace generates diffs across all 5 files simultaneously. The PR diff is clean, typed, and ready for review — what would have been 2–3 hours of careful dependency juggling becomes a 20-minute review task.

---

## Scenario 2: Refactoring a PnP PowerShell Module

### The starting point

You have a PowerShell module with 8 functions that all call `Connect-PnPOnline` individually. You want to refactor to a shared connection management pattern and add `Pester` unit tests.

### The issue

```
Title: Refactor PnPHelper module — shared connection + Pester tests

The module at src/powershell/PnPHelper.psm1 has 8 exported functions.
Each function calls Connect-PnPOnline directly with hardcoded parameters.

Requirements:
- Extract connection logic into a private Initialize-PnPConnection function
- Add $script:PnPConnected flag so connection is only made once per session
- Add a public Disconnect-PnPHelper function
- Create tests/PnPHelper.Tests.ps1 with Pester 5 tests for the exported functions
- Mock Connect-PnPOnline in all tests so no real tenant connection is needed
```

### Workspace plan

```
Plan:
1. Edit PnPHelper.psm1 — add $script:PnPConnected and $script:SiteUrl module-scoped vars.
2. Add Initialize-PnPConnection (private) and Disconnect-PnPHelper (public).
3. Refactor each of the 8 functions to call Initialize-PnPConnection instead of Connect-PnPOnline directly.
4. Create tests/PnPHelper.Tests.ps1 — Pester 5 Describe/It blocks with Mock for Connect-PnPOnline.
5. Update module manifest PnPHelper.psd1 — add Disconnect-PnPHelper to FunctionsToExport.
```

### Key benefit

The test file generation is where Workspace saves the most time. Manually writing Pester mocks for 8 functions is tedious; Workspace generates all the boilerplate and correctly infers which parameters each function uses based on the source code it reads.

---

## Scenario 3: Adding a Teams Message Extension

### The starting point

You have a Teams app with a bot. You want to add a **search-based message extension** that lets users search for SharePoint documents and insert a card into the conversation.

### The issue

```
Title: Add SharePoint document search message extension to Teams app

The Teams app is in src/teams-app/.
It already has a bot (BotActivityHandler.ts) and a manifest (appPackage/manifest.json).

Requirements:
- Add a search-based message extension that searches SharePoint via Graph API
  (endpoint: /sites/{siteId}/drive/root/search(q='{query}'))
- Return results as Hero Cards with document title, URL, and file type icon
- Register the message extension in the manifest
- Add handleTeamsMessagingExtensionQuery handler to BotActivityHandler.ts
- Include error handling for 0 results and Graph API errors
```

### What Workspace generates

Workspace correctly identifies that it needs to:
- Modify `BotActivityHandler.ts` (adds `handleTeamsMessagingExtensionQuery`)
- Add `SharePointSearchService.ts` (Graph API call, typed response)
- Modify `manifest.json` (adds `composeExtensions` section)
- Add `types/SharePointTypes.ts` (interfaces for Drive search response)

The manifest update is particularly useful — Workspace knows the Teams manifest schema and generates the correct `composeExtensions` JSON structure without you needing to look up the docs.

---

## Tips for Getting the Best Results from Copilot Workspace

| Tip | Why It Helps |
|-----|-------------|
| **Write issues like a spec, not a bug report** | Workspace uses the full issue body as context — the more precise, the better the plan |
| **Reference specific files and function names** | "Edit `src/webparts/HelloWorld/HelloWorldWebPart.ts`" produces tighter diffs than "update the web part" |
| **Use acceptance criteria** | Bullet-point requirements at the end of the issue become the checklist Workspace checks against |
| **Edit the plan before implementing** | You can remove steps you don't want, add constraints, or reorder — the plan is fully editable |
| **Iterate with follow-up questions** | After the first implementation, ask "add input validation to all functions" — Workspace applies it across all generated code |
| **Review diffs carefully before merging** | Workspace is fast but not infallible — always review generated TypeScript types and PowerShell logic |

---

## Limitations to Be Aware Of

- **Large monorepos** — Workspace works best on focused, well-structured repositories. Very large monorepos can cause it to miss files outside the most relevant directories.
- **External APIs it doesn't know** — for APIs not in its training data, generated calls may have incorrect endpoint structures. Always verify Graph API calls against the [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer).
- **Complex merge conflicts** — if your branch is significantly behind main, Workspace's generated changes may conflict. Rebase first.
- **Test quality** — generated Pester and Jest tests are good for happy-path coverage but rarely cover all edge cases. Treat them as a starting point, not a final test suite.

---

## Conclusion

GitHub Copilot Workspace is a genuine productivity multiplier for M365 development. The scenarios above represent hours of work reduced to minutes of reviewing and approving a generated plan. The key shift is in how you write issues — when you treat your GitHub issues as a specification, Workspace can act on them directly.

Start with a focused, well-described issue on a non-critical feature, review the generated plan carefully, and build confidence before using it on production-critical changes.

---

## References

- [GitHub Copilot Workspace](https://githubnext.com/projects/copilot-workspace)
- [GitHub Copilot documentation](https://docs.github.com/copilot)
- [SharePoint Framework development overview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Microsoft Graph Drive search API](https://learn.microsoft.com/graph/api/driveitem-search)
- [Teams message extensions overview](https://learn.microsoft.com/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions)
- [Pester 5 documentation](https://pester.dev/docs/quick-start)
