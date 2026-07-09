---
name: create-blog-post
description: >-
  Create a new Chirpy-theme blog post for ValerasNarbutas.github.io following
  the repo's conventions, and generate a matching flat-design image prompt for
  the post's hero image. Use when the user wants to write, draft, or scaffold a
  new blog post, tip of the day, or "sharing is caring" article for this site.
---

# Create Blog Post

Scaffold a new blog post for this Jekyll (Chirpy theme) site and produce a
flat-design image generation prompt for the post's hero image.

## Golden rules (read first)

These come from `.github/copilot-instructions.md` and are **non-negotiable**:

- **Never fabricate facts.** Do not write about events, launches, or
  announcements that have not verifiably happened. Do not invent URLs, links,
  or press releases.
- **Verify before writing.** Any conference/event, GA release, or URL must be
  confirmed against official sources (Microsoft Learn, GitHub Blog, official
  docs). If you cannot verify, phrase carefully ("according to the official
  docs", "as of [verified date]") or omit the claim.
- **When in doubt, say so** rather than presenting speculation as fact.

## Step 1 — Gather inputs

Ask the user (only for what's missing) using the `ask_user` tool:

1. **Topic / title** of the post.
2. **Post type**, which drives the category and title convention:
   - `TipOfTheDay` → shorter, actionable. Title style: `"Tip of the day – ..."`
   - `SharingIsCaring` → longer, explanatory guide.
3. **Publish date** (default to today if not given).
4. Any **key facts, links, or source material** to base the content on.

## Step 2 — Determine the filename

Posts live in `_posts/` with the format:

```
_posts/YYYY-MM-DD-slug.md
```

- `slug` is lowercase kebab-case, prefixed by post type for consistency with
  existing posts, e.g. `tip-of-the-day-...` or `sharingiscaring-...`.
- Confirm no filename collision by listing `_posts/` before writing.

## Step 3 — Write the front matter

Use the Chirpy front matter conventions. Template:

```yaml
---
title: "<Human readable title>"
author: valeras
date: YYYY-MM-DD HH:MM:SS +0300
categories:
  - <TipOfTheDay | SharingIsCaring>
  - <AI | GitHub | Microsoft365 | PowerPlatform>   # add topical categories
tags:
  - <lowercase-kebab-or-camel tags>
pin: false
slug: <short-slug>
comments: true
image:
  path: /img/posts/<image-file-name>.png
  alt: <descriptive alt text>
---
```

Rules:
- `author` is always `valeras`.
- `categories`: first entry is the post type (`TipOfTheDay` or
  `SharingIsCaring`); add topical categories from the approved set:
  `AI`, `GitHub`, `Microsoft365`, `PowerPlatform`.
- `tags`: lowercase kebab-case where possible; keep them relevant.
- `image.path` is `/img/posts/<file>` (note: `/img/posts/`, **not**
  `/assets/img/posts/` — Chirpy resolves the asset prefix).
- Pick an `<image-file-name>` that is a short, descriptive snake_case slug of
  the topic (e.g. `azure_ai_foundry_getting_started.png`).

## Step 4 — Write the body

Follow the structure used across the site (see existing posts in `_posts/`):

- Start with a `## Summary` (SharingIsCaring) or `## Tip` (TipOfTheDay) section.
- Use `---` horizontal rules between major sections.
- Use `##` / `###` headings, tables, and fenced code blocks liberally.
- Use Chirpy prompt callouts where useful:
  - `> ...text...\n{: .prompt-tip }`
  - `> ...text...\n{: .prompt-warning }`
  - `> ...text...\n{: .prompt-info }`
- End with a `## References` (or `## Resources`) section containing only
  **verified** links.

## Step 5 — Generate the image prompt

Produce a **flat-design** image generation prompt tuned to the post's content
and the site owner's preferred aesthetic. Follow the recipe in
`references/image-prompt-style.md`.

Output the prompt in a fenced code block so it is easy to copy, e.g.:

```text
<subject metaphor for the topic>, <supporting visual elements>, soft blue and
amber on dark charcoal background, flat isometric design --v 7.0
```

Remind the user to save the generated image to
`assets/img/posts/<image-file-name>.png` so it matches `image.path` in the
front matter.

## Step 6 — Confirm and finish

- Show the created file path and the image prompt.
- Do **not** create or update a PR automatically. If the user wants a PR,
  first run `gh pr list --state open` to check for an existing open PR for the
  branch (per repo instructions), then create one only if none exists.
