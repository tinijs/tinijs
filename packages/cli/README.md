# @tinijs/cli

**The CLI for the TiniJS framework and beyond.**

- [@tinijs/cli](#tinijscli)
  - [Install](#install)
  - [Usage](#usage)
    - [Using in a TiniJS app](#using-in-a-tinijs-app)
    - [Customize commands and expand the CLI](#customize-commands-and-expand-the-cli)
  - [Development](#development)
    - [Add a new command](#add-a-new-command)
    - [Add a new util](#add-a-new-util)
  - [License](#license)

## Install

- Create a TiniJS app:

`npx @tinijs/cli new my-app --latest`

- Or, add it to an existing project:

`npm i -g @tinijs/cli`

- Or, install it globally:

`npm i -g @tinijs/cli`

For more, please visit: <https://tinijs.dev>

## Usage

### Using in a TiniJS app

Please run `tini` for available commands and usage detail.

### Customize commands and expand the CLI

Beside the built-in commands for working with TiniJS apps, you can add your own commands and utilities to the CLI.

```ts
export default defineTiniCLIExpansion({
  meta: {
    name: 'my-cli-expansion',
  },
  setup () {
    return {
      'my-command': () => import('./commands/my-command.js').then(resolveCommand),
    }
  }
})
```

## Development

### Add a new command

Add a file in `cli/commands/<name>.ts`, for example:

```ts
import {createCLICommand} from '../utils/cli.js';

export const xxxCommand = createCLICommand(
  { /* command definition */ },
  async (args, callbacks) => {
    // run logic
  },
  { /* optional callbacks */ },
);

export default xxxCommand;
```

### Add a new util

Similar to adding a new command, add a new file: `lib/utils/<name>.ts`

## License

**@tinijs/cli** is released under the [MIT](./LICENSE) license.
