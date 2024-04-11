# TiniJS Meta

The Meta module for TiniJS apps.

## Install

To manually install the module: `npm i @tinijs/core`

It is recommended to download the [Starter](https://github.com/tinijs/blank-starter) for a ready-to-use structured project.

For more, please visit: <https://tinijs.dev> (TODO)

## Usage

- Create the `metadata.ts`

```ts
import {AppMetadata} from '@tinijs/meta';

// "null" means use the extracted values from index.html
export default null as unknown as AppMetadata;
```

- Init the module in `app.ts`

```ts
import {initMeta, AppWithMeta} from '@tinijs/meta';

import metadata from './metadata';

@App()
export class AppRoot extends TiniComponent implements AppWithMeta {
  readonly meta = initMeta({metadata});
}
```

- Use in pages

```ts
import {UseMeta, Meta, PageMetadata} from '@tinijs/meta';

const metadata: PageMetadata = {
  title: 'Oops',
  description: 'Error 404, not found!',
  // ...
};

@Page({
  name: 'app-page-404',
})
export class AppPage404 extends TiniComponent {
  @UseMeta() meta!: Meta;

  onReady() {
    this.meta.setPageMetadata(metadata);
  }
}
```

## License

**@tinijs/meta** is released under the [MIT](./LICENSE) license.
