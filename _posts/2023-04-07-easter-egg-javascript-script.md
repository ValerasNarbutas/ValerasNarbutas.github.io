---
title: Easter Egg JavaScript Script
author: valeras
date: 2023-04-07 00:05:00 +0800
categories:
  - SharingIsCaring
  - Script Samples
tags:
  - Pranks
  - Easter
pin: false
slug: eeater-egg-javascript-script
comments: true
image:
  path: /img/posts/easterDrop.png
  alt: Eeater Egg JavaScript Script
---

## Summary

Bring some Easter magic to your website with a playful animation that transforms all div elements on your page into eggs that drop to the bottom when the user types "easter." This lightweight JavaScript snippet, along with some CSS, adds a delightful and interactive touch to your website during the holiday season.

Type "**easter**" now !!! :)



## Features 🌟

- Transforms all divs into egg-shaped elements upon typing "easter"
- Drops eggs to the bottom of the page with a smooth animation
- Customizable egg appearance and animation duration


## Implementation 🛠️

1. Add the following CSS to your HTML file to define the egg shape and animation:

```css
  <style>
    .egg {
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      background-color: #FFD700;
      display: inline-block;
      width: 50px;
      height: 70px;
      position: relative;
    }
    .drop {
      animation: drop 5s linear;
    }
    @keyframes drop {
      from {
        top: 0;
      }
      to {
        top: calc(100vh - 70px);
      }
    }
  </style>
```

2. Add the following JavaScript code to your HTML file to detect when the user types "easter" and apply the egg and drop animations to all div elements:

```html
<script>
  (function () {
    const keyword = "easter";
    let typed = "";
    document.addEventListener("keydown", (event) => {
      typed += event.key;
      if (typed.length > keyword.length) {
        typed = typed.substring(1);
      }
      if (typed === keyword) {
        transformDivsToEggs();
      }
    });

    function transformDivsToEggs() {
      const divs = document.getElementsByTagName("div");
      for (const div of divs) {
        div.classList.add("egg");
      }
      setTimeout(() => {
        dropEggs();
      }, 100);
    }

    function dropEggs() {
      const eggs = document.getElementsByClassName("egg");
      for (const egg of eggs) {
        egg.classList.add("drop");
      }
    }
  })();
</script>
```

## Customization 🎨
Feel free to customize the egg appearance and animation to your liking:

Modify the .egg CSS class to change the egg's size, color, or shape.
Adjust the 5s value in the .drop class to change the duration of the dropping animation.
Now, when a user types "easter" on your website, they'll be greeted with a charming animation of eggs dropping to the bottom of the page. Enjoy the fun and spread the Easter spirit with this interactive feature! 🐰🥚🌷
