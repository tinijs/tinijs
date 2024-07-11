+++json
{
  "status": "publish",
  "title": "Shadcn",
  "category": "families"
}
+++

Shadcn-inspired theme family, homepage: <https://ui.shadcn.com>

This family may also be used as an alternative to these design systems (if an exact match is required, you can [create a new family that extends this family](/ui/folder-structure)):
- [Nuxt UI](https://ui.nuxt.com)
- [Primer](https://primer.style)

## Install

- CDN:

```txt
https://cdn.jsdelivr.net/npm/@tinijs/ui-shadcn/bundled/setup.js
```

- NPM:

```bash
npm i @tinijs/ui-shadcn
```

- React NPM:

```bash
npm i @tinijs/ui-shadcn-react
```

- CLI:

```js
{
  sources: ['@tinijs/ui'],
  families: {
    shadcn: ['light', 'dark'],
  }
}
```

## Setup fonts

Download **Geist** font at <https://vercel.com/font>.

Create `fonts.css` file:

```css
@font-face {
  font-family: "Geist";
  src: url("./assets/fonts/Geist/GeistVF.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
}

@font-face {
  font-family: "Geist Mono";
  src: url("./assets/fonts/Geist/GeistMonoVF.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
}
```

Add `fonts.css` to `index.html`:

```html
<link rel="stylesheet" href="./fonts.css" />
```
