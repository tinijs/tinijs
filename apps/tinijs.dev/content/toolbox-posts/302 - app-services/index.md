+++json
{
  "status": "publish",
  "title": "App services",
  "category": "app"
}
+++

## AppService

Contains all the utils of the **App** category.

- Imports:

```ts
import {AppService} from '@tinijs/toolbox/app';

const appService = new AppService();
```

- Or, lazy DI:

```ts
// provide
const providers = {
  appService: () => import('@tinijs/toolbox/app/service.js')
}

// inject
import type {AppService} from '@tinijs/toolbox/app';
class XXX {
  @Inject() appService!: AppService;
}
```