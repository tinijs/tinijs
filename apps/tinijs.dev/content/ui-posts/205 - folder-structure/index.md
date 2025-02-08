+++json
{
  "status": "publish",
  "title": "Folder Structure",
  "category": "guides"
}
+++

Using the [CDN and prebuilt packages](/ui/get-started) is common and convenient, but for advance use cases where we may want to override vendor skins and elements or adding new skins and elements.

Using the `ui build` command you can do the following:
- Override vendor skins, bases and elements
- Add new skins, bases
- Add new elements
- Build icon elements
- Create new theme families
- Build and distribute your own UI packages

An UI project is structured as follows:

```txt
ui/
  elements/
    element-1.ts
    element-2.ts
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
        element-1.ts
        element-2.ts
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
        element-1.ts
        element-2.ts
        ...
    ...
```

Put the `ui` folder in the root of any project, under it you can create the `elements` folder and `styles` folder.

The `elements` folder contains the element files, these elements are unique and will be share across all theme families.

The `styles` folder contains theme families, each theme family has `bases`, `skins` and `souls` folders.

Please see the **official Tini UI** as an example project: <https://github.com/tinijs/tinijs/tree/main/packages/ui/ui>
