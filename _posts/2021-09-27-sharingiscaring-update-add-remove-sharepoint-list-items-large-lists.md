---
title: SharingIsCaring. 
    Get, Update, Add, Remove SharePoint list items in large lists
author: valeras
date: 2021-09-27 20:55:00 +0800
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
slug: sharingiscaring-update-add-remove-sharepoint-list-items-large-lists
comments: true
---

## Summary

Working and processing lists items in large lists. PnP PowerShell and M365 CLI examples

## Implementation

1.  Open Windows PowerShell ISE
2.  Create a new file
3.  Copy a script below

```powershell

$url = "https://yourtenantname.sharepoint.com/sites/SiteCollection"
$list = "YourLargeList"

Connect-PnPOnline -Url $Url -Interactive


# create 5000+ list items
$batch = New-PnPBatch

1..5500 | ForEach-Object { 
            Add-PnPListItem -List $list -Values @{"Title"="Test Item Batched $_"} -Batch $batch 
           }

Invoke-PnPBatch -Batch $batch


#Update each list item separatelly
$batch = New-PnPBatch

$items = Get-PnPListItem -List $list -PageSize 1000
$items | ForEach-Object { 
            
            Set-PnPListItem -List $list -Identity $_.Id -Values @{"Title"="Test Item Batched and updated $_"} -Batch $batch
           }

Invoke-PnPBatch -Batch $batch


#remove each list item separatelly
$batch = New-PnPBatch

$items = Get-PnPListItem -List $list -PageSize 1000
$items | ForEach-Object { 
            Remove-PnPListItem -List $list -Identity $_.Id
           }

Invoke-PnPBatch -Batch $batch


#read each list item separatelly
$batch = New-PnPBatch
Get-PnPListItem -List $list -PageSize 1000 | ForEach-Object { 
            get-PnPListItem -List $list -Identity $_
           }

Invoke-PnPBatch -Batch $batch

```

### Using M365 CLI

```powershell


$url = "Site Url"
$listName = "LargeListTitle"


$m365Status = m365 status
if ($m365Status -match "Logged Out") {
  Write-Host "Logging in the User!"
  m365 login --authType browser
}

#count list items
$listProperties = m365 spo list get --title  $listName --webUrl $url -o json | ConvertFrom-Json
$itemCount = $listProperties.ItemCount

#Set up page size and page number
$pageSize = 1000
$pageNumber = [int][Math]::Ceiling($itemCount/$pageSize)


# get all items from large list
for ($i = 0; $i -lt $pageNumber; $i++)
{ 
  # get items from large library
 m365 spo listitem list --title $listName --webUrl $url --pageSize $pageSize --pageNumber $i  
}


# create list items
1..100 | ForEach-Object { 
            m365 spo listitem add --contentType Item --listTitle $listName --webUrl $url --Title "Demo Item using CLI"
           }

#update list items
for ($i = 0; $i -lt $pageNumber; $i++)
{ 
   $items = m365 spo listitem list --title $listName --webUrl $url --fields "ID"  --pageSize $pageSize --pageNumber $i --output json 
    $items = $items.Replace("Id","Idd") | ConvertFrom-Json
    $items | select -ExpandProperty ID | ForEach-Object { 
             m365 spo listitem set --listTitle $listName --id $_ --webUrl $url --Title "update with cli"
           }
}

#remove list items
for ($i = 0; $i -lt $pageNumber; $i++)
{ 
  # get items from large library
    $items = m365 spo listitem list --title $listName --webUrl $url --fields "ID"  --pageSize $pageSize --pageNumber $i --output json 
    $items = $items.Replace("Id","Idd") | ConvertFrom-Json
    $items | select -ExpandProperty ID | ForEach-Object { 
             m365 spo listitem remove --webUrl $url --listTitle $listName --id $_  --confirm 
           }
}


```

## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/spo-list-items-large-lists/README.html?tabs=cli-m365-ps)

