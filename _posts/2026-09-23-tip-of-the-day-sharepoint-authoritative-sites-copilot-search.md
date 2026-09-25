---
title: "Tip of the day – Mark Trusted SharePoint Sites as Authoritative for Copilot Search"
author: valeras
date: 2026-09-23 13:00:00 +0300
categories:
  - TipOfTheDay
  - AI
  - Microsoft365
tags:
  - sharepoint
  - copilot-search
  - microsoft365
  - governance
  - knowledge-management
slug: sharepoint-authoritative-sites-copilot-search
pin: false
comments: true
image:
  path: /img/posts/sharepoint_authoritative_sites.png
  alt: Marking trusted SharePoint sites as authoritative sources for Copilot Search
---

## Tip

If users need Copilot Search to prioritize a trusted collection of SharePoint content, use **authoritative sites** instead of repeating the same instruction in every prompt.

An authoritative site tells Copilot Search that the content on that SharePoint site is a preferred source for relevant answers. This is useful for official policy hubs, service documentation, HR guidance, product knowledge, and other content that should outrank less-controlled copies.

### Use authority for trusted content

Good candidates are sites with:

- A clear business owner
- Reviewed and maintained pages or documents
- A defined audience and purpose
- A reliable navigation and content structure
- Permission settings that match the intended audience

Do not mark a site authoritative merely because it contains a large amount of content. Authority is a governance decision, not a popularity score.

### Remember what authority does not do

Authoritative-site configuration does not grant access to content. Copilot Search still respects the user's existing permissions and applicable Microsoft 365 security and compliance controls.

It also does not fix outdated or contradictory information. Review the content lifecycle, archive duplicates, and assign an owner before elevating a site.

> First improve the source, then mark it authoritative. A trusted label should make accurate content easier to find, not make unreliable content look official.
{: .prompt-warning }

### A practical review checklist

Before adding a site, check:

1. Is the site an official source for a defined topic?
2. Is the content reviewed by the responsible team?
3. Are old pages and duplicate documents handled?
4. Are permissions intentionally configured?
5. Is there an owner who will review the designation later?

Revisit authoritative sites when ownership, information architecture, or business policy changes.

### Configure the site

The current release uses SharePoint Online PowerShell rather than a SharePoint admin center setting:

```powershell
Connect-SPOService -Url "https://<tenant>-admin.sharepoint.com"
Set-SPOSite -Identity "https://<tenant>.sharepoint.com/sites/<siteName>" `
  -IsAuthoritative $true
```

My recommendation is to begin with a small, reviewed set of official sites. Microsoft currently supports up to 100 authoritative sites, and changes can take up to 72 hours to appear in supported experiences, so record the owner and review date for every designation.

## References

- [SharePoint authoritative sites in Copilot Search](https://learn.microsoft.com/en-us/sharepoint/sharepoint-authoritative-sites)
- [Microsoft Copilot Search](https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-search)
- [Microsoft Copilot Search frequently asked questions](https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-search-faq)

## Image Prompt

```text
Wide horizontal blog banner, 40:21 aspect ratio. Flat illustration of a knowledge manager guiding two colleagues toward a bright trusted digital knowledge hub, while dimmer document shelves sit behind them. Deep charcoal background with blue, cyan, amber, and green accents. People and hub centered with generous safe space. No readable text, no logos. --ar 40:21 --style raw
```
