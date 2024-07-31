+++json
{
  "status": "publish",
  "title": "Get Started",
  "category": "uncategorized"
}
+++

**Tini CLI** is an offical tools for conviniently working with TiniJS projects. It provides a set of commands to help you create new projects, start development server, generate assets and build your project for production.

Besides, the CLI is generic enough to be used outside of a TiniJS app, in any project of any kind. It has an **expandable architect** where you can expand more commands to be used in other automation tasks.

## Install

There are 3 ways to install Tini CLI:
1. Included in TiniJS Starters
2. Install locally
3. Install globally

### Create a new project

There are several TiniJS starters for getting started with TiniJS quickly, you can find them in the [Starters](/framework/starter-templates) page.

```bash
npx @tinijs/cli@latest new my-app
```

Run a command:

```bash
npx tini docs
```

### Install locally

Drop Tini CLI into any project add runs it using `scripts` or `npx`.

```bash
npm i -D @tinijs/cli
```

Add `scripts` to `package.json`:

```json
{
  "scripts": {
    "dev": "tini dev"
  }
}
```

Run a command:

```bash
npx tini docs
```

### Install globally

Install Tini CLI globally to use it in any project.

```bash
npm i -g @tinijs/cli
```

Run a command:


```bash
tini docs
```

## Usage

After installing Tini CLI, you can run the built-in commands or config to use expandable commands.

List of built-in commands:

| Built-in command                | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| [`docs`](/cli/docs)             | Open the homepage.                                    |
| [`info`](/cli/info)             | Output project info.                                  |
| [`new`](/cli/new)               | Create a new project using a starter.                 |
| [`dev`](/cli/dev)               | Start a development server.                           |
| [`build`](/cli/build)           | Build the project for production.                     |
| [`preview`](/cli/preview)       | Preview the production build.                         |
| [`generate`](/cli/generate)     | Generate assets like components, pages, layouts, etc. |
| [`module add`](/cli/module-add) | Add a Tini Module to the project.                     |

List of official expandable commands:

| Official expansions       | Description                                         |
| ------------------------- | --------------------------------------------------- |
| [`content`](/cli/content) | Provided by [Tini Content](/module/content) module. |
| [`server`](/cli/server)   | Provided by [Tini Server](/module/server).          |
| [`ui`](/cli/ui)           | Provided by [Tini UI](/ui).                         |

And any community or private expansions, please refer to the [CLI expansion](/cli/expansion).

## Config

You can config CLI behaviors using the `cli` field in the `tini.config.ts`

```ts
import {defineTiniConfig} from '@tinijs/project';

export default defineTiniConfig({

  cli: {
    noBuiltins: true, // disable all built-in commands, default: false (enable)
    docs: false, // enable/disable 'docs' command, default: true (enable)
    info: false, // enable/disable 'info' command, default: true (enable)
    new: false, // enable/disable 'new' command, default: true (enable)
    dev: false, // enable/disable 'dev' command, default: true (enable)
    build: false, // enable/disable 'build' command, default: true (enable)
    preview: false, // enable/disable 'preview' command, default: true (enable)
    generate: false, // enable/disable 'generate' command, default: true (enable)
    module: false, // enable/disable 'module' command, default: true (enable)
  },

});
```
