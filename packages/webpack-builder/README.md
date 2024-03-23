# @tinijs/webpack-builder

TODO: Build TiniJS apps using Webpack.

Config `tini.config.ts` to use this builder:

```ts
export default defineTiniConfig({
  build: {
    builder: 'webpack',
  }
  // ...
})
```

Now, `tini dev` and `tini build` will use this builder.

## License

**@tinijs/webpack-builder** is released under the [MIT](./LICENSE) license.
