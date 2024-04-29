+++json
{
  "status": "publish",
  "title": "CLI Expansion",
  "category": "uncategorized"
}
+++

Tini CLI has an **expandable architect** where you can add more commands to be used various purposes.

More commands can be added into the original CLI, then you can run the extra commands similar to any built-in command. There are 3 types of expansions (or expansion packs): **official** expansions, **community** expansions and **local/private** expansions. For official expansions, please see the **Official Expansions** category.

In any project, you can install the [Tini CLI](/cli) and one or more expansion packs, then config `tini.config.ts` to use the expansions:

```ts
import {defineTiniConfig} from '@tinijs/project';

export default defineTiniConfig({

  cli: {
    // list of installed expansions
    expand: [
      'some-name-1',
      'some-name-2'
    ],

    // disable autoload official and local expansions, default: false (auto load all available)
    // undefined or false: auto load all available
    // true: disable all auto load
    // string[]: disable specific ones, example: ['local', '@tinijs/content']
    noAutoExpansions: true,
  },

});
```

If an expandable command already exists in the CLI built-in list, it will be skipped. You can disable the built-in commands by setting `noBuiltins: true` or set individual command to `false`.

## Community expansions

You can create expansions for using in your own projects or distribute them to be used by others.

### List of community expansions

- Add your shared expansions here

### Author an expansion

You can either start a new expansion or add to an existing project.

Examples:
  - Tini Content CLI: <https://github.com/tinijs/tinijs/blob/main/packages/content/cli/expand.ts>
  - Tini UI CLI: <https://github.com/tinijs/tinijs/blob/main/packages/ui/cli/expand.ts>

#### Start a new expansion

Download the [CLI Expansion Starter Template](https://github.com/tinijs/cli-expansion-starter), or using the CLI to create a new expansion (similar to creating a new app):

```bash
npx @tinijs/cli@latest new my-cli -t cli-expansion
```

Follow the `README.md` file to start the devlopement and publish the expansion to NPM.

#### Use an existing project

Use can also create an expansion in a exisiting package in 3 steps:

- **Step 1**: Create `cli/expand.ts`:

```ts
import {defineTiniCLIExpansion, resolveCommand} from '@tinijs/cli';

export type MyCLIExpansionOptions = {};

export default defineTiniCLIExpansion<MyCLIExpansionOptions>({
  meta: {
    name: 'some-name',
  },
  setup(options, tini) {
    return {
      xxx: () => import('./commands/xxx.js').then(resolveCommand),
    };
  },
});
```

- **Step 2**: create a command file `cli/commands/xxx.ts`:

```ts
import {createCLICommand} from '@tinijs/cli';

export const xxxCommand = createCLICommand({
  meta: {
    name: 'xxx',
    description: 'The command description.',
  },
  async (args) => {
    // command logic
  }
});

export default xxxCommand;
```

- **Step 3**: add to `package.json`:

```json
{
  "exports": {
    "./cli-expansion": "./dist/cli/expand.js"
  },
}
```

Start the developement and publish your package to NPM.

## Local expansions

You can create private expansions for using in your own projects.

Follow **Step 1** and **Step 2** of _"Use an existing project"_ above.

Local expansion will be loaded automatically. Then run `npx tini` to see the if the command is available.
