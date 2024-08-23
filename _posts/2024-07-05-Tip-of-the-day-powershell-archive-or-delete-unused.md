---
title: Tip of the day - Archive or Delete Unused SharePoint Sites
author: valeras
date: 2024-07-05 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - PnP PowerShell
  - tipoftheday
  - sharepoint
  - SharingIsCaring
pin: false
slug: tip-day-powershell-archive-or-delete-unused
comments: true
image:
  path: /img/posts/archiveordeletesites.png
  alt: Tip of the day - Archive or Delete Unused SharePoint Sites
---

## Tip of the day: Archive or Delete Unused SharePoint Sites

Goal: You want to identify inactive SharePoint Online sites based on their activity (e.g., no file or page activities for 6 months) and automatically archive or delete these sites.

### Using PnP PowerShell
```powershell
# Connect to SharePoint Online
Connect-PnPOnline -Url https://yoursite-admin.sharepoint.com -Interactive

# Set inactivity period (in months)
$monthsOfInactivity = 6
$inactivityThreshold = (Get-Date).AddMonths(-$monthsOfInactivity)

# Get all site collections
$sites = Get-PnPTenantSite -IncludeOneDriveSites -Detailed

# Initialize an empty array to store inactive sites
$inactiveSites = @()

foreach ($site in $sites) {
    
    # Check the Last Activity Date
    if ($site.LastContentModifiedDate -lt $inactivityThreshold) {
        # Add inactive sites to the array
        $inactiveSites += [PSCustomObject]@{
            Title          = $site.Title
            Url            = $site.Url
            LastActivity   = $site.LastContentModifiedDate
            Storage        = $site.StorageUsageCurrent 
            SiteOwner      = $site.Owner
        }
    }
}

# Display the list of inactive sites for review
$inactiveSites | Format-Table -AutoSize

# Export inactive sites to CSV for reference
$inactiveSites | Export-Csv -Path "C:\Reports\InactiveSites.csv" -NoTypeInformation

# Optionally: Archive or Delete the sites (Review carefully before running)
foreach ($inactiveSite in $inactiveSites) {
    # Archive the site by setting it to "No Access" or move to a different location
    Set-PnPTenantSite -Url $inactiveSite.Url -LockState NoAccess

    # Alternatively, delete the site
    # Remove-PnPTenantSite -Url $inactiveSite.Url -Force -SkipRecycleBin
}

```

