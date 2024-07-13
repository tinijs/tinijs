+++json
{
  "status": "publish",
  "title": "Components",
  "category": "core"
}
+++

Components are basic building blocks of TiniJS apps. They are [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) which extend the standard `HTMLElement` - the base class of native HTML elements. Since **TiniJS** is based on **Lit**, so it is nice to know [how to define a component using LitElement](https://lit.dev/docs/components/overview/), but it is not required because we will explore the basic concepts together.

## Create components

To quickly scaffold a component using [Tini CLI](https://tinijs.dev/cli), run:

```bash
npx tini generate component <name>
```

Or, create `app/components/<name>.ts` file manually, a component looks like this:

```ts
import {html, css} from 'lit';
import {Component, TiniComponent} from '@tinijs/core';

@Component()
export class AppXXXComponent extends TiniComponent {
  static readonly defaultTagName = 'app-xxx';

  // Logic here

  protected render() {
    return html`<p>Template here</p>`;
  }

  static styles = css`/* Style here */`;
}
```

There are 3 main sections:
- **Logic**: class properties and methods for defining properties, internal states, events and other logic.
- **Template**: HTML template with Lit [html](https://lit.dev/docs/api/templates/#html) template literal syntax.
- **Style**: CSS for styling the template.

## Consume components

To consume components, you must first register them, either globally or locally.

Register components **globally at the app level**, this is convenient since you only need to do it **once per component**, but it has the drawback that the initial bundle also includes all the related constructors.

```ts
// register components globally in app/app.ts

import {AppXXXComponent} from './components/xxx.js';

@App({
  components: [AppXXXComponent]
})
export class AppRoot extends TiniComponent {}
```

Components can also be registering **locally at layout, app or component level**. The benefit is that certain components will come with lazy-load pages instead of app initialization. The drawback is that it is **repetitive** (I think of auto import in the future, it may help a little).

```ts
// register components locally

import {AppXXXComponent} from '../components/xxx.js';

@Component|Page|Layout({
  components: [AppXXXComponent]
})
export class ComponentOrPageOrLayout extends TiniComponent {}
```

Notice that there is `defaultTagName = '...'`. It is the default tag name of the component, you can register a component with a different tag name, use this syntax:

```ts
// AppFooComponent has the default tag name
static readonly defaultTagName = 'app-foo';

// register a different tag name
{
  components: [
    AppXXXComponent,
    [AppFooComponent, 'bar-baz-qux']
  ]
}
```

After register, you can use the tag `<app-xxx></app-xxx>` and `<bar-baz-qux></bar-baz-qux>` just like they are native HTML tags.

## Lit elements

If you have existing Lit elements that you wish to use in a TinJS app, you can do one of the following.

### Continue using LitElement

You can continue to use Lit elements in a TiniJS app without changing anything.

Let say you have a Lit element:

```js
@customElement('my-lit-element')
export class MyLitElement extends LitElement {}
```

Then, somewhere in a TiniJS app:

```js
import 'my/lit/element.js';

@Component()
export class MyTiniComponent extends TiniComponent {
  protected render() {
    return html`<my-lit-element></my-lit-element>`;
  }
}
```

### Migrate to TiniComponent

You can also convert a Lit element to a Tini component, in 3 steps:
- Extend `TiniComponent` instead of `LitElement`
- Move the tag name to `defaultTagName`
- Use `@Component()` decorator

For example, the below Lit element:

```js
@customElement('my-component')
export class MyComponent extends LitElement {}
```

Will be converted to:

```js
@Component()
export class MyComponent extends TiniComponent {
  static readonly defaultTagName = 'my-component';
}
```

Please note that if you use [Tini UI](/ui), then the new component which extends `TinComponent` will have access to the [base styles](/ui/native-elements) and any [shared styles](/ui/get-started#setup-ui-details). Therefore, it may change the appearance of some native elements, please do check it after the conversion.
