+++json
{
  "status": "publish",
  "title": "Pages and Layouts",
  "category": "core"
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
