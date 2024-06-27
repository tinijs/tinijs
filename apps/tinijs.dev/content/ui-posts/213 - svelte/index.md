+++json
{
  "status": "publish",
  "title": "Svelte",
  "category": "guide"
}
+++

Svelte supports custom elements well, you can can use one of the methods mentioned in [Get Started](/ui/get-started) to add Tini UI to your project.

Try an online example: [Tini UI - Svelte Playground](https://stackblitz.com/edit/tini-ui-svelte-playground?file=src%2FApp.svelte)

- **Step 1**: setup UI in `main.ts` or `App.svelte`

```ts
import { setupUI, availableSkins } from '@tinijs/ui-bootstrap/setup.js';
import { availableComponents } from '@tinijs/ui-bootstrap/component.js';

setupUI({
  skins: availableSkins,
  components: availableComponents,
});
```

- **Step 2**: Use Tini UI components in templates

```html
<tini-text color="success">Lorem ipsum</tini-text>
<tini-button>A button</tini-button>
```
