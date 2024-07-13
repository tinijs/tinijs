+++json
{
  "status": "publish",
  "title": "Fetch Services",
  "category": "fetch"
}
+++

## FetchService

Contains all the utils of the **Fetch** category.

- Imports:

```ts
import {FetchService} from '@tinijs/toolbox/fetch';

const fetchService = new FetchService();
```

- Or, lazy DI:

```ts
// provide
const providers = {
  fetchService: () => import('@tinijs/toolbox/fetch/service.js'),
}

// inject
import type {FetchService} from '@tinijs/toolbox/fetch';
class XXX {
  @Inject() fetchService!: FetchService;
}
```