+++json
{
  "status": "publish",
  "title": "Shadcn",
  "category": "family"
}
+++

Shadcn-inspired theme family, homepage: https://ui.shadcn.com/

## Install

- CDN:

```txt
https://cdn.jsdelivr.net/npm/@tinijs/ui-shadcn/bundled.js
```

- NPM:

```bash
npm i @tinijs/ui-shadcn
```

- React NPM:

```bash
npm i @tinijs/ui-shadcn-react
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
