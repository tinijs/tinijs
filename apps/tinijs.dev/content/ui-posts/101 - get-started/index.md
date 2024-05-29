+++json
{
  "status": "publish",
  "title": "Get Started",
  "category": "uncategorized"
}
+++

TiniJS has a dedicated **UI library where I aim to provide every commonly used components and blocks and even whole pages**. Components are architected in a special way where they are custom elements to be used not only with TiniJS, but also with other frameworks or no framework.

Working with reusable components is easy, usually in the form of passing props to the custom element tag. Customization can be done via props or CSS `::part()` or custom theme family or completely clone a component source, ...

## Concepts

Components are also able to accommodate almost any design systems with as little effort as possible. This is achieved via a theming system; the concept is this:

- Components are written **only once**, they are **headless** (without specific styles)
- Themes are organized into **Families** (aka. design systems), families define their own base characteristics, for example: Bootstrap, Material, Fluent, Spectrum, ...
- Upon the base characteristics, a family have style variants, called **Skins**, for example, the Bootstrap family may have: Light skin, Dark skin, ...
- A so called **Theme** is a combination of a family and a skin, for example: `bootstrap/light`, `bootstrap/dark`, ...

With the theming concept in mind, any app can have these theming capabilities:

- **One** theme family - could be 80% to 90% of all the web apps exist today have only 1 certain style equivalent to TiniJS 1 theme family.
- **One** theme family + multiple skins - the common use case of this is Light/Dark modes equivalent to TiniJS 1 theme family with multiple skins from the same family.
- **Multiple** theme families - highly personalized apps may have multiple theme families with one or multiple skins from each family, a certain theme will be applied depends on user reference.

## Usage

There are 3 main ways of using Tini UI:
1. Via CDN
2. Install prebuilt packages
3. Build and manage UI using [Tini CLI](/cli)

### Via CDN

CDN is the simplest way to get started with Tini UI, just include the script tag in your HTML file.

- Step 1: Setup the UI

```html
<script type="module">
import {setupUI, bootstrapLightSkin, bootstrapDarkSkin} from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/bundled/setup.js';
import {TiniButtonComponent} from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/bundled/components.js';

const ui = setupUI(
  {
    skins: {
      'bootstrap/light': bootstrapLightSkin,
      'bootstrap/dark': bootstrapDarkSkin,
    },
  },
  [
    TiniButtonComponent,
    // other components
  ]
);
</script>
```

- Step 2: Use components

```html
<tini-button scheme="primary">A button</tini-button>
```

### Prebuilt packages

Try an example, **To Do** app - [https://stackblitz.com/edit/try-tinijs-todo-app](https://stackblitz.com/edit/try-tinijs-todo-app?file=app%2Fapp.ts)

- Step 1: Install a theme family.

```bash
npm i @tinijs/ui-bootstrap
```

- Step 2: Setup the UI at the app level.

```ts
import { setupUI } from '@tinijs/ui-bootstrap';
import { bootstrapLightSkin } from '@tinijs/ui-bootstrap/skins/light.js';
import { bootstrapDarkSkin } from '@tinijs/ui-bootstrap/skins/dark.js';

@App({})
export class AppRoot extends TiniComponent {
  readonly ui = setupUI({
    skins: {
      'bootstrap/light': bootstrapLightSkin,
      'bootstrap/dark': bootstrapDarkSkin,
    },
  });
}
```

- Step 3: Use components.

```ts
import {TiniButtonComponent} from '@tinijs/ui-bootstrap/components/button.js';

@Page({
  components: [TiniButtonComponent], // register the component
})
export class AppXXXPage extends TiniComponent {}
```

```html
<tini-button scheme="primary">A button</tini-button>
```

### Using CLI

TODO: add instructions
