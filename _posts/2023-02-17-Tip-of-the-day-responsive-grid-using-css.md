---
title: Tip of the day. Respnsive grid using CSS
author: valeras
date: 2023-02-17 20:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - css
  - html
pin: false
slug: tip-day-respnsive-grid-css
comments: true
---

## TIP: Respnsive grid using CSS

almost the most common CSS problem to any project I had is mobile responsiveness. Many ways to do it using @media attribute, but I found most useful oneliner to make items responsive:

CSS:  

```css
.container {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)) ;
 grid-gap: 0rem;
 height: inherit;
    }
```

HTML:

```html
<div class="container">

       <div>item1</div>

       <div>item2</div>

       <div>item3</div>

       <div>item4</div>

       <div>item5</div>

</div>
```

result with more style around items, but responsiveness is from css above.

![Responsive](/img/posts/responsive.gif)
