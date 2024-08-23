---
title: Tip of the day - Modernizing Classic SharePoint Sites
author: valeras
date: 2024-06-01 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - PnP PowerShell
  - tipoftheday
  - sharepoint
  - SharingIsCaring
pin: false
slug: tip-day-powershell-modernizing-sharepoint
comments: true
image:
  path: /img/posts/upgardesite.png
  alt: Tip of the day - Modernizing Classic SharePoint Sites to Modern Experience
---

## Tip of the day: Modernizing Classic SharePoint Sites to Modern Experience

Goal: Help admins modernize classic SharePoint sites to the modern experience for improved performance and user experience.

### Using PnP PowerShell
```powershell
# Connect to SharePoint Online
Connect-PnPOnline -Url https://yoursite-admin.sharepoint.com -Interactive

# Enable the modern experience on a classic site
Invoke-PnPSiteSwap -SourceUrl https://devgods.sharepoint.com/search -TargetUrl https://devgods.sharepoint.com/searchmodern -ArchiveUrl https://devgods.sharepoint.com/searcharchive

```

