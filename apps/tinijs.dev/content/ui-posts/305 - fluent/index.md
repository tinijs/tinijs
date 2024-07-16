+++json
{
  "status": "publish",
  "title": "Fluent",
  "category": "families"
}
+++

Fluent-inspired theme family, homepages: <https://fluent2.microsoft.design>

This family may also be used as an alternative to these design systems (if an exact match is required, you can [create a new family that extends this family](/ui/folder-structure)):
- [Spectrum 2](https://s2.spectrum.adobe.com)

## Install

- CDN:

```txt
https://cdn.jsdelivr.net/npm/@tinijs/ui-fluent@0.21.1/bundled/setup.js
```

- NPM:

```bash
npm i @tinijs/ui-fluent
```

- React NPM:

```bash
npm i @tinijs/ui-fluent-react
```

- CLI:

```js
{
  sources: ['@tinijs/ui'],
  families: {
    fluent: ['light', 'dark'],
  }
}
```

## Setup fonts

Fonts: **Roboto** and **Roboto Mono**.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;family=Roboto+Mono&amp;display=swap"
  rel="stylesheet"
/>
```
