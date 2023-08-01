---
title: Upload spfx solution to app catalog and Azure AD App Certificate
author: valeras
date: 2023-07-31 00:05:00 +0800
categories:
  - SharingIsCaring
  - ScriptSamples
tags:
  - SharingIsCaring
  - MSGraph
  - M365 PowerShell
  - M365 CLI
pin: false
slug: sharingiscaring-spo-add-sppkg-ad-app-certificate
comments: true
image:
  path: /img/posts/Upload_spfx_solution_to_app_catalog_and_AzureADAppCertificate.png
  alt: Upload spfx solution to app catalog and Azure AD App Certificate
---

## Summary

This sample demonstrates how to upload spfx solution to app catalog using CLI for Microsoft 365 and Azure AD App created with certificate authentication.

## Pre-requisites

- CLI for Microsoft [https://aka.ms/cli-m365](https://aka.ms/cli-m365)

  ![Example](/img/posts/sample_console_spfx_added_toConsole.png)

```powershell
#create self signed certificate
function CreateSelfSignedCertificate{

    $cert = New-SelfSignedCertificate -Subject "CN=$CommonName" -FriendlyName $CommonName -NotBefore $StartDate -NotAfter $EndDate  -CertStoreLocation "Cert:\CurrentUser\My" -KeyExportPolicy Exportable -KeySpec Signature -KeyLength 2048 -KeyAlgorithm RSA -HashAlgorithm SHA256

    # Export Certificate from Variable to cert file to the location where script is executed
    Export-Certificate -Cert $cert -FilePath ".\$CommonName.cer"

    # Secure the file with password for enhanced security
    $mypwd = ConvertTo-SecureString -String "$Password" -Force -AsPlainText

    # Exporting the file to PFX file with Password
    Export-PfxCertificate -Cert $cert -FilePath ".\$CommonName.pfx" -Password $mypwd
}

$CommonName= "My App Certificate"
$StartDate= "2023-07-27"
$EndDate= "2045-12-31"
$Password = "yourPassword"
$TenantId = "yourTenantId"
$PathToSpfxApp = "spfx-solution.sppkg"

CreateSelfSignedCertificate -CommonName $CommonName -StartDate $StartDate -EndDate $EndDate -Password $Password

# create aad app and grant permissions to graph and sharepoint
m365 login 
$appName = "AAD app demo"
$app = m365 aad app add --name $appName  --certificateDisplayName "Certification" --certificateFile "$CommonName.cer" --apisApplication 'https://graph.microsoft.com/Sites.Read.All,https://microsoft.sharepoint-df.com/Sites.FullControl.All' --grantAdminConsent
$appId = $app | ConvertFrom-Json | select -ExpandProperty  appId 

# grant permissions to site
$site = "https://tenant.sharepoint.com/sites/SiteColectionName"
m365 spo site apppermission add --appId $appId --permission fullcontrol --siteUrl $site 

# login to sharepoint using app
m365 login --authType certificate --certificateFile "$CommonName.pfx" --password $Password --appId $appId --tenant $TenantId
m365 spo set --url $site
m365 status

# upload sppkg to app catalog
m365 spo app add --filePath $PathToSpfxApp --overwrite --verbose
```

## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/spo-add-sppkg-ad-app-certificate/README.html?tabs=cli-m365-ps)

