+++json
{
  "status": "publish",
  "title": "Adding Features",
  "category": "core"
}
+++

## The app instance

As in previous topics, we can see that a TiniJS app is started with an app root defined in `./app/app.ts`, the file contains a class named `AppRoot` which extends the `TiniComponent` class and is decorated with the `@App()` decorator.

The app root is where we initiate the app and incorporate features, a minimal app constructor looks like this:

```ts
import {html, css} from 'lit';
import {App, TiniComponent} from '@tinijs/core';

@App()
export class AppRoot extends TiniComponent {

  protected render() {
    return html`<h1>Hello, world!</h1>`;
  }

  static styles = css``;

}
```

From anywhere across our app, we can access the app instance using one of the following methods.

- Using DOM methods:

```ts
// app-root is the only elem in the body
const app = document.body.firstElementChild;

// custom app-root placement
// <app-root id="xxx"></app-root>
const app = document.getElementById('xxx');
```

- Using util and decorator:

```ts
import {getApp, UseApp} from '@tinijs/core';

import type {AppRoot} from '../app.ts';

/*
 * Via util
 */
const app = getApp();
const router = app.router;
const meta = app.meta;
// any other hosted by the app root

/*
 * Or, via decorator
 */
@Page({})
export class AppPageXXX extends TiniComponent {

  @UseApp() readonly app!: AppRoot;

  onCreate() {
    const config = this.app.config;
    const ui = this.app.ui;
    // any other hosted by the app root
  }

}
```

Depend on the patterns you choose to add features to an app, the `AppRoot` plays a role as a host for defining such features (pattern 2 and 3) as we will see in the next section.

## Add future-proof features

Features or dependencies in TiniJS apps are available in common forms:
- **Constants** - any value, live in `app/consts` folder
- **Utilities** - single responsible functions (in `app/utils`)
- **Services** - groups of related utils (in `app/services`)

Those features are **not limited to be used with TiniJS Framework, once written it can be use with any other frameworks or no framework**.

But when it comes to work with dependencies in TiniJS apps, there are 3 main patterns to be considered, we can use **one or all** of them in our apps.

### Pattern 1: Imports

Just simply import the utils and services directly to your components, pages. This is the common and most convenient way to work with utils and services.

You can use the generate command of [Tini CLI](https://tinijs.dev/cli) to quickly scaffold consts, utils and services, run `npx tini generate const|util|service <name>`.

- Step 1: **Define consts, utils and services** (in one or more files):

```ts
// define consts in app/consts folder
export const FOO = 'foo';

// define utils in app/utils folder
export function foo() {
  return 'foo';
}

// define services in app/services folder
class FooService {
  foo() {
    return 'foo';
  }
}
export const fooService = new FooService();
```

- Step 2: **Use consts, utils and services**:

```ts
// in pages, components, ...
import {FOO} from '../consts/foo.js';
import {foo} from '../utils/foo.js';
import {fooService} from '../services/foo.js';
```

### Pattern 2: Provide/Inject

TiniJS also provides a **dependency injection** mechanism (called _Lazy DI_) that allows you to lazy load and inject utils and services to your components, pages.

- Step 1: **Define dependencies** (preferably in their own files):

```ts
// consts
export const FOO = 'foo';
export default FOO;
export type FooConst = typeof FOO;

// utils
export function foo() {}
export default foo;
export type FooUtil = typeof foo;

// services
export class FooService {}
export default FooService;
```

- Step 2: **Provide dependencies** in `app/app.ts`:

```ts
import type {DependencyProviders} from '@tinijs/core';

export const providers: DependencyProviders = {
  'FOO': () => import('./consts/foo.js'),
  'foo': () => import('./utils/foo.js'),
  'fooService': () => import('./services/foo.js'),
  // services depend on other dependencies or values
  'otherService': {
    provider: () => import('./services/other.js'),
    deps: [
      'fooService', // a string means using dependencies
      () => 'value', // a function means using values
    ],
  }
};

@App({ providers })
export class AppRoot extends TiniComponent {}
```

- Step 3: **Inject dependencies**:

```ts
import {Inject} from '@tinijs/core';

import type {FooConst} from '../consts/foo.js';
import type {FooUtil} from '../utils/foo.js';
import type {FooService} from '../services/foo.js';

@Page({})
export class AppPageXXX extends TiniComponent {

  @Inject() FOO!: FooConst;
  @Inject() foo!: FooUtil;
  @Inject() fooService!: FooService;

  // lazy load dependencies are available started from onInit() lifecycle hook
  onInit() {
    // this.FOO
    // this.foo()
    // this.fooService.foo()
  }

}
```

### Pattern 3: Plugins via Contexts

Values, utils and services can be provided and consumed using contexts.

Install **Lit Context**: `npm i @lit/context`, for usage details please visit <https://lit.dev/docs/data/context/>.

You can use the generate command of [Tini CLI](https://tinijs.dev/cli) to quickly scaffold contexts, run `npx tini generate context <name>`.

- Step 1: **Define plugins in `app/contexts`**:

```ts
import {createContext} from '@lit/context';

export type PluginsContext = typeof plugins;

export const pluginsContext = createContext<PluginsContext>(
  Symbol('plugins-context')
);

export const plugins = {
  FOO: 'foo',
  foo: () => 'foo',
  fooService: new FooService(),
};
```

_You can also **split plugins into their own contexts**, so that you can consume them individually._

- Step 2: **Register plugins in `app/app.ts`**:

```ts
import {provide} from '@lit/context';

import {pluginsContext, plugins} from './contexts/plugins.ts';

@App()
export class AppRoot extends TiniComponent {

  @provide({context: pluginsContext}) $plugins = plugins;

}
```

- Step 3: **Use plugins**:

```ts
import {consume} from '@lit/context';

import {pluginsContext, type PluginsContext} from '../contexts/plugins.ts';

@Page({})
export class AppPageXXX extends TiniComponent {

  @consume({context: pluginsContext}) $plugins!: PluginsContext;

  onCreate() {
   // this.$plugins.FOO
   // this.$plugins.foo()
   // this.$plugins.fooService.foo()
  }

}
```

## Interoperable with other frameworks

TiniJS is designed to be used in conjunction with other frameworks as well, it means we may **use other frameworks in TiniJS apps and in the other hand using TiniJS features in apps built using other frameworks**.

Interoperable is a comprehensive topic, we will explore more along the way with future topics. But, below is a basic introduction about the aspect.

For demonstration, we will use **Vue 3** in a TiniJS app, install `npm i vue`.

```ts
import {ref, createRef, type Ref} from 'lit/directives/ref.js';
import {createApp} from 'vue/dist/vue.esm-bundler.js';

@Page({})
export class AppPageXXX extends TiniComponent {
  
  private readonly vueAppRef: Ref<HTMLDivElement> = createRef();
  
  onFirstRender() {
    const vueApp = this.vueAppRef.value!;
    createApp({
      template: `
        <div>
          <h1>Hello Vue 3!</h1>
          <p>Nice to have you here.</p>
        </div>
      `
    }).mount(vueApp);
  }

  protected render() {
    return html`<div ${ref(this.vueAppRef)}></div>`;
  }

}

```
