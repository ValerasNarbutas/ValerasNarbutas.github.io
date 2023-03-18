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

Are you looking for a way to add a copy to clipboard button to your SharePoint Content Query web part? Look no further than the *copyToClipBoard Handlebars helper*!

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

> Note: Html code is not required, you can use just handlebar code
  {: .prompt-info }

In this example, Title is the name of the property that you want to copy to the clipboard. When the user clicks the copy to clipboard button, the value of the Title property will be copied to the clipboard.

### JavaScript code

To implement the copyToClipBoard helper in your SharePoint web part, you can use the following code:

```javascript
  ReactContentQuery.ExternalScripts.handlebarsCopyToClipBoard = {
  onPreRender: function (wpContext, handlebarsContext) {
    
    handlebarsContext.registerHelper('copyToClipBoard', function(text) {
      function copyTextToClipboard(text) {
        console.log("in function");
        navigator.clipboard.writeText(text).then(function() {
          console.log('Text copied to clipboard');
        }, function(err) {
          console.error('Error copying text: ', err);
        });
      }
      window.yournamespace = window.yournamespace || {};
      window.yournamespace.copyTextToClipboard = copyTextToClipboard;
      window.copyTextToClipboard = copyTextToClipboard;
      console.log("mesage");

       var copyImage = '<svg fill="#000000" height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Text-files"> <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"></path> <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"></path> <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"></path> <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"></path> <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"></path> </g> </g></svg>';
       
        return new handlebarsContext.SafeString(`<button class="copy-to-clipboard-button" onclick="yournamespace.copyTextToClipboard('${text}')">${copyImage}</button>`);
      });

  },
};
```

- Rename "yournamespace" to your own namespace. 
- Put javascript file in sharepoint library
- Svg in the example not really best :) but you can use your own svg or image file

In Content Query web part - at last step - add this js file to External Scripts

![](/img/posts/contentQueryWebpartLaststep1.PNG)

Result:

![](/img/posts/contentqueryresult1.PNG)

## Conclusion

In this post, we've seen how to add a copy to clipboard button to your SharePoint Content Query web part using the copyToClipBoard Handlebars helper. This helper is a great way to add a copy to clipboard button to any property in your Content Query web part, allowing your users to quickly copy important information without having to manually select and copy the text.
