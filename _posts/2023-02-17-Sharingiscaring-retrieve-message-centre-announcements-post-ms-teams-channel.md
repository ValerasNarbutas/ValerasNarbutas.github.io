---
title: Retrieve Message Centre announcements and post to MS Teams channel
author: valeras
date: 2023-02-17 20:55:00 +0800
categories:
  - SharingIsCaring
  - ScriptSamples
tags:
  - SharingIsCaring
  - M365Pnp
  - Contributing
  - OpenSource
  - PNP PowerShell
  - Sharepoint
pin: false
slug: retrieve-message-centre-announcements-post-ms-teams-channel
comments: true
---

## Summary

This script allows you to connect to your SharePoint Online tenant and retrieve Message Centre announcements. It then connects to Microsoft Teams and loops through the announcements, posting them to a specific Teams channel.

![Messages](/img/posts/messages.png)

## Implementation

1.  Create csv file with the list of site collection URLs to enable app catalog
2.  Open Windows PowerShell ISE
3.  Create a new file
4.  Copy the code below
5.  Save the file and run it

## Pnp PowerShell

```powershell
# Connect to SharePoint Online

Connect-PnPOnline -Url https://yourTenantName.sharepoint.com/ -Interactive 

# Get Message Centre announcements
$announcements = Get-PnPMessageCenterAnnouncement | Where-Object { $_.Category -eq "PlanForChange" } | Select-Object Title, Description

# Connect to teams
Connect-MicrosoftTeams 

# Loop through the announcements and post to Teams channel
foreach ($announcement in $announcements) {
    $message = "$($announcement.Title): $($announcement.Description)"
    Submit-PnPTeamsChannelMessage -Team "TeamID" -Channel "General" -Message $message
}

```

## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/spo-get-message-centre-announcements-and-post-to-teams-channel/README.html?tabs=pnpps)
