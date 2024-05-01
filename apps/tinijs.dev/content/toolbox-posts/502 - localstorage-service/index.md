+++json
{
  "status": "publish",
  "title": "Localstorage services",
  "category": "localstorage"
}
+++

## LocalstorageService

Contains all the utils of the **Localstorage** category.

- Imports:

```ts
import {LocalstorageService} from '@tinijs/toolbox/localstorage';

const localstorageService = new LocalstorageService();
```

- Or, lazy DI:

```ts
// provide
const providers = {
  localstorageService: () => import('@tinijs/toolbox/localstorage/service.js');
}

// inject
import type {LocalstorageService} from '@tinijs/toolbox/localstorage';
class XXX {
  @Inject() localstorageService!: LocalstorageService;
}
```