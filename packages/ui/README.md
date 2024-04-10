# Tini UI 

The UI system of the TiniJS Framework.

It is a collection of UI components, themes and icons packages that are used to build UIs for TiniJS applications.

All the components and icons components are standard web custom elements, which can be used with any web frameworks or in plain HTML.

Homepage: <https://ui.tinijs.dev>

> [!IMPORTANT]
> TODO: this README is a draft, implement the UI packages and add documentation.

## Install

`npm i @tinijs/cli @tinijs/ui`

## Usage

Config `tini.config.ts` to use:

```ts
export default defineTiniConfig({
  ui: {
    sources: ['@tinijs/ui'],
    families: {
      bootstrap: {
        skins: ['light', 'dark']
      },
      material: {
        skins: ['light']
      }
    }
  }
})
```

Run `tini ui build` to build ui packs.

Use the components in your application:

```ts
import {TiniButtonComponent} from '@tinijs/ui';
```

## License

**@tinijs/ui** and its sibling packages are released under the [MIT](./LICENSE) license.
