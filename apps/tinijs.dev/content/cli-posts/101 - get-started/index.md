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

There are several TiniJS starters for getting started with TiniJS quickly, you can find them in the [Starters](/framework/get-started) page.

```bash
npx @tinijs/cli@latest new my-app -l
```

Run a command:

```bash
npx tini generate component my-component
```

### Install locally

Drop Tini CLI into any project add runs it using `scripts` or `npx`.

```bash
npm i @tinijs/cli
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
npx tini generate component my-component
```

### Install globally

Install Tini CLI globally to use it in any project.

```bash
npm i -g @tinijs/cli
```

Run a command:

```bash
tini generate component my-component
```

## Usage

After installing Tini CLI, you can run the built-in commands or config to use expandable commands.

List of built-in commands:

| Built-in command | Description |
| --- | --- |
| [`docs`](/cli/docs) | Open the homepage. |
| [`info`](/cli/info) | Output project info. |
| [`new`](/cli/new) | Create a new project using a starter. |
| [`dev`](/cli/dev) | Start a development server. |
| [`build`](/cli/build) | Build the project for production. |
| [`preview`](/cli/preview) | Preview the production build. |
| [`generate`](/cli/generate) | Generate assets like components, pages, layouts, etc. |
| [`module add`](/cli/module-add) | Add a Tini Module to the project. |

List of official expanded commands:

| Official expansions | Description |
| --- | --- |
| [`content build`](/cli/content-build) | Build content using `@tinijs/content`. |
| [`ui build`](/cli/ui-build) | Build UI packs using `@tinijs/ui`. |

And any community or private expansions, please refer to the [CLI expansion](/cli/expansion).
