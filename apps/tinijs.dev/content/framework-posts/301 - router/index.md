+++json
{
  "status": "publish",
  "title": "Routes and Navigation",
  "category": "router"
}
+++

**Tini Router** is a way to add routing capability to TiniJS apps. It has several useful features:

- **Bundle** or **lazy load** pages
- Routes with **layouts**
- Many **param patterns**
- Navigate using the `a` tag
- Route **guards**
- **404** pages
- _And more_

To get started, install:

```bash
npm i @tinijs/router
```

## Define routes

To define routes, we create the file `./app/routes.ts` and add the route entries, for example:

```ts
import type {Route} from '@tinijs/router';

export const routes: Route[] = [
  {
    path: '',
    component: 'app-layout-default',
    children: [
      {
        path: '',
        component: 'app-page-home',
        action: () => import('./pages/home.js'),
      },
      {
        path: 'post/:slug',
        component: 'app-page-post',
        action: () => import('./pages/post.js'),
      },

      // more app routes
    ],
  },
  {
    path: 'admin',
    component: 'app-layout-admin',
    children: [
      {
        path: '',
        component: 'app-page-admin-home',
        action: () => import('./pages/admin-home.js'),
      },

      // more admin routes
    ],
  },
  {
     path: '**',
     component: 'app-page-404',
     action: () => import('./pages/404.js'),
  },
];
```

We can model our app routing system in several ways.

### Without layout

Serve pages directly without a layout.

```ts
export const routes: Route[] = [
  {
    path: '',
    component: 'app-page-home',
  },
  {
    path: 'about',
    component: 'app-page-about',
  },
];
```

### With layouts

Share similar elements between pages.

```ts
export const routes: Route[] = [
  {
    path: '',
    component: 'app-layout-default',
    children: [
      {
        path: '',
        component: 'app-page-home',
      },
      {
        path: 'about',
        component: 'app-page-about',
      },
    ],
  },
];
```

### Bundle or lazy load

You can either **bundle or lazy load pages and layouts**. Please note that for bundled layouts and pages, they must be imported first either in `routes.ts` or `app.ts`.

```ts
import './layouts/default.js';
import './pages/home.js';

export const routes: Route[] = [

  // bundled layout
  {
    path: '',
    component: 'app-layout-default',
    children: [

      // bundled page
      {
        path: '',
        component: 'app-page-home',
      },

      // lazy-loaded page
      {
        path: 'about',
        component: 'app-page-about',
        action: () => import('./pages/about.js'),
      },
    ],
  },

  // lazy-loaded layout
  {
    path: 'admin',
    component: 'app-layout-admin',
    action: () => import('./layouts/admin.js'),
    children: [
      // ...
    ],
  },
];
```

### Route parameters

Route parameters are defined using an `express.js`-like syntax. The implementation is based on the `path-to-regexp` library, which is commonly used in modern frontend libraries and frameworks.

The following features are supported:

| Type                      | Syntax                  |
| ------------------------- | ----------------------- |
| Named parameters          | **profile/:user**       |
| Optional parameters       | **:size/:color?**       |
| Zero-or-more segments     | **kb/:path\***          |
| One-or-more segments      | **kb/:path+**           |
| Custom parameter patterns | **image-:size(\\d+)px** |
| Unnamed parameters        | **(user[s]?)/:id**      |

```ts
// courtesy of: https://hilla.dev/docs/lit/guides/routing#parameters

export const routes: Route[] = [
  {path: '', component: 'app-page-home'},
  {path: 'profile/:user', component: 'app-page-profile'},
  {path: 'image/:size/:color?', component: 'app-page-image'},
  {path: 'kb/:path*', component: 'app-page-knowledge'},
  {path: 'image-:size(\\d+)px', component: 'app-page-image'},
  {path: '(user[s]?)/:id', component: 'app-page-profile'},
];
```

### 404 routes

You can define one or more 404 routes to **catch not found routes**, set `path` to `**`.

There are 2 level of 404: **layout level** and **global level**. The router will use the layout 404 first if no definition found at the layout level, it will then use the global 404.

```ts
export const routes: Route[] = [
  {
    path: '',
    component: 'app-layout-default',
    children: [
      // layout routes

      {
       path: '**',
       component: 'app-page-404-layout-default',
       action: () => import('./pages/404-layout-default.js'),
      },
    ],
  },

  // other routes

  // global 404
  {
     path: '**',
     component: 'app-page-404-global',
     action: () => import('./pages/404-global.js'),
  },
];
```

## Init the Router

After defining routes for the app, next step would be **init a router instance and register the routes**.

From the `app.ts` we **import the defined routes**, **create a router instance** and **add the router outlet** to the template.

```ts
import {createRouter} from '@tinijs/router';

import {routes} from './routes.js';

@App({})
export class AppRoot extends TiniComponent {

  readonly router = createRouter(routes, {linkTrigger: true});

  protected render() {
    return html`<router-outlet .router=${this.router}></router-outlet>`;
  }

}
```

## Navigate between pages

With the option `linkTrigger: true` enabled, you can navigate between pages using the `a` just like normal links.

```html
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/post/post-1">Post 1</a>
```

You can also use the `<tini-link>` component provided by the [Tini UI](https://tinijs.dev/ui) when link trigger disabled (not set or `linkTrigger: false`), it has a similar signature compared to the `a` tag and other useful stuffs, such as **marked as active link**.

```html
<tini-link href="/">Home</tini-link>
<tini-link href="/about" active="activated">About</tini-link>
<tini-link href="/post/post-1" active="activated">Post 1</tini-link>
```

## Access router and params

You can also navigate between pages in the imperative manner by using the `go()` method from a router instance.

```ts
import {getRouter, UseRouter, type Router} from '@tinijs/router';

@Page({})
export class AppPageXXX extends TiniComponent {

  // via decorator
  @UseRouter() readonly router!: Router;

  // or, via util
  readonly router = getRouter();

  protected render() {
    return html`<button @click=${() => this.router.go('/')}>Go home</button>`;
  }

}
```

Access **current route** and **params** is similar to access router instance.

```ts
import {UseRoute, UseParams, type ActivatedRoute} from '@tinijs/router';

@Page({})
export class AppPageXXX extends TiniComponent {

  // current route
  @UseRoute() route!: ActivatedRoute;

  // route params
  @UseParams() readonly params!: {slug: string};

}
```

## Route hooks and guards

Lifecycle hooks are used to perform actions when a route is activated or deactivated:
- `onBeforeEnter()`: called when the route is about to be activated
- `onAfterEnter()`: called when the route is activated
- `onBeforeLeave()`: called when the route is about to be deactivated
- `onAfterLeave()`: called when the route is deactivated

You can intercept the navigation process by returning a `string` or a `function` from the `onBeforeEnter` and `onBeforeLeave` hook:
- `nullish`: continue the navigation process
- `string`: cancel and redirect to the path
- `function`: cancel and execute the function

```ts
@Page({})
export class AppPageAccount extends TiniComponent {

  onBeforeEnter() {
    if (user) return; // continue
    return '/login'; // redirect to login page
  }

}
```

You can also perform **async actions** inside hooks, then it will wait for the actions to be resolved before process further.

## Scroll to anchors

Because we use the Shadow DOM to encapsulate our app, the browser seems to be unable to serve us the correct section when we present a link with an anchor fragment `/post/post-1#section-a`.

**Tini Router** provides some methods to **direct visitors to the respected sections** and **retrieve section headings** for outlined purpose (aka. table of content).

```ts
import {ref, createRef, type Ref} from 'lit/directives/ref.js';

@Page({})
export class AppPageXXX extends TiniComponent {

  @UseRouter() readonly router!: Router;

  private _articleRef: Ref<HTMLElement> = createRef();

  onRenders() {
    // will scroll to the #whatever section if presented
    this.router.renewFragments(
      this._articleRef.value!,
      { delay: 500 }
    );

    // will scroll to the #whatever section if presented
    // add extract all the available headings
    // IMPORTANT!!!:
    //   + never change a local state in onRenders() or updated() or it will cause a render loop
    //   + store 'fragments' in a global state or emit out to the parent component or employ render checkers
    const fragments = this.router
      .renewFragments(this._articleRef.value!, {delay: 500})
      .retrieveFragments();
  }

  protected render() {
    return html`
      <article ${ref(this._articleRef)}>
        ...
      </article>
    `;
  }

}
```
