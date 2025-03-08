---
title: Tip of the day - Creating-a-sharepoint-list-with-pnp-powershell-in-azure-functions
author: valeras
date: 2024-08-20 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - PowerShell
  - tipoftheday
  - Azure
  - SharingIsCaring
pin: false
slug: tip-day-powershell-creating-sharepoint-list-azure-functions
comments: true
image:
  path: /img/posts/azuremodulessharepoint.png
  alt: Tip of the day - Creating a SharePoint List with PnP PowerShell in Azure Functions
---

## Tip of the day: Creating a SharePoint List with PnP PowerShell in Azure Functions

**PnP PowerShell** is a powerful tool for managing SharePoint Online, and when combined with **Azure Functions**, it enables seamless automation of SharePoint tasks without requiring a dedicated server. However, executing PnP PowerShell commands in Azure Functions comes with some challenges, including authentication, module loading, and optimizing performance. This post provides best practices and tricks to efficiently use **PnP PowerShell** within **Azure Functions**.

## 1. Setting Up PnP PowerShell in an Azure Function

To use **PnP PowerShell** in an **Azure Function**, install it in the function's `requirements.psd1` file:

```powershell
@{
    'PnP.PowerShell' = '2.*'
}
```

This ensures the module is available whenever the function runs.

### 🔹 **Tips:**
- Always specify a stable version to avoid breaking changes.
- Run `Update-Module PnP.PowerShell` periodically to keep it updated.

## 2. Authenticating to SharePoint Online

Since **PnP PowerShell** requires authentication, use **Azure Managed Identity** for secure, password-less authentication:

```powershell
$SiteUrl = "https://contoso.sharepoint.com/sites/MySite"
Connect-PnPOnline -Url $SiteUrl -ManagedIdentity
```

Alternatively, for App-Only authentication:

```powershell
$ClientId = "YOUR-CLIENT-ID"
$TenantId = "YOUR-TENANT-ID"
$CertPath = "D:\home\site\wwwroot\cert.pfx"
$CertPassword = ConvertTo-SecureString "YOUR-CERT-PASSWORD" -AsPlainText -Force

Connect-PnPOnline -Url $SiteUrl -ClientId $ClientId -Tenant $TenantId -CertificatePath $CertPath -CertificatePassword $CertPassword
```

### 🔹 **Tips:**
- **Use Managed Identity** whenever possible to avoid storing credentials.
- **For App-Only authentication**, store the certificate securely in **Azure Key Vault**.

## 3. Automating SharePoint Tasks with Azure Functions

### **Example 1: Create a SharePoint List**

```powershell
param($Request, $TriggerMetadata)

$SiteUrl = "https://contoso.sharepoint.com/sites/MySite"
Connect-PnPOnline -Url $SiteUrl -ManagedIdentity

New-PnPList -Title "Automated List" -Template GenericList -Url "AutomatedList"

Push-OutputBinding -Name response -Value (@{
    StatusCode = 200
    Body       = "List Created Successfully!"
})
```

### **Example 2: Add an Item to a List**

```powershell
param($Request, $TriggerMetadata)

$SiteUrl = "https://contoso.sharepoint.com/sites/MySite"
Connect-PnPOnline -Url $SiteUrl -ManagedIdentity

Add-PnPListItem -List "AutomatedList" -Values @{Title = "New Item"}

Push-OutputBinding -Name response -Value (@{
    StatusCode = 200
    Body       = "Item Added Successfully!"
})
```

## 4. Handling Module Loading Efficiently

By default, Azure Functions reload modules on every invocation, which slows execution. To optimize:

- Use **global caching** to prevent redundant imports:
  ```powershell
  if (-not $global:PnPLoaded) {
      Import-Module PnP.PowerShell
      $global:PnPLoaded = $true
  }
  ```
- **Use `profile.ps1`** to preload modules at function startup.

## 5. Debugging Common Issues

### **Issue: PnP PowerShell Not Found**
 **Fix:** Ensure `requirements.psd1` includes `PnP.PowerShell`, then restart the function app.

### **Issue: Authentication Errors**
 **Fix:**
- For Managed Identity, ensure it has `Sites.FullControl.All` permission in Azure.
- For App-Only authentication, verify that the app registration has correct API permissions.
