---
title: Tip of the day - Submitting code to open source github project
author: valeras
date: 2023-03-29 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - git cheat sheet
  - tipoftheday
pin: false
slug: tip-day-git-fetch-prune
comments: true
image: 
   path: /img/posts/gitCommands.png
   alt: Tip of the day - Submitting code to open source github project
---

## Tip of the day: git commands to submit code to open source project. CheatSheet

When submitting code to open source project, you need to have the latest code from the main branch. If you don't, you will get merge conflicts. To avoid this, you need to fetch the latest code from the main branch and rebase your branch on top of it. This is the list of commands you need to run.

### Commands

1. When your are in your local fork repo, run in console:

```powershell
    git checkout main
```
> Note: "main" is a name of branch.
{: .prompt-info }

2. If you have remote named "**upstream**" which points to the original repo, run in console:

```powershell
    git fetch upstream
```

3. Update your local "**main**" branch with the latest code from the original repo:

```powershell
    git pull --rebase upstream main
```

4. Create a new branch name "**updates-myupdate**" for your changes:

```powershell
    git checkout -b updates-myupdate
```

5. Make your changes and commit them:

```powershell
    git commit -m "My update"
```

6. Push your changes to your forked repo:

```powershell
    git push origin updates-myupdate
```

7. Create a pull request from your forked repo to the original repo.

```powershell
    git pull --rebase upstream main
```

