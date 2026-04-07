---
title: "Microsoft Certification Changes: Power Platform, M365, and AI in 2025–2026"
author: valeras
date: 2026-04-07 10:00:00 +0800
categories:
  - SharingIsCaring
  - Learning
tags:
  - Certification
  - PowerPlatform
  - M365
  - AI
  - Microsoft
  - Copilot
  - Learning
pin: false
slug: microsoft-certification-changes-powerplatform-m365-ai-2026
comments: true
image:
  path: /img/posts/ms_cert_changes_2026.png
  alt: Microsoft Certification Changes 2025-2026
---

## Summary

Microsoft has been aggressively reshaping its certification portfolio to reflect the AI-first world we're working in. Exams are being **retired**, **renamed**, and **replaced** at a pace that can be hard to track. This post rounds up the most important changes across **Power Platform**, **Microsoft 365**, and **AI** certifications — so you know what to study, what to skip, and what's coming next.

---

## Why Is Microsoft Changing Certifications?

Three drivers are behind the current wave of changes:

1. **Copilot is everywhere.** Every product now includes AI capabilities, so certifications need to test AI-adjacent skills even for non-AI roles.
2. **Applied Skills credentials** are replacing some traditional role-based exams for narrower, scenario-specific validation.
3. **Retiring legacy content.** Exams tied to deprecated products (classic admin centers, older portal experiences) are being sunset.

> Microsoft typically provides a **6-month notice** before retiring an exam. Always check the [official retirement announcements page](https://learn.microsoft.com/en-us/certifications/retired-certifications) before you start studying.
{: .prompt-warning }

---

## Power Platform Certification Changes

### What Stayed the Same (but got updated)

| Exam | Certification | Status |
|------|--------------|--------|
| PL-900 | Power Platform Fundamentals | ✅ Active – updated with Copilot Studio content |
| PL-200 | Power Platform Functional Consultant Associate | ✅ Active – refreshed |
| PL-300 | Power BI Data Analyst Associate | ✅ Active |
| PL-400 | Power Platform Developer Associate | ✅ Active – updated with PCF and plugin content |
| PL-600 | Power Platform Solution Architect Expert | ✅ Active |

### Key Changes

#### PL-100 Retired
**Microsoft Power Platform App Maker (PL-100)** was retired. Microsoft shifted this audience toward the **PL-200** track and the new **Applied Skills** credentials, which are more granular and scenario-based.

#### Copilot Studio is now in scope
**PL-200** and **PL-900** have both been updated to include **Microsoft Copilot Studio** (formerly Power Virtual Agents). If you haven't touched Copilot Studio yet, topics to know include:
- Creating and publishing agents
- Topics, entities, and conversation variables
- Connecting to Microsoft Graph and third-party APIs
- Generative AI answers with knowledge sources

#### Applied Skills replacing narrow certifications
Microsoft introduced **Applied Skills** credentials as an alternative to full role-based certifications for targeted scenarios. Relevant Power Platform Applied Skills:

| Applied Skill | What It Validates |
|--------------|-------------------|
| Create and manage canvas apps with Power Apps | Canvas app development end-to-end |
| Create and manage automated processes with Power Automate | Flow types, connectors, error handling |
| Extend Microsoft Copilot for Microsoft 365 with Copilot Studio | Extending M365 Copilot with custom topics |

> Applied Skills assessments are free and can be done in a **browser-based lab environment** on Microsoft Learn. No Pearson VUE appointment needed.
{: .prompt-tip }

---

## Microsoft 365 Certification Changes

### Biggest Change: MS-100 + MS-101 → MS-102

The most significant retirement in the M365 track was the consolidation of the two-exam **Microsoft 365 Administrator Expert** path:

| Old Path | New Path |
|----------|----------|
| MS-100 (Microsoft 365 Identity and Services) | ❌ Retired |
| MS-101 (Microsoft 365 Mobility and Security) | ❌ Retired |
| **MS-102** (Microsoft 365 Administrator) | ✅ Single exam, now required |

**MS-102** combines identity, security, compliance, and core M365 administration into one exam. If you passed MS-100 or MS-101 before retirement you kept your certification, but renewals now go through MS-102.

### Teams and Endpoint Management

| Exam | Status | Notes |
|------|--------|-------|
| MS-700 | ✅ Active | Updated with Teams Premium and Copilot for Teams features |
| MD-102 | ✅ Active | Endpoint Administrator — Intune, Windows Autopilot, co-management |
| MS-900 | ✅ Active | M365 Fundamentals, now includes Copilot overview section |

### Copilot for M365 in scope for MS-900

**MS-900 (Microsoft 365 Fundamentals)** was updated to include a section on **Microsoft 365 Copilot** — what it is, licensing requirements, and admin controls. If you're taking or renewing MS-900, make sure to study:
- Copilot for M365 licensing (which plans include it)
- Admin controls in the Microsoft 365 Admin Center
- Responsible AI principles as applied to Copilot

---

## AI Certification Changes

This is where the most **new content** is being added. Microsoft has expanded its AI certification surface significantly.

### Foundational

| Exam | Certification | Status |
|------|--------------|--------|
| AI-900 | Azure AI Fundamentals | ✅ Active – updated with generative AI and Copilot content |

**AI-900** now covers:
- Large language models (LLMs) and how they work
- Azure OpenAI Service
- Responsible AI principles
- Copilot and generative AI applications

### Associate Level

| Exam | Certification | Status |
|------|--------------|--------|
| AI-102 | Azure AI Engineer Associate | ✅ Active – major content update |
| DP-100 | Azure Data Scientist Associate | ✅ Active |

**AI-102** was substantially updated in 2024–2025 to reflect the new Azure AI Services landscape:
- **Azure AI Studio** and prompt flow
- **Azure OpenAI Service** — deploying, fine-tuning, and managing models
- **Retrieval-Augmented Generation (RAG)** patterns
- **Content Safety** and responsible AI guardrails
- Replacing older Cognitive Services references with the unified **Azure AI Services** umbrella

> If you studied AI-102 more than 12 months ago, review the updated skills outline before your renewal. The shift from Cognitive Services to Azure AI Services is substantial.
{: .prompt-warning }

### New: Microsoft Certified AI Engineer Associate (AI-3002, AI-3003, AI-3016)

Microsoft introduced **Applied Skills** credentials specifically for AI scenarios. These are separate from AI-102 but useful for building toward it:

| Applied Skill | Description |
|--------------|-------------|
| Build an Azure AI Vision solution (AI-3002) | Image classification, object detection, OCR |
| Build a natural language processing solution with Azure AI Services (AI-3003) | Text analytics, language understanding |
| Create a multimodal AI solution with Azure AI Services (AI-3016) | Vision + language combined |

### Copilot-Specific Certifications

Microsoft introduced exam **MS-4006** and associated Applied Skills for the **Microsoft 365 Copilot** track:

| Exam / Applied Skill | What It Covers |
|---------------------|----------------|
| MS-4006 Copilot for M365 – Administrator (Applied Skills) | Admin setup, data governance, sensitivity labels, audit |
| Extend Microsoft 365 Copilot with Copilot Studio (Applied Skills) | Building agents that plug into M365 Copilot |
| Build a Microsoft Copilot extensibility solution (Applied Skills) | Graph connectors, message extensions, declarative agents |

---

## Recommended Learning Paths by Role

### 🧑‍💼 Power Platform Consultant / Developer
1. **PL-900** → foundational overview with Copilot Studio
2. **PL-200** → functional consultant depth
3. **PL-400** → developer path (PCF, plugins, ALM)
4. Applied Skills: *Create and manage automated processes with Power Automate*

### 🧑‍💼 M365 Administrator
1. **MS-900** → fundamentals with Copilot overview
2. **MS-102** → full administrator path (replaces MS-100+MS-101)
3. **MS-700** if Teams administration is in scope

### 🤖 AI Engineer / Developer
1. **AI-900** → AI fundamentals with generative AI
2. **AI-102** → Azure AI Engineer Associate (updated syllabus)
3. Applied Skills for targeted Azure AI Services scenarios

---

## How to Stay Updated

- 📋 [Microsoft Learn – Exam Retirement Announcements](https://learn.microsoft.com/en-us/certifications/retired-certifications)
- 📋 [Browse All Microsoft Certifications](https://learn.microsoft.com/en-us/certifications/browse/)
- 📋 [Applied Skills Catalog](https://learn.microsoft.com/en-us/credentials/browse/?credential_types=applied%20skills)
- 🔔 Follow the [Microsoft Learn Blog](https://techcommunity.microsoft.com/t5/microsoft-learn-blog/bg-p/MicrosoftLearnBlog) for announcements

---

## Conclusion

The certification landscape is in flux, but the direction is clear: **AI skills are now required at every level**, not just in dedicated AI roles. Whether you're a Power Platform developer, an M365 administrator, or building cloud solutions on Azure — knowing how to work with, govern, and extend AI capabilities is becoming table stakes.

Pick the certification that aligns with your current role, check the **current skills outline** (not blog posts from 2023), and take advantage of the free **Applied Skills** assessments to validate targeted competencies without a full exam.

---

## References

- [Microsoft Certification Retirement Announcements](https://learn.microsoft.com/en-us/certifications/retired-certifications)
- [MS-102 – Microsoft 365 Administrator](https://learn.microsoft.com/en-us/certifications/exams/ms-102)
- [AI-102 – Azure AI Engineer Associate](https://learn.microsoft.com/en-us/certifications/exams/ai-102)
- [PL-200 – Power Platform Functional Consultant](https://learn.microsoft.com/en-us/certifications/exams/pl-200)
- [Applied Skills – Microsoft Learn](https://learn.microsoft.com/en-us/credentials/browse/?credential_types=applied%20skills)
- [Microsoft Copilot Studio Documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
