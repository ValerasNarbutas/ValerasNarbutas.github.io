---
title: Tip Of The Day. Chrome profile migration
author: valeras
date: 2023-01-05 20:55:00 +0800
categories:
  - TipOfTheDay
tags:
  - ChromeProfiles
  - tipoftheday
pin: false
slug: tip-day-chrome-profile-migration
comments: true
---

## TIP: Migrating Chrome Profiles ?

 i am replacing my laptop as it almost exploded already and the main pain for me personally Chrome profiles I gathered during years. This is how you can easily move it to another PC.

### OLD

- copy either profiles either all data from this location

```Plaintext
     C:\Users\%username%\AppData\Local\Google\Chrome\
```

- export registry from:

```Plaintext
     [HKEY_CURRENT_USER\Software\Google\Chrome\PreferenceMACs]
```

### NEW

- Copy either profile data or all data to:

```Plaintext
 C:\Users\%username%\AppData\Local\Google\Chrome\
 ```

- Open/apply registry file.
