# TiniJS Router 

The official router module for the TiniJS framework. It is currently under development.

Another option for adding routes to a TiniJS app is using [@vaadin/router](https://github.com/vaadin/router).

## Install

To manually install the module: `npm i @tinijs/router`

It is recommended to download the [Skeleton](https://github.com/tinijs/skeleton) for a ready-to-use structured project.

For more, please visit: <https://tinijs.dev> (TODO)

## Usage

- Add the `routes.ts`

```ts
import {Route} from '@tinijs/router';

export default [
  {
    path: '',
    component: 'app-layout-default',
    children: [
      {
        path: '',
        component: 'app-page-home',
        action: () => import('./pages/home'),
      },
      {
        path: 'articles/:slug',
        component: 'app-page-article',
        action: () => import('./pages/article'),
      },
      {
        path: '**',
        component: 'app-page-404',
        action: () => import('./pages/404'),
      },
    ],
  },
] as Route[];
```

- Register the routes in `app.ts`

```ts
import {html} from 'lit';
import {TiniComponent, App} from '@tinijs/core';
import {createRouter, AppWithRouter} from '@tinijs/router';

import routes from './routes';

@App()
export class AppRoot extends TiniComponent implements AppWithRouter {
  readonly router = createRouter(routes, {linkTrigger: true});

  protected render() {
    return html`<router-outlet .router=${this.router}></router-outlet>`;
  }
}
```

- Retrieve the routing context

```ts
import {TiniComponent, Page} from '@tinijs/core';
import {
  Router,
  ActivatedRoute,
  UseRouter,
  UseRoute,
  UseParams
} from '@tinijs/router';

interface PageParams {
  slug: string;
}

@Page({
  name: 'page-article',
})
export class ArticlePage extends TiniComponent {
  // router instance
  @UseRouter() router!: Router;

  // current route
  @UseRoute() route!: ActivatedRoute;

  // route params
  @UseParams() params!: PageParams;
}
```

## Lifecycle Hooks & Guards

Lifecycle hooks are used to perform actions when a route is activated or deactivated:

- `onBeforeEnter`: called when the route is about to be activated
- `onAfterEnter`: called when the route is activated
- `onBeforeLeave`: called when the route is about to be deactivated
- `onAfterLeave`: called when the route is deactivated

You can intercept the navigation process by returning a `string` or a `function` from the `onBeforeEnter` and `onBeforeLeave` hook:

- `nullish`: continue the navigation process
- `string`: cancel and redirect to the path
- `function`: cancel and execute the function

```ts
import {TiniComponent, Page} from '@tinijs/core';
import {OnBeforeEnter} from '@tinijs/router';

@Page({
  name: 'page-user',
})
export class UserPage extends TiniComponent implements OnBeforeEnter {

  onBeforeEnter() {
    if (user) return; // continue
    return '/login'; // redirect to login page
  }

}
```

## License

**@tinijs/router** is released under the [MIT](./LICENSE) license.
