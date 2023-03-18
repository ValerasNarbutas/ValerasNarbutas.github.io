---
title: Tip of the day handlebar helper copyToClipboard
author: valeras
date: 2023-03-17 20:55:00 +0800
categories:
  - TipOfTheDay
  - Sharepoint
tags:
  - handlebar
  - copytoclipboard
  - spfx
  - contentquerywebpart
pin: false
slug: tip-day-handlebar-copytoclip
comments: true
draft: false

---

## Tip of the day: Copy to clipboard button for Content query web part (SPFX)

Are you looking for a way to add a copy to clipboard button to your SharePoint [https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-content-query-online](Content Query web part)? Look no further than the *copyToClipBoard Handlebars helper*!

With this helper, you can easily add a copy to clipboard button to any property in your Content Query web part, allowing your users to quickly copy important information without having to manually select and copy the text. 

### Handlebars code

To use the copyToClipBoard helper, simply include it in your SharePoint web part and call it with the name of the property you want to copy to the clipboard. Here's an example of template code that uses the copyToClipBoard:

{% raw %}
```hbs
  <div class="item-copy-button">
      {{copyToClipBoard Title.textValue}}
  </div>
```
{% endraw %}

> Note: Html code is not reacquired, you can use just {{copyToClipBoard Title}}
  {: .prompt-info }

In this example, Title is the name of the property that you want to copy to the clipboard. When the user clicks the copy to clipboard button, the value of the Title property will be copied to the clipboard.

### JavaScript code

To implement the copyToClipBoard helper in your SharePoint web part, you can use the following code:

```javascript
  ReactContentQuery.ExternalScripts.handlebarsCopyToClipBoard = {
    onPreRender: function(wpContext, handlebarsContext) {
      function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
          console.log('Text copied to clipboard');
        }, function(err) {
          console.error('Error copying text: ', err);
        });
      }

      window.yournamespace = window.yournamespace || {};
      window.yournamespace.copyTextToClipboard = copyTextToClipboard;

      handlebarsContext.registerHelper('copyToClipBoard', function(text) {
        var svgCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M14 2H6a2 2 0 00-2 2v10h2V4h8v16H6v-3H4v3a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>';
        return new handlebarsContext.SafeString(`<button class="copy-to-clipboard-button" onclick="yournamespace.copyTextToClipboard('${text}')">${svgCode}</button>`);
      });
    }
  };
```

> Note: rename "yournamespace" to your own namespace
  {: .prompt-info }

> Note: Put javascript file in sharepoint library, i named my js: my.js
  {: .prompt-info }

In Content Query web part - at last step - add this js file to External Scripts

![](/img/posts/contentQueryWebpartLaststep.PNG)

Result:

![](/img/posts/contentqueryresult.PNG)

## Conclusion

In this post, we've seen how to add a copy to clipboard button to your SharePoint Content Query web part using the copyToClipBoard Handlebars helper. This helper is a great way to add a copy to clipboard button to any property in your Content Query web part, allowing your users to quickly copy important information without having to manually select and copy the text.
