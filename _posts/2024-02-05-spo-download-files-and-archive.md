---
title: Download all files from array of URLs and archive them
author: valeras
date: 2024-02-05 00:05:00 +0800
categories:
  - SharingIsCaring
  - ScriptSamples
tags:
  - SharingIsCaring
  - PNP PowerShell
pin: false
slug: sharingiscaring-spo-download-files-and-archive
comments: true
image:
  path: /img/posts/fileandarchive.png
  alt: Download all files from array of URLs and archive them
---

## Summary

The script will download all files from an array of URLs and archive them into a zip file. Two options are available to specify the file URLs: 
  1. add the URLs in the script, or 
  2. read the URLs from a CSV file.

## Pre-requisites

- PnP PowerShell to learn more at: [https://aka.ms/pnp/powershell](https://aka.ms/pnp/powershell)

  ![Example](/img/posts/filesamdarchive2.png)

## Implementation

- Open Windows PowerShell ISE or VS Code
- Copy script below to your clipboard
- Paste script into your preferred editor
- Change config variables to reflect the site, library name & download location required

## PNP PowerShell

```powershell
# Connect to the SharePoint site
$siteUrl = "https://[tenant].sharepoint.com/sites/[sitename]"
Connect-PnPOnline -Url $siteUrl -UseWebLogin

# Define the array of file URLs (relative to the site URL)
# Option 1: with urls added in script
$fileUrls = @(
    "/sites/[sitename]/Shared Documents/Document.docx",
    "/sites/[sitename]/Shared Documents/Book.xlsx"
)

# Option 2: with urls from a CSV file
# CSV file should have a column named FileUrl
# Example CSV file content:
# FileUrl
# /sites/[sitename]/Shared Documents/file1.docx
# /sites/[sitename]/Shared Documents/file2.pdf

# Path to the CSV file
# uncomment the line below and specify the path to your CSV file
# $csvFilePath = "C:\path\to\your\file.csv"

# Reading the file URLs from the CSV file
# uncomment the line below if you want to read the file URLs from a CSV file
# $fileUrls = Import-Csv -Path $csvFilePath | Select-Object -ExpandProperty FileUrl


# Specify the local directory to save the downloaded files
$localDirectory = "C:\DownloadedFiles"
if (-not (Test-Path -Path $localDirectory)) {
    New-Item -ItemType Directory -Path $localDirectory
}

# Loop through each file URL, download, and save the file
foreach ($fileUrl in $fileUrls) {
    $fileName = [System.IO.Path]::GetFileName($fileUrl)
    $localFilePath = Join-Path -Path $localDirectory -ChildPath $fileName

    # Download the file
    Get-PnPFile -Url $fileUrl -Path $localDirectory -Filename $fileName -AsFile
}

# Zip the downloaded files
$zipFilePath = "C:\DownloadedFiles\files.zip"
Compress-Archive -Path "$localDirectory\*" -DestinationPath $zipFilePath

# Output the location of the zip file
Write-Host "Files have been zipped to: $zipFilePath"

# Disconnect SharePoint online connection
Disconnect-PnPOnline
```

## CLI for Microsoft 365

```powershell

# Connect to the SharePoint site
$siteUrl = "https://[tenant].sharepoint.com/sites/[sitename]"

# Get Credentials to connect
$m365Status = m365 status
if ($m365Status -match "Logged Out") {
   m365 login
}

# Define the array of file URLs (relative to the site URL)
# Option 1: with urls added in script
$fileUrls = @(
    "/sites/[sitename]/Shared Documents/Document.docx",
    "/sites/[sitename]/Shared Documents/Book.xlsx"
)

# Option 2: with urls from a CSV file
# CSV file should have a column named FileUrl
# Example CSV file content:
#
# FileUrl
# /sites/[sitename]/Shared Documents/file1.docx
# /sites/[sitename]/Shared Documents/file2.pdf

# Path to the CSV file
# uncomment the line below and specify the path to your CSV file
# $csvFilePath = "C:\path\to\your\file.csv"

# Reading the file URLs from the CSV file
# uncomment the line below if you want to read the file URLs from a CSV file
# $fileUrls = Import-Csv -Path $csvFilePath | Select-Object -ExpandProperty FileUrl


# Specify the local directory to save the downloaded files
$localDirectory = "C:\DownloadedFiles"
if (-not (Test-Path -Path $localDirectory)) {
    New-Item -ItemType Directory -Path $localDirectory
}

# Loop through each file URL, download, and save the file
foreach ($fileUrl in $fileUrls) {
    $fileName = [System.IO.Path]::GetFileName($fileUrl)
    $localFilePath = Join-Path -Path $localDirectory -ChildPath $fileName

    # Download the file
    m365 spo file get --webUrl $siteUrl --url $fileUrl --asFile --path $localFilePath
}

# Zip the downloaded files
$zipFilePath = "C:\DownloadedFiles\files.zip"
Compress-Archive -Path "$localDirectory\*" -DestinationPath $zipFilePath

# Output the location of the zip file
Write-Host "Files have been zipped to: $zipFilePath"

# Disconnect SharePoint online connection
m365 logout

```

## Conclusion

The script will download all files from an array of URLs and archive them into a zip file. Two options are available to specify the file URLs: 
  1. add the URLs in the script, or 
  2. read the URLs from a CSV file.


## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/spo-download-files-and-archive/README.html?tabs=pnpps)

## References

- PnP PowerShell to learn more at: [https://aka.ms/pnp/powershell](https://aka.ms/pnp/powershell)
- M365 CLI to learn more at: [https://aka.ms/cli-m365](https://aka.ms/cli-m365)


