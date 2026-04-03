---
title: "GitHub Copilot in VS Code – Agent Modes, Skills, and Prompts"
author: valeras
date: 2026-03-31 10:00:00 +0800
categories:
  - SharingIsCaring
  - AI
tags:
  - GitHub Copilot
  - AI
  - VSCode
  - Developer
  - tipoftheday
  - Productivity
pin: false
slug: github-copilot-agent-modes-skills-prompts-vscode
comments: true
image:
  path: /img/posts/gh_copilot_agent_modes.png
  alt: GitHub Copilot Agent Modes in VS Code
---

## Summary

GitHub Copilot has evolved far beyond autocomplete. With **Agent Mode**, **custom skills**, and **prompt files**, Copilot in VS Code is now a true AI development partner that can reason across your codebase, run terminal commands, browse files, and execute multi-step tasks autonomously. This post walks through everything you need to know to get the most out of it.

---

## Copilot Chat Modes in VS Code

When you open the Copilot Chat panel (`Ctrl+Alt+I`), you'll notice a mode selector at the bottom of the input box. There are three modes:

### 💬 Ask Mode
The default conversational mode. Great for:
- Asking questions about code or concepts
- Getting explanations of unfamiliar APIs
- Exploring ideas without making changes

```
How does the SharePoint REST API handle pagination?
```

### ✏️ Edit Mode
Copilot suggests edits across one or more files you specify. You review and accept/discard changes inline. Best for:
- Targeted refactors
- Adding a feature to a specific file
- Fixing a known bug

```
Add input validation to the createUser function in src/users.ts
```

### 🤖 Agent Mode
The most powerful mode. Copilot can autonomously:
- Read and edit multiple files
- Run terminal commands
- Search the codebase
- Install packages
- Iterate until the task is complete

```
Scaffold a new SPFx web part called TaskDashboard that reads items from a SharePoint list using PnPjs and displays them in a Fluent UI DetailsList
```

> To enable Agent Mode, make sure you are on VS Code **1.93+** and have the **GitHub Copilot Chat** extension installed.
{: .prompt-info }

---

## Agent Mode: Skills (Tools)

In Agent Mode, Copilot has access to built-in **skills** (also called tools) it can invoke autonomously:

| Skill | What it does |
|-------|-------------|
| `read_file` | Reads any file in the workspace |
| `write_file` / `edit_file` | Creates or modifies files |
| `run_in_terminal` | Executes shell commands |
| `search_codebase` | Semantic search across the project |
| `list_directory` | Browses folder structure |
| `fetch_url` | Retrieves content from a URL |
| `get_errors` | Reads compiler/linter errors from the editor |

You can see which skills are being invoked in real time as Copilot works — each step is shown with a collapsible tool call in the chat panel.

### Controlling which tools are active

Click the **tools icon** (🔧) next to the Agent Mode selector to toggle individual skills on or off. Useful if you want to prevent Copilot from running terminal commands in a sensitive environment.

---

## Prompt Files (`.github/copilot-instructions.md`)

You can give Copilot persistent, project-level instructions by creating a file at:

```
.github/copilot-instructions.md
```

This file is automatically injected into every Copilot Chat request in that workspace. Use it to encode your project's conventions:

```markdown
# Project Instructions

- This is a SharePoint Framework (SPFx) 1.20 project targeting SharePoint Online.
- Always use PnPjs v3 for SharePoint REST calls, never the native fetch API.
- Components use React functional components with hooks — no class components.
- Use Fluent UI v8 (`@fluentui/react`) for all UI elements.
- All async functions must have try/catch with proper error logging.
- Follow the existing folder structure: components in `src/components/`, services in `src/services/`.
```

> This is the single most impactful thing you can do to improve Copilot's output quality in your project.
{: .prompt-tip }

---

## Reusable Prompt Files

Beyond the global instructions file, you can create **reusable `.prompt.md` files** anywhere in your workspace and invoke them with `/` in Copilot Chat:

**`.github/prompts/new-webpart.prompt.md`:**
```markdown
Create a new SPFx web part with the following:
- Name: ${input:WebPartName}
- Use PnPjs to fetch data from a SharePoint list named "${input:ListName}"
- Display results in a Fluent UI DetailsList
- Include loading spinner and error state
- Follow project conventions from copilot-instructions.md
```

Invoke it in chat:
```
/new-webpart
```

Copilot will prompt you for the input variables and then execute the full scaffold.

---

## Practical Prompt Examples

Here are prompts that work especially well in Agent Mode for M365 development:

### 1. Scaffold a complete SPFx solution
```
Create a new SPFx web part called "TeamCalendar" that:
- Uses Microsoft Graph API to fetch calendar events for the current user
- Displays them in a Fluent UI Calendar component
- Handles authentication via MSGraphClientV3
- Includes a property pane option to set how many days ahead to show
```

### 2. Write PnP PowerShell with error handling
```
Write a PnP PowerShell script that:
- Connects to SharePoint Online using app-only authentication with certificate
- Gets all site collections in the tenant
- Exports site URL, owner, storage used, and last activity date to a CSV
- Includes try/catch and verbose logging
```

### 3. Generate a Graph API call
```
Write a TypeScript function using @microsoft/microsoft-graph-client that:
- Gets all members of a Teams channel
- Returns their displayName, email, and userPrincipalName
- Handles paging if there are more than 20 members
```

### 4. Debug an existing issue
```
The function in src/services/SharePointService.ts throws a 403 error when called from
a Guest user context. Analyze the code, identify why, and fix it.
```

### 5. Write tests
```
Write Jest unit tests for all exported functions in src/utils/dateHelpers.ts.
Cover edge cases including null input, invalid dates, and timezone differences.
```

---

## Tips for Better Prompts

- **Be specific about the tech stack** — mention SPFx version, Fluent UI version, PnPjs version
- **Reference existing files** — `using the pattern from src/services/GraphService.ts`
- **Describe the desired output** — not just what to build but how it should behave
- **Iterate in the same chat thread** — Copilot retains context, so follow up with refinements
- **Use `#file:` to attach context** — type `#file:src/components/MyComponent.tsx` in your prompt to include a specific file

```
#file:src/webparts/tasks/TasksWebPart.ts
Refactor the data-fetching logic into a separate service class following
the same pattern as the existing GraphService
```

---

## Agent Mode: A Real Workflow Example

Here's an end-to-end example of what Agent Mode can do in one prompt:

**Prompt:**
```
Add a new "Export to CSV" button to the TaskDashboard web part. When clicked it should:
1. Fetch all items from the Tasks list
2. Convert them to CSV format
3. Trigger a file download in the browser
Write the necessary service method, hook, and update the component. Run the build to verify it compiles.
```

**What Copilot does autonomously:**
1. Reads `TaskDashboard.tsx`, `TasksService.ts`, and related files
2. Adds `exportToCsv()` to the service
3. Creates a `useExport` hook
4. Updates the component with the button
5. Runs `gulp build` in the terminal
6. If there are TypeScript errors, reads them and fixes them

All without leaving VS Code. 🚀

---

## Conclusion

GitHub Copilot Agent Mode in VS Code is a genuine multiplier for M365 developers. With the right prompt files, reusable prompts, and an understanding of how to leverage skills, you can automate entire development workflows — from scaffolding solutions to writing tests and fixing build errors.

Start small: add a `copilot-instructions.md` to your next project and see how much more on-target the suggestions become.

---

## References

- [GitHub Copilot Agent Mode – VS Code Docs](https://code.visualstudio.com/docs/copilot/copilot-chat#_use-agent-mode)
- [Customizing Copilot Chat with Instructions](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [Prompt Files in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization#_reusable-prompt-files-experimental)
- [GitHub Copilot for Azure](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azure-github-copilot)
