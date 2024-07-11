+++json
{
  "status": "publish",
  "title": "Radix",
  "category": "families"
}
+++

Radix-inspired theme family, homepage: <https://www.radix-ui.com>

This family may also be used as an alternative to these design systems (if an exact match is required, you can [create a new family that extends this family](/ui/folder-structure)):
- [Tailwind UI](https://tailwindui.com)
- [PrimeNG](https://primeng.org)

## Install

- CDN:

```txt
https://cdn.jsdelivr.net/npm/@tinijs/ui-radix/bundled/setup.js
```

- NPM:

```bash
npm i @tinijs/ui-radix
```

- React NPM:

```bash
npm i @tinijs/ui-radix-react
```

- CLI:

```js
{
  sources: ['@tinijs/ui'],
  families: {
    radix: ['light', 'dark'],
  }
}
```

## Setup fonts

Fonts: **Roboto** and **Menlo**.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap"
  rel="stylesheet"
/>
```