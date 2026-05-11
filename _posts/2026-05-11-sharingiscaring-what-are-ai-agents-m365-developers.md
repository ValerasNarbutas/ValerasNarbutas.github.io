---
title: "What are AI Agents? A plain English guide for M365 developers"
author: valeras
date: 2026-05-11 09:00:00 +0800
categories:
  - SharingIsCaring
  - AI
tags:
  - AI
  - Agents
  - CopilotStudio
  - M365
  - AzureAI
  - SharingIsCaring
  - Microsoft
  - GenAI
  - LLM
  - MachineLearning
pin: false
slug: what-are-ai-agents-plain-english-m365-developers
comments: true
image:
  path: /img/posts/what_are_ai_agents_m365.png
  alt: What are AI Agents – plain English guide for M365 developers
---

## Summary

"AI Agent" has become one of the most overused terms in tech right now. It means something specific to an AI researcher, something different to a Microsoft sales deck, and something else entirely to a developer wondering whether to use Copilot Studio or Azure AI Foundry. This post cuts through the noise and explains — in plain English — what AI agents actually are, the spectrum from simple to autonomous, and where Microsoft's tooling fits on that spectrum.

---

## The Simple Definition

An **AI agent** is a software system that:

1. **Perceives** inputs from its environment (a user message, a file, a database record, a sensor reading)
2. **Reasons** about what to do next, using an AI model
3. **Acts** — executes something in the world (sends a message, calls an API, writes a file, calls another tool)
4. **Observes** the result and updates its understanding

That's it. The "intelligence" is in step 2 — the AI model doing the reasoning.

Compare this to a traditional application:

| Traditional App | AI Agent |
|----------------|---------|
| Follows hard-coded rules | Reasons about what to do using a model |
| Deterministic — same input = same output | Non-deterministic — may produce different outputs |
| Can only do what was explicitly programmed | Can handle inputs it was never explicitly trained on |
| No concept of memory across requests | Can maintain context over time (with memory tools) |

---

## The Agent Spectrum

Not all "agents" are equally autonomous. Think of it as a spectrum:

```
Simple ←————————————————————————————→ Autonomous

[Chatbot]  [Q&A Agent]  [Tool Agent]  [Orchestrator]  [Autonomous Agent]
    ↑            ↑            ↑              ↑                 ↑
Scripted    Retrieves    Calls tools    Routes to          Self-directs
topics      answers      to act         sub-agents         multi-step
            from docs                                       plans
```

### Level 1: Chatbot (Rules-Based)

A chatbot follows scripted decision trees. There is no AI reasoning — just "if user says X, reply with Y."

- **Example**: Old Power Virtual Agents bot with fixed topics and no generative AI
- **Microsoft tool**: Basic Copilot Studio topics without generative answers

### Level 2: Q&A Agent (Knowledge Retrieval)

The agent retrieves relevant information from a knowledge source and generates a natural-language answer.

- **Example**: Copilot Studio agent grounded in a SharePoint site
- **Microsoft tool**: Copilot Studio with knowledge sources + generative answers enabled

### Level 3: Tool-Using Agent

The agent can call external tools — APIs, databases, functions — to take actions, not just answer questions.

- **Example**: Agent that books a meeting room by calling a calendar API, or creates a ServiceNow ticket
- **Microsoft tool**: Copilot Studio Actions + Power Automate flows

### Level 4: Orchestrator Agent

The agent decomposes a complex task and delegates sub-tasks to other agents or tools, then assembles the results.

- **Example**: "Plan my onboarding week" → sub-tasks to HR agent, IT agent, calendar agent
- **Microsoft tool**: Copilot Studio with agent handoffs, or Azure AI Foundry Prompt flow

### Level 5: Autonomous Agent

The agent runs multi-step plans without human approval at each step. It perceives, reasons, acts, and re-plans in a loop until the task is complete.

- **Example**: A research agent that autonomously searches the web, reads papers, extracts findings, and writes a report
- **Microsoft tool**: Azure AI Foundry with an agentic prompt flow loop

> Most **enterprise use cases** sit at Level 2–3. Level 4–5 autonomy requires careful governance — every autonomous action has consequences that are hard to reverse.
{: .prompt-warning }

---

## The Four Core Components of an AI Agent

### 1. Perception (Input)

How the agent receives information:
- A chat message from a user
- A new email arriving in Outlook
- A file uploaded to SharePoint
- A scheduled trigger (run at midnight)
- An HTTP webhook from an external system

### 2. Reasoning (The Brain)

The AI model processing the input and deciding what to do. In Microsoft tools:

| Tool | Reasoning Model |
|------|----------------|
| Copilot Studio | GPT-4o (managed by Microsoft) |
| Azure AI Foundry | Any deployed model (GPT-4o, Phi-4, Llama, etc.) |
| Power Automate AI Builder | Prebuilt or custom AI models |
| Microsoft 365 Copilot | GPT-4 Turbo via Copilot's graph-grounded layer |

The quality of the reasoning step depends on:
- **Model capability**: more capable model = better reasoning
- **System prompt**: instructions that scope and guide behaviour
- **Context**: what information is available to the model (memory, retrieved docs, tool results)

### 3. Memory

Memory determines how much the agent "knows" when making a decision:

| Memory Type | What It Contains | Example |
|-------------|-----------------|---------|
| **In-context** | Current conversation history | The last 10 messages in a chat |
| **Retrieved** | Documents fetched at query time | SharePoint pages matching the user's question |
| **External / persistent** | Stored facts about a user or task | User preferences saved in Dataverse |
| **Tool output** | Results of previous action calls | "I just created ticket #1234 in ServiceNow" |

Copilot Studio manages **in-context memory** automatically per conversation session. For **persistent memory** across sessions, you need external storage (Dataverse, SharePoint list, Azure Cosmos DB).

### 4. Actions (Tools)

What the agent can do beyond answering:

| Action Type | Examples |
|------------|---------|
| **Read** | Search SharePoint, query a database, read a file |
| **Write** | Create a SharePoint item, send an email, create a ticket |
| **Compute** | Run a calculation, execute a Python function |
| **Call** | Invoke another API, trigger a Power Automate flow |
| **Hand off** | Transfer to a human agent or a different AI agent |

In Copilot Studio, actions are configured in the **Actions** panel and connected to Power Automate flows or connector calls. In Azure AI Foundry, actions are implemented as **tools** in a prompt flow or as function-calling in the OpenAI API.

---

## Agent vs Copilot vs Bot: What's the Difference?

This is genuinely confusing because Microsoft uses multiple terms:

| Term | What It Means in Microsoft's World |
|------|-------------------------------------|
| **Bot** | Legacy term from Power Virtual Agents / Bot Framework. Equivalent to a Copilot Studio agent. |
| **Copilot** | A Copilot Studio-built agent, or Microsoft's branded AI assistant (M365 Copilot). Context-dependent. |
| **Agent** | The new preferred term for any AI-powered assistant built in Copilot Studio or Azure AI Foundry. |
| **Declarative agent** | A lightweight M365 Copilot extension defined by a manifest + instructions (no code, no Copilot Studio needed). |
| **Custom engine agent** | A fully custom AI application connected to M365 Copilot (you bring your own model + logic). |

> In Microsoft's 2025–2026 terminology, **every chatbot you build in Copilot Studio is an "agent"**. The Bot Framework SDK terminology ("bot") is still used in some Azure AI Bot Service documentation but is being phased out.
{: .prompt-tip }

---

## Where to Build: Choosing the Right Tool

```
Is this conversational (user chat UI)?
  ├── Yes: Does it need to stay within M365/Teams?
  │         ├── Yes: → Copilot Studio
  │         └── No:  → Copilot Studio or Azure Bot Service
  │
  └── No: Is this triggered by a system event or data?
            ├── Yes: → Power Automate (+ AI Builder or Copilot Studio actions)
            └── No:  → Azure AI Foundry (Prompt flow or SDK-based)

Is this high-autonomy / multi-step reasoning without a human in the loop?
  └── → Azure AI Foundry (agentic prompt flow or custom code)
```

### Quick Reference

| Use Case | Tool |
|----------|------|
| FAQ bot on SharePoint | Copilot Studio |
| HR assistant in Teams | Copilot Studio |
| Submit IT tickets via chat | Copilot Studio + Power Automate |
| Document processing pipeline | Power Automate + AI Builder |
| RAG application with custom model | Azure AI Foundry |
| Multi-agent orchestration | Azure AI Foundry or Copilot Studio handoffs |
| M365 Copilot extension | Declarative agent (manifest + instructions) |
| Custom Teams AI bot (code-first) | Teams AI Library (Bot Framework + LLM) |

---

## What Makes a Good Agent

After building several agents, here is what consistently separates good from bad:

### ✅ Good Agent Characteristics

- **Narrow scope**: Does one thing well; declines out-of-scope requests gracefully
- **Clear instructions**: System prompt is specific about persona, tone, and what to do/not do
- **Grounded answers**: Every factual claim is backed by a retrieved source, not model hallucination
- **Escalation path**: When the agent can't help, it routes to a human or another resource
- **Feedback loop**: Usage analytics are reviewed and the agent is improved based on real queries

### ❌ Bad Agent Characteristics

- **Tries to do everything**: "General purpose" agents without scope confuse users and are hard to maintain
- **No knowledge sources**: Relies on model training data alone — leads to hallucination on company-specific topics
- **No error handling**: Crashes silently when a backend system is unavailable
- **Published without testing**: Real user traffic immediately exposes gaps the builder didn't test for

---

## A Minimal Working Agent Pattern (Copilot Studio)

For M365 developers getting started, here is the simplest viable agent:

```
System prompt:
"You are a helpful IT support assistant for Contoso.
 Answer questions using only the provided knowledge sources.
 If you cannot find the answer, say: 'I don't have that information.
 Please contact the IT helpdesk at helpdesk@contoso.com.'
 Do not make up information."

Knowledge source:
  SharePoint site: https://contoso.sharepoint.com/sites/IT/KB

Actions:
  1. Submit IT ticket (calls Power Automate flow)

Published to: Microsoft Teams
```

This covers the three fundamentals: **scoped instructions**, **grounded knowledge**, **one action**. Start here, measure what users ask, and extend from there.

---

## Conclusion

AI agents are not magic — they are a well-defined pattern of perception, reasoning, memory, and action. The Microsoft Power Platform and Azure AI ecosystem gives you multiple layers to build on, from no-code Copilot Studio for conversational agents to Azure AI Foundry for complex agentic pipelines. Understanding where your use case sits on the autonomy spectrum is the most important design decision you'll make before writing a single line of code or creating a single topic.

---

## References

- [Copilot Studio Documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
- [Azure AI Foundry – Agents](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/agents-overview)
- [Microsoft 365 Copilot Extensibility](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/)
- [Teams AI Library](https://learn.microsoft.com/en-us/microsoftteams/platform/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview)
- [Azure AI Agent Service](https://learn.microsoft.com/en-us/azure/ai-services/agents/overview)
- [What are AI Agents? – Microsoft Research](https://www.microsoft.com/en-us/research/blog/ai-agents-the-future-of-intelligent-automation/)

---

## Image Prompt


