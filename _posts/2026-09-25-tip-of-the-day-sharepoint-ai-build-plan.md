---
title: "Tip of the day – Review the SharePoint AI Build Plan Before You Build"
author: ValerasNarbutas
date: 2026-09-25 18:00:00 +0300
categories:
  - TipOfTheDay
  - AI
  - Microsoft365
tags:
  - sharepoint
  - copilot
  - ai-authoring
  - build
  - sharepoint-pages
  - site-creation
slug: tip-sharepoint-ai-build-plan
pin: false
comments: true
image:
  path: /img/posts/tip_sharepoint_ai_build_plan.png
  alt: Reviewing an AI-generated SharePoint site build plan
---

## The tip

When using **Create sites with AI** in SharePoint, treat the generated outline as a design review step, not as a preview of something that has already been created.

Describe the outcome you want, review the proposed pages, lists, libraries, columns, and views, and only then select **Build it**.

## A useful prompt

````text
Create a site for a software project team to track milestones,
risks, decisions, onboarding information, and release notes.
Include a Tasks list with owners, deadlines, and status, plus a
document library for design documents.
```

Copilot can ask follow-up questions before it proposes the structure. Use those questions to clarify the audience, workflow, and information that needs to be tracked.

## Inspect the plan

The planning experience lets you refine the outline with natural language:

````text
Add a time estimate column to the Tasks list.
```

````text
Remove the Team overview page and add a Release notes page.
```

During planning, Copilot creates a structured Markdown build plan named **SitePlan.md**. After successful provisioning, Microsoft documents it here:

````text
[Site Name] > Site contents > Agent Assets > Plans > SitePlan.md
```

Use the plan as a record of the approved structure, but still inspect the actual site after provisioning.

## Remember the preview boundaries

The current documentation lists several unsupported or incomplete areas during preview, including:

- Complex Power Automate flows
- Permission and sharing setup
- Column and row formatting
- Advanced web parts
- Third-party integrations

Configure these areas manually and validate the generated pages, flexible sections, navigation, labels, permissions, and accessibility before sharing the site.

> Copilot in SharePoint and Create sites with AI are documented as preview experiences. Use a non-production site first and review all generated content and configuration.
{: .prompt-warning }

## References

- [Create sites with AI](https://learn.microsoft.com/en-us/sharepoint/create-sites-with-ai)
- [Get started with Copilot in SharePoint (preview)](https://learn.microsoft.com/en-us/sharepoint/copilot-in-sharepoint-get-started)
- [Getting started with Build in SharePoint](https://support.microsoft.com/en-us/sharepoint/get-started-with-sharepoint/getting-started-with-build-in-sharepoint)

## Image Prompt

```text
Wide horizontal blog banner, 40:21 aspect ratio. Flat illustration of a small planning workshop with three colleagues gathered around a table, reviewing a colourful SharePoint site blueprint and pointing at page, list, and library cards. Warm cream background with blue, cyan, and amber accents. Group centered with safe space around them. No readable text, no logos. --ar 40:21 --style raw
```
