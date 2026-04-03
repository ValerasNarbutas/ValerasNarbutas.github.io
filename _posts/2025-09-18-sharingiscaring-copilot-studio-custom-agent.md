---
title: "Building a Custom M365 Copilot Agent with Microsoft Copilot Studio"
author: valeras
date: 2025-09-18 16:00:00 +0800
categories:
  - SharingIsCaring
  - AI
tags:
  - Copilot Studio
  - AI
  - M365 Copilot
  - Teams
  - Custom Agent
pin: false
slug: copilot-studio-custom-agent
comments: true
image:
  path: /img/posts/copilot_studio_agent.png
  alt: Building a Custom M365 Copilot Agent with Copilot Studio
---

## Summary

Microsoft Copilot Studio lets you build sophisticated custom agents that surface inside Microsoft Teams, SharePoint, and Microsoft 365 Copilot — without writing a single line of server-side code. This step-by-step guide walks through creating a functional "IT Helpdesk Agent" from scratch: defining topics, configuring knowledge sources, adding connectors, and deploying to Teams for testing.

---

## What We Are Building

**Contoso IT Helpdesk Agent** — an agent that:
- Answers common IT FAQ questions using the company knowledge base.
- Guides users through a structured troubleshooting flow for password resets.
- Raises a ServiceNow ticket via a Power Automate connector when the issue is unresolved.
- Hands off to a live agent (Teams escalation) for complex issues.

---

## Step 1: Create the Agent

1. Navigate to [Copilot Studio](https://copilotstudio.microsoft.com).
2. Select your **environment** from the top-right selector. Use a development/sandbox environment for initial build.
3. Click **+ Create** → **New agent**.
4. Fill in the details:
   - **Name:** Contoso IT Helpdesk
   - **Description:** Helps Contoso employees resolve common IT issues and raise support tickets.
   - **Instructions (system prompt):**

```
You are the Contoso IT Helpdesk assistant. Your role is to help employees resolve 
common IT issues quickly and professionally.

- Always greet the user politely.
- For password issues, follow the Password Reset topic.
- For hardware issues, collect details and raise a ServiceNow ticket.
- If you cannot resolve the issue within 3 exchanges, offer live agent escalation.
- Keep responses concise. Use numbered steps for procedures.
- Do not speculate about security policies you are not certain about.
```

5. Click **Create**.

---

## Step 2: Configure Knowledge Sources

Knowledge sources ground the agent's responses in your actual company content, reducing hallucination and keeping answers accurate.

### Adding a SharePoint knowledge source

1. In your agent, go to **Knowledge** in the left navigation.
2. Click **+ Add knowledge** → **SharePoint**.
3. Enter the URL of your IT knowledge base site, e.g. `https://contoso.sharepoint.com/sites/ITKnowledge`.
4. Select specific document libraries if you want to scope the crawl.
5. Click **Add**.

Copilot Studio will crawl the site and make the content available for retrieval-augmented generation (RAG).

### Adding a public website

For vendor documentation (e.g., Microsoft support articles):

1. Click **+ Add knowledge** → **Public website**.
2. Enter `https://support.microsoft.com`.
3. Toggle **Allow Copilot to search this site** to on.

> **Tip:** Be selective with public websites. Broad domains can introduce noise. Prefer adding specific sub-paths such as `https://support.microsoft.com/en-us/windows`.

---

## Step 3: Create a Structured Topic (Password Reset)

Topics are conversation flows triggered by specific user intents.

1. Go to **Topics** → **+ Add a topic** → **From blank**.
2. Name the topic **Password Reset**.
3. Add trigger phrases:

```
- I forgot my password
- My password has expired
- How do I reset my password
- Account locked out
- Can't sign in
```

4. Build the conversation flow using the visual canvas:

**Node 1 – Question:**
> Are you locked out, or are you resetting because your password expired?
> - Locked out → branch to `LockedOut`
> - Expired/forgotten → branch to `SelfServiceReset`

**Branch: SelfServiceReset → Message:**
> You can reset your own password using the self-service portal:
> 1. Go to [aka.ms/sspr](https://aka.ms/sspr)
> 2. Enter your work email address
> 3. Choose your verification method (authenticator app or email)
> 4. Follow the steps to set a new password
>
> Did this resolve your issue?
> - Yes → End conversation with success message
> - No → Escalate to live agent

**Branch: LockedOut → Action (call Power Automate flow):**
- Trigger `UnlockAccount` flow with the user's UPN (available from `System.User.PrincipalName`)
- Show confirmation: "Your account has been sent for unlock. This typically takes 2–5 minutes."

---

## Step 4: Add a Connector Action (ServiceNow Ticket)

1. Go to **Actions** → **+ Add an action** → **Connector**.
2. Search for **ServiceNow** and select **Create Incident**.
3. Configure the connection with your ServiceNow instance credentials.
4. Map the action inputs:

| Input | Source |
|---|---|
| Short description | `{Topic.IssueDescription}` variable |
| Category | `hardware` (hardcoded) |
| Urgency | `{Topic.Urgency}` variable from earlier question node |
| Caller ID | `{System.User.PrincipalName}` |

5. Add the action to your **Hardware Issue** topic at the point where you want to raise the ticket.

---

## Step 5: Configure Live Agent Escalation

1. In **Topics**, open the **Escalate** system topic (built-in).
2. Enable **Omnichannel for Microsoft Teams** as the escalation channel.
3. Configure the queue name to match your Teams channel (e.g., `IT-Support-Queue`).
4. In any topic where escalation is needed, add a **Transfer conversation** node and select the queue.

When a user triggers escalation, the conversation transcript is passed to the live agent so they have full context.

---

## Step 6: Test in Teams

1. In Copilot Studio, click **Publish** → **Publish** to confirm.
2. Go to **Channels** → **Microsoft Teams**.
3. Click **Turn on Teams** and then **Open agent in Teams**.
4. Teams opens with the agent in a 1:1 chat.

Test the key scenarios:
- Ask an FAQ question (should answer from knowledge source with citation).
- Say "I forgot my password" (should enter the Password Reset topic).
- Say "My monitor is broken" (should collect details and raise a ServiceNow ticket).

---

## Deploying Organisation-Wide

Once testing is complete:

1. In Teams Admin Center, go to **Teams apps** → **Manage apps**.
2. Find your Copilot Studio agent app and set **Org-wide availability** to enabled.
3. Optionally, use an **App setup policy** to pin the agent to the Teams app bar for target user groups.

---

## Conclusion

Copilot Studio enables any developer — or even a skilled power user — to build a fully functional AI agent deployed directly in Teams within hours. The combination of RAG-based knowledge sources, structured topics, connector actions, and live agent escalation covers the vast majority of real-world helpdesk and business automation scenarios. Start with a focused use case, test thoroughly, and iterate based on user feedback.

---

## References

- [Microsoft Copilot Studio documentation](https://learn.microsoft.com/microsoft-copilot-studio/)
- [Create and configure knowledge sources](https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-existing-copilot)
- [Add actions to your copilot](https://learn.microsoft.com/microsoft-copilot-studio/advanced-plugin-actions)
- [Deploy your agent to Microsoft Teams](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams)
- [Configure live agent handoff](https://learn.microsoft.com/microsoft-copilot-studio/configuration-hand-off-omnichannel)
