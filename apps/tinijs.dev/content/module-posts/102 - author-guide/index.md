+++json
{
  "status": "publish",
  "title": "Author Guide",
  "category": "uncategorized"
}
+++

See example modules:
- Tini Content - <https://github.com/tinijs/tinijs/tree/main/packages/content>

## Create a module

- Create `module/index.ts`

```ts
import {defineTiniModule} from '@tinijs/project';

export type MyModuleOptions = {
  foo?: string;
};

export default defineTiniModule<MyModuleOptions>({
  meta: {
    name: 'my-module',
  },
  init() {
    return {
      // initial instructions
    };
  },
  async setup(options, tini) {
    // do something with options and tini (a Tini project instance)
  },
});
```

- Add to `package.json`

```json
{
  "name": "my-module",
  "exports": {
    "./module-loader": "./dist/module/index.js"
  }
}
```

- Publish to NPM for others to use

```sh
npx tini module add my-module
```

**TODO:** Add more detail instructions.
