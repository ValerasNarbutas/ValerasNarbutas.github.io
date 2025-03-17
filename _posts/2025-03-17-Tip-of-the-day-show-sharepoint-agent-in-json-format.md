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

1. Associate the .agent extension with JSON
Open VS Code.

Press `Ctrl + Shift + P` (or `Cmd + Shift + P on macOS`) to open the Command Palette.

Type "`Preferences: Open Settings (JSON)`" and select it.

Add the following entry inside the settings JSON:

```json
"files.associations": {
    "*.agent": "json"
}
```
2. Enable JSON Formatting
Once VS Code recognizes .agent files as JSON:

Open the .agent file.
Press `Shift + Alt + F` (or `Cmd + Shift + F on macOS`)` to format the document.
You can also right-click inside the editor and select Format Document.

3. Install a JSON Formatter (If Needed)
If formatting doesn't work, install an extension like:

Prettier - Code formatter (recommended)

