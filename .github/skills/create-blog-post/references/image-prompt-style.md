# Image Prompt Style Guide

The site owner's preferred hero-image aesthetic is **flat design** (flat
isometric), with a specific colour and mood signature. Every generated prompt
should follow this recipe so images look consistent across the blog.

## Reference example (owner-provided)

```text
lightbulb made of layered geometric puzzle pieces assembling into a brain,
small thought bubbles turning into structured decision trees, soft blue and
amber on dark charcoal background, flat isometric design --v 7.0
```

## Prompt formula

Build every prompt from these five parts, in order, comma-separated:

1. **Primary subject metaphor** — a single concrete object that represents the
   post's topic (e.g. a lightbulb, a robot, a network of nodes, a stack of
   documents, a shield, a gear).
2. **Supporting visual elements** — 1–2 secondary details that add narrative or
   show transformation/flow (e.g. "thought bubbles turning into decision
   trees", "data streams flowing into a dashboard").
3. **Colour signature** — keep it consistent:
   `soft blue and amber on dark charcoal background`.
4. **Style tokens** — `flat isometric design` (or `flat design` for non-3D
   compositions).
5. **Renderer flags** — `--v 7.0` (Midjourney version flag from the reference).

## Style constraints

- **Do** keep it flat / isometric — no photorealism, no gradients-heavy
  glossy 3D renders.
- **Do** keep the palette to soft blue + amber accents on a dark charcoal
  background unless the user asks otherwise.
- **Do** pick a metaphor that maps clearly to the post subject.
- **Don't** include real logos, brand marks, or copyrighted characters.
- **Don't** include text/words in the image (models render text poorly).

## Topic → metaphor cheatsheet

| Post topic area        | Metaphor ideas                                        |
|------------------------|-------------------------------------------------------|
| AI / reasoning models  | brain, lightbulb, neural network, glowing circuits    |
| Agents / automation    | robot, connected nodes, orchestrating conductor       |
| Security / auth        | shield, lock, key, layered vault                      |
| Data / search          | magnifying glass over data streams, indexed cards     |
| DevOps / CI-CD         | pipeline, interlocking gears, conveyor belt           |
| Governance / cleanup   | broom over folders, sorting bins, checklist clipboard |
| M365 / SharePoint      | interconnected documents, collaboration hub           |

## Worked examples

Topic: *Getting started with Azure AI Foundry*

```text
isometric AI foundry workshop with a glowing model core on an anvil, small
robotic arms assembling neural network blocks around it, soft blue and amber on
dark charcoal background, flat isometric design --v 7.0
```

Topic: *PowerShell year-end tenant cleanup*

```text
tidy isometric server room with a robot sweeping glowing folders into sorted
bins, a checklist clipboard floating nearby, soft blue and amber on dark
charcoal background, flat isometric design --v 7.0
```
