+++json
{
  "status": "publish",
  "title": "Customization",
  "category": "guide"
}
+++

## Create a skin

You can use the **Skin Editor** to create a skin for a theme family.

Or, you can create a skin manually, see [an example](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/bootstrap/skins/light.ts).

## Customize components

There are several ways to customize Tini UI components:
1. Use parts
2. Use `styleDeep` attribute
3. Clone the component

### Use parts

Use `::part()` to target a specific part of a component.

```cs
tini-button::part(main) {
  color: aqua;
}
```

### Use `styleDeep` attribute

Write any CSS to target any element inside a component shadow DOM.

```html
<tini-button styleDeep=".main { color: aqua; }">A button</tini-button>
```

### Clone the component

When manage the UI using Tini CLI, you can clone a component source to customize it.

TODO: add instructions

## Create a theme family

TODO: add instructions
