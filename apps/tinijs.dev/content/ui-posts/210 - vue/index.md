+++json
{
  "status": "publish",
  "title": "Vue and Nuxt",
  "category": "guide"
}
+++

## Vue

Vue supports custom elements well, you can can use one of the methods mentioned in [Get Started](/ui/get-started) to add Tini UI to your project.

Try an online example: [Tini UI - Vue Playground](https://stackblitz.com/edit/tini-ui-vue-playground?file=src%2FApp.vue)

- **Step 1**: somewhere before initializing the Vue app

```ts
import { setupUI, availableSkins } from '@tinijs/ui-bootstrap/setup.js';
import { availableComponents } from '@tinijs/ui-bootstrap/component.js';

setupUI({
  skins: availableSkins,
  components: availableComponents,
});
```

- **Step 2**: config Vue compiler, for example with `vite.config.js`

```js
export default defineConfig({
  plugins: [

    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.indexOf('-') !== -1,
        },
      },
    }),

  ],
});
```

- **Step 3**: Use Tini UI components in templates

```html
<tini-text color="success">Lorem ipsum</tini-text>
<tini-button>A button</tini-button>
```

## Nuxt

Currently TiniJS does not support server-side rendering, when using Tini UI in a Nuxt SSR, the custom tags will be served as is and rendered at the client side only.  

Try an online example: [Tini UI - Nuxt Playground](https://stackblitz.com/edit/tini-ui-nuxt-playground?file=app.vue)

- **Step 1**: setup UI in `app.vue`

```html
<script setup>

  import { setupUI, availableSkins } from '@tinijs/ui-bootstrap/setup.js';
  import { availableComponents } from '@tinijs/ui-bootstrap/component.js';

  if (process.client) {
    setupUI({
      skins: availableSkins,
      components: availableComponents,
      pendingBody: true, // hide the body to prevent FOUC
    });
  }

</script>
```

- **Step 2**: Config `nuxt.config.ts`

```ts
export default defineNuxtConfig({

  app: {
    head: {
      bodyAttrs: { hidden: true } as any, // hide the body to prevent FOUC
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.indexOf('-') !== -1,
    },
  },

});
```
