---
title: Get teams tabs and export to CSV
author: valeras
date: 2023-03-06 00:05:00 +0800
categories:
  - SharingIsCaring
  - ScriptSamples
tags:
  - SharingIsCaring
  - MSGraph
pin: false
slug: teams-tabs-export-csv
comments: true
image:
  path: /img/posts/wikiTeams.png
  alt: Get teams tabs and export to CSV
---

## Summary

This script will locate all Teams having a Wiki and export the list to CSV

## Pre-requisites

-  More about Microsoft Graph PowerShell SDK [https://learn.microsoft.com/en-us/powershell/microsoftgraph/get-started?view=graph-powershell-1.0](https://learn.microsoft.com/en-us/powershell/microsoftgraph/get-started?view=graph-powershell-1.0)


```powershell
Connect-MgGraph -Scopes "Team.ReadBasic.All", "TeamSettings.Read.All", "TeamSettings.ReadWrite.All", "User.Read.All", "Directory.Read.All", "User.ReadWrite.All", "Directory.ReadWrite.All", "Channel.ReadBasic.All", "TeamsTab.Read.All"
$accessToken = m365 util accesstoken get --resource https://graph.microsoft.com --new
$accessToken.Trim('"');


$header = @{
    'Authorization' = "Bearer $($accessToken.Trim('"'))"
   'Content-type'  = "application/json"
}

$teams = (Invoke-MgGraphRequest -Method GET https://graph.microsoft.com/v1.0/me/joinedTeams -Headers $header).value

$teamsWithWiki = @()
foreach($team in $teams)
{
    
    $channels = (Invoke-MgGraphRequest -Method GET https://graph.microsoft.com/v1.0/teams/$($team.id)/channels -Headers $header).value
    foreach($channel in $channels){
        
        $tabs = (Invoke-MgGraphRequest -Method GET https://graph.microsoft.com/v1.0/teams/$($team.id)/channels/$($channel.id)/tabs -Headers $header).value
        # $tabs = (Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/teams/$($team.id)/channels/$($channel)/tabs" -Headers $header).value
        if ($tabs.displayName -match "Wiki")
        {
            $teamsWithWiki += $team
        }
    }
}

# Export results to CSV file
$teamsWithWiki.GetEnumerator() | select description, id, displayName, tenatId  | Export-Csv -Path "teams_with_wiki.csv" -NoTypeInformation


```

## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/graph-get-teams-tabs-export-to-csv/README.html?tabs=graphps)

