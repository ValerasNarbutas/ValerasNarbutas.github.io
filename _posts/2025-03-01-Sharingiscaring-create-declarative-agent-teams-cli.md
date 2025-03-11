---
title: Build a Declarative M365 Copilot Agent Using VS Code and Teams CLI
author: valeras
date: 2025-03-01 20:55:00 +0800
categories:
  - SharingIsCaring
  - AI
tags:
  - SharingIsCaring
  - Teams CLI
  - M365 Copilot
  - AI
  - Contributing
  - OpenSource
pin: false
slug: create-declarative-agent-teams-cli
comments: true
image: 
  path: /img/posts/daagentcli.png
  alt: Declarative agent with Teams cli

---

## Summary

With the rise of Microsoft 365 Copilot, businesses are looking for ways to build AI-powered assistants that seamlessly integrate with Microsoft Teams. A declarative agent is a lightweight, low-code solution that leverages AI Plugins and Adaptive Cards to process user input.

## Prerequisites

Before you get started, make sure you have the following:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Teams Toolkit for Visual Studio Code](https://aka.ms/teams-toolkit)

```bash
npm install -g @microsoft/teamsfx-cli
```
- [Node.js](https://nodejs.org/) i am using v20.16.0
- [Microsoft 365 Developer Subscription](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
- [Azure Subscription](https://azure.microsoft.com/en-us/free/)


## Step 1: Create a New Declarative Agent in VS Code

1. Run the following command in the terminal to create a new project using the Teams Toolkit:

```bash
teamsapp new --capability "declarative-agent" --app-name "Toolkit CLI DA Blog Sample" -folder "ToolkitAgent" --interactive false
 --debug --verbose --with-plugin no
```
2. Open project in VS Code

```bash
cd "ToolkitAgent\Toolkit CLI DA Blog Sample"
code .
```

This will create same structure as using Teams Toolkit in VS Code. From here you can start developing your declarative agent.
I have been exploring [Microsoft 365 Community (PnP) Copilot Pro Dev scenarios ](https://adoption.microsoft.com/en-us/sample-solution-gallery/?keyword=&sort-by=updateDateTime-true&page=1&product=Microsoft+365+Copilot&WT.mc_id=M365-MVP-5003816)

3. Login to M365

```bash
teamsapp auth login m365
```

4. Package and install the app in Teams

```bash
teamsapp package
# Install the app in Teams
teamsapp install --file-path ./appPackage/build/appPackage.dev.zip
```
you should get response like

```plaintext
PS C:\Projects\temp\ToolkitAgent\Toolkit CLI DA Blog Sample> teamsapp install --file-path ./appPackage/build/appPackage.dev.zip
Using YOUR M365 USER
TitleId: U_283c7972-ec29-d062-a3a0-a0e71c5293bc
AppId: 8677e1f5-9757-4814-bf24-6b2a0429d9c9
``` 

to see app go to [https://m365.cloud.microsoft/chat](https://m365.cloud.microsoft/chat)

![](/img/posts/taagentcli.png)

## Conclusion

I am excited to see how the declarative agent can be used in various scenarios. Personaly, tried very little yet but with amazing samples available in [Microsoft 365 Community (PnP) Copilot Pro Dev scenarios ](https://adoption.microsoft.com/en-us/sample-solution-gallery/?keyword=&sort-by=updateDateTime-true&page=1&product=Microsoft+365+Copilot&WT.mc_id=M365-MVP-5003816) it is easy to get started. 



