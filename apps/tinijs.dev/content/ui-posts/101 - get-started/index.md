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

To get started with Tini UI, first identify which theme family and skin you would like to include. Currently, these theme families are available: [Bootstrap](/ui/bootstrap), [Material](/ui/material), [iOS](/ui/ios), [Fluent](/ui/fluent), [Spectrum](/ui/spectrum), [Shadcn](/ui/shadcn), [Tailwind](/ui/tailwind) and [Chakra](/ui/chakra); each contains a light and a dark skin.

There are 3 main ways of using Tini UI:

1. **Via CDN** (one theme family, one or more skin)
2. **Install prebuilt packages** (one theme family, one or more skin)
3. **Build and manage UI** using [Tini CLI](/cli) (one or more theme family, one or more skin)

### Via CDN

CDN is the simplest way to get started with Tini UI, just include the script tag in your HTML file.

- Step 1: Setup the UI

```html
<script type="module">
import {setupUI, bootstrapLightSkin, bootstrapDarkSkin} from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/bundled/setup.js';
import {TiniTextComponent, TiniButtonComponent} from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/bundled/components.js';

const ui = setupUI(
  {
    skins: {
      'bootstrap/light': bootstrapLightSkin,
      'bootstrap/dark': bootstrapDarkSkin,
    },
  },
  [
    TiniTextComponent,
    TiniButtonComponent,
    // other components
  ]
);
</script>
```

- Step 2: Use components

```html
<tini-text>Lorem ipsum</tini-text>
<tini-button>A button</tini-button>
```

### Prebuilt packages

Prebuilt packages are available on NPM.

- Step 1: Install a theme family.

```bash
npm i @tinijs/ui-material
```

- Step 2: Setup and use components.

```ts
import { setupUI, materialLightSkin, materialDarkSkin } from '@tinijs/ui-material/setup.js';
import {TiniTextComponent} from '@tinijs/ui-material/components/text.js';
import {TiniButtonComponent} from '@tinijs/ui-material/components/button.js';

@App({
  components: [
    TiniTextComponent,
    TiniButtonComponent,
  ]
})
export class AppRoot extends TiniComponent {
  readonly ui = setupUI({
    skins: {
      'material/light': materialLightSkin,
      'material/dark': materialDarkSkin,
    },
  });

  render() {
    return html`
      <tini-text>Lorem ipsum</tini-text>
      <tini-button>A button</tini-button>
    `;
  }
}
```

### Using CLI

With [Tini CLI](/cli), you can build UI packages for using locally in a project or as an sharable package for your entire organization.

It also allows you to override the default bases, skins and components as well as develop your own theme families with your own design systems and private components.

- Step 1: Install Tini UI base package:

```bash
npm i @tinijs/ui
```

- Step 2: Add config to `tini.config.ts`:

```ts
export default defineTiniConfig({

  ui: {
    // define the sources to be used
    sources: ['@tinijs/ui'],
    // pick one or more families and one or more skins
    families: {
      shadcn: ['light', 'dark'],
      chakra: ['light', 'dark'],
    },
  },

});
```

Run the build command:

```bash
npx tini ui build
```

By default, the result will be output to the `app/ui` folder, the folder should be ignored from git.

You now can import the setup and components.

- Step 3: Setup and use components.

```ts
import {setupUI, type AppWithUI} from './ui/setup.js';
import {TiniTextComponent} from './ui/components/text.js';
import {TiniButtonComponent} from './ui/components/button.js';

@App({
  components: [
    TiniTextComponent,
    TiniButtonComponent,
  ]
})
export class AppRoot extends TiniComponent {
  readonly ui = setupUI(); // skins will be loaded automatically based on the config

  render() {
    return html`
      <tini-text>Lorem ipsum</tini-text>
      <tini-button>A button</tini-button>
    `;
  }
}
```
