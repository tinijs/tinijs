+++json
{
  "status": "publish",
  "title": "Author Guide",
  "category": "uncategorized"
}
+++

See example modules:
  - Tini Content - <https://github.com/tinijs/tinijs/tree/main/packages/content>
  - Tini PWA - <https://github.com/tinijs/tinijs/tree/main/packages/pwa>

## Create a new module

Download the [Module Starter Template](https://github.com/tinijs/module-starter), or using the CLI to create a new module (similar to creating a new app):

```bash
npx @tinijs/cli@latest new my-module -t module
```

Follow the `README.md` file to start the devlopement and publish the expansion to NPM.

## Use an existing project

- Step 1: create `module/index.ts`

```ts
import {defineTiniModule} from '@tinijs/project';

export type MyModuleOptions = {
  foo?: string;
};

export default defineTiniModule<MyModuleOptions>({
  meta: {
    name: 'my-module',
    url: 'url-to-usage', // optional usage url
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

- Step 2: add to `package.json`

```json
{
  "exports": {
    "./module-loader": "./dist/module/index.js"
  }
}
```

Start the development and publish the module to NPM.

## Local modules

You can also create a module in the local project.

Follow **Step 1** and **Step 2** of _"Use an existing project"_ above, then add the module to the `tini.config.ts` file.

```ts
import myModule from './module/index.js';

export default defineTiniConfig({

  modules: [
    myModule
  ],

});
```