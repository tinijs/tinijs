# TiniJS Core 

The core module of the TiniJS framework.

It uses the [Lit](https://lit.dev/) library under the hood.

## Install

To manually install the module: `npm i @tinijs/core`

It is recommended to download the [Skeleton](https://github.com/tinijs/skeleton) for a ready-to-use structured project.

For more, please visit: <https://tinijs.dev> (TODO)

## Usage

- Create an `app` (ex. [app.ts](https://github.com/tinijs/skeleton/blob/main/app/app.ts)):

```ts
import {html} from 'lit';
import {TiniComponent, App} from '@tinijs/core';

@App()
export class AppRoot extends TiniComponent {
  protected render() {
    return html`...`;
  }
}
```

- Create a `component`:

```ts
import {html} from 'lit';
import {TiniComponent, Component, Input} from '@tinijs/core';

@Component()
export class AppHelloComponent extends TiniComponent {
  static readonly defaultTagName = 'app-hello';

  @Input() name?: string;

  protected render() {
    return html`<h1>Hello ${this.name}! 👋</h1>`;
  }
}
```

- Create a `page`:

```ts
import {html} from 'lit';
import {TiniComponent, Page} from '@tinijs/core';

@Page({
  name: 'app-page-404'
})
export class AppPage404 extends TiniComponent {
  protected render() {
    return html`<h1>Oops 🫣!</h1>`;
  }
}
```

For more detail, please visit the docs: <https://tinijs.dev/docs> (TODO)

Some examples:
 - [Todo List](https://todo-demo.tinijs.dev/)

## License

**@tinijs/core** is released under the [MIT](./LICENSE) license.
