---
title: Tip of the day - External Sharing Report for SharePoint Online Sites
author: valeras
date: 2024-05-01 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - powershell
  - tipoftheday
  - sharepoint
pin: false
slug: tip-day-powershell-external-sharing
comments: true
image:
  path: /img/posts/sharingreport.png
  alt: Tip of the day - Automating External Sharing Report
---

## Tip of the day: Automating External Sharing Report for SharePoint Online Sites

Goal: Help admins generate reports on external sharing settings for all SharePoint Online sites in their tenant.

```powershell
# Connect to SharePoint Online
Connect-PnPOnline -Url https://yoursite-admin.sharepoint.com -Interactive

# Get all SharePoint Online sites with detailed information
$sites = Get-PnPTenantSite -Detailed

# Create a list to store the report data
$report = @()

# Loop through each site and get the required sharing information
foreach ($site in $sites) {
    $reportObject = [PSCustomObject]@{
        Title                         = $site.Title
        Url                           = $site.Url
        SharingCapability             = $site.SharingCapability
        SharingAllowedDomainList      = $site.SharingAllowedDomainList -join ", "
        SharingBlockedDomainList      = $site.SharingBlockedDomainList -join ", "
        SharingDomainRestrictionMode  = $site.SharingDomainRestrictionMode
        SiteDefinedSharingCapability  = $site.SiteDefinedSharingCapability
        DisableSharingForNonOwners    = $site.DisableSharingForNonOwnersStatus
    }
    
    # Add the report object to the list
    $report += $reportObject
}
```

This script will generate a report with the following columns:

- Title
- Url
- SharingCapability
- SharingAllowedDomainList
- SharingBlockedDomainList
- SharingDomainRestrictionMode
- SiteDefinedSharingCapability
- DisableSharingForNonOwners

You can export the report to a CSV file for further analysis or sharing.

```powershell
