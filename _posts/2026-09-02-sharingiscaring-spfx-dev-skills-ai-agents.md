---
title: "SPFx Dev Skills: Give AI Coding Agents the Right SharePoint Toolchain"
author: ValerasNarbutas
date: 2026-09-02 18:00:00 +0300
categories:
  - SharingIsCaring
  - AI
  - GitHub
tags:
  - sharepoint
  - spfx
  - ai-coding-agents
  - github-copilot
  - fluent-ui
  - pnpjs
  - heft
  - microsoft365
slug: spfx-dev-skills-ai-coding-agents
pin: false
comments: true
image:
  path: /img/posts/spfx_dev_skills_ai_agents.png
  alt: SPFx development skill guiding an AI coding agent through the correct toolchain
---

## Summary

AI coding agents can recognize many SharePoint Framework projects, but recognition is not the same as reliable implementation. SPFx versions use different toolchains, upgrades can require more than changing `package.json`, and a generated solution still needs a clean build and human review.

Microsoft's **SPFx development skill** packages SharePoint-specific decision rules into a portable `spfx` skill for compatible AI coding agents. It helps an agent choose the right playbook for creating, upgrading, designing, and accessing data in an SPFx solution.

> SPFx Dev Skills are in **preview**. The skill, file layout, commands, and guidance can change. Review generated code and commands before committing or deploying anything.
{: .prompt-warning }

## What the skill covers

The skill routes a natural-language request to focused references:

| Task | Guidance |
| --- | --- |
| Create | Scaffold web parts, extensions, libraries, and Adaptive Card Extensions |
| Upgrade | Inspect versions and use CLI for Microsoft 365 to apply version-specific changes |
| React design | Use Fluent UI v9 with theming, accessibility, responsiveness, and host awareness |
| Data access | Use PnPjs for SharePoint and Microsoft Graph operations |

The goal is not to replace Microsoft Learn or the SharePoint toolchain. It is to help an agent use those sources and tools in the right order.

## The toolchain decision matters

The skill checks the installed SPFx version before choosing a build path:

- **SPFx 1.22.0 and later:** use Heft.
- **SPFx 1.21.1 and earlier:** use the legacy gulp toolchain.

This prevents a common class of generated-project errors: applying modern commands to an older solution or applying legacy commands to a project that has already moved to Heft.

The skill also encourages non-interactive scaffolding and a clean build at the end of the task, which is especially important when an agent is running in a terminal or CI environment.

## Install the preview skill

Microsoft's current Learn instructions describe manual installation:

```bash
git clone https://github.com/SharePoint/spfx-dev-skills.git
```

Then copy this folder into a skills directory supported by your coding agent:

````text
plugins/spfx/skills/spfx/
```

Common locations include `.github/skills` or a global skills directory, depending on the agent host. Keep the folder name `spfx`, then start a new agent session so it can discover the skill.

The repository currently describes marketplace or one-command distribution as a future direction. Use the manual path documented by Microsoft rather than assuming a package-manager command exists.

## Example requests

Once the skill is installed, ask for a concrete SPFx task:

````text
Create an SPFx React web part called RecentDocuments.
```

````text
Upgrade this SPFx solution to the requested target version.
```

````text
Add an accessible Fluent UI v9 card layout to this web part.
```

````text
Read items from the Projects list and display them.
```

The skill is designed to inspect the project and route the task. It is still important to specify the target SPFx version, data source, expected behavior, and validation requirements when those details matter.

## Why upgrades are a useful test

Microsoft published an evaluation of an SPFx 1.21.1-to-1.22.2 upgrade scenario. The baseline agent often produced a project that appeared to work while missing dependency and configuration details.

The evaluation found that explicitly directing the agent to use the existing `spfx project upgrade` command from CLI for Microsoft 365 produced much stronger results:

- Dependency currency increased from **34/50 to 50/50**.
- Configuration correctness increased from **38/85 to 83/85**.
- After the documentation and skill guidance were refined, configuration correctness reached **85/85** in the reported scenario.

The lesson is broader than SPFx: a tool being available does not mean an agent will choose it. Good agent guidance needs decision rules that challenge an incorrect manual plan and route the task to the deterministic tool that already encodes the migration logic.

## Upgrade with an explicit command

When asking an agent to upgrade an SPFx project, make the important path explicit:

````text
Inspect the current SPFx version and Node.js compatibility.
Use CLI for Microsoft 365's spfx project upgrade command to generate
and apply the version-specific changes in order. Then run a clean build
and report any remaining issues.
```

The exact CLI options depend on the source and target versions. Let the tool generate the version-specific report rather than inventing package versions or applying a generic global replacement.

## React and Fluent UI guidance

For React-based solutions, the skill provides a UI contract that covers:

- Fluent UI v9 components
- SharePoint theming
- Responsive layouts
- Accessibility
- Host-aware behavior

This is useful because “make a card” is not enough for an SPFx web part. The result must work with the host theme, keyboard navigation, responsive sizes, and the target framework version.

## PnPjs as the default data layer

For SharePoint and Microsoft Graph data access, the skill guides agents toward PnPjs with selective imports and proper initialization. This gives the agent a consistent starting point for common operations while leaving authentication, permissions, and API scope decisions visible for review.

Do not treat the default as permission to request broad access. Confirm the least-privileged permissions needed by the solution, validate the request against the tenant's governance rules, and test with a user who has the intended access.

## The skill is one part of the system

Microsoft's evaluation is valuable because it showed that improvements do not belong only in a skill:

- CLI for Microsoft 365 already contained deterministic upgrade logic.
- Microsoft Learn documentation needed clearer guidance about when to use the CLI.
- The agent's content retrieval path also benefited from Markdown support.

An agent skill works best when the documentation, tools, and platform all reinforce the same decision. A `SKILL.md` file cannot compensate for a missing migration tool or an ambiguous source of truth.

## A practical review checklist

Before accepting an agent-generated SPFx change:

1. Confirm the source and target SPFx versions.
2. Check Node.js and TypeScript compatibility.
3. Verify whether the project uses Heft or gulp.
4. Inspect every generated dependency and configuration change.
5. Review permissions and Graph or SharePoint scopes.
6. Test theming, accessibility, and responsive behavior.
7. Run a clean build and the project's tests.
8. Test in a non-production tenant before deployment.

The skill improves the starting point; it does not remove engineering responsibility.

## Why this matters

The most useful AI development skill is not the one that generates the largest amount of code. It is the one that reliably chooses the correct source, toolchain, and validation path for the task.

SPFx Dev Skills are a practical example: detect the version, select Heft or gulp, use CLI for Microsoft 365 for upgrades, follow a focused UI and data-access playbook, and finish with a clean build. That is the kind of repeatable behavior that makes an AI coding agent safer and more useful for Microsoft 365 development.

## References

- [Use the SPFx development skill with AI coding agents](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/agent-skills)
- [SharePoint/spfx-dev-skills on GitHub](https://github.com/SharePoint/spfx-dev-skills)
- [Behind SPFx Dev Skills: testing what agents know and fixing what they miss](https://devblogs.microsoft.com/microsoft365dev/behind-spfx-dev-skills-testing-what-agents-know-and-fixing-what-they-miss/)
- [CLI for Microsoft 365](https://aka.ms/cli-m365)

## Image Prompt

```text
Flat banner illustration: an AI coding assistant guides an SPFx project through upgrade, validation, and a green build check. Dark navy background with electric blue and amber highlights. Technical geometric style, no text, no logos.
```
