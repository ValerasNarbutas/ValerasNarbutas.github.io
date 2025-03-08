---
title: Get an authentication token in Azure Function
author: valeras
date: 2024-09-15 20:55:00 +0800
categories:
  - SharingIsCaring
  - ScriptSamples
tags:
  - SharingIsCaring
  - Contributing
  - OpenSource
  - Azure
  - AzureFunctions
pin: false
slug: get-authentification-token-azurefunction
comments: true
image: 
  path: /img/posts/authFunction.png
  alt: Get an authentication token in Azure Function

---

## Summary

Sample code to get an authentication token in an Azure Function. This code snippet shows how to get an authentication token using the client credentials flow in an Azure Function.

### PowerShell Function to Get an Authentication Token

This is content of run.ps1 file in Azure Function:

```powershell
using namespace System.Net
param($Request, $TriggerMetadata)

# Initialize logging and environment variables
$tenantId = $env:TENANT_ID_HEI_LTT
$environmentUrl = $env:ENV_URL_HEI_LTT
$spAppId = $env:SPN_ID_HEI_LTT
$spSecret = $env:SPN_SECRET_HEI_LTT
$logLevel = $env:LOG_LEVEL
$accessToken = $null


function Get-AuthToken {
    param (
        [Parameter(Mandatory)]
        [string]$tenantId,
        [Parameter(Mandatory)]
        [string]$spAppId,
        [Parameter(Mandatory)]
        [string]$spSecret,
        [Parameter(Mandatory)]
        [string]$environmentUrl
    )
    $tokenUri = "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token"
    $tokenBody = @{
        client_id     = $spAppId
        scope         = "$environmentUrl/.default"
        client_secret = $spSecret
        grant_type    = 'client_credentials'
    }

    $response = Invoke-RestMethod -Uri $tokenUri -Method 'Post' -ContentType 'application/x-www-form-urlencoded' -Body $tokenBody
    $token = @{
        "access_token" = $response.access_token
        "token_type" = "Bearer"
        "expires_in" = 3600
    }

    return $token.access_token 
}

try {
    try {
        $accessToken = Get-AuthToken -tenantId $tenantId -spAppId $spAppId -spSecret $spSecret -environmentUrl $environmentUrl   
    }
    catch {
        Write-Log "ERROR: Failed to retrieve access token." -LogLevel $logLevel 
        throw
    }

    $success = $true
    $response = @{
        "token" = $accessToken
        "success" = $success
    }
    Write-Log $response.success -LogLevel $logLevel
}
catch {
    $success = $false
     $response = @{
         "token" = $null
         "success" = $success
     }
     Write-Output "ERROR: Failed to retrieve minimum delivery quantity pallet places. $_"
     Write-Error $Error[0]
}

if ($response) {
    $body = $response | ConvertTo-Json
}else{
    $body = "No response"
}

Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = if ($response.success) { [HttpStatusCode]::OK } else { [HttpStatusCode]::BadRequest }
    Body = $body
})


```

