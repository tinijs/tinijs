+++json
{
  "status": "publish",
  "title": "Vanilla (no framework)",
  "category": "content"
}
+++

Install [Tini CLI](/cli) by running `npm i -D @tinijs/cli`.

Add `tini.config.ts` to the root of your project:

```ts
import {defineTiniConfig} from '@tinijs/project';

export default defineTiniConfig({});
```

Add content module to your project by running `npx tini module add @tinijs/content`.

Now you can start adding content to your project, please see [Manage content](/module/content-manage) page for more details.

After adding content, you can build the content using the `npx tini content build` command.

To consume the content, please see [Access content](/module/content-access) page.
