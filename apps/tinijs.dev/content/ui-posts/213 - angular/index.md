+++json
{
  "status": "publish",
  "title": "Angular",
  "category": "guides"
}
+++

Angular supports custom elements well, you can can use one of the methods mentioned in [Get Started](/ui/get-started) to add Tini UI to your project.

Try an online example: [Tini UI - Angular Playground](https://stackblitz.com/edit/tini-ui-angular-playground?file=src%2Fmain.html)

- **Step 1**: setup UI in `main.ts`

```ts
import { setupUI, availableSkins } from '@tinijs/ui-bootstrap/setup.js';
import { availableElements } from '@tinijs/ui-bootstrap/element.js';

setupUI({
  skins: availableSkins,
  elements: availableElements,
});
```

- **Step 2**: config `CUSTOM_ELEMENTS_SCHEMA` in a module or a element:

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

- **Step 3**: use the elements in templates

```html
<tini-text color="success">Lorem ipsum</tini-text>
<tini-button>A button</tini-button>
```
