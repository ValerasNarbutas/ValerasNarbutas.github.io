---
title: "Tip of the day – PowerShell Scripts for M365 Year-End Cleanup"
author: valeras
date: 2025-12-09 09:00:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - powershell
  - tipoftheday
  - sharepoint
  - M365
  - cleanup
  - PnP
pin: false
slug: tip-day-powershell-m365-year-end-cleanup
comments: true
image:
  path: /img/posts/ps_year_cleanup.png
  alt: PowerShell Scripts for M365 Year-End Cleanup
---

## Summary

Year-end is the perfect time to review and tidy up your Microsoft 365 tenant. Inactive SharePoint sites, stale guest accounts, orphaned Teams, and unused licences can accumulate over the year and create security, compliance, and cost problems. This post provides five ready-to-use PnP PowerShell scripts to tackle the most common year-end cleanup tasks.

---

## Prerequisites

```powershell
# Install or update PnP PowerShell
Install-Module PnP.PowerShell -Scope CurrentUser -Force

# You'll also need the Microsoft Graph PowerShell SDK for some scripts
Install-Module Microsoft.Graph -Scope CurrentUser -Force

# Connect to your admin site (replace with your tenant)
Connect-PnPOnline -Url "https://contoso-admin.sharepoint.com" -Interactive
```

> **Permissions required:** SharePoint Administrator and Global Reader (or User Administrator for guest account management).

---

## Script 1: Find Inactive SharePoint Sites

Sites that have not been accessed in 180+ days are candidates for archiving or deletion.

```powershell
<#
.SYNOPSIS
    Reports SharePoint sites with no activity in the past 180 days.
.NOTES
    Requires: PnP.PowerShell, SharePoint Administrator role
#>

Connect-PnPOnline -Url "https://contoso-admin.sharepoint.com" -Interactive

$cutoffDate = (Get-Date).AddDays(-180)
$report = @()

$sites = Get-PnPTenantSite -IncludeOneDriveSites:$false -Detailed | 
    Where-Object { $_.Template -ne "REDIRECTSITE#0" }

foreach ($site in $sites) {
    $lastActivity = $site.LastContentModifiedDate
    
    if ($lastActivity -lt $cutoffDate) {
        $report += [PSCustomObject]@{
            SiteUrl           = $site.Url
            Title             = $site.Title
            Owner             = $site.Owner
            StorageUsedMB     = [math]::Round($site.StorageUsageCurrent, 0)
            LastModified      = $lastActivity.ToString("yyyy-MM-dd")
            DaysSinceActivity = (Get-Date - $lastActivity).Days
        }
    }
}

$report | Sort-Object DaysSinceActivity -Descending | 
    Export-Csv -Path ".\InactiveSites_$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation

Write-Host "Found $($report.Count) inactive sites. Report saved." -ForegroundColor Yellow
```

---

## Script 2: Export User Licence Assignments

Get a full picture of who has which licences to identify unused assignments before the billing cycle renews.

```powershell
<#
.SYNOPSIS
    Exports all M365 user licence assignments to CSV.
.NOTES
    Requires: Microsoft.Graph PowerShell SDK, User.Read.All permission
#>

Connect-MgGraph -Scopes "User.Read.All", "Organization.Read.All" -NoWelcome

$users = Get-MgUser -All -Property "DisplayName,UserPrincipalName,AssignedLicenses,AccountEnabled" |
    Where-Object { $_.AccountEnabled -eq $true }

$skuMapping = @{}
Get-MgSubscribedSku | ForEach-Object { $skuMapping[$_.SkuId] = $_.SkuPartNumber }

$report = foreach ($user in $users) {
    $licences = $user.AssignedLicenses | 
        ForEach-Object { $skuMapping[$_.SkuId] ?? $_.SkuId }
    
    [PSCustomObject]@{
        DisplayName       = $user.DisplayName
        UPN               = $user.UserPrincipalName
        LicenceCount      = $user.AssignedLicenses.Count
        Licences          = $licences -join "; "
    }
}

$report | Sort-Object LicenceCount -Descending |
    Export-Csv -Path ".\UserLicences_$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation

Write-Host "Exported $($report.Count) users." -ForegroundColor Green
Disconnect-MgGraph
```

---

## Script 3: Clean Up Stale Guest Accounts

Guest accounts that haven't signed in for 90+ days and have no active group memberships are safe candidates for removal (after confirmation).

```powershell
<#
.SYNOPSIS
    Reports (and optionally removes) stale guest accounts.
.PARAMETER WhatIf
    Use -WhatIf to preview what would be removed without making changes.
.NOTES
    Requires: Microsoft.Graph SDK, User.ReadWrite.All, AuditLog.Read.All
#>
param([switch]$WhatIf = $true)  # Default to WhatIf for safety

Connect-MgGraph -Scopes "User.ReadWrite.All", "AuditLog.Read.All" -NoWelcome

$cutoff = (Get-Date).AddDays(-90).ToString("yyyy-MM-ddTHH:mm:ssZ")

$staleGuests = Get-MgUser -All `
    -Filter "UserType eq 'Guest' and signInActivity/lastSignInDateTime le $cutoff" `
    -Property "Id,DisplayName,UserPrincipalName,Mail,SignInActivity,CreatedDateTime" |
    Where-Object { $_.SignInActivity.LastSignInDateTime -ne $null }

Write-Host "Found $($staleGuests.Count) stale guest accounts." -ForegroundColor Yellow

$report = @()
foreach ($guest in $staleGuests) {
    $memberOf = (Get-MgUserMemberOf -UserId $guest.Id).Count
    
    $report += [PSCustomObject]@{
        DisplayName   = $guest.DisplayName
        UPN           = $guest.UserPrincipalName
        LastSignIn    = $guest.SignInActivity.LastSignInDateTime
        GroupCount    = $memberOf
        Created       = $guest.CreatedDateTime
    }
    
    if (-not $WhatIf -and $memberOf -eq 0) {
        Remove-MgUser -UserId $guest.Id
        Write-Host "Removed: $($guest.UserPrincipalName)" -ForegroundColor Red
    } elseif ($WhatIf) {
        Write-Host "[WhatIf] Would remove: $($guest.UserPrincipalName) (Groups: $memberOf)" -ForegroundColor Cyan
    }
}

$report | Export-Csv -Path ".\StaleGuests_$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation
Disconnect-MgGraph
```

> **⚠️ Warning:** Always run with `-WhatIf` first. Review the CSV before executing without `-WhatIf`.

---

## Script 4: Archive Old Microsoft Teams

Teams that have had no message activity for 6 months should be considered for archiving to keep the Teams directory clean.

```powershell
<#
.SYNOPSIS
    Archives Teams with no channel message activity in the past 180 days.
.NOTES
    Requires: Microsoft.Graph SDK, Team.ReadBasic.All, TeamSettings.ReadWrite.All
#>
param([switch]$WhatIf = $true)

Connect-MgGraph -Scopes "Team.ReadBasic.All", "TeamSettings.ReadWrite.All", "ChannelMessage.Read.All" -NoWelcome

$cutoff = (Get-Date).AddDays(-180)
$teams  = Get-MgGroup -All -Filter "resourceProvisioningOptions/Any(x:x eq 'Team')" `
    -Property "Id,DisplayName,CreatedDateTime"

$archived = 0
foreach ($team in $teams) {
    # Skip recently created teams
    if ([datetime]$team.CreatedDateTime -gt $cutoff) { continue }
    
    try {
        $channels = Get-MgTeamChannel -TeamId $team.Id -ErrorAction Stop
        $latestMessage = $null
        
        foreach ($channel in $channels) {
            $messages = Get-MgTeamChannelMessage -TeamId $team.Id -ChannelId $channel.Id `
                -Top 1 -ErrorAction SilentlyContinue
            
            if ($messages -and $messages[0].CreatedDateTime -gt $latestMessage) {
                $latestMessage = [datetime]$messages[0].CreatedDateTime
            }
        }
        
        if ($null -eq $latestMessage -or $latestMessage -lt $cutoff) {
            $daysSince = if ($latestMessage) { (Get-Date - $latestMessage).Days } else { "Never" }
            Write-Host "Archiving: $($team.DisplayName) (Last activity: $daysSince days ago)"
            
            if (-not $WhatIf) {
                Update-MgTeam -TeamId $team.Id -IsArchived $true
                $archived++
            }
        }
    } catch {
        Write-Warning "Could not check team $($team.DisplayName): $_"
    }
}

Write-Host "Archived $archived teams." -ForegroundColor Green
Disconnect-MgGraph
```

---

## Script 5: Report Large SharePoint Files Nearing Quota

Identify document libraries where large files are consuming significant storage, especially useful before tenant storage billing changes.

```powershell
<#
.SYNOPSIS
    Reports files larger than a specified size threshold across all site collections.
.PARAMETER MinFileSizeMB
    Minimum file size in MB to report (default: 500).
#>
param([int]$MinFileSizeMB = 500)

Connect-PnPOnline -Url "https://contoso-admin.sharepoint.com" -Interactive

$sites = Get-PnPTenantSite -IncludeOneDriveSites:$false |
    Where-Object { $_.StorageUsageCurrent -gt 1000 }  # Only check sites >1GB

$report = @()

foreach ($site in $sites) {
    Write-Progress -Activity "Scanning sites" -Status $site.Url
    
    try {
        Connect-PnPOnline -Url $site.Url -Interactive -ErrorAction Stop
        
        $largeItems = Get-PnPListItem -List "Documents" -PageSize 500 -ErrorAction SilentlyContinue |
            Where-Object { $_["File_x0020_Size"] -gt ($MinFileSizeMB * 1MB) }
        
        foreach ($item in $largeItems) {
            $report += [PSCustomObject]@{
                SiteUrl    = $site.Url
                FileName   = $item["FileLeafRef"]
                FilePath   = $item["FileRef"]
                SizeMB     = [math]::Round($item["File_x0020_Size"] / 1MB, 1)
                Modified   = $item["Modified"]
                ModifiedBy = $item["Editor"].LookupValue
            }
        }
    } catch {
        Write-Warning "Could not scan $($site.Url)"
    }
}

$report | Sort-Object SizeMB -Descending |
    Export-Csv -Path ".\LargeFiles_$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation

Write-Host "Found $($report.Count) large files. Report saved." -ForegroundColor Cyan
```

---

## Conclusion

A few hours of cleanup at year-end pays dividends in security hygiene, compliance posture, and licensing cost control. These five scripts cover the most common problem areas: inactive sites, unused licences, stale guests, dormant Teams, and storage bloat. Run them in `-WhatIf` mode first, review the output CSVs, and then execute the remediation with confidence. Happy cleaning!

---

## References

- [PnP PowerShell documentation](https://pnp.github.io/powershell/)
- [Microsoft Graph PowerShell SDK](https://learn.microsoft.com/powershell/microsoftgraph/overview)
- [Manage SharePoint site lifecycle](https://learn.microsoft.com/sharepoint/site-lifecycle-management)
- [Manage guest access in Microsoft 365](https://learn.microsoft.com/microsoft-365/solutions/manage-guest-access-in-groups)
- [Archive or delete a team in Microsoft Teams](https://learn.microsoft.com/microsoftteams/archive-or-delete-a-team)
