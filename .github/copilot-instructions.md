# Copilot Instructions – ValerasNarbutas.github.io

## Blog Post Content Rules

### ❌ Never fabricate facts
- **Do not** write about events that have not yet happened (conferences, product launches, announcements).
- **Do not** invent URLs, blog post links, documentation links, or press releases.
- **Do not** present speculative/future content as if it already occurred.

### ✅ Always verify before writing
Before writing any blog post or tip that references:
- A **conference or event** (e.g. Microsoft Build, GitHub Universe, Ignite) — verify the event has already taken place and confirm the actual date.
- A **product announcement or GA release** — verify it is publicly announced on official sources (Microsoft Learn, GitHub Blog, official docs).
- A **URL** — only include URLs that are real and publicly reachable; never construct plausible-looking URLs.

### ✅ When in doubt, say so
- If unsure whether something is GA or announced, phrase it as: *"according to the official docs"*, *"as of [verified date]"*, or omit the claim entirely.
- Never tie content to a specific event unless you can confirm the event occurred.

## Blog Structure Conventions

- Posts live in `_posts/` with filename format `YYYY-MM-DD-slug.md`
- Images live in `assets/img/posts/` and are referenced in front matter as `/img/posts/<filename>`
- Categories used: `TipOfTheDay`, `SharingIsCaring`, `AI`, `GitHub`, `Microsoft365`, `PowerPlatform`
- Tags are lowercase kebab-case in front matter
- The Chirpy theme is used — follow its front matter conventions

## Image Upload
- Binary files >2MB may fail with `git push` (GitHub 500). Workaround: use `gh api repos/.../contents/... -X PUT` with base64-encoded content.
