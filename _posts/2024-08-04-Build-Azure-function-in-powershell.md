---
title: How to Build an Azure Function in PowerShell
author: valeras
date: 2024-08-04 10:55:00 +0800
categories:
  - TipOfTheDay
  - Azure
tags:
  - PowerShell
  - Azure
  - SharingIsCaring
pin: false
slug: build-azure-function-in-powershell
comments: true
image:
  path: /img/posts/azurePowershell.png
  alt: How to Build an Azure Function in PowerShell
---

## How to Build an Azure Function in PowerShell

Azure Functions allow you to build event-driven, serverless applications with minimal overhead. If you work with PowerShell, you can leverage Azure Functions to automate tasks, process data, or integrate with cloud services. In this guide, we'll walk through creating an Azure Function using PowerShell step by step.

### Prerequisites

Before you start, make sure you have the following:

- An Azure subscription
- Azure Functions Core Tools installed
- PowerShell Core installed
- Azure PowerShell module installed
- Visual Studio Code or another code editor

I am using Visual Studio Code in this guide. We will need Azure Functions extension for Visual Studio Code to create and manage Azure Functions.

### Step 1: Create a New Azure Function Project

1. Open a terminal and run:

```bash
func init MyFunctionApp --worker-runtime powershell
```

This initializes a new Azure Functions project with PowerShell as the runtime.

2. Navigate into the project folder:

```bash
cd MyFunctionApp
```

### Step 2: Create a Function

1. Run the following command to create a new function:

```bash
func new --name MyHttpTrigger --template "HTTP trigger" --authlevel anonymous
```

This generates an HTTP-triggered PowerShell function.

2. Open MyHttpTrigger/run.ps1 and modify it as needed. The default function looks like this:

```powershell
param($Request, $TriggerMetadata)

Push-OutputBinding -Name response -Value (@{
    StatusCode = 200
    Body       = "Hello from PowerShell Azure Function!"
})
```

This will provide a local URL (e.g., http://localhost:7071/api/MyHttpTrigger). Open it in your browser or use:

```bash
curl http://localhost:7071/api/MyHttpTrigger
```
or 
```powershell
Invoke-RestMethod -Uri http://localhost:7071/api/MyHttpTrigger
```

### Step 3: Run the Function Locally

To test your function locally, run:

```bash
func start
```

### Step 4: Deploy the Function to Azure

1. Sign in to Azure:

```bash
az login
```

2. Create a resource group:

```bash
az functionapp create --resource-group MyResourceGroup --consumption-plan-location westeurope --runtime powershell --name MyFunctionApp --storage-account mystorageaccount
```

3. Deploy the function:

```bash
func azure functionapp publish MyFunctionApp
```

Once deployed, you can access your function via the provided URL.

### Conclusion

You’ve successfully created and deployed an Azure Function using PowerShell! This is just the beginning – you can extend this with environment variables, bindings, or integrate with Azure services like Storage, CosmosDB, or Event Grid. Explore the possibilities and automate your workflows with Azure Functions and PowerShell.

