+++json
{
  "status": "publish",
  "title": "Get Started",
  "category": "uncategorized"
}
+++

Tini Toolbox is a collection of commonly used utilities and services for building web applications. It is aimed to provide every useful tools from a wide range of categories in a unified place.

The utils and services can be used with TiniJS framework and other frameworks or no framework.

Install:

```bash
npm i @tinijs/toolbox
```

When using with TiniJS, there are 3 main patterns:

## Pattern 1: Imports

Just import the services and utils directly to your components, pages, ...

This is the common and most convienient way to work with services and utils.

```ts
import {get, FetchService} from '@tinijs/toolbox/fetch';

// use utils
const result = await get('...');

// use services
const fetchService = new FetchService();
const result = await fetchService.get('...');
```

## Pattern 2: Provide/Inject (Lazy DI)

TiniJS provides a dependency injection mechanism that allows you to lazy load and inject services and utils to your components, pages, ...

```ts
// provide dependencies in app.ts
@App({
  providers = {
    fetchService: () => import('@tinijs/toolbox/fetch/service.js');
  }
});

// later, inject dependencies elsewhere
import {Inject} from '@tinijs/core';
import type {FetchService} from '@tinijs/toolbox/fetch';

class XXX {

  @Inject() fetchService!: FetchService;

  async onInit() {
    const result = await this.fetchService.get('...');
  }

}
```

## Pattern 3: Plugins via Context

You can also use context to provide and consume utility plugins.

For more, please see: <https://lit.dev/docs/data/context/>
