---
title: "Tip of the day – Customizing SharePoint Agents with Custom Instructions"
author: valeras
date: 2025-06-07 09:30:00 +0800
categories:
  - TipOfTheDay
  - AI
tags:
  - SharePoint
  - AI
  - M365 Copilot
  - tipoftheday
  - SharePoint Agent
pin: false
slug: tip-day-sharepoint-agents-custom-instructions
comments: true
image:
  path: /img/posts/spagent_instructions.png
  alt: Customizing SharePoint Agents with Custom Instructions
---

## Summary

SharePoint Agents — the built-in AI assistants available on every SharePoint site — are more powerful than they first appear. By editing their **custom instructions**, you can dramatically change how the agent responds, what tone it uses, what it focuses on, and even what it refuses to answer. This tip walks you through exactly how to do it.

---

## What Is a SharePoint Agent?

Every SharePoint site now surfaces a Copilot-powered chat experience in the right-hand rail. By default, the agent is scoped to the content on that site: documents, lists, pages, and news. It answers questions by retrieving relevant content and generating a grounded response.

Out of the box, the agent is generic. Customising its instructions makes it feel like a purpose-built assistant for your team.

---

## Accessing the Agent Instructions

1. Navigate to your SharePoint site.
2. Open the **Copilot** panel by clicking the Copilot icon in the top-right corner of the page (or the floating chat button).
3. Click the **Settings** gear icon inside the Copilot panel — this is only visible to site owners.
4. Select **Edit agent**.
5. The **Agent Studio** panel opens. Click on the **Instructions** tab.

> **Note:** If you do not see the Settings gear, verify you have the **Site Owner** permission level on the site.

---

## Writing Effective Custom Instructions

Custom instructions are essentially a system prompt. They are sent to the underlying language model before every user message. A well-written instruction set includes:

### 1. Define the agent's persona

```
You are the Contoso Project Hub assistant. Your role is to help project managers and team members 
find project documentation, status reports, and meeting notes stored on this site.
```

### 2. Set the scope and focus

```
Only answer questions that are directly related to the content on this SharePoint site. 
If a user asks something outside this scope (e.g. general company HR policies), 
politely redirect them: "That is outside my knowledge for this site. 
Please visit the HR portal at https://contoso.sharepoint.com/sites/HR."
```

### 3. Define response style

```
Keep responses concise — no more than 3-4 sentences unless the user explicitly asks for more detail.
Always cite the document or page where you found the information.
Use plain language; avoid technical jargon unless the user appears to be a technical audience.
```

### 4. Add domain-specific rules

```
When asked about project status:
- Always check the "Project Status" document library first.
- Reference the most recently modified document.
- If no document is found, say "I could not find a status update for that project. 
  Please check with the project manager."
```

### 5. Example full instruction set

```
You are the Contoso Project Hub assistant, helping project team members navigate 
project documentation, decisions, and status updates on this SharePoint site.

Persona:
- Be professional, concise, and helpful.
- Always cite your source document.

Scope:
- Only answer based on content stored on this site.
- For off-topic questions, redirect users to the relevant Contoso portal.

Response format:
- Use bullet points for lists of items.
- Include document links where available.
- If unsure, say so clearly and suggest contacting the project manager.
```

---

## Tips for Iterating on Instructions

- **Test after every change.** After saving, ask the agent 3–5 representative questions your users would ask. Check whether the responses match your intent.
- **Be explicit about what NOT to do.** Language models respond well to negative constraints: "Do not speculate about project timelines if no data is found."
- **Version your instructions.** Copy your instruction text into a document in the site library before making big changes so you can roll back.
- **Keep it under ~800 tokens.** Very long instructions can degrade response quality as the model may lose track of earlier directives.

---

## Conclusion

SharePoint Agents are a low-friction way to deliver an AI-powered assistant to any team — no code, no complex deployment. A thoughtfully written set of custom instructions transforms a generic chat interface into a focused, reliable assistant that your team will actually trust and use. Spend 15 minutes refining your instructions and watch the quality of responses improve dramatically.

---

## References

- [Customize a SharePoint agent – Microsoft Learn](https://learn.microsoft.com/sharepoint/dev/declarative-customization/sharepoint-agent-customize)
- [SharePoint agents overview](https://learn.microsoft.com/sharepoint/sharepoint-agent-overview)
- [Best practices for writing Copilot instructions](https://learn.microsoft.com/microsoft-365-copilot/extensibility/declarative-agent-instructions)
