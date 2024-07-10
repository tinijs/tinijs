+++json
{
  "status": "publish",
  "title": "Build Packages",
  "category": "guides"
}
+++

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

    // allow for later skin selection in contrast of including picked skins automatically
    manualSkinSelection?: true;

    // special build for frameworks (currently only react is supported)
    framework?: 'react';

    // transpile ts to js for distribution
    transpile?: true;

    // create bundled outputs for CDN usage
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

To build the UI packages, run the command:

```bash
npx tini ui build
```
