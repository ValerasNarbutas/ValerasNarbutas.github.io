---
title: Tip of the day. Truncating handlebars
author: valeras
date: 2023-02-27 20:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - css
  - html
  - handlebars
pin: false
slug: tip-day-truncating-handlebars
comments: true
---

## TIP: easiest way to truncate some text using handlebars

{% raw %}
```hbs
 {{ellipsis "<span>foo bar bar bar</span>" 7}}
```
{% endraw %}

results in

```Plaintext
"foo bar..."
```

Or when you need to be sure some item text value is not too big, like news summary spfx webpart:

{% raw %}
```hbs
  {{#gt Item.textValue.length 50}}

    {{ellipsis Item.textValue 50}} 

    <button>Read more</button>

  {{else}}

    {{Item.textValue }}

  {{/gt}}
```
{% endraw %}
