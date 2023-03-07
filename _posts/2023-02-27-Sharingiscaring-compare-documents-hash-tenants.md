---
title: Get and compare documents hash from different tenants
author: valeras
date: 2023-02-27 20:55:00 +0800
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
slug: compare-documents-hash-tenants
comments: true
---

## Summary

This script first connects to the first tenant using the Connect-PnPOnline cmdlet, then uses the Get-PnPFile cmdlet to retrieve the file in question. It then connects to the second tenant and retrieves the same file. The script then uses the Get-FileHash cmdlet to retrieve the hash of the file in both tenants. Finally, it compares the hashes of the two files and outputs the results to the console.

## Pnp PowerShell

```powershell
# Connect to the first tenant
$Connection1 = Connect-PnPOnline -Url "https://[TenantName1].sharepoint.com/sites/[siteName1]" -Interactive -ReturnConnection
$file1 = Get-PnPFile -Url "/Shared%20Documents/document.docx" -AsMemoryStream -Connection $Connection1

# Connect to the first tenant
$Connection2 = Connect-PnPOnline -Url "https://[TenantName2].sharepoint.com/sites/[siteName2]" -Interactive -ReturnConnection
$file2 = Get-PnPFile -Url "/Shared%20Documents/document.docx" -AsMemoryStream -Connection $Connection2


# Compare the hash of the two files
$hash1 = $(Get-FileHash -InputStream $file1).Hash
$hash2 = $(Get-FileHash -InputStream $file2).Hash

# Output the results of the comparison
if ($hash1 -eq $hash2) {
    Write-Host "The two files have the same hash."
} else {
    Write-Host "The two files have different hashes."
}

```

## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/spo-list-items-large-lists/README.html?tabs=cli-m365-ps)
