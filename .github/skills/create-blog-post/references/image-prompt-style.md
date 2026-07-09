# Image Prompt Style Guide

The site owner's preferred hero-image aesthetic is **flat 2D design** — clean
vector illustration, **no 3D and no isometric perspective**. Prompts are written
as **structured, labelled lines** — not a single run-on sentence — and always
anchor the colour palette with hex codes. This matches the posts from May 2026
and earlier.

## The structured format (use this)

Write every prompt as labelled lines in this order:

```
Flat 2D vector illustration, <aspect ratio, e.g. wide banner 16:9>.
Scene: <concrete subject metaphor + 1–2 supporting elements that show flow or transformation>. Front-on view, simple geometric shapes.
Colour palette: soft blue (#4C8DFF), warm amber (#FFB454), on a dark charcoal background (#1E2128).
Style: flat design, bold outlines, solid fills, no gradients, no shadows, no 3D, no isometric perspective.
Mood: <2–3 adjectives that fit the post, e.g. secure, optimistic, modern>.
No text. No logos.
```

## Style constraints

- **Name the style first** — `Flat 2D vector illustration`. Keep it flat:
  front-on view, solid fills, bold outlines. Never photorealistic, never 3D or
  isometric unless the owner explicitly asks.
- **Always add the flat guardrails** — end the Style line with
  `no gradients, no shadows, no 3D, no isometric perspective` to stop tools
  drifting into 3D renders.
- **Always specify aspect ratio** — hero/banner `16:9` (default), homepage hero
  `21:9`, thumbnail `4:3` or `1:1`, section divider `8:1`.
- **Anchor the palette with hex codes.** Default signature:
  - soft blue `#4C8DFF`
  - warm amber `#FFB454`
  - dark charcoal background `#1E2128`
  - Add a topical accent only when it helps (e.g. green code `#3DDC84`).
- **Always end with `No text. No logos.`** (models render text poorly and to
  avoid brand/copyright issues). Never include real logos or copyrighted
  characters.
- **Pick a metaphor that maps clearly** to the post subject.

## Owner's original one-line reference (for tone)

The owner also likes this Midjourney-style single-line phrasing. Keep it as a
tonal reference for the *scene* description, but prefer the structured format
above for the final prompt:

```text
lightbulb made of layered geometric puzzle pieces assembling into a brain,
small thought bubbles turning into structured decision trees, soft blue and
amber on dark charcoal background, flat isometric design --v 7.0
```

## Topic → metaphor cheatsheet

| Post topic area        | Metaphor ideas                                        |
|------------------------|-------------------------------------------------------|
| AI / reasoning models  | brain, lightbulb, neural network, glowing circuits    |
| Agents / automation    | robot, connected nodes, orchestrating conductor       |
| APIs / integration     | secure vault + pipelines, permission gate, plug-ins   |
| Security / auth        | shield, lock, key, layered vault                      |
| Data / search          | magnifying glass over data streams, indexed cards     |
| DevOps / CI-CD         | pipeline, interlocking gears, conveyor belt           |
| Governance / cleanup   | broom over folders, sorting bins, checklist clipboard |
| M365 / SharePoint      | interconnected documents, collaboration hub           |
| Fun / pranks           | grinning office worker, playful movie code, popcorn   |

## Worked examples

Topic: *Microsoft 365 Copilot APIs*

```
Flat 2D vector illustration, wide banner 16:9 aspect ratio.
Scene: a secure vault at the centre linked by clean API lines to a small app window, permission-gated document cards passing through a shield checkpoint into the app. Front-on view, simple geometric shapes.
Colour palette: soft blue (#4C8DFF), warm amber (#FFB454), on a dark charcoal background (#1E2128).
Style: flat design, bold outlines, solid fills, no gradients, no shadows, no 3D, no isometric perspective.
Mood: secure, trustworthy, modern.
No text. No logos.
```

Topic: *PowerShell year-end tenant cleanup*

```
Flat 2D vector illustration, wide banner 16:9.
Scene: a tidy server room with a small robot sweeping glowing folders into sorted bins, a checklist clipboard nearby. Front-on view, simple geometric shapes.
Colour palette: soft blue (#4C8DFF), warm amber (#FFB454), on a dark charcoal background (#1E2128).
Style: flat design, bold outlines, solid fills, no gradients, no shadows, no 3D, no isometric perspective.
Mood: tidy, satisfying, organised.
No text. No logos.
```
