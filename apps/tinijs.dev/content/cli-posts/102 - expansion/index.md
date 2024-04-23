+++json
{
  "status": "publish",
  "title": "CLI Expansion",
  "category": "uncategorized"
}
+++

Tini CLI has an **expandable architect** where you can add more commands to be used various purposes.

More commands can be added into the original CLI, then you can run the extra commands similar to any built-in command. There are 3 types of expansions (or expansion packs): **official** expansions, **community** expansions and **private** expansions.

For official expansions, please see the **Official Expansions** category.

## Community expansions

- Add your shared expansions here

## Author an expansion

You can create expansions for using in your own projects or distribute them to be used by others.

See an example: <https://github.com/tinijs/tinijs/blob/main/packages/content/cli/expand.ts>

- Create `cli/expand.ts`:

```ts
import {defineTiniCLIExpansion, resolveCommand} from '@tinijs/cli';

export default defineTiniCLIExpansion({
  meta: {
    name: 'some-name',
  },
  setup() {
    return {
      xxx: () => import('./commands/xxx.js').then(resolveCommand),
    };
  },
});
```

- Create a command file `cli/commands/xxx.ts`:

```ts
import {createCLICommand} from '@tinijs/cli';

export const xxxCommand = createCLICommand({
  meta: {
    name: 'xxx',
    description: 'Command description.',
  },
  async (args) => {
    // command logic
  }
});

export default xxxCommand;
```

- Add to `package.json`:

```json
{
  "name": "some-name",
  "exports": {
    "./cli-expansion": "./dist/cli/expand.js"
  },
}
```

- Publish the package for others to use.

```ts
import {defineTiniConfig} from '@tinijs/project';

export default defineTiniConfig({

  cli: {
    expand: ['some-name'],
  },

});
```