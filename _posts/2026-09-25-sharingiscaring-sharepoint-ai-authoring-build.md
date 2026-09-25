---
title: "SharePoint AI Authoring: From an Idea to a Site with Build"
author: ValerasNarbutas
date: 2026-09-25 14:00:00 +0300
categories:
  - SharingIsCaring
  - AI
  - Microsoft365
tags:
  - sharepoint
  - copilot
  - ai-authoring
  - sharepoint-pages
  - microsoft365
  - build
  - site-creation
slug: sharepoint-ai-authoring-build-sites
pin: false
comments: true
image:
  path: /img/posts/sharepoint_ai_authoring_build.png
  alt: SharePoint Build using AI to plan and create a site
---

## Summary

SharePoint is adding an AI-assisted path from a natural-language idea to a working site. With **Build** and **Create sites with AI**, you can describe a scenario, review a proposed structure, refine it through chat, and approve the plan before SharePoint provisions the site.

The generated solution can include pages, navigation, lists, document libraries, columns, views, sample files, and sample list items. This is more than asking Copilot to rewrite a paragraph: it is a planning and provisioning workflow for a SharePoint solution.

> Copilot in SharePoint is documented as a **preview** experience. Availability, controls, supported scenarios, and generated output can change. Review the plan and the resulting site before using it with real business data.
{: .prompt-warning }

## Build is the starting place

Microsoft describes **Build** as a central place for creating and improving SharePoint sites, lists, document libraries, and agents. Users with a Copilot license can also see AI-assisted actions such as creating an agent and improving a site.

To open it:

1. Open SharePoint from the Microsoft 365 app bar or visit a SharePoint site.
2. Select **Build** in the SharePoint side app bar.
3. Choose a guided creation experience or describe what you want to build.

If the Site option is unavailable, self-service site creation may be disabled by your organization. In that case, a SharePoint administrator needs to create the site or enable the appropriate setting.

## Describe the outcome, not the implementation

Start with the business scenario rather than a list of technical objects. For example:

````text
Create a site for a software project team to track milestones,
risks, decisions, and onboarding information. Include a project
overview page, a task list with owners and deadlines, a document
library for design documents, and a page for frequently asked questions.
```

Copilot can ask clarifying questions about the audience, project type, tracking needs, or information structure. The answers help it propose a more useful plan instead of guessing at every detail.

The important distinction is that the first response is a **proposal**. Assets are not created simply because Copilot displayed an outline.

## Review the plan before provisioning

The planning experience presents a visual outline of the proposed site. Depending on the request, it can include:

- Pages and navigation
- Lists, columns, and views
- Document libraries and metadata
- Sample documents and list items

Review each component before selecting **Build it**. You can also continue the conversation with changes such as:

````text
Add a time estimate column to the Tasks list.
```

````text
Remove the Team overview page and add a page for release notes.
```

The outline updates as the plan changes. This review step is valuable because it gives the site owner a chance to correct the information architecture before provisioning begins.

## SitePlan.md is the build contract

While the plan is refined, Copilot creates a structured Markdown build plan named **SitePlan.md**. It describes the proposed components and content used during provisioning.

After a successful site creation, Microsoft documents the plan at:

````text
[Site Name] > Site contents > Agent Assets > Plans > SitePlan.md
```

Treat this file as an audit-friendly record of what was requested and approved. It is not a replacement for reviewing the actual site, but it can help explain how the initial structure was generated.

## What happens when you build it

After reviewing the outline, select **Build it** and confirm the site name and sensitivity label. SharePoint then uses the plan to:

1. Create the site.
2. Configure navigation and settings.
3. Create lists and libraries with their columns, views, and metadata.
4. Create pages with sample content.
5. Add sample documents and list items.

Provisioning can take up to 30 minutes, depending on the size of the solution. Do not close the browser while creation is progressing.

The new site is a starting point, not a finished production implementation. Validate permissions, labels, navigation, content quality, accessibility, and governance before sharing it broadly.

## Where flexible sections fit

SharePoint modern pages already provide flexible layouts through sections and columns. AI-generated pages are created within that page model; flexible sections are not a separate, newly announced AI feature.

That distinction matters. Copilot can propose pages and sample content, but the current preview documentation lists several areas that it cannot automatically complete, including:

- Complex Power Automate flows
- Permission and sharing setup
- Column and row formatting
- Advanced web parts
- Third-party integrations

Use AI to accelerate the first draft of the information architecture, then use the normal SharePoint page editor and administration tools for the parts that require precise configuration.

## Tenant controls and licensing

The current Copilot in SharePoint documentation describes the feature as an opt-out preview rolling out from mid-June 2026. Users need an active Microsoft Copilot license. Administrators can control availability with the SharePoint Online Management Shell and the preview `KnowledgeAgentScope` settings.

For example, to make the preview available across all sites:

```powershell
Connect-SPOService https://yourtenant-admin.sharepoint.com
Set-SPOTenant -KnowledgeAgentScope AllSites
Get-SPOTenant | Select-Object KnowledgeAgentScope
```

To turn it off tenant-wide:

```powershell
Set-SPOTenant -KnowledgeAgentScope NoSites
Get-SPOTenant | Select-Object KnowledgeAgentScope
```

The parameter names retain the `KnowledgeAgent` terminology during preview. Use the latest SharePoint Online Management Shell version documented by Microsoft before applying these settings, and test tenant-wide changes with your administrators.

## A safe way to try it

For a first experiment, use a non-production team site and a scenario with no confidential source documents:

1. Describe one concrete business process.
2. Review every proposed page, list, library, column, and view.
3. Remove anything that is not needed.
4. Build the site with sample content.
5. Check the resulting pages and flexible layouts manually.
6. Configure permissions and sharing yourself.
7. Replace sample content only after the structure is approved.

This gives you the speed of AI-assisted authoring without treating generated content or configuration as automatically trustworthy.

## Why this matters

The interesting change is the combination of **planning**, **natural-language refinement**, and **provisioning**. Copilot is not only helping write page content; it is helping users express a solution structure that SharePoint can turn into a site.

For developers and platform teams, this creates a new design question: which parts of a SharePoint solution should be generated, which should be standardized through templates, and which must remain explicitly governed? The strongest results will come from combining AI-assisted authoring with clear site design standards and human review.

## References

- [Create sites with AI](https://learn.microsoft.com/en-us/sharepoint/create-sites-with-ai)
- [Get started with Copilot in SharePoint (preview)](https://learn.microsoft.com/en-us/sharepoint/copilot-in-sharepoint-get-started)
- [Getting started with Build in SharePoint](https://support.microsoft.com/en-us/sharepoint/get-started-with-sharepoint/getting-started-with-build-in-sharepoint)
- [Customizing modern site pages](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/customizing-modern-site-pages)

## Image Prompt

```text
Flat banner illustration: a natural-language idea transforms into a colourful SharePoint site with pages, lists, and libraries. Light blue background with cyan and amber details. Simple workflow composition, clean modern style, no text, no logos.
```
