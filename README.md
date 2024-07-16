# TiniJS Framework

The TiniJS Framework (meta-framework) is a collection of tools for building web applications from start to finish. It is based on [Lit](https://lit.dev) and aims to provide a native, lightweight, interoperable platform for building web applications.

For more details and usage, please visit <https://tinijs.dev>

## Development

- Fork the repository
- Install the dependencies: `npm i`. Install new dependencies for a specific package: `npm i <name> -w @tinijs/<package-name>`
- Format: `npm run fix`
- Lint: `npm run lint`
- Test: `npm run test`
- Build:
  - All: `npm run build`
  - Specific: `npm run build -- --scope @tinijs/<package-name>`

## Release

The `npm run release` script does the following:

1. Release the main packages inside `./packages` using Lerna (**MUST** run first)
2. Release the `@tinijs/ui-*` packages inside `./packages/ui/build` using a custom script

### Prebuilt UI packages

Prebuilt UI packages are released using the `release-ui` script.

```bash
npx tsx ./scripts/release-ui.mts
```

| Option              | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `--dir <path>`      | The path to the UI build dir, default `./packages/ui/build`            |
| `--pick <names>`    | Pick certain packages to release, provide dir names in comma-separated |
| `--version <value>` | Provide a version, default to field `version` in lerna.json            |

### Individual release

In case of small changes and hotfixes, packages can be released individually.

- Manually update `package.json`:
  - The `version` field
  - The `dependencies, devDependencies` fields (if packages depend on each other)
- Release:
  - Normal packages: `cd packages/<name> && npm publish`
  - UI packages (if required): at the root, run `npx tsx ./scripts/release-ui.mts --version <version>`

## License

**The TiniJS Framework** is released under the [MIT](./LICENSE) license.
