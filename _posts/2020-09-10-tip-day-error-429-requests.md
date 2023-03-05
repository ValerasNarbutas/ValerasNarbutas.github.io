---
title: Tip of the day Error 429 - Too Many Requests
author: valeras
date: 2020-09-10 20:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - git fetch
  - tipoftheday
pin: true
slug: tip-day-error-429-requests
comments: true
---

## Tip of the day: Error 429 - Too Many Requests

TIP: did you know not all Microsoft services handling too many requests the same way? Some have Retry-after some not. Good Microsoft recommendation for dealing with throttling:

### Command code

```typescript
  // IF request successful (not throttled), set message to retrieved message 
  if (clientResponse.StatusCode == HttpStatusCode.OK) {
      messageDetail = JsonConvert.DeserializeObject<Message>(httpResponseTask.Result);
  }
  // ELSE IF request was throttled (429, aka: TooManyRequests)... 
  else if (clientResponse.StatusCode == HttpStatusCode.TooManyRequests) {

      // get retry-after if provided; if not provided default to 2s 
        int retryAfterDelay = defaultDelay;
      if (clientResponse.Headers.RetryAfter.Delta.HasValue
          && (clientResponse.Headers.RetryAfter.Delta.Value.Seconds > 0)
      ) {
          retryAfterDelay = clientResponse.Headers.RetryAfter.Delta.Value.Seconds;
      }

      // wait for specified time as instructed by Microsoft Graph's Retry-After header, 
      //    or fall back to default   

      Console.WriteLine(">>>>>>>>>>>>> sleeping for {0} seconds...", retryAfterDelay); System.Threading.Thread.Sleep(retryAfterDelay * 1000);

      // call method again after waiting    

      messageDetail = GetMessageDetail(client, messageId);
  }
```
