+++json
{
  "status": "publish",
  "title": "Compile",
  "category": "uncategorized"
}
+++

Compile is an optional but recommended step in the dev/build workflow for TiniJS apps. You can think of it as a transformation step that takes the source code and transforms it before forwarding the code to the build tool.

With the **Default Compiler**, you can use these features:
- Support `SCSS` in `` css`...` ``
- Minify the content `` html`...` ``
- Inject environment variables to `configs/<env>.ts` and choose a config file based on the target environment
- _More in the future ..._

You can config the compile step behaviors in the `tini.config.ts` file.

```js
export default defineTiniConfig({

  // compile step is enabled by default
  compile: {

    // default to the Default Compiler (@tinijs/default-compiler)
    // you can use your own compiler
    compiler: 'a-compiler',

    // you can set options for the Default Compiler
    options: {
      // ignore certain files, please see: https://github.com/micromatch/picomatch
      ignorePatterns?:  string[],
      // compile html``, default is enable, set false to disable
      compileTaggedHTML?: false | {
        minify?: false; // minify the template literals or not (default is minified)
      },
      // compile css``, default is enable, set false to disable
      // or set options for SASS: https://sass-lang.com/documentation/js-api/interfaces/stringoptions/
      compileTaggedCSS?: false | SASSOptions,
    }
  },

  // or, disable the compile step
  compile: false,

});
```

## Compile HTML

Look for `` return html` `` and `` `; `` in your source code, the content inside the template literals will be compiled.

**Limitations**, nested `` html`...` `` will be kept as is, split the nested templates into smaller templates instead:

```ts

class XXX {

  helloTemplate() {
    return html`<h1>Hello World</h1>`;
  }

  render() {
    return html`
      <div>${this.helloTemplate()}</div>
    `;
  }
}
```

## Compile CSS

Look for `` css` `` and `` `; ``/`` `, `` in your source code, the content inside the template literals will be compiled.

**Limitations**, use `${}` inside the templates will break SASS compilation, add `/* no-sass */` to skip.

```ts
const style1 = css`
  // scss code
  // will be compiled
`;

const style2 = `
  // scss code
  // will not be compiled
`;

class XXX {

  static styles = css`
    /* no-sass */

    // scss code
    // will not be compiled
  
    ${style1}
    ${unsafeCSS(style2)}
  `;

}
```

## Client app configs

Put `configs/<env>.ts` files in the `app` folder, the environment variables will be injected into the files.

**IMPORTANT**: all the config in `configs` folder are for the client app only, don't expose sensitive information.

```ts
export const config: AppConfig = {
  foo: 'bar',
  baz: process.env.BAZ,
  qux: process.env.QUX,
};
```

During the `npm run dev` the file `configs/development.ts` will be used, during the `npm run build` the file `configs/production.ts` or `configs/<env>.ts` (flag `--target <env>`) will be used.

```bash
npx tini build --target qa|staging|xxx
```
