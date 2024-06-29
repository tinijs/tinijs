+++json
{
  "status": "publish",
  "title": "Angular",
  "category": "guide"
}
+++

Angular supports custom elements well, you can can use one of the methods mentioned in [Get Started](/ui/get-started) to add Tini UI to your project.

Try an online example: [Tini UI - Angular Playground](https://stackblitz.com/edit/tini-ui-angular-playground?file=src%2Fmain.html)

- **Step 1**: setup UI in `main.ts`

```ts
import { setupUI, availableSkins } from '@tinijs/ui-bootstrap/setup.js';
import { availableComponents } from '@tinijs/ui-bootstrap/component.js';

setupUI({
  skins: availableSkins,
  components: availableComponents,
});
```

- **Step 2**: config `CUSTOM_ELEMENTS_SCHEMA` in module or component:

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

- **Step 3**: use components in templates

```html
<tini-text color="success">Lorem ipsum</tini-text>
<tini-button>A button</tini-button>
```
