---
title: "Tip of the day – Building Teams Bots with the Teams AI Library"
author: valeras
date: 2026-02-11 10:30:00 +0800
categories:
  - TipOfTheDay
  - AI
tags:
  - Teams
  - AI
  - Bot
  - TeamsAILibrary
  - TypeScript
  - tipoftheday
pin: false
slug: tip-day-teams-ai-library-bots
comments: true
image:
  path: /img/posts/teams_ai_library.png
  alt: Building Teams Bots with the Teams AI Library
---

## Summary

The Teams AI Library is Microsoft's recommended framework for building AI-powered bots for Microsoft Teams. It abstracts away the complexities of prompt management, action routing, and state handling so you can focus on building the conversation experience. This tip introduces the key concepts, walks through a minimal TypeScript bot example using Azure OpenAI, and shares deployment tips.

---

## Why the Teams AI Library?

Before the Teams AI Library, building an intelligent Teams bot required wiring together the Bot Framework SDK, Azure OpenAI (or similar), and a custom state management layer from scratch. The Teams AI Library provides:

- **Prompt management** — define prompts as template files, not inline strings.
- **Action planner** — the LLM decides which registered action to call based on user intent.
- **State management** — conversation and user state are handled out of the box.
- **Moderation** — built-in input/output moderation hooks.
- **Feedback loops** — collect user feedback on responses with minimal code.

It is built on top of the Bot Framework SDK, so everything you know about Bot Framework still applies — you are just adding a powerful AI layer on top.

---

## Prerequisites

```bash
# Node.js 20 LTS
node --version  # v20.x.x

# Install Teams Toolkit CLI
npm install -g @microsoft/teamsfx-cli@latest

# Create a new AI bot project
teamsapp new --template AIBot --language TypeScript
```

You will also need:
- An **Azure OpenAI** resource with a `gpt-4o` deployment (or use the OpenAI API directly).
- A Microsoft 365 developer tenant with Teams enabled.
- An **Azure Bot Service** resource (created automatically by Teams Toolkit provisioning).

---

## Project Structure

After scaffolding, the key files are:

```
src/
├── app.ts              # Application entry point
├── bot/
│   ├── myBot.ts        # Bot class with action handlers
│   └── prompts/
│       └── chat/
│           ├── skprompt.txt    # System prompt template
│           └── config.json     # Model configuration
├── index.ts            # HTTP server setup
```

---

## Core Concepts

### 1. Application

The `Application` class is the heart of the library. It wires together the AI planner, state management, and message handlers:

```typescript
// src/app.ts
import { Application, ActionPlanner, OpenAIModel, PromptManager, TurnState } from '@microsoft/teams-ai';
import { MemoryStorage } from 'botbuilder';

const model = new OpenAIModel({
  azureApiKey: process.env.AZURE_OPENAI_KEY!,
  azureDefaultDeployment: 'gpt-4o',
  azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT!,
  azureApiVersion: '2024-08-01-preview',
  useSystemMessages: true,
  logRequests: true
});

const prompts = new PromptManager({ promptsFolder: path.join(__dirname, '../src/prompts') });

const planner = new ActionPlanner({
  model,
  prompts,
  defaultPrompt: 'chat'
});

const storage = new MemoryStorage();

export const app = new Application<TurnState>({
  storage,
  ai: { planner }
});
```

### 2. System Prompt

Define the bot's persona and capabilities in `src/prompts/chat/skprompt.txt`:

```
You are ContosoBuddy, a helpful assistant for Contoso employees.
You help with:
- Finding information in company documents
- Answering HR policy questions
- Booking meeting rooms

Always be professional and concise.
If you cannot help with something, say so clearly and suggest who the user should contact.

Current date and time: {{$now}}
Current user: {{$userName}}
```

Variables like `{{$now}}` and `{{$userName}}` are resolved from the `TurnState` at runtime.

### 3. Action Handlers

Actions are functions the AI can decide to call when the user's intent matches. Define them in your bot class:

```typescript
// src/bot/myBot.ts
import { app } from '../app';

// Handle a "book meeting room" action
app.ai.action('bookMeetingRoom', async (context, state, parameters) => {
  const { room, date, startTime, duration } = parameters;

  // Call your room booking API
  const bookingResult = await roomBookingService.book({
    roomId: room,
    date,
    startTime,
    durationMinutes: duration,
    organiser: context.activity.from.aadObjectId
  });

  if (bookingResult.success) {
    return `Room ${room} has been booked for ${date} at ${startTime} for ${duration} minutes. Booking reference: ${bookingResult.reference}`;
  } else {
    return `Sorry, ${room} is not available at that time. Available slots: ${bookingResult.availableSlots.join(', ')}`;
  }
});

// Handle a general message (fallback to LLM)
app.message('/help', async (context, state) => {
  await context.sendActivity(
    'I can help you with:\n- 📄 Finding company documents\n- 🏢 Booking meeting rooms\n- ❓ HR policy questions\n\nJust ask me anything!'
  );
});
```

### 4. Action Definition in config.json

Tell the AI planner about the available actions in `src/prompts/chat/config.json`:

```json
{
  "schema": 1.1,
  "description": "ContosoBuddy chat bot",
  "type": "completion",
  "completion": {
    "model": "gpt-4o",
    "completion_type": "chat",
    "include_history": true,
    "max_input_tokens": 2800,
    "max_tokens": 1000,
    "temperature": 0.2
  },
  "augmentation": {
    "augmentation_type": "sequence",
    "actions": [
      {
        "name": "bookMeetingRoom",
        "description": "Books a meeting room for the user. Use when the user wants to reserve or book a room.",
        "parameters": {
          "type": "object",
          "properties": {
            "room": { "type": "string", "description": "The room identifier, e.g. 'BoardRoom' or 'MeetingRoom-3B'" },
            "date": { "type": "string", "description": "Date in YYYY-MM-DD format" },
            "startTime": { "type": "string", "description": "Start time in HH:MM 24-hour format" },
            "duration": { "type": "number", "description": "Duration in minutes" }
          },
          "required": ["room", "date", "startTime", "duration"]
        }
      }
    ]
  }
}
```

---

## Running Locally

```bash
# Start the bot with Teams Toolkit
teamsapp preview --env local

# Or run directly with debugging
npm run dev
```

Teams Toolkit automatically sets up a dev tunnel and updates the Bot Service registration with the tunnel URL. The Teams desktop client will open with the bot ready for testing.

---

## Deployment Tips

### Provision and deploy to Azure

```bash
# Provision all Azure resources (Bot Service, App Service, etc.)
teamsapp provision --env dev

# Deploy the bot code
teamsapp deploy --env dev

# Publish the Teams app package to your org
teamsapp publish --env dev
```

### Environment variables to configure

```bash
# .env.dev
AZURE_OPENAI_KEY=your-key-here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
BOT_ID=your-bot-app-id
BOT_PASSWORD=your-bot-app-password
```

### Performance considerations

- Use `MemoryStorage` for local development only. Switch to **Azure Cosmos DB** or **Azure Blob Storage** for production state persistence.
- Set `logRequests: false` in the `OpenAIModel` config for production to avoid logging sensitive data.
- Use `temperature: 0.2` for task-oriented bots. Higher values (0.7+) are better for creative/conversational scenarios.

---

## Conclusion

The Teams AI Library dramatically simplifies building AI-powered bots. The action planner pattern means you define what your bot _can do_ (actions) and let the LLM figure out _when_ to do it based on user intent — no complex intent classification logic required. Start with the Teams Toolkit scaffold, get a working bot running locally in under an hour, and then layer in your business logic as actions.

---

## References

- [Teams AI Library overview – Microsoft Learn](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/teams-ai-library-overview)
- [Teams AI Library on GitHub](https://github.com/microsoft/teams-ai)
- [Teams Toolkit documentation](https://learn.microsoft.com/microsoftteams/platform/toolkit/teams-toolkit-fundamentals)
- [Azure OpenAI Service](https://learn.microsoft.com/azure/ai-services/openai/overview)
- [Bot Framework SDK for JavaScript](https://learn.microsoft.com/azure/bot-service/javascript/bot-builder-javascript-quickstart)
