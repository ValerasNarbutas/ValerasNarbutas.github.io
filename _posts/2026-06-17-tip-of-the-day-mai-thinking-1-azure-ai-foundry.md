---
title: "Tip: Try MAI-Thinking-1 – Microsoft's First Reasoning Model on Azure AI Foundry"
author: valeras
date: 2026-06-17 12:00:00 +0800
categories:
  - TipOfTheDay
  - AI
tags:
  - MAI
  - Azure AI Foundry
  - Build2026
  - Reasoning Models
  - AI
pin: false
slug: tip-mai-thinking-1-azure-ai-foundry
comments: true
image:
  path: /img/posts/mai-thinking-1.png
  alt: MAI-Thinking-1 on Azure AI Foundry
---

## Tip

At **Microsoft Build 2026** (June 2, 2026), Microsoft unveiled **MAI-Thinking-1** — their first in-house reasoning model, now available in **private preview on Azure AI Foundry**. If you are evaluating reasoning-tier models for your enterprise applications, this one is worth putting on your shortlist.

---

## What Makes MAI-Thinking-1 Different?

Most reasoning models available today were trained using knowledge distillation from other large models. **MAI-Thinking-1 was trained from scratch with zero distillation**, using only commercially licensed data — which matters significantly if you are building in regulated industries where training data provenance is auditable.

Key specs:

| Attribute | Value |
|---|---|
| Active parameters | 35 billion |
| Context window | 256K tokens |
| Training data | Zero distillation — commercially licensed only |
| SWE Bench Pro | Benchmarked to match Anthropic Claude Opus 4.6 |
| Blind preference tests | Preferred over Claude Sonnet 4.6 |

---

## How to Access It

MAI-Thinking-1 is currently in **private preview on Azure AI Foundry**. To request access:

1. Go to [Azure AI Foundry](https://ai.azure.com)
2. Navigate to **Model Catalog**
3. Search for **MAI-Thinking-1**
4. Select **Request Access** and complete the preview form

Once approved, you can call it via the standard Azure AI Inference SDK:

```python
from azure.ai.inference import ChatCompletionsClient
from azure.core.credentials import AzureKeyCredential

client = ChatCompletionsClient(
    endpoint="https://<your-endpoint>.models.ai.azure.com",
    credential=AzureKeyCredential("<your-key>"),
)

response = client.complete(
    model="mai-thinking-1",
    messages=[
        {
            "role": "user",
            "content": "Walk through the reasoning for why a circular buffer is a good fit for a fixed-size log store."
        }
    ],
    max_tokens=4096,
)

print(response.choices[0].message.content)
```

---

## When to Use a Reasoning Model

Reasoning models like MAI-Thinking-1 shine for tasks that benefit from deliberate, step-by-step thinking:

- **Complex code generation** — multi-file refactors, algorithm design
- **Document analysis** — legal contracts, technical specifications with interdependencies
- **Multi-hop Q&A** — questions that require combining facts from multiple sources
- **Evaluation and planning** — designing test plans, architecture reviews

For simple chat or retrieval-augmented generation over well-structured data, a standard model will still be faster and more cost-efficient.

---

## The Broader MAI Model Family

MAI-Thinking-1 is part of a larger family of 7 models Microsoft announced at Build 2026:

| Model | Use case |
|---|---|
| MAI-Thinking-1 | Complex reasoning tasks |
| MAI-Image-2.5 + Flash | Text-to-image and image-to-image generation |
| MAI Transcribe 1.5 | Speech-to-text, 43 languages |
| MAI-Voice-2 + Flash | Text-to-speech, 15+ additional languages |
| MAI-Code-1 | Inference-efficient coding model for GitHub/VS Code |

---

## References

- [Microsoft Build 2026 keynote recap](https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/)
- [Azure AI Foundry Model Catalog](https://ai.azure.com)
- [Microsoft Build 2026 Official Hub](https://news.microsoft.com/build-2026/)
