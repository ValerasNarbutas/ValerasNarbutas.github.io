---
title: SharingIsCaring. Create AD app and connect to SharePoint Online
author: valeras
date: 2023-01-23 20:55:00 +0800
categories:
  - SharingIsCaring
  - ScriptSamples
tags:
  - SharingIsCaring
  - ADapp
  - Contributing
  - OpenSource
  - PNP PowerShell
  - Sharepoint
pin: false
slug: sharingiscaring-create-ad-app-connect-sharepoint-online
comments: true
---

## Summary

Create an Azure AD app, add permissions and connect it to SharePoint Online.

```powershell

Install-Module AzureAD

# Add the Azure AD Module
Import-Module AzureAD -UseWindowsPowerShell

# Connect to Azure AD with an admin account
Connect-AzureAD

# Create a new Azure AD App
$newApp = New-AzureADApplication -DisplayName "My SharePoint App" -ReplyUrls "http://localhost"

# Create a new client secret
$newSecret = New-AzureADApplicationPasswordCredential -ObjectId $newApp.ObjectId -CustomKeyIdentifier "MySharePointAppKey"

Get-AzureADServicePrincipal -All $true
$svcprincipalSharePoint = Get-AzureADServicePrincipal -All $true | ? { $_.DisplayName -match "Office 365 SharePoint Online" } #Office 365 SharePoint Online
$svcprincipalSharePoint.AppRoles | FT ID, DisplayName

# Show the Delegated Permissions
$svcprincipalSharePoint.Oauth2Permissions | FT ID, UserConsentDisplayName

$Sharepoint = New-Object -TypeName "Microsoft.Open.AzureAD.Model.RequiredResourceAccess"
$Sharepoint.ResourceAppId = $svcprincipalSharePoint.AppId

# Add permissions to the app
$applicationPermissions = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" -ArgumentList "9bff6588-13f2-4c48-bbf2-ddab62256b36","Scope" # Read and write items and lists in all site collections
$delegatedPermission = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" -ArgumentList "2cfdc887-d7b4-4798-9b33-3d98d6b95dd2","Scope" # Read and write your files
$Sharepoint.ResourceAccess = $delegatedPermission , $applicationPermissions

$ADApplication = Get-AzureADApplication -All $true | ? { $_.AppId -match $newApp.AppId }
 
Set-AzureADApplication -ObjectId $ADApplication.ObjectId -RequiredResourceAccess $Sharepoint


# Connect to SharePoint Online
Connect-PnPOnline -Url "https://yourtenantname.sharepoint.com" -ClientId $newApp.AppId -ClientSecret $newSecret.Value

# Execute standard SharePoint commands
Get-pnpSite
```


## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/aad-add-app-permissions-and-connect-to-sharepoint/README.html?tabs=azuread)

