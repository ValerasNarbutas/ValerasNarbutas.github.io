---
title: "Tip of the day – Using Copilot Actions in Power Automate"
author: valeras
date: 2025-08-10 10:00:00 +0800
categories:
  - TipOfTheDay
  - AI
tags:
  - PowerAutomate
  - AI
  - M365 Copilot
  - tipoftheday
  - Automation
pin: false
slug: tip-day-power-automate-copilot-actions
comments: true
image:
  path: /img/posts/pa_copilot_actions.png
  alt: Using Copilot Actions in Power Automate
---

## Summary

Copilot Actions bridge the gap between natural language Copilot conversations and real business automation. By registering a Power Automate flow as a Copilot Action, you allow M365 Copilot to trigger your flow directly from a chat conversation — no UI needed. This tip explains what Copilot Actions are, how to register them, and walks through a practical example triggered from a Teams message.

---

## What Are Copilot Actions?

A **Copilot Action** is a capability exposed to M365 Copilot that it can invoke when it determines the user's intent matches the action's description. Under the hood, each action is backed by a Power Automate flow (or an API plugin endpoint). When a user says something like *"Please raise a support ticket for the printing issue in Room 3B"*, Copilot can:

1. Recognise the intent as matching the "Raise Support Ticket" action.
2. Extract parameters (`location = Room 3B`, `issue = printing`) from the user's message.
3. Call the registered flow with those parameters.
4. Report the outcome back to the user in natural language.

This is distinct from traditional Power Automate connectors — the action is triggered by Copilot reasoning, not by a scheduled trigger or a button press.

---

## Prerequisites

- Microsoft 365 Copilot licence assigned to the user.
- Power Automate per-user plan or a Microsoft 365 plan that includes Power Automate.
- The **Microsoft Copilot Studio** environment (used for action registration) is available in your tenant.

---

## Step 1: Build the Power Automate Flow

Create a flow using the **Instant cloud flow** trigger type. Choose **"When Copilot calls a flow"** as the trigger — this is available under the **Microsoft Copilot** connector category.

### Define the input parameters

In the trigger card, add the parameters Copilot will pass:

| Parameter name | Type | Description |
|---|---|---|
| `issueDescription` | String | Description of the issue to raise |
| `location` | String | Location where the issue occurred |
| `priority` | String | Priority level (Low / Medium / High) |

### Flow steps

1. **Trigger:** When Copilot calls a flow (inputs: `issueDescription`, `location`, `priority`)
2. **Action:** Send an HTTP POST to your ticketing API

```json
POST https://api.contoso.com/tickets
Authorization: Bearer @{body('Get_token')?['access_token']}
Content-Type: application/json

{
  "title": "@{triggerBody()?['issueDescription']}",
  "location": "@{triggerBody()?['location']}",
  "priority": "@{triggerBody()?['priority']}",
  "createdBy": "@{triggerBody()?['initiator']?['userPrincipalName']}"
}
```

3. **Return value to Copilot:** Use the **"Respond to Copilot"** action to send back a confirmation string:

```
Ticket #@{body('Create_Ticket')?['ticketId']} has been raised for "@{triggerBody()?['issueDescription']}" at @{triggerBody()?['location']} with @{triggerBody()?['priority']} priority.
```

---

## Step 2: Register the Flow as a Copilot Action

1. Open [Copilot Studio](https://copilotstudio.microsoft.com) and navigate to your environment.
2. Go to **Actions** in the left navigation.
3. Click **+ New action** → **Power Automate flow**.
4. Select the flow you just created.
5. Fill in the action metadata:

| Field | Value |
|---|---|
| **Name** | Raise Support Ticket |
| **Description** | Raises a support ticket in the Contoso ticketing system. Use when the user reports a facility or IT issue and wants to log it formally. |
| **Confirmation** | Always confirm before running |

6. Map the flow parameters to the action inputs. Add natural language descriptions for each parameter so Copilot knows how to extract them from conversation context.

7. Click **Publish**.

---

## Step 3: Testing the Action in Teams

Open Microsoft Teams and start a M365 Copilot conversation. Try a message like:

> *"Can you log a high-priority support ticket? The projector in the Board Room isn't working."*

Copilot should:
1. Identify the "Raise Support Ticket" action.
2. Confirm the parameters it has extracted and ask you to approve.
3. Trigger the flow and return the ticket number.

If the action does not appear, check that the action is published and that your account has the M365 Copilot licence. It can take up to 15 minutes for a newly published action to be available.

---

## Tips and Gotchas

- **Write a great description.** The action description is what Copilot uses to decide whether to invoke it. Be specific: describe _when_ the action should be used, not just _what_ it does.
- **Confirm before running for write operations.** Always enable the confirmation step for flows that create, update, or delete data to prevent accidental execution.
- **Test with edge cases.** Try saying the same thing in five different ways to verify that Copilot consistently resolves to the correct action and extracts parameters correctly.
- **Monitor runs in Power Automate.** All Copilot-triggered flow runs appear in the standard Power Automate run history, making debugging straightforward.

---

## Conclusion

Copilot Actions are a compelling bridge between conversational AI and real-world automation. With just a Power Automate flow and a few minutes of configuration in Copilot Studio, you can enable your team to trigger complex workflows using plain language. Start with a simple, high-value use case — like raising tickets or updating records — and build from there.

---

## References

- [Create Copilot actions from Power Automate flows](https://learn.microsoft.com/microsoft-copilot-studio/copilot-plugins-actions-connectors)
- [Microsoft Copilot extensibility overview](https://learn.microsoft.com/microsoft-365-copilot/extensibility/overview-business-applications)
- [Power Automate documentation](https://learn.microsoft.com/power-automate/)
- [Microsoft Copilot Studio overview](https://learn.microsoft.com/microsoft-copilot-studio/fundamentals-what-is-copilot-studio)
