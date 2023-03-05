---
title: Tip of the day. Display multilanguage content
author: valeras
date: 2023-03-02 20:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - spfx
  - handlebars
pin: false
slug: tip-day-display-multilanguage-content
comments: true
---


## TIP: you can use sharepoint pagecontext to display multilanguage content in handlebar templates

```handbars
{{#compare pageContext.web.language '==' 1043}}

    Dit wordt weergegeven als de huidige taal is 1043

    De taalcode is {{pageContext.web.language}} - Dutch

  {{else}}

    This is rendered if current language is anything else

    Language code is {{pageContext.web.language}} 

{{/compare}}
```

This mostly related to SPFX Content query webpart, search query webparts, any other webparts with handlebars
