+++json
{
  "status": "publish",
  "title": "Get Started",
  "category": "uncategorized"
}
+++

<tini-message scheme="warning-subtle"><strong>Tini UI</strong> is currently under heavy development, I may not have time to changelog all the details, so please refer this document for the latest version as well as reaching out to [Discord](https://discord.gg/EABbZVbPAb) or [Issues](https://github.com/tinijs/tinijs/issues/new) for supports. 🙇‍♂️</tini-message>

TiniJS has a **UI library where I aim to provide every commonly used components and blocks and even whole pages**. Components are architected in a special way where they are custom elements to be used not only with TiniJS, but also with other frameworks or no framework.

Working with reusable components is easy, usually in the form of passing props to the custom element tag. Customization can be done via props or CSS `::part()` or custom theme family or completely clone a component source, ...

## Concepts

Components are also able to accommodate almost any design systems with as little effort as possible. This is achieved via a theming system; the concept is this:

- Components are written **only once**, they are **headless** (without specific styles)
- Themes are organized into **Families** (aka. design systems), families define their own base characteristics, for example: Bootstrap, Material, Fluent, ...
- Upon the base characteristics, a family have style variants, called **Skins**, for example, the Bootstrap family may have: Light skin, Dark skin, ...
- A so called **Theme** is a combination of a family and a skin, for example: `bootstrap/light`, `material/dark`, ...

With the theming concept in mind, any app can have these theming capabilities:

- **One** theme family - could be 80% to 90% of all the web apps exist today have only 1 certain style equivalent to TiniJS 1 theme family.
- **One** theme family + multiple skins - the common use case of this is Light/Dark modes equivalent to TiniJS 1 theme family with multiple skins from the same family.
- **Multiple** theme families - highly personalized apps may have multiple theme families with one or multiple skins from each family, a certain theme will be applied depends on user reference.

## Usage

To get started with Tini UI, first identify which theme family and skin you would like to include. Currently, these theme families are available, each contains a light and a dark skin:
- [Bootstrap](/ui/bootstrap)
- [Shadcn](/ui/shadcn)
- [Material](/ui/material)
- [iOS](/ui/ios)
- [Fluent](/ui/fluent)
- [Radix](/ui/radix)
- [Chakra](/ui/chakra)
- [Daisy](/ui/daisy)

For using Tini UI with other frameworks or no framework:
- [Vue and Nuxt](/ui/vue)
- [React](/ui/react)
- [Angular](/ui/angular)
- [Svelte](/ui/svelte)
- [Vanilla and Servers](/ui/vanilla)

There are 3 main ways of using Tini UI:

1. **Via CDN** (one theme family, one or more skin)
2. **Install prebuilt packages** (one theme family, one or more skin)
3. **Build and manage UI** using [Tini CLI](/cli) (one or more theme family, one or more skin)

### Option 1: Via CDN

CDN is the simplest way to get started with Tini UI, just include the script tag in your HTML file. This way is suitable for small projects or quick prototyping without the need of a build step.

- **Step 1**: Setup the UI

```html
<script type="module">

import { setupUI, availableSkins } from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap@0.21.1/bundled/setup.js';
import { availableComponents } from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap@0.21.1/bundled/component.js';

// setup the UI
const ui = setupUI({

  // include all skins
  skins: availableSkins,

  // register all components
  components: availableComponents,

});

// to change theme
ui.setTheme(isDark ? 'bootstrap/dark' : 'bootstrap/light');

</script>
```

- **Step 2**: Use the components

```html
<tini-text color="success">Lorem ipsum</tini-text>
<tini-button>A button</tini-button>
```

### Option 2: Prebuilt packages

Prebuilt packages are available on NPM.

- **Step 1**: Install a theme family

```bash
npm i @tinijs/ui-material
```

- **Step 2**: Setup the UI

```ts
import { setupUI, materialLightSkin, materialDarkSkin } from '@tinijs/ui-material/setup.js';
import { TiniTextComponent } from '@tinijs/ui-material/components/text.js';
import { TiniButtonComponent } from '@tinijs/ui-material/components/button.js';

// setup the UI
const ui = setupUI({

  // include some skins
  skins: {
    'material/light': materialLightSkin,
    'material/dark': materialDarkSkin,
  },

  // register some components
  components: [
    TiniTextComponent,
    TiniButtonComponent,
  ]

});

// to change theme
ui.setTheme(themeId);
```

- **Step 3**: Use components

```html
<tini-text color="success">Lorem ipsum</tini-text>
<tini-button>A button</tini-button>
```

### Option 3: Using CLI

With [Tini CLI](/cli), you can build UI packages for using locally in a project or as an sharable package for your entire organization.

It also allows you to override the default bases, skins and components as well as develop your own theme families with your own design systems and private components.

- **Step 1**: Config and build UI packages

First, install Tini UI official source package:

```bash
npm i @tinijs/ui
```

Then, add the config to `tini.config.ts`:

```ts
export default defineTiniConfig({

  ui: {

    // define the sources to be used
    sources: ['@tinijs/ui'],

    // pick one or more families
    // and one or more skins from each family
    families: {
      bootstrap: ['light', 'dark'],
      shadcn: ['light', 'dark'],
      chakra: ['light', 'dark'],
    },

  },

});
```

Finally, run the build command:

```bash
npx tini ui build
```

By default, the result will be output to the `app/ui` folder, the folder should be ignored from GIT.

- **Step 2**: Setup the UI

```ts
import { setupUI, type AppWithUI } from './ui/setup.js';
import { TiniTextComponent } from './ui/components/text.js';
import { TiniButtonComponent } from './ui/components/button.js';

// setup the UI
const ui = setupUI({

  // skins are included automatically
  // based on the config above in tini.config.ts

  // register some components
  components: [
    TiniTextComponent,
    TiniButtonComponent,
  ]

});

// to change theme
ui.setTheme(themeId);
```

- **Step 3**: Use components

```html
<tini-text color="success">Lorem ipsum</tini-text>
<tini-button>A button</tini-button>
```

## Import endpoints

Whether you use CDN, prebuilt packages or build UI with Tini CLI, there are some common endpoints to import stuffs depending on the need.

| Endpoint                         | Description                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `/setup.js`                      | `setupUI()`, all the skins and `availableSkins` (an object contains all skins) |
| _Official components_            |
| `/component.js`                  | all the components and `availableComponents` (an array of all)      |
| `/components/<name>.js`          | specific component only                                                         |
| _Icon components (if available)_ |
| `/icon.js`                       | all the icon components and `availableIcons` (an array of all) |
| `/icons/<name>.js`               | specific icon component only                                                    |

## Setup UI details

The `setupUI()` function is the beginning of the UI system, it returns an UI instance of your app. This is where you choose which skins to be included, global styles, share styles and optionaly register components globally.

The value of **Styles** can be one of these:
- Raw CSS `string`
- CSSStyleSheet object
- Result of `css` tagged template
- Array of any of the above values

```ts
const ui = setupUI({

  // select skins to be included
  // only required when using CDN or prebuilt packages
  skins: Record<string, Styles>;

  // define global CSS variables
  // and styles which available globally for the Light DOM
  globals: Styles;

  // shared styles available in the Shadow DOM
  // but only for elements which extends TiniElement or TiniComponent
  shares: Styles;

  // optionally register components globally
  components: Component[];

  // remove 'hidden' attribute from body for server rendered pages
  // or provide a custom hanlder
  resolvePending: boolean | (() => void);

});
```

After `setupUI()`, an UI instance will be available for the app, you can access UI information and methods.

From anywhere in the app, you can access the UI instance:

```ts
import {getUI, THEME_CHANGE_EVENT, type ActiveTheme} from '@tinijs/core';

// get the UI instance
const ui = getUI();

// get the active theme
const activeTheme = ui.activeTheme;

// set a theme
ui.setTheme(themeId);

// listen for theme changed
addEventListener(THEME_CHANGE_EVENT, e => {
  const activeTheme = (e as CustomEvent<ActiveTheme>).detail;
});
```
