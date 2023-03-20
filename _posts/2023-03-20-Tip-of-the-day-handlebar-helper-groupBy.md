---
title: Tip of the day handlebar helper groupBy with the option to sort by a property
author: valeras
date: 2023-03-20 10:55:00 +0800
categories:
  - TipOfTheDay
  - Handlebar
tags:
  - handlebar
  - copytoclipboard
  - spfx
  - contentquerywebpart
  - groupby
  - Sharepoint
pin: false
slug: tip-day-handlebar-helper-groupby
comments: true
draft: false
---

## Tip of the day: Creating and Using a Custom Handlebars GroupBy Helper in SPFx Content Query Web Part (SPFX)

### Introduction:

In SharePoint Framework (SPFx) Content Query Web Part, Handlebars.js is used as a templating engine to render dynamic content. One of the common requirements is to group and display data based on certain properties. In this blog post, we will create a custom Handlebars 'groupBy' helper to group and sort data and demonstrate how to use it in your SPFx Content Query Web Part. 

### Step 1: Create the custom Handlebars 'groupBy' helper

First, let's create the custom Handlebars helper that will group data based on a specified property and allow sorting by another property. Add the following code to your SPFx solution:

```javascript
  ReactContentQuery.ExternalScripts.handlebarsGroupBy = {
    onPreRender: function (wpContext, handlebarsContext) {
      handlebarsContext.registerHelper('groupBy', function (array, options) {
        const prop = options.hash && options.hash.by;
        const sortBy = options.hash && options.hash.sortBy;
        const sortOrder = (options.hash && options.hash.sortOrder) || 'asc';
        if (!prop || !array || !array.length) return options.inverse(this);

        const groups = array.reduce((acc, item) => {
          const key = item[prop].rawValue;
          if (!acc[key]) acc[key] = { groupName: key, groupItems: [] };
          acc[key].groupItems.push(item);
          return acc;
        }, {});

        const sortedKeys = Object.keys(groups).sort((a, b) => {
          if (sortBy) {
            const aValue = groups[a].groupItems[0][sortBy].rawValue;
            const bValue = groups[b].groupItems[0][sortBy].rawValue;

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
          }
          
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        
        return sortedKeys.map((key) => options.fn(groups[key])).join('');
      });
    },
  };
```
> Note: Save file as handlebarsGroupBy.js
  {: .prompt-info }

Upload the file to the 'SiteAssets' library or any other location on tour sharepoint site.

Add link to the file in last step of property pane in Content Query Web Part.

![](/img/posts/PropertyPaneGroupBy.PNG)

### Step 2: Add the custom Handlebars template using helper 'groupBy'  to the Content Query Web Part template

{% raw %}
```hbs
  <div>
  {{#groupBy allItems by="Department" sortBy="Order" sortOrder="asc"}}
    {{#each groupItems}}
    {{#if @first}}
        <h3>{{Department.textValue}} {{value}}</h3>
    {{/if}}
        <ul>
            <li>{{Employee.textValue}}</li>
        </ul>
    {{/each}}
  {{/groupBy}}
</div>
```
{% endraw %}

In my case structure of my list is:
![](/img/posts/groupByListPNG.PNG)

Result:

![](/img/posts/resultGroupBy.PNG)

## Conclusion

In this blog post, we have created a custom Handlebars 'groupBy' helper to group and sort data and demonstrated how to use it in your SPFx Content Query Web Part.
