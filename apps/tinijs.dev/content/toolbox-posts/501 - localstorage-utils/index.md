+++json
{
  "status": "publish",
  "title": "Localstorage Utils",
  "category": "localstorage"
}
+++

## `createLocalForage`

Open native share dialog or using a polyfill to share content.

```ts
import {createLocalForage} from '@tinijs/toolbox/localstorage';

const localForage = createLocalForage(/* ... */);
```

## `get`

Get item.

```ts
import {get} from '@tinijs/toolbox/localstorage';

const value = get(key);
```

## `set`

Set item.

```ts
import {set} from '@tinijs/toolbox/localstorage';

set(key, { foo: 'bar' });
```

## More

**TODO**: add doc for other utils.
