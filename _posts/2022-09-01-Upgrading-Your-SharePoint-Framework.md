---
title: Upgrading Your SharePoint Framework (SPFx) Project
author: valeras
date: 2022-09-01 20:55:00 +0800
categories:
  - SPFX
tags:
  - spfx
  - m365Cli
  - upgrading
  - migrating
pin: false
slug: upgrading-sharepoint-framework-spfx-project
comments: true
---


## Upgrading Your SharePoint Framework (SPFx) Project to the Latest Version: Using M365 CLI

1. Install Microsoft 365 CLI globally
    
```powerShell
npm install -g @microsoft/365-cli
```

2. Run the following command to get report on the upgrade process
    
```powerShell
m365 spfx project upgrade --toVersion 1.14.0 --output md > "upgrade-report.md"
```

3. Open the report file and review the changes that will be applied to your project
    
```powerShell
notepad upgrade-report.md
```

4. under summary section, you will see the list of changes that will be applied to your project. If you are happy with the changes, run the following command to apply the changes

## Issues i encountered

1. Dublicate packages in package.json like: 

```json
    "@microsoft/rush-stack-compiler-3.9": "0.4.48",
    "@microsoft/rush-stack-compiler-4.5": "0.2.2",
```

![dublicates](/img/posts/dublicates.PNG)

i just removed the older version and kept the latest one.


    
## Conclusion

In this post, we have seen how to upgrade your SharePoint Framework (SPFx) project to the latest version using M365 CLI. I hope you found this post useful. If you have any questions, please feel free to leave a comment below.
