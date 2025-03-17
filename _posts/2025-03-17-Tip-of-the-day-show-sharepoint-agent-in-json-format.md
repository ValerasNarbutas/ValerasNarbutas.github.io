---
title: Tip of the day - Show SharePoint Agent in JSON Format
author: valeras
date: 2025-03-17 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - VS code
  - tipoftheday
  - sharepoint
  - SharingIsCaring
  - JSON
  - Sharepoint Agent
pin: false
slug: tip-of-the-day-show-sharepoint-agent-in-json-format
comments: true
image:
  path: /img/posts/agenttojson.png
  alt: Tip of the day - Show SharePoint Agent in JSON Format
---

## Tip of the day: Show SharePoint Agent in JSON Format

Goal: Show SharePoint Agent .agent files in JSON Format

### Using VS Code

#### Associate the .agent extension with JSON
1.  Open VS Code.
2.  Press `Ctrl + Shift + P` (or `Cmd + Shift + P on macOS`) to open the Command Palette.
3.  Type "`Preferences: Open Settings (JSON)`" and select it.
4.  Add the following entry inside the settings JSON:

```json
"files.associations": {
    "*.agent": "json"
}
```
#### Enable JSON Formatting

Once VS Code recognizes .agent files as JSON:

1.  Open the .agent file.
2.  Press `Shift + Alt + F` (or `Cmd + Shift + F on macOS`)` to format the document.
3.  You can also right-click inside the editor and select Format Document.

#### Install a JSON Formatter (If Needed)

If formatting doesn't work, install an extension like:
`Prettier - Code formatter (recommended)`

