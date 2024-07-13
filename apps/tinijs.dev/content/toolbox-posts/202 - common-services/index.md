+++json
{
  "status": "publish",
  "title": "Common Services",
  "category": "common"
}
+++

## CommonService

Contains all the utils of the **Common** category.

- Imports:

```ts
import {CommonService} from '@tinijs/toolbox/common';

const commonService = new CommonService();
```

- Or, lazy DI:

```ts
// provide
const providers = {
  commonService: () => import('@tinijs/toolbox/common/service.js')
}

// inject
import type {CommonService} from '@tinijs/toolbox/common';
class XXX {
  @Inject() commonService!: CommonService;
}
```
