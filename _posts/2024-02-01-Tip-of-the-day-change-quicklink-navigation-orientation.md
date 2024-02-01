---
title: Tip of the day change quicklink navigation orientation
author: valeras
date: 2023-03-20 10:55:00 +0800
categories:
  - TipOfTheDay
  - SharingIsCaring
tags:
  - pnpPowershell
  - M365 CLI
  - Sharepoint
pin: false
slug: tip-of-the-day-change-quicklink-navigation-orientation
comments: true
image:
  path: /img/posts/navigationOrientation.PNG
  alt: Tip of the day change quicklink navigation orientation
draft: false
---

## Tip of the day: Change quicklink navigation orientation using PnP PowerShell and M365 CLI

### Introduction:

In SharePoint Online, you can change the orientation of the quick launch navigation from vertical to horizontal and vice versa. While using M365 CLI is easy to change the orientation of the quick launch navigation, it is not possible to do the same using PnP PowerShell using the [Set-PnPWeb](https://pnp.github.io/powershell/cmdlets/Set-PnPWeb.html) cmdlet.

In this blog post, we will demonstrate how to change the orientation of the quick launch navigation using PnP PowerShell without Set-PnPNavigationNode

### Option 1: Change the orientation of the quick launch navigation using M365 CLI


To change the orientation of the quick launch navigation using M365 CLI [spo web set](https://pnp.github.io/cli-microsoft365/cmd/spo/web/web-set/), run the following command:

```powershell
  
  m365 spo web set --url https://[tenant].sharepoint.com/sites/[your site] --HorizontalQuickLaunch true

```
### Option 2: Change the orientation of the quick launch navigation using PnP PowerShell


As off today, it is not possible to change the orientation of the quick launch navigation using PnP PowerShell using the [Set-PnPWeb](https://pnp.github.io/powershell/cmdlets/Set-PnPWeb.html) cmdlet. However, you can use the following PnP PowerShell script to change the orientation of the quick launch navigation:

```powershell
  $siteUrl = "https://[tenant].sharepoint.com/sites/[your site]"
  Connect-PnPOnline -Url $siteUrl -UseWebLogin
  $web = Get-PnPWeb

  $web.HorizontalQuickLaunch = $true 
  $web.Update()
  Disconnect-PnPOnline
```

## Conclusion

Both pnpPowerShell and M365 CLI are great tools to manage your SharePoint Online sites. However, there are some features that are not available in one tool but available in the other. ALso they are both constantly evolving and new features are added all the time. So it is important to keep up to date with the latest features and use the right tool for the job.

## References
[SharePoint Patterns and Practices (PnP) PowerShell](https://pnp.github.io/powershell/index.html) 
[Microsoft 365 CLI](https://pnp.github.io/cli-microsoft365/)
