+++json
{
  "status": "publish",
  "title": "Do it yourself",
  "category": "guide"
}
+++

Using the [CDN and prebuilt packages](/ui/get-started) are convenient, but sometimes you may want to override vendor skins and components or adding new skins and components.

Using the `ui build` command you can do the following:
- Override vendor bases, skins and components
- Provide new bases, skins and components
- Create new theme families
- Build icon components

## Folder structure

An UI project is structured as follows:

```txt
ui/
  components/
    component-1.ts
    component-2.ts
    ...
  styles/
    theme-family-1/
      bases/
        base-1.ts
        base-2.ts
        ...
      skins/
        skin-1.ts
        skin-2.ts
        ...
      souls/
        component-1.ts
        component-2.ts
        ...
    theme-family-2/
      bases/
        base-1.ts
        base-2.ts
        ...
      skins/
        skin-1.ts
        skin-2.ts
        ...
      souls/
        component-1.ts
        component-2.ts
        ...
    ...
```

Put the `ui` folder in the root of your project, under it you can create the `components` and `styles` folders.

The `components` folder contains the component files, these components are unique and will be share across all theme families.

The `styles` folder contains theme families, each theme family has a `bases`, `skins` and `souls` folders.

Please see the official Tini UI as an example: <https://github.com/tinijs/tinijs/tree/main/packages/ui/ui>

## Configuration

Configuration for building UI packages is done in the `tini.config.ts` file, under the `ui` property.

```ts
export default defineTiniConfig({

  ui: {

    // output directory
    outDir?: string;

    // list of sources, the latter will override the former with the same name
    sources?: string[];

    // pick the theme families and their skins
    // string[] -> one or multiple skins
    // true -> all skins
    families?: Record<string, true | string[]>;

    // build icon components
    icons?: Array<
      // path to the directory containing the .svg files
      | string
      // advanced options
      | {
          // path to dir
          dir: string;
          // sub directories
          // string -> look for .svg files in the sub dirs but not included in the icon name
          // suffix = true -> include the sub dir name in the icon name
          // suffix = string -> include the custom suffix in the icon name
          subs?: Array<string | {name: string; suffix?: true | string}>;
          // filter file paths
          filterPaths?: (paths: string[]) => string[];
          // transform file name
          transformName?: (name: string) => string;
        }
    >;

    // output index.json for icons
    outputIconsIndex?: string;

    // allow for later skin selection in contrast of including picked skins automatically
    manualSkinSelection?: true;

    // special build for frameworks (currently only react is supported)
    framework?: 'react';

    // transpile ts to js for distribution
    transpile?: true;

    // create a bundled.js for CDN usage
    bundled?: true;

    // rewrite import paths for distribution
    // true -> use the built-in strategy
    // function -> custom rewrite path function
    rewritePath?: true | ((path: string) => string | null | undefined);

    // output package.json file
    packageJSON?:
      // true -> use the current project package.json
      | true
      // string -> path to the package.json file
      | string
      // object -> package.json object
      | PackageJson
      // function -> custom package.json function
      | ((projectPackageJSON: PackageJson) => PackageJson);

    // output multiple ui packs at once
    outPacks?: Array<
      Partial<Omit<UIConfig, 'outPacks'>> & {
        // output directory
        outDir: string;
        // do not extend the whatever base config
        extends?: false
      }
    >;

  }

});
```

At the minimum, you must provide a list of `sources` and pick the theme `families` and their skins.

By default the `outDir` is `app/ui`, it is called local UI packages.

```ts
export default defineTiniConfig({

  ui: {

    sources: [
      // from node_modules (package name)
      '@tinijs/ui',
      // or/and from local (must start with './' or '../')
      './ui'
    ],

    families: {
      // one skin
      bootstrap: ['light'],
      // multiple skins
      material: ['light', 'dark'],
      // all skins
      shadcn: true
    }

  }

});
```

## Author components

Components live in the `components` folder, the name of the file will be used in the class name (TiniFooComponent) and the tag name `tini-foo`.

See the example button component: [components/button.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/components/button.ts)

A component is structured as follow.

```ts
import {html, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';

import {TiniElement} from '@tinijs/core';

export default class extends TiniElement {

  @property({type: String, reflect: true}) prop1?: string;
  @property({type: Number, reflect: true}) prop2?: number;

  protected render() {
    return html`
      <div class="main" part="main">
        <!-- ... -->
      </div>
    `;
  }

}
```

Notice that UI components are different from app components, they are extends `TiniElement` (instead of `TiniComponent`) and using pure Lit syntax.

## Author theme families

Create a folder with the theme family name under the `styles` folder, then create the `bases`, `skins` and `souls` folders inside it.

### Bases

Bases enforce the styles of native elements.

See an example Bootstrap base file: [bootstrap/bases/content.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/bootstrap/bases/content.ts)

```ts
export default css`
  h1 {
    /* ... */
  }

  a {
    /* ... */
  }

  code {
    /* ... */
  }
`;
```

### Skins

Skins are the look of the theme family, they provide the colors, fonts, sizes and other variables.

Example Fluent light skin: [fluent/skins/light.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/fluent/skins/light.ts)

```ts
export default css`
  :root {
    --font-title: 'Roboto', sans-serif;
    --color-primary: #007bff;
    --size-radius: .25;
  }
`;
```

### Souls

Souls are the styles of the components, the name of the file must match the component name.

Example Shadcn button soul: [shadcn/souls/button.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/shadcn/souls/button.ts)

```ts
const styles = css`
  :host {
    /* ... */
  }

  .main {
    /* ... */
  }
`;

export default {styles};
```

Beside styles, you can also provide the custom templates and scripts for the component. It is optional, but useful when you need addtional elements or behaviors.

For example, scripting the ripple effect for Material button: [material/souls/button.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/material/souls/button.ts)

```ts
const templates = {
  'main:children': html`<p>Add this as a child of the main part.</p>`,
  'main:siblings': html`<p>Add this as a sibling of the main part.</p>`,
  'main': html`<p>Or, replace the main part with this.</p>`,
};

const scripts: ThemingScripts = {
  activate: elem => {
    // do something when the theme family is activated
  },
  deactivate: elem => {
    // do something when the theme family is deactivated
  },
};

export default {styles, templates, scripts};
```
