---
title: Tip of the day - Using Modules Azure Functions in PowerShell
author: valeras
date: 2024-08-05 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - PowerShell
  - tipoftheday
  - Azure
  - SharingIsCaring
pin: false
slug: tip-day-powershell-using-modules-inpowershell
comments: true
image:
  path: /img/posts/azuremodules.png
  alt: Tip of the day - Using Modules Azure Functions in PowerShell
---

## Tip of the day: Using Modules Azure Functions in PowerShell

Goal: You want to have reusable code in your Azure Functions by using modules. This tip will show you how to include modules in your Azure Functions.

## Using PnP PowerShell 

### 1. Installing and Managing Modules

Azure Functions running PowerShell allow you to manage modules using requirements.psd1. To specify modules, edit this file:

```powershell
@{
    'Az.Accounts' = '2.*'
    'Az.Storage' = '5.*'
    'PnP.PowerShell' = '2.*'
}

```

Tips:

Use wildcard versions (2.*) to allow minor updates while avoiding breaking changes.

Ensure the required modules are available in the PowerShell Gallery to avoid installation failures.

### 2. Preloading Modules for Faster Execution

By default, Azure Functions may reload modules on each invocation, slowing down execution. To improve performance:

- Use `$global:modules` for caching:

```powershell
if (-not $global:AzModuleLoaded) {
    Import-Module Az.Accounts
    Import-Module Az.Storage
    $global:AzModuleLoaded = $true
}
```
- Load modules in profile.ps1 (if supported): This helps keep the modules in memory between executions.

### 3. Handling Private Modules

If you need custom modules not available in the PowerShell Gallery, upload them manually:

1. Create a `Modules` folder in your function app root.
2. Place your module inside (e.g., `MyCustomModule.psm1`).
3. Import it in run.ps1 dynamically

```powershell
Import-Module $PSScriptRoot\Modules\MyCustomModule.psm1
```

Tips:

Avoid large modules as they increase cold start time.

Use Azure Storage or a private PowerShell Gallery for central module storage.

### Conclusion

By managing modules effectively, you can optimize Azure Functions for better performance and maintainability. Share your tips for using modules in Azure Functions!
