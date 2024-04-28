+++json
{
  "status": "publish",
  "title": "Dev and Build",
  "category": "uncategorized"
}
+++

The **development and build workflow** of TiniJS are backed by any of your favorite tools. You can either set them up manually or automatically using [Tini CLI](https://tinijs.dev/cli) and official builders. Some of the tools currently available are: **Vite**, **Parcel** and **Webpack**.

In theory, you can use any other tools (Turbo Pack, Gulp, ...). But I don't have time to try them, it is opened up for community contribution.

## Vite (default, recommended)

Homepage: <https://vitejs.dev/>

### Setup

**Option 1**: Via **Tini CLI** (recommended)

1. Install: `npm i -D @tinijs/cli @tinijs/vite-builder`
2. Add scripts:
  - **dev**: `tini dev`
  - **build**: `tini build`

**Option 2**: Or, manually

1. Install: `npm i -D vite`
2. Add scripts:
  - **dev**: `vite app`
  - **build**: `vite build app --outDir www`

### Config


When use [Tini CLI](/cli) (option 1), you can provide options via `tini.config.ts`.

```ts
import type {BuildOptions} from '@tinijs/vite-builder';

export default defineTiniConfig({

  build: {
    options: {
      configPath?: string;
      // dev
      devCommand?: string | string[];
      devPort?: number;
      devHost?: string;
      onDevServerStart?: () => void;
      // build
      buildCommand?: string | string[];
      // optimazations
      sourcemap?: boolean | 'hidden';
      transformTemplates?: boolean;
    } as BuildOptions,
  },

});
```

## Parcel

Homepage: <https://parceljs.org/>

### Setup

**Option 1**: Via **Tini CLI** (recommended)

1. Install: `npm i -D @tinijs/cli @tinijs/parcel-builder`
2. Config _tini.config.ts_, set **build.builder** to `@tinijs/parcel-builder`
3. Add scripts:
  - **dev**: `tini dev`
  - **build**: `tini build`

**Option 2**: Or, manually

1. Install: `npm i -D parcel @parcel/config-default`
2. Add scripts:
  - **dev**: `parcel app/index.html --dist-dir www`
  - **build**: `parcel build app/index.html --dist-dir www`

### Additional setup

Either using Tini CLI or setup manually, you need to do these additional setup.

- Modify _package.json_
```json
{
  "browserslist": "> 0.5%, last 2 versions, not dead",
  "@parcel/resolver-default": {
    "packageExports": true
  }
}
```

### Config

When use [Tini CLI](/cli) (option 1), you can provide options via `tini.config.ts`.

```ts
import type {BuildOptions} from '@tinijs/parcel-builder';

export default defineTiniConfig({

  build: {
    builder: '@tinijs/parcel-builder',
    options: {
      configPath?: string;
      // dev
      devCommand?: string | string[];
      devPort?: number;
      devHost?: string;
      onDevServerStart?: () => void;
      // build
      buildCommand?: string | string[];
      // optimazations
      sourcemap?: boolean;
    } as BuildOptions,
  },

});
```

## Webpack

Homepage: <https://webpack.js.org/>

### Setup

**Option 1**: Via **Tini CLI** (recommended)

1. Install: `npm i -D @tinijs/cli @tinijs/webpack-builder`
2. Config _tini.config.ts_, set **build.builder** to `@tinijs/webpack-builder`
3. Add scripts:
  - **dev**: `tini dev`
  - **build**: `tini build`

**Option 2**: Or, manually

1. Install: `npm i -D webpack webpack-cli webpack-dev-server html-bundler-webpack-plugin ts-loader`
2. Add _webpack.config.js_, please see [example](https://github.com/tinijs/tinijs/blob/main/packages/webpack-builder/webpack.config.js).
3. Add scripts:
  - **dev**: `webpack serve --history-api-fallback --mode development`
  - **build**: `webpack build --mode production`

### Config

When use [Tini CLI](/cli) (option 1), you can provide options via `tini.config.ts`.

```ts
import type {BuildOptions} from '@tinijs/webpack-builder';

export default defineTiniConfig({

  build: {
    builder: '@tinijs/webpack-builder',
    options: {
      configPath?: string;
      // dev
      devCommand?: string | string[];
      devPort?: number;
      devHost?: string;
      onDevServerStart?: () => void;
      // build
      buildCommand?: string | string[];
      // optimazations
      sourcemap?: 'source-map' | 'hidden-source-map';
    } as BuildOptions,
  },

});
```
