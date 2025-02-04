+++json
{
  "status": "publish",
  "title": "Elements",
  "category": "core"
}
+++

Elements are basic building blocks of TiniJS apps. They are [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_elements) which extend the standard `HTMLElement` - the base class of native HTML elements. Since **TiniJS** is based on **Lit**, so it is nice to know [how to define a element using LitElement](https://lit.dev/docs/elements/overview/), but it is not required because we will explore the basic concepts together.

## Create elements

To quickly scaffold a element using [Tini CLI](https://tinijs.dev/cli), run:

```bash
npx tini generate element <name>
```

Or, create `app/elements/<name>.ts` file manually, a element looks like this:

```ts
import {html, css} from 'lit';
import {element, TiniElement} from '@tinijs/core';

@element()
export class AppXXXElement extends TiniElement {
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

## Consume elements

To consume elements, you must first register them, either globally or locally.

Register elements **globally at the app level**, this is convenient since you only need to do it **once per element**, but it has the drawback that the initial bundle also includes all the related constructors.

```ts
// register elements globally in app/app.ts

import {AppXXXElement} from './elements/xxx.js';

@app({
  elements: [AppXXXElement]
})
export class AppRoot extends TiniElement {}
```

Elements can also be registering **locally at layout, app or element level**. The benefit is that certain elements will come with lazy-load pages instead of app initialization. The drawback is that it is **repetitive** (I think of auto import in the future, it may help a little).

```ts
// register elements locally

import {AppXXXElement} from '../elements/xxx.js';

@element|page|layout({
  elements: [AppXXXElement]
})
export class ElementOrPageOrLayout extends TiniElement {}
```

Notice that there is `defaultTagName = '...'`. It is the default tag name of the element, you can register a element with a different tag name, use this syntax:

```ts
// AppFooElement has the default tag name
static readonly defaultTagName = 'app-foo';

// register a different tag name
{
  elements: [
    AppXXXElement,
    [AppFooElement, 'bar-baz-qux']
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

@element()
export class MyTiniElement extends TiniElement {
  protected render() {
    return html`<my-lit-element></my-lit-element>`;
  }
}
```

### Migrate to TiniElement

You can also convert a Lit element to a Tini element, in 3 steps:
- Extend `TiniElement` instead of `LitElement`
- Move the tag name to `defaultTagName`
- Use `@element()` decorator

For example, the below Lit element:

```js
@customElement('my-element')
export class MyElement extends LitElement {}
```

Will be converted to:

```js
@element()
export class MyElement extends TiniElement {
  static readonly defaultTagName = 'my-element';
}
```

Please note that if you use [Tini UI](/ui), then the new element which extends `TinElement` will have access to the [base styles](/ui/native-elements) and any [shared styles](/ui/get-started#setup-ui-details). Therefore, it may change the appearance of some native elements, please do check it after the conversion.
