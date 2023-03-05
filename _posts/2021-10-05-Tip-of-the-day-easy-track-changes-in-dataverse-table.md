---
title: Tip Of The Day. Easy Track changes in dataverse table
author: valeras
date: 2021-10-08 20:55:00 +0800
categories:
  - SharingIsCaring
  - pnpBlog
tags:
  - SharingIsCaring
  - tipoftheday
  - dataverse
  - MSPnp
  - Postman
pin: false
slug: tip-day-easy-track-dataverse-table
comments: true
---

## My first blog post in M365 and power platform PNP community blog

[TipOfTheDay - Easy Track changes in dataverse table via dataverse API](https://pnp.github.io/blog/post/tipoftheday-easy-track-changes-in-dataverse-table-via-dataverse/)

## TIP: Did you know you can easily track changes in dataverse table via data verse API

I am using postman:

- first if you just use get call like this:

```js
{{webapiurl}}/accounts?$select=name,accountnumber,telephone1,websiteurl
```

 ![Img1](/img/posts/dataverse1.png)

- Now add new header: "Prefer odata.track-changes" and run it again you would get additional info: deltalink with delta token in it

![Img2](/img/posts/dataverse2.png)

- use delta token in same request structure ![Img3](/img/posts/dataverse3.png)

- Were are no changes that happen last time we did request to accounts table. If I do changes like: new, edit, and delete in accounts i will get this:

![Img4](/img/posts/dataverse4.png)
