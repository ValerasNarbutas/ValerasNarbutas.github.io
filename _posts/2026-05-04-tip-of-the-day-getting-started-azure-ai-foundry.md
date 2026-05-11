---
title: "Tip of the day – Getting started with Azure AI Foundry (new portal view)"
author: valeras
date: 2026-05-04 08:00:00 +0800
categories:
  - TipOfTheDay
  - AI
  - AzureAIFoundry
tags:
  - AzureAI
  - AIFoundry
  - Azure
  - tipoftheday
  - AI
  - LLM
  - MachineLearning
  - Microsoft
  - GenAI
  - RAG
pin: false
slug: tip-day-getting-started-azure-ai-foundry-portal
comments: true
image:
  path: /img/posts/tip_azure_ai_foundry_getting_started.png
  alt: Getting started with Azure AI Foundry new portal view
---

## Summary

**Azure AI Foundry** is Microsoft's unified platform for building, evaluating, and deploying enterprise AI applications. In 2025, the portal was redesigned — consolidating what used to be scattered across Azure Machine Learning Studio, Azure OpenAI Studio, and various Cognitive Services blades into a **single coherent workspace**. This tip shows you what the new portal looks like, how it's structured, and how to go from zero to running your first model in minutes.

---

## What Changed: Old vs New

If you used Azure OpenAI Studio or Azure ML Studio before, here's what moved:

| Old Location | New Location in AI Foundry |
|-------------|---------------------------|
| Azure OpenAI Studio (oai.azure.com) | AI Foundry → **Playgrounds** |
| Azure ML Studio – Model catalog | AI Foundry → **Model catalog** |
| Prompt Flow (Azure ML) | AI Foundry → **Prompt flow** |
| Azure AI Services configuration | AI Foundry → **AI Services** |
| Deployment management | AI Foundry → **Models + Endpoints** |
| Fine-tuning | AI Foundry → **Fine-tuning** |

> [oai.azure.com](https://oai.azure.com) still works as a redirect but it now opens inside the AI Foundry portal. All new features are being built in Foundry only.
{: .prompt-tip }

---

## Navigating the New Portal

### How to Get There

1. Go to [ai.azure.com](https://ai.azure.com)
2. Sign in with your Azure account
3. Select or create a **Hub** and **Project** (explained below)

---

### The Hierarchy: Hub → Project

The portal is organized around two levels:

```
Azure AI Foundry Hub
└── Project A (e.g., "Customer Support AI")
    ├── Deployments (GPT-4o, Phi-3, etc.)
    ├── Playgrounds
    ├── Prompt flow
    ├── Evaluations
    └── Data + indexes
└── Project B (e.g., "Internal Knowledge Base")
```

**Hub** = a shared container for infrastructure resources (Azure AI Services, storage, compute, networking). One hub can serve many projects.

**Project** = a workspace for a specific AI solution. Each project gets its own deployments, data, evaluations, and prompt flows.

> Create **one hub per environment** (dev, staging, prod) and **one project per use case**. Avoid creating a new hub per project — hub resources are shared and the cost adds up.
{: .prompt-warning }

---

### Creating Your First Hub and Project

1. On the AI Foundry home page, click **+ Create project**
2. **Create a new hub** if you don't have one:
   - Name: e.g., `ai-foundry-dev`
   - Azure subscription and resource group
   - Region: choose a region with model availability (East US 2 or Sweden Central recommended)
3. **Name your project**: e.g., `my-first-ai-project`
4. Click **Create** — provisioning takes ~2 minutes

---

## Key Areas of the Portal

### 1. Model Catalog

**Where:** Left nav → **Model catalog**

The model catalog is the central place to browse, compare, and deploy models:

- **Azure OpenAI models**: GPT-4o, GPT-4o mini, o1, o3-mini, DALL-E 3, Whisper, text-embedding-3
- **Open source / community models**: Phi-3, Phi-4, Llama 3, Mistral, Cohere Command R+
- **Partner models**: available through Azure Marketplace integration

Each model card shows:
- Benchmarks and capabilities
- Pricing per 1K tokens
- Supported regions
- Fine-tuning availability

To deploy a model:
1. Open the model card
2. Click **Deploy**
3. Choose **Standard** (pay-per-token) or **Provisioned** (reserved throughput)
4. Name your deployment and set token-per-minute limits

---

### 2. Playgrounds

**Where:** Left nav → **Playgrounds**

The playground lets you interact with deployed models without writing any code:

| Playground | Use It For |
|------------|-----------|
| **Chat** | Test chat completions, system prompts, multi-turn conversations |
| **Images** | Test DALL-E 3 image generation |
| **Real-time audio** | Test speech-to-speech with GPT-4o audio |
| **Assistants** | Test function calling, code interpreter, file search |

**Tip — Use the Chat playground to tune your system prompt before writing any code:**

1. Open Chat playground
2. Select your deployed model
3. Write a system prompt in the **System message** panel
4. Toggle **Add your data** to attach an Azure AI Search index for RAG
5. Adjust **Temperature** (0.0–1.0), **Max tokens**, **Top P** in the parameters panel
6. Test → iterate → copy the final system prompt to your code

---

### 3. Prompt Flow

**Where:** Left nav → **Prompt flow**

Prompt flow is a visual orchestration tool for building multi-step AI pipelines:

```
Input → [LLM Call] → [Python function] → [Azure AI Search] → [LLM Call] → Output
```

Common use cases:
- RAG (Retrieval-Augmented Generation) pipelines
- AI-powered data transformation
- Evaluation pipelines (testing model quality at scale)

Each node in the flow is a **tool**:
- **LLM tool**: calls any deployed model
- **Python tool**: runs arbitrary Python code
- **Prompt tool**: renders a Jinja2 template into a prompt string
- **Index lookup tool**: queries an Azure AI Search index

> Prompt flow is where you go when the playground is not enough — you need to chain multiple steps, inject retrieved data, or evaluate systematically.
{: .prompt-tip }

---

### 4. Models + Endpoints

**Where:** Left nav → **Models + endpoints**

This is your deployment management panel. For each deployed model you can see:

- **Deployment name** and model version
- **Type**: Standard (consumption) or Provisioned (reserved)
- **Tokens per minute (TPM)** limit
- **Status**: Succeeded / Updating / Failed
- **Endpoint URL** and **API key** (click "Show" to reveal)
- **Usage metrics**: token consumption graphs

To get your endpoint for code use:

```python
from openai import AzureOpenAI

client = AzureOpenAI(
    azure_endpoint="https://<your-resource>.openai.azure.com/",
    api_key="<your-api-key>",
    api_version="2024-12-01-preview"
)

response = client.chat.completions.create(
    model="gpt-4o",  # your deployment name
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain RAG in one paragraph."}
    ]
)

print(response.choices[0].message.content)
```

---

### 5. Evaluations

**Where:** Left nav → **Evaluations**

The evaluations panel lets you run **automated quality assessments** on your AI application:

- **Built-in AI metrics**: groundedness, relevance, coherence, fluency
- **Safety metrics**: hate/unfairness, sexual content, violent content, self-harm
- **Custom metrics**: define your own evaluation criteria with a Python function

To run an evaluation:
1. Upload a test dataset (JSONL with input/output pairs)
2. Select which metrics to measure
3. Select the model/deployment to evaluate against
4. Run → view per-row results and aggregated scores

> Run evaluations before every **major prompt change** or **model version upgrade**. A 5% drop in groundedness score after a prompt edit is a signal to investigate before deploying.
{: .prompt-warning }

---

## Quick-Start Checklist

```
☐ 1. Create a Hub in your Azure subscription (East US 2 or Sweden Central)
☐ 2. Create a Project inside the Hub
☐ 3. Deploy GPT-4o (Standard tier, 10K TPM limit for dev)
☐ 4. Open Chat Playground → test your system prompt
☐ 5. Add an Azure AI Search index as a data source (for RAG)
☐ 6. Copy the endpoint URL and API key from Models + Endpoints
☐ 7. Write a 10-line Python test to call your deployment
☐ 8. Set up an Evaluation run with 20 sample Q&A pairs
```

---

## Cost Awareness

| Resource | Approximate Cost |
|----------|-----------------|
| Hub (basic, no compute) | Near zero — storage and networking only |
| GPT-4o Standard deployment | ~$5 per 1M input tokens, ~$15 per 1M output tokens |
| GPT-4o mini Standard | ~$0.15 per 1M input, ~$0.60 per 1M output |
| Azure AI Search (Basic) | ~$75/month for a Basic tier index |
| Provisioned throughput (PTU) | Starting ~$2/hour per PTU — only for high-volume prod |

> For development and learning, **Standard deployment with token limits** is the right choice. Set a low TPM cap (10K–50K) so you don't accidentally burn through budget during testing.
{: .prompt-warning }

---

## Conclusion

The new Azure AI Foundry portal consolidates everything you need to build production AI applications in one place. The Hub/Project model makes it scalable across teams and use cases. Start with the Chat playground to validate your ideas quickly, then graduate to Prompt flow when you need multi-step orchestration, and use Evaluations to maintain quality as you iterate.

---

## References

- [Azure AI Foundry Documentation](https://learn.microsoft.com/en-us/azure/ai-studio/)
- [AI Foundry Portal](https://ai.azure.com)
- [Azure OpenAI Service Models](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models)
- [Prompt Flow Documentation](https://learn.microsoft.com/en-us/azure/machine-learning/prompt-flow/overview-what-is-prompt-flow)
- [AI Foundry Evaluations](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/evaluate-generative-ai-app)
- [Azure AI Foundry Pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/)

---

## Image Prompt

> **Midjourney prompt:**
> `modern AI development portal dashboard floating in dark space, holographic panels showing model cards with deployment metrics and evaluation scores, glowing Azure blue and white color scheme, futuristic flat design, clean enterprise aesthetic, multiple interconnected floating UI panels, dark navy background --v 7.0`
