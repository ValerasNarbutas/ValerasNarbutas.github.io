---
title: SharingIsCaring. Export User Profiles to csv
author: valeras
date: 2023-04-06 00:05:00 +0800
categories:
  - SharingIsCaring
  - ScriptSamples
tags:
  - SharingIsCaring
  - MSGraph
  - M365 PowerShell
  - M365 CLI
pin: false
slug: sharingiscaring-export-user-profiles-csv
comments: true
image:
  path: /img/posts/previewUserExport.PNG
  alt: Export User Profiles to csv
---

## Summary

This script will export user profiles to csv. Users can be exported from a list of users.

## Pre-requisites

- CLI for Microsoft [https://aka.ms/cli-m365](https://aka.ms/cli-m365)

  ![Example](/img/posts/exportUsers.png)

```powershell

m365 login --authType deviceCode

# Get all users and their properties, add properties as needed with --properties and separate with comma
m365 aad user list --properties "displayName,mail"

# Get all users and their properties and export to csv
m365 aad user list --output csv --properties "displayName,mail,givenName,jobTitle,mail,mobilePhone,officeLocation,preferredLanguage,surname,userPrincipalName,id" > users.csv

# Get current user with all properties
m365 aad user get --id "@meId"

# get any user with all properties
m365 aad user get --id "UserID"

```

## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/spo-export-upa-accounts/README.html?tabs=cli-m365-ps)

