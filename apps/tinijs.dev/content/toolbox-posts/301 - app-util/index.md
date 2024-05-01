+++json
{
  "status": "publish",
  "title": "App utils",
  "category": "app"
}
+++

## `share`

Open native share dialog or using a polyfill to share content.

```ts
import {share} from '@tinijs/toolbox/app';

share({
  files?: File[];
  text?: string;
  title?: string;
  url?: string;
});
```
