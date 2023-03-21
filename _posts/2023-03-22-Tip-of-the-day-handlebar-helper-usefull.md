---
title: Tip of the day handlebar helper ifEquals, join, json, math, switch, case, and
  default
author: valeras
date: 2023-03-21 10:55:00 +0800
categories:
  - TipOfTheDay
  - Handlebar
tags:
  - handlebar
  - copytoclipboard
  - spfx
  - contentquerywebpart
  - ifEquals
  - join
  - json
  - math
  - switch
  - case
  - default
  - Sharepoint
pin: false
slug: tip-day-handlebar-helper-ifequals-join-json-math-switch-case-default
comments: true
draft: false
---

## Tip of the day: Creating and Using a Custom Handlebars ifEquals, join, json, math, switch, case, and default SPFx Content Query Web Part (SPFX)

### Introduction:

In SharePoint Framework (SPFx) Content Query Web Part, Handlebars.js is used as a templating engine to render dynamic content. One of the common requirements is to group and display data based on certain properties. In this blog post, we will create a list of  custom Handlebars:

**ifEquals**: This helper checks if two values are equal and renders a block of code based on the result. The options.fn(this) code renders the block of code inside the ifEquals block, while the options.inverse(this) code renders the block of code inside the else block.

**join**: This helper takes an array and a separator as arguments and joins the array elements into a string with the specified separator.

**json**: This helper takes an object as an argument and converts it into a JSON string.

**math**: This helper takes two values and an operator as arguments and performs a mathematical operation based on the operator. The parseFloat method is used to convert the values to numbers before performing the operation.

**switch, case,** and **default**: These helpers provide functionality similar to a switch statement in JavaScript. The switch helper is used to define the value to be tested, and the case and default helpers are used to define the possible values and their associated code blocks.

![](/img/posts/customHelpersMain.PNG)

### Step 1: Create the custom Handlebars helper file

First, let's create the custom Handlebars helper that will include all custom helper we need

```javascript
  ReactContentQuery.ExternalScripts.handlebarsCustomHelpers = {
  onPreRender: function (wpContext, handlebarsContext) {
    // {{ifEquals a b}}
    handlebarsContext.registerHelper("ifEquals", function (a, b, options) {
      if (a === b) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    // {{join myArray ", "}}
    handlebarsContext.registerHelper("join", function (array, separator) {
      return array.join(separator);
    });

    // <pre>{{json myObject}}</pre>
    handlebarsContext.registerHelper("json", function (obj) {
      return JSON.stringify(obj);
    });

    handlebarsContext.registerHelper(
      "math",
      function (lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        switch (operator) {
          case "+":
            return lvalue + rvalue;
          case "-":
            return lvalue - rvalue;
          case "*":
            return lvalue * rvalue;
          case "/":
            return lvalue / rvalue;
          default:
            throw new Error("Unknown operator " + operator);
        }
      }
    );

    handlebarsContext.registerHelper("switch", function (value, options) {
      this._switch_value_ = value;
      this._switch_break_ = false;
      let html = options.fn(this);
      delete this._switch_value_;
      delete this._switch_break_;
      return html;
    });

    handlebarsContext.registerHelper("case", function (value, options) {
      if (value === this._switch_value_) {
        this._switch_break_ = true;
        return options.fn(this);
      }
    });

    handlebarsContext.registerHelper("default", function (options) {
      if (!this._switch_break_) {
        return options.fn(this);
      }
    });
  },
};
```
> Note: Save file as handlebarsCustomHelpers.js
  {: .prompt-info }

Upload the file to the 'SiteAssets' library or any other location on tour sharepoint site.

Add link to the file in last step of property pane in Content Query Web Part.

![](/img/posts/propertypaneCustomHelpe.PNG)

### Step 2: Add the custom Handlebars template using custom helpers

- Example hot to use ifEquals helper:

{% raw %}
```hbs
  {{#ifEquals userRole "admin"}}
     <p>Welcome, admin!</p>
    {{else}}
    <p>Welcome, user!</p>
  {{/ifEquals}}
```
{% endraw %}

- Example how to use join helper:

{% raw %}
```hbs
  <ul>
    {{#each myArray}}
      <li>{{this}}</li>
    {{/each}}
  </ul>
  <p>Joined: {{join myArray ", "}}</p> 
```
{% endraw %}

- Example how to use json helper:

{% raw %}
```hbs
  <pre>{{json myObject}}</pre>
```
{% endraw %}

- Example how to use math helper:

{% raw %}
```hbs
  <p>Sum: {{math value1 "+" value2}}</p>
  <p>Difference: {{math value1 "-" value2}}</p>
  <p>Product: {{math value1 "*" value2}}</p>
  <p>Quotient: {{math value1 "/" value2}}</p>
```
{% endraw %}

- Example how to use switch, case, and default helper:

{% raw %}
```hbs
  {{#switch userStatus}}
    {{#case "online"}}
      <p>User is online.</p>
    {{/case}}
    {{#case "offline"}}
      <p>User is offline.</p>
    {{/case}}
    {{#default}}
      <p>User status unknown.</p>
    {{/default}}
  {{/switch}}
```
{% endraw %}


In my case structure of my list is:
![](/img/posts/empListCustomhelpers.PNG)

My complete handle bar template used in example

{% raw %}
```hbs
  <div>
   
  {{#groupBy allItems by="Department" sortBy="Order0" sortOrder="asc"}}
  
    {{#each groupItems}}
    
    {{#if @first}}
        <h3>{{Department.textValue}} {{value}}</h3>
         {{json Department}}
    {{/if}}
        <ul>
    {{#ifEquals Department.textValue "HR"}}
       <p>Welcome, HR!</p>
     {{else}}
       <p>Welcome, user!</p>
     {{/ifEquals}}
            <li>{{Employee.textValue}} {{Modified.textValue}} </li>
        </ul>
    {{/each}}
  {{/groupBy}}
</div>
```
{% endraw %}

> Note: groupBy helper used from my previous article [Tip of the day: Creating and Using a Custom Handlebars GroupBy Helper in SPFx Content Query Web Part (SPFX)](https://valerasnarbutas.github.io/posts/tip-day-handlebar-helper-groupby/)
  {: .prompt-info }

Result:

![](/img/posts/resultAllHelpers.PNG)

## Conclusion

In this blog post, we have created a custom Handlebars helpers to manage data in Content Query Web Part. To this file we added 6 custom helpers:
 - ifEquals
 - join
 - json
 - math
  - switch
  - case
  - default

When using Content Query Web Part, you might grow this list of custom helpers. I hope this blog post will help you to create your own custom Handlebars helpers.

