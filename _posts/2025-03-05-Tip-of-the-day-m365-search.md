---
title: Tip of the Day - Mastering Microsoft 365 Search Like a Pro
author: valeras
date: 2025-03-08 20:55:00 +0800
categories:
  - tipsandtricks
  - tipoftheday
tags:
  - M365
  - Sharepoint
  - Search
pin: false
slug: tip-day-m365-search
comments: true
image: 
  path: /img/posts/m365search.png
  alt: Display training checklist in SharePoint Framework web part

---

## Tip of the day: The Power of Search in Microsoft 365

If you're new to **Microsoft 365**, one of the **most underrated yet powerful tools** at your disposal is **Search**. Many users waste time clicking through folders, sites, or Teams chats, not realizing that **M365 Search can instantly find documents, emails, and even people—if you know how to use it effectively**.

## Quick Tip: Use "Search Operators" for Better Results
Instead of just typing a word and hoping for the best, use search operators to filter results. Here are some common operators to get you started:

### Example 1: Find a file by type

```
project report filetype:docx
```

- This will return only Word documents related to "project report."

### Example 2: Find emails from a specific person

```
from:john.doe@contoso.com subject:meeting
```

- This finds all emails from John Doe that have "meeting" in the subject.

### Example 3: Search for messages in Teams

```
team:"Project Alpha" about:"budget update"
```

- This looks for messages inside a specific Teams channel mentioning "budget update."

### Common Search Operators

Here’s a **list of useful Microsoft 365 search operators** you can use in **Outlook, SharePoint, OneDrive, and Teams** to refine your searches:


Display as table



### **General Search Operators**


| Operator | Usage | Example |
|----------|-------|---------|
| **filetype:** | Finds files of a specific type | `filetype:pdf` (Only PDF files) |
| **from:** | Searches for emails from a specific sender | `from:john.doe@contoso.com` |
| **to:** | Finds emails sent to a person | `to:mary.smith@contoso.com` |
| **subject:** | Filters emails by subject | `subject:Project Update` |
| **hasattachment:** | Finds emails with attachments | `hasattachment:true` |
| **sent:** | Searches emails sent on a specific date | `sent:2025-03-01` |
| **modified:** | Finds files modified on a date or within a range | `modified:2025-03-01..2025-03-07` |
| **created:** | Finds files created on a specific date | `created:2025-03-01` |
| **size:** | Searches for files of a certain size | `size:>10MB` |



### **SharePoint & OneDrive Search Operators**

```markdown
| Operator | Usage | Example |
|----------|-------|---------|
| **title:** | Searches for files with a specific title | `title:Quarterly Report` |
| **path:** | Filters results by folder path | `path:/Shared Documents/2025` |
| **author:** | Finds documents created by someone | `author:"John Doe"` |
| **editor:** | Finds documents last edited by someone | `editor:"Jane Smith"` |
```


### **Teams Search Operators**

```markdown
| Operator | Usage | Example |
|----------|-------|---------|
| **team:** | Searches inside a specific team | `team:"Project Alpha"` |
| **channel:** | Finds messages from a specific channel | `channel:"General"` |
| **about:** | Filters messages related to a topic | `about:"budget update"` |
| **mentions:** | Finds messages where someone is mentioned | `mentions:@JohnDoe` |

```

These search operators **save time** and make it much easier to **find files, emails, and messages** without manually browsing through folders. 

## Why It Matters

Most people waste time manually searching for files when they can find anything in seconds using search operators. Whether you're in SharePoint, OneDrive, Outlook, or Teams, mastering M365 search will save you hours every week.
Try it today and become the "Search Guru" of your team! 
