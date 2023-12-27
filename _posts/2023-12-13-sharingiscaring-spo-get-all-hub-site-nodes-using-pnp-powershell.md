---
title: Get All hub site and its main sites navigation nodes and update the navigation nodes if needed
author: valeras
date: 2023-12-13 00:05:00 +0800
categories:
  - SharingIsCaring
  - ScriptSamples
tags:
  - SharingIsCaring
  - PNP PowerShell
pin: false
slug: sharingiscaring-spo-get-all-hub-site-nodes-using-pnp-powershell
comments: true
image:
  path: /img/posts/navigationtree.png
  alt: Get All hub site and its main sites navigation nodes and update the navigation nodes if needed
---

## Summary

This sample demonstrates how to get all hub site and its main sites navigation nodes and update the navigation nodes if needed

## Pre-requisites

- PnP PowerShell to learn more at: [https://aka.ms/pnp/powershell](https://aka.ms/pnp/powershell)
  
    ![Example](/img/posts/navigationnodesPowershell.PNG)

```powershell

# Connect to the SharePoint Admin site
$adminUrl = "https://[tenant]-admin.sharepoint.com"

Connect-PnPOnline -Url $adminUrl -UseWebLogin

# Get all main sites in the hub
$hubSiteUrl = "https://[tenant].sharepoint.com/sites/[hubsite]"
$mainSites = Get-PnPHubSiteChild -Identity $hubSiteUrl

# Initialize an array to hold the results
$myResults = @()

foreach ($site in $mainSites) {
    # Switch context to the main site
    Connect-PnPOnline -Url $site -UseWebLogin

    # Get top-level navigation nodes
    $navNodes = Get-PnPNavigationNode # -Location TopNavigationBar

    foreach ($node in $navNodes) {
        # Add parent node to results
        $myResults += [PSCustomObject]@{
            NodeCode = $node.Id
            NodeTitle = $node.Title
            NodeType = "Parent"
            URL      = $node.Url
        }

        # Get child nodes
        $childNodes = Get-PnPNavigationNode -Id $node.Id

        foreach ($childNode in $childNodes.Children) {

            # Check if the child node title is "Confluence" and change it to "Confluence2"
            if ($childNode.Title -eq "Confluence") {
                # Rename the child node to "Confluence2"
                  $childNode.Title = "Confluence2"
                  $childNode.Url = "/Lists/TestLlist"
                  $childNode.Update()
                  $childNode.Context.ExecuteQuery()
               
                $childNode.Title = "Confluence2" # Update local object for display
            }

            # Add child nodes to results
            $myResults += [PSCustomObject]@{
                NodeCode = $childNode.Id
                NodeTitle = $childNode.Title
                NodeType = "Child"
                URL      = $childNode.Url
            }
        }
    }

    Disconnect-PnPOnline
}

# Display the results in a formatted table
$myResults | Format-Table -AutoSize


```

## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/spo-get-all-hub-site-main-sites-and-navigation-nodes/README.html?tabs=pnpps)

