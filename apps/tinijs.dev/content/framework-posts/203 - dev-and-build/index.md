+++json
{
  "status": "publish",
  "title": "Dev and Build",
  "category": "core"
}
+++

The **development and build workflow** of TiniJS are backed by any of your favorite tools. You can either set them up manually or automatically using [Tini CLI](https://tinijs.dev/cli) and official builders. Some of the tools currently available are: **Vite**, **Parcel** and **Webpack**.

In theory, you can use any other tools (Turbo Pack, Gulp, ...). But I don't have time to try them, it is opened up for community contribution.

## Via Tini CLI

Using [Tini CLI](/cli) and official builders is the **recommended** way to setup development and build workflow.

### Vite (default, recommended)

Homepage: <https://vitejs.dev/>

#### Setup

1. Install: `npm i -D @tinijs/cli @tinijs/vite-builder`
2. Add scripts:
  - **dev**: `tini dev`
  - **build**: `tini build`

#### Config

The Vite builder supports basic configuration, you can provide options in `tini.config.ts`.

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
      onDevServerStart?: (context) => void;
      // build
      buildCommand?: string | string[];
      // optimazations
      sourcemap?: boolean | 'hidden';
      transformTemplates?: boolean;
    } as BuildOptions,
  },

});
```

By default, Vite builder using [this default config](https://github.com/tinijs/tinijs/blob/main/packages/vite-builder/vite.config.js), you can create `vite.config.ts` in your project root to with advanced configuration. You can also use the `configPath` option to point to a config file some where else.

### Parcel

Homepage: <https://parceljs.org/>

#### Setup

1. Install: `npm i -D @tinijs/cli @tinijs/parcel-builder`
2. Config _tini.config.ts_, set **build.builder** to `@tinijs/parcel-builder`
3. Add scripts:
  - **dev**: `tini dev`
  - **build**: `tini build`

#### Additional setup

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

#### Config

The Parcel builder supports basic configuration, you can provide options in `tini.config.ts`.

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
      onDevServerStart?: (context) => void;
      // build
      buildCommand?: string | string[];
      // optimazations
      sourcemap?: boolean;
    } as BuildOptions,
  },

});
```

By default, Parcel builder using [this default config](https://github.com/tinijs/tinijs/blob/main/packages/parcel-builder/.parcelrc), you can create `.parcelrc` in your project root to with advanced configuration. You can also use the `configPath` option to point to a config file some where else.

### Webpack

Homepage: <https://webpack.js.org/>

#### Setup

1. Install: `npm i -D @tinijs/cli @tinijs/webpack-builder`
2. Config _tini.config.ts_, set **build.builder** to `@tinijs/webpack-builder`
3. Add scripts:
  - **dev**: `tini dev`
  - **build**: `tini build`

#### Config

The Webpack builder supports basic configuration, you can provide options in `tini.config.ts`.

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
      onDevServerStart?: (context) => void;
      // build
      buildCommand?: string | string[];
      // optimazations
      sourcemap?: 'source-map' | 'hidden-source-map';
    } as BuildOptions,
  },

});
```

By default, Webpack builder using [this default config](https://github.com/tinijs/tinijs/blob/main/packages/webpack-builder/webpack.config.js), you can create `webpack.config.js` in your project root to with advanced configuration. You can also use the `configPath` option to point to a config file some where else.

## Manual setup

If you prefer to setup manually, you can follow these steps for each tools.

### Vite

1. Install: `npm i -D vite`
2. Add scripts:
  - **dev**: `vite app`
  - **build**: `vite build app --outDir www`

### Parcel

1. Install: `npm i -D parcel @parcel/config-default`
2. Add scripts:
  - **dev**: `parcel app/index.html --dist-dir www`
  - **build**: `parcel build app/index.html --dist-dir www`

### Webpack

1. Install: `npm i -D webpack webpack-cli webpack-dev-server html-bundler-webpack-plugin ts-loader`
2. Add _webpack.config.js_, please see [example](https://github.com/tinijs/tinijs/blob/main/packages/webpack-builder/webpack.config.js).
3. Add scripts:
  - **dev**: `webpack serve --history-api-fallback --mode development`
  - **build**: `webpack build --mode production`
