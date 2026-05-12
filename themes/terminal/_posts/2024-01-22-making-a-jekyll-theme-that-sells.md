---
layout: post
title: "Making a Jekyll theme that actually sells"
date: 2024-01-22 10:00:00 +0000
tags: [jekyll, business, themes]
description: "What separates the $49 themes from the ones nobody buys — and how to build in the right order."
---

```bash
$ cat selling-jekyll-themes.md
```

I spent a few hours reverse-engineering what makes Jekyll themes sell on [jekyllthemes.io](https://jekyllthemes.io). Here's what I found.

## The conversion checklist

Every theme listing that performs well has five things in common:

1. **A live demo link** — the single biggest conversion driver. No demo, no sale.
2. **Dark mode** — the dev audience expects it. Not having it feels unfinished.
3. **"No jQuery" or "Vanilla JS"** in the feature list — developers notice and it builds trust.
4. **GitHub Pages compatible** stated explicitly — saves buyers a support headache.
5. **3–5 quality screenshots** — desktop and mobile, ideally showing light and dark modes.

If your listing has all five, you're already ahead of 70% of the competition.

## The gap in the market

Most paid Jekyll themes cluster in a few categories: minimal blog, portfolio, documentation. The themes that sell at premium prices are the ones with no direct competition.

Here are the genuine white spaces I found:

```bash
$ grep -c "terminal" jekyllthemes-paid.txt
0
$ grep -c "glassmorphism" jekyllthemes-paid.txt
0
$ grep -c "cyberpunk" jekyllthemes-paid.txt
0
```

Aesthetic niches with zero paid alternatives and real demand. That's where we're building.

## Pricing

The market has a clear sweet spot at **$49** — over 40 themes sit at this price. Entry level is $19–29 for docs/simple blogs. Premium tops out at $99 for multipurpose themes with 20+ layout variations.

For a single focused theme with a distinctive aesthetic, $49 is correct.

## Build order matters

Don't build 10 themes then try to sell all of them at once. Build one, get it live, submit it, get your first reviews, then build the next.

A single theme with 5 reviews converts better than 10 themes with none.

```bash
$ echo "ship one, learn, repeat"
ship one, learn, repeat
$ █
```
