# @tinijs/vite-builder

TODO: Build TiniJS apps using Vite.

Config `tini.config.ts` to use this builder:

```ts
export default defineTiniConfig({
  build: {
    builder: 'vite',
  }
  // ...
})
```

Now, `tini dev` and `tini build` will use this builder.

## License

**@tinijs/vite-builder** is released under the [MIT](./LICENSE) license.
