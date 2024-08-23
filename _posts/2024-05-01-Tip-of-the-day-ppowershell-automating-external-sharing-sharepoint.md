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

### Using PnP PowerShell
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

### Using Microsoft 365 CLI

```bash
m365 login
# Fetch all site data in JSON format from the CLI
$sitesJson = m365 spo site list --output json

# Convert the JSON string to a PowerShell object
$sites = $sitesJson | ConvertFrom-Json

# Prepare the report as a PowerShell object with selected properties
$report = @()

foreach ($site in $sites) {
    $reportObject = [PSCustomObject]@{
        Title                        = $site.title
        Url                          = $site.url
        SharingCapability            = $site.sharingCapability
        SharingAllowedDomainList     = ($site.sharingAllowedDomainList -join ", ") 
        SharingBlockedDomainList     = ($site.sharingBlockedDomainList -join ", ")
        SharingDomainRestrictionMode = $site.sharingDomainRestrictionMode
        SiteDefinedSharingCapability = $site.siteDefinedSharingCapability
        DisableSharingForNonOwners   = $site.disableSharingForNonOwnersStatus
    }

    # Add the report object to the list
    $report += $reportObject
}

# Output the report as a table in PowerShell
$report | Format-Table -AutoSize

# Optionally, export the report to a CSV file
$report | Export-Csv -Path "C:\Reports\SharePointSharingReport.csv" -NoTypeInformation

```

### Properties in the Report:

- **Title:** The name of the site.
- **Url:** The site's URL.
- **SharingCapability:** The overall sharing capability (e.g., `ExternalUserSharingOnly`, `ExistingExternalUserSharingOnly`).
- **SharingAllowedDomainList:** A list of allowed external domains for sharing.
- **SharingBlockedDomainList:** A list of blocked external domains.
- **SharingDomainRestrictionMode:** Specifies the sharing domain restriction mode (`None`, `AllowList`, `BlockList`).
- **SiteDefinedSharingCapability:** Sharing capability defined at the site level.
- **DisableSharingForNonOwnersStatus:** Indicates whether sharing is disabled for non-owners.
