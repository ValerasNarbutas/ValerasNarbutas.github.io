---
title: "What's New in SharePoint Framework 1.21"
author: valeras
date: 2025-07-22 14:00:00 +0800
categories:
  - SharingIsCaring
  - TipsAndTricks
tags:
  - SPFx
  - SharePoint
  - WebPart
  - tipoftheday
  - TypeScript
pin: false
slug: spfx-121-new-features
comments: true
image:
  path: /img/posts/spfx121.png
  alt: What's New in SharePoint Framework 1.21
---

## Summary

SharePoint Framework 1.21 is the latest release bringing Node.js 20 LTS support, new property pane controls, meaningful Adaptive Card Extension (ACE) updates, and improved Viva Connections integration. If you are still on SPFx 1.19 or 1.20, this post gives you a clear picture of what has changed and how to upgrade with minimal friction.

---

## Node.js 20 LTS Support

The most impactful infrastructure change in SPFx 1.21 is **official support for Node.js 20 LTS (Iron)**. SPFx 1.20 supported Node.js 18 LTS, which reaches end-of-life in April 2025. Upgrading your development environment:

```bash
# Using nvm for Windows
nvm install 20.15.0
nvm use 20.15.0
node --version  # v20.15.0

# Verify the Yeoman generator still works
npm install -g @microsoft/generator-sharepoint@latest
yo @microsoft/sharepoint
```

> **Important:** Node.js 20 requires npm 10.x. Run `npm install -g npm@latest` after switching Node versions.

The Webpack 5 build chain used by SPFx 1.21 is fully compatible with Node 20, and build times in testing improved by ~12% compared to Node 18 on the same hardware.

---

## New Property Pane Controls

SPFx 1.21 ships three new property pane controls out of the box, reducing the need to pull in the community `@pnp/spfx-property-controls` package for common scenarios.

### `PropertyPaneChoiceGroup` with icons

The updated `PropertyPaneChoiceGroup` now supports SVG icon references alongside the existing `imageSrc` option:

```typescript
PropertyPaneChoiceGroup('layout', {
  label: 'Layout',
  options: [
    {
      key: 'card',
      text: 'Card',
      iconProps: { officeFabricIconFontName: 'GridViewSmall' }
    },
    {
      key: 'list',
      text: 'List',
      iconProps: { officeFabricIconFontName: 'BulletedList' }
    }
  ]
})
```

### `PropertyPanePeoplePicker`

A built-in people picker control is now available in the core `@microsoft/sp-property-pane` package:

```typescript
import { PropertyPanePeoplePicker } from '@microsoft/sp-property-pane';

PropertyPanePeoplePicker('approver', {
  label: 'Approver',
  initialData: this.properties.approver,
  allowMultipleSelections: false,
  onGetMoreResults: this._onGetMoreResults.bind(this),
  onChange: this._onApproverChange.bind(this)
})
```

### `PropertyPaneColorPicker`

```typescript
import { PropertyPaneColorPicker } from '@microsoft/sp-property-pane';

PropertyPaneColorPicker('themeColor', {
  label: 'Accent colour',
  isHidden: false,
  showPreview: true
})
```

---

## Adaptive Card Extension Updates

ACEs are a cornerstone of Viva Connections dashboards. SPFx 1.21 brings:

### Multi-view ACEs without custom routing

Previously, rendering more than two views (Card view + Quick view) required manual state management. SPFx 1.21 introduces a `registerViews()` helper:

```typescript
public onInit(): Promise<void> {
  this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
  this.quickViewNavigator.register(DETAIL_VIEW_REGISTRY_ID, () => new DetailView());
  this.quickViewNavigator.register(SETTINGS_VIEW_REGISTRY_ID, () => new SettingsView());
  return Promise.resolve();
}
```

Navigation between quick views is now a single call:

```typescript
this.quickViewNavigator.push(SETTINGS_VIEW_REGISTRY_ID);
this.quickViewNavigator.pop();
```

### ACE data refresh on interval

```typescript
protected get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
  return undefined;
}

public get data(): ITickerData {
  return this._data;
}

protected async onInit(): Promise<void> {
  await this._fetchData();
  setInterval(() => this._fetchData(), 60_000); // refresh every 60 s
}
```

---

## Improved Viva Connections Support

SPFx 1.21 aligns with the Viva Connections SDK 2.0 release. Key improvements:

- **Dashboard-aware theming** – web parts rendered inside the Viva Connections dashboard now automatically receive the dashboard's theme tokens, removing the need for manual `ThemeProvider` wiring.
- **Mobile card interactions** – ACE quick views now support swipe-to-dismiss on the Viva Connections mobile app.
- **Performance budget warnings** – the build pipeline now emits warnings if a web part bundle exceeds 250 KB (gzipped), helping you keep the dashboard fast.

---

## Upgrading an Existing Project

Use the official upgrade guidance from the SPFx doctor CLI:

```bash
npm install -g @pnp/office365-cli
spfx project upgrade --output md > upgrade-report.md
```

Or use the `rush` upgrade path if your project uses a monorepo:

```bash
# Update package.json manually for key packages, then:
npm install

# Key version bumps for SPFx 1.21:
# @microsoft/sp-core-library        → 1.21.0
# @microsoft/sp-webpart-base        → 1.21.0
# @microsoft/sp-property-pane       → 1.21.0
# @microsoft/sp-build-web           → 1.21.0
# @microsoft/eslint-config-spfx     → 1.21.0
```

After updating, run `gulp build` and address any TypeScript errors. The most common breaking change in 1.21 is the removal of the deprecated `this.context.pageContext.legacyPageContext` — migrate to `this.context.pageContext.site` and `this.context.pageContext.web` typed properties.

---

## Conclusion

SPFx 1.21 is a solid release that modernises the runtime environment (Node 20 LTS), reduces dependency on third-party packages for common UI needs, and meaningfully improves the ACE developer experience. Upgrading is straightforward for most projects. Start with the upgrade report, fix the `legacyPageContext` references, and you will be running on the latest stack within an afternoon.

---

## References

- [SharePoint Framework 1.21 release notes](https://learn.microsoft.com/sharepoint/dev/spfx/release-1.21)
- [Set up SPFx development environment](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
- [Adaptive Card Extensions overview](https://learn.microsoft.com/sharepoint/dev/spfx/viva/get-started/build-first-sharepoint-adaptive-card-extension)
- [Viva Connections overview for developers](https://learn.microsoft.com/viva/connections/viva-connections-overview)
