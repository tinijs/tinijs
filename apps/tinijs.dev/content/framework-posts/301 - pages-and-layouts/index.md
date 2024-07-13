+++json
{
  "status": "publish",
  "title": "Pages and Layouts",
  "category": "router"
}
+++

## Pages

**Pages** in TiniJS apps are special components which purpose are to represent views or endpoints of the app. Creating and working with pages is very similar to how we would [work with components](/framework/component).

To quickly create a page, we can use the [Tini CLI](https://tinijs.dev/cli) to generate it.

```bash
npx tini generate page xxx
```

Or, create a `./app/pages/xxx.ts` file manually, a page looks like this:

```ts
import {html, css} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';

@Page({
  name: 'app-page-xxx',
})
export class AppPageXXX extends TiniComponent {

  protected render() {
    return html`<p>This is a page!</p>`;
  }

  static styles = css``;
}
```

Beside the `@Page()` decorator, everything else would work the same as any component. But, please note the `name: 'app-page-xxx'` property, it plays a role later when we setup the [Tini Router](https://tinijs.dev/framework/router).

## Layouts

**Layouts** in TiniJS apps are also special components which purpose are to share common elements between pages. You can think of layouts as containers of pages.

To quickly create a layout, we can use the [Tini CLI](https://tinijs.dev/cli) to generate it.

```bash
npx tini generate layout xxx
```

Or, create a `./app/layouts/xxx.ts` file manually, a layout looks like this:

```ts
import {html, css} from 'lit';
import {Layout, TiniComponent} from '@tinijs/core';

@Layout({
  name: 'app-layout-xxx',
})
export class AppLayoutXXX extends TiniComponent {

  protected render() {
    return html`
      <div class="page">
        <header>...</header>
        <slot></slot>
        <footer>...</footer>
      </div>
    `;
  }

  static styles = css``;
}
```

Beside the `@Layout()` decorator and the `<slot></slot>` in the template, everything else would work the same as any component. But, please note the `name: 'app-layout-xxx'` property, it plays a role later when we setup the [Tini Router](https://tinijs.dev/framework/router).

## Lit elements

If you have existing Lit pages that you wish to use in a TinJS app, you can do one of the following.

### Continue using LitElement

You can continue to use Lit pages in a TiniJS app without changing anything.

Let say you have a Lit page:

```js
@customElement('my-lit-page')
export class MyLitPage extends LitElement {}
```

Then, use the page in a TiniJS app like this (please see [Routes and Navigation](/framework/router) for details):

```ts
import 'my/lit/page.js';

export const routes: Route[] = [
  {
    path: '/my-route',
    component: 'my-lit-page',
  },
];
```

### Migrate to TiniComponent

You can also convert a Lit page to a Tini page, in 3 steps:
- Extend `TiniComponent` instead of `LitElement`
- Move the tag name to `options.name`
- Use `@Page()` decorator

For example, the below Lit page:

```js
@customElement('my-page')
export class MyPage extends LitElement {}
```

Will be converted to:

```js
@Page({
  name: 'my-page'
})
export class MyPage extends TiniComponent {}
```

Please note that if you use [Tini UI](/ui), then the new page which extends `TinComponent` will have access to the [base styles](/ui/native-elements) and any [shared styles](/ui/get-started#setup-ui-details). Therefore, it may change the appearance of some native elements, please do check it after the conversion.
