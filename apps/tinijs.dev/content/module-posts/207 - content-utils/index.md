+++json
{
  "status": "publish",
  "title": "Utilities",
  "category": "content"
}
+++

There are several utilities used to work with content.

## `slugify`

```ts
import { slugify } from '@tinijs/content';

slugify('I ♥ Dogs');
//=> 'i-love-dogs'
```

For options and details, see the [@sindresorhus/slugify](https://github.com/sindresorhus/slugify).

## `transliterate`

```ts
import { transliterate } from '@tinijs/content';

transliterate('tôi yêu những chú kỳ lân');
//=> 'toi yeu nhung chu ky lan'
```

For options and details, see the [@sindresorhus/transliterate](https://github.com/sindresorhus/transliterate).

## `parseDenorm`

```ts
import { parseDenorm } from '@tinijs/content';

parseDenorm('Hello World');
// => {slug: 'hello-world', title: 'Hello World'}

parseDenorm('Hello World <lorem-ipsum>');
// => {slug: 'lorem-ipsum', title: 'Hello World'}

parseDenorm({
  slug: 'hello-world',
  title: 'Hello World',
});
// => {slug: 'hello-world', title: 'Hello World'}

parseDenorm('Hello World', 'name');
// => {slug: 'hello-world', name: 'Hello World'}
```

## `parseDenormList`

```ts
import { parseDenormList } from '@tinijs/content';

parseDenormList([
  'Hello World',
  'Hello World <lorem-ipsum>',
  {
    slug: 'hello-world',
    title: 'Hello World',
  },
]);
/* =>
[
  {slug: 'hello-world', title: 'Hello World'},
  {slug: 'lorem-ipsum', title: 'Hello World'},
  {slug: 'hello-world', title: 'Hello World'}
]
*/

parseDenormList({
  'hello-world': true,
  'lorem-ipsum': 'Hello World',
  'hello-world': {
    title: 'Hello World',
  },
});
/* =>
[
  {slug: 'hello-world', title: 'hello-world'},
  {slug: 'lorem-ipsum', title: 'Hello World'},
  {slug: 'hello-world', title: 'Hello World'}
]
*/
```
