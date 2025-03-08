---
title: Tip of the day - How to create effective prompts for M365 CoPilot
author: valeras
date: 2024-09-02 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - tipoftheday
  - M365 Copilot
  - SharingIsCaring
pin: false
slug: tip-day-powershell-how-to-create-effective-prompts-for-m365-copilot
comments: true
image:
  path: /img/posts/effectiveprompt.png
  alt: Tip of the day - How to create effective prompts for M365 CoPilot
---

## Tip of the day: How to create effective prompts for M365 CoPilot

Writing good prompts is key to getting the most out of **M365 Copilot**. Whether you’re automating tasks in SharePoint, generating emails in Outlook, or working with Power Automate, structuring your prompts effectively ensures **relevant and actionable responses**.

This post covers best practices for creating **precise, structured, and reusable** prompts for Copilot.

## 1. Be Clear and Specific

Copilot works best when you provide **direct and unambiguous** instructions. Avoid vague requests.

### ❌ Bad Prompt:
```
Summarize this document.
```
### ✅ Good Prompt:
```
Summarize this document in 3 bullet points, highlighting key actions.
```

💡 **Tip:** If you're generating emails or reports, specify the tone and format:
```
Write a professional email summarizing this meeting in 5 sentences. Include key decisions and next steps.
```

## 2. Use Step-by-Step Instructions

For multi-step tasks, **break instructions down** into logical steps.

### Example: Automating SharePoint Tasks

Instead of:
```
Get all pending SharePoint documents and update their status.
```
Try:
```
1. Retrieve all SharePoint list items where status is 'Pending'.
2. Update their status to 'Under Review'.
3. Notify the team in Teams about the update.
```

This structure helps Copilot **understand the sequence of actions**.

## 3. Provide Context

Context helps Copilot **generate more accurate responses**. Instead of just asking for a summary, specify what it’s for.

### Example: Summarizing Emails in Outlook
```
Summarize this email thread for a project update. Include key discussion points and action items, keeping it under 100 words.
```

💡 **Tip:** You can reference previous emails or documents to improve Copilot’s understanding:
```
Use my last response in this thread as a reference and draft a follow-up.
```

## 4. Use Formatting for Readability

If you want structured output, **define the format**.

### Example: Generating a Report in Teams
```
Summarize the project status in this format:
- **Project Name:** [Project X]
- **Current Status:** [On Track/Delayed]
- **Next Steps:** [List next 3 tasks]
```

This ensures Copilot **follows your preferred structure**.

## 5. Iterate and Refine

If Copilot’s output isn’t quite right, **adjust your prompt and try again**.

- **Too generic?** Add more details.
- **Not structured enough?** Specify a format.
- **Misses key info?** Provide additional context.

### Example: Improving a Task Summary Prompt
❌ **Initial Prompt:**
```
Summarize tasks in the project tracker.
```
✅ **Refined Prompt:**
```
Summarize tasks in the project tracker. Categorize them as 'Completed', 'In Progress', or 'Blocked'. List deadlines for each task.
```

## Conclusion

Writing better prompts **unlocks Copilot’s full potential**. Whether you’re summarizing content, automating workflows, or generating emails, clear and structured prompts ensure **accurate, actionable responses**.

Start experimenting today and refine your prompts for **faster and smarter AI-driven productivity**!

📌 **Further Reading:**
- [M365 Copilot Best Practices](https://www.microsoft.com/microsoft-365/copilot)
- [Writing AI Prompts Effectively](https://learn.microsoft.com/en-us/ai/)
