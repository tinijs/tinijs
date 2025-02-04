+++json
{
  "status": "publish",
  "title": "Title and Meta Tags",
  "category": "router"
}
+++

The Tini Meta package provides a way to manage page title and meta tags for Tini apps.

```bash
npm i @tinijs/meta
```

## Usage

To **update page title and meta** when navigating to different pages, init a meta instance at `app.ts`.

```ts
import {initMeta} from '@tinijs/meta';

@app({})
export class AppRoot extends TiniElement {

  readonly meta = initMeta({
    metadata: undefined, // "undefined" means use the extracted values from index.html
    autoPageMetadata: true,
  });

}
```

### Static pages

When `autoPageMetadata: true` for page which is static, meta can be provide via the `metadata` property.

```ts
import type {PageMetadata} from '@tinijs/meta';

@page({})
export class AppPageXXX extends TiniElement {

  readonly metadata: PageMetadata = {
    title: 'Some title',
    description: 'Some description ...',
    // ...
  };

}
```

### Dynamic pages

For pages with data comes from the server, we can access the meta instance and set page metadata accordingly.

```ts
import {useMeta, Meta} from '@tinijs/meta';

@page({})
export class AppPageXXX extends TiniElement {

  @useMeta() readonly meta!: Meta;

  async onInit() {
    this.post = await fetchPost();
    this.meta.setPageMetadata(post);
  }

}
```
