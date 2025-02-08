+++json
{
  "status": "publish",
  "title": "Icon Elements",
  "category": "guides"
}
+++

Icons can be built from files (svg, png, ico, ...) into prebuilt elements.

```ts
export default defineTiniConfig({

  ui: {

    // build icon elements
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

  }

});
```

Icon elements will be output to the `/icons` folder. You can now register and use them as normal elements.

```ts
import { IconAbcElement } from './ui/icons/abc.js';
import { IconXyzElement } from './ui/icons/xyz.js';

registerElements([IconAbcElement, IconXyzElement]);
```

```html
<icon-abc></icon-abc>
<icon-xyz></icon-xyz>
```
