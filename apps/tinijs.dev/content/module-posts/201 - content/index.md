+++json
{
  "status": "publish",
  "title": "Get started",
  "category": "content"
}
+++

**Tini Content** module is a file-based public content management system for Tini apps and other frameworks or no framework. It is a simple solution for apps with a small amount of content (up to thousands documents per collection) and no need for a database.

Content are organized in collections and documents, and can be written in Markdown, HTML, Nunjucks, or any other format powered by [Eleventy](https://www.11ty.dev/).

See an example: <https://github.com/tinijs/tinijs/tree/main/apps/tinijs.dev/content>

## Features

- Write content in Markdown, HTML, Nunjucks, ...
- Build content with a single command
- Support almost any data model with built-in composable interfaces
- Include utils and service for getting and searching content
- Manage images and other uploaded assets
- Work with TiniJS and other frameworks or no framework

## Installation

Make sure you have [Tini CLI](/cli) installed, if not run `npm i -D @tinijs/cli`.

Also, commit any change before adding the module.

### Add the module

```sh
npx tini module add @tinijs/content
```

The above command will install the `@tinijs/content` package and copy sample assets to the `content` folder.

More detail about working with content, please see the [Manage content](/module/content-manage) page.

### Use with TiniJS apps

For using Tini Content with a TiniJS app, config `tini.config.ts` to include the module so that when run `npm run build` it will build the content first before building the app.

```ts
export default defineTiniConfig({
  modules: ['@tinijs/content']
});
```

With options.

```ts
import type {ContentModuleOptions} from '@tinijs/content/module';

export default defineTiniConfig({
  modules: [
    ['@tinijs/content', {
      dir: 'app-content', // default is 'content'
      outDir: 'public', // default is 'app/public'
    } as ContentModuleOptions]
  ]
});
```

### Register CLI commands

You can register expanded CLI commands in `tini.config.ts` for running them manually.

```ts
export default defineTiniConfig({
  cli: {
    expand: ['@tinijs/content'],
  }
});
```

Now you can build the content using the `content build` command:

```sh
npx tini content build
```

Or, add scripts to `package.json`:

```json
{
  "scripts": {
    "content": "tini content build",
    "dev": "npm run content && tini dev",
    "build": "npm run content && tini build"
  }
}
```

Please note, for now, there is **NO WATCH** for change, please run the command manually when you update the `content` folder. For detail command usage, please see the [Content CLI expansions](/module/content-cli) page.

## Frameworks

For other frameworks, please see:

- [Vanilla (no framework)](/module/content-no-framework) - use Tini Content without a framework
- [Vue](/module/content-vue) - use Tini Content in Vue apps
- [React](/module/content-react) - use Tini Content in React a
- [Angular](/module/content-angular) - use Tini Content in Angular apps
- [Svelte](/module/content-svelte) - use Tini Content in Svelte apps
