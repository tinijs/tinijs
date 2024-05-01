+++json
{
  "status": "publish",
  "title": "Fetch utils",
  "category": "fetch"
}
+++

## `fetch_`

Fetch data from the server.

```ts
import {fetch_} from '@tinijs/toolbox/fetch';

const result = await fetch_(/* ... */);
```

## `get`

Use `GET` method.

```ts
import {get} from '@tinijs/toolbox/fetch';

const result = await get(/* ... */);
```

## `post`

Use `POST` method.

```ts
import {post} from '@tinijs/toolbox/fetch';

const result = await post(/* ... */);
```

## `put`

Use `PUT` method.

```ts
import {put} from '@tinijs/toolbox/fetch';

const result = await put(/* ... */);
```

## `patch`

Use `PATCH` method.

```ts
import {patch} from '@tinijs/toolbox/fetch';

const result = await patch(/* ... */);
```

## `delete_`

Use `DELETE` method.

```ts
import {delete_} from '@tinijs/toolbox/fetch';

const result = await delete_(/* ... */);
```
