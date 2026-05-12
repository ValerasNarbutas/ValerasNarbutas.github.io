---
layout: post
title: "Welcome to jekyll-terminal-theme"
date: 2024-01-15 09:00:00 +0000
tags: [meta, jekyll, setup]
description: "A quick tour of what you just installed and how to make it yours."
---

```bash
$ cat welcome.md
```

Thanks for picking up **jekyll-terminal-theme**. This post is a quick orientation to everything the theme gives you out of the box.

## File structure

After you drop the theme files into your repo, you'll have:

```
.
├── _config.yml        ← start here — all your customisation lives here
├── _layouts/          ← default, home, post, page
├── _includes/         ← header, footer, head
├── _posts/            ← your markdown posts go here
├── _sass/             ← all styles (don't need to touch these)
├── assets/
│   ├── css/main.scss  ← SASS entry point
│   └── js/terminal.js ← boot sequence, copy buttons, keyboard shortcuts
├── index.html
├── about.md
├── archive.md
└── tags.md
```

## Configuring the theme

Open `_config.yml` and find the `terminal:` block:

```yaml
terminal:
  username: "you"
  hostname: "blog"
  prompt_char: "$"
  color_scheme: "green"   # green | amber | blue | white
  show_boot_sequence: true
  scanlines: true
  crt_glow: true
  cursor_blink: true
```

Change `username` and `hostname` to match your setup — these appear in the header prompt: `you@blog:~ $`.

## Color schemes

Four built-in color schemes are available:

| Value | Look |
|-------|------|
| `green` | Classic green phosphor (default) |
| `amber` | Warm amber — old-school terminal |
| `blue` | Cool IBM 3270 vibe |
| `white` | Light mode — easy on the eyes |

Switch by editing `color_scheme` in `_config.yml`.

## Keyboard shortcuts

The theme adds a few shortcuts your readers will appreciate:

| Key | Action |
|-----|--------|
| `/` | Jump to search (if you add a search input) |
| `Alt+H` | Go to home page |

## Writing posts

Create a file in `_posts/` following the standard Jekyll naming convention:

```
_posts/YYYY-MM-DD-your-post-title.md
```

Front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-15 09:00:00 +0000
tags: [one, two]
description: "A short summary for SEO and the post list."
---
```

That's all you need to get started. Enjoy the theme — and if you run into anything, open an issue on [GitHub](https://github.com/devshelf/jekyll-terminal-theme).

```bash
$ █
```
