+++json
{
  "status": "publish",
  "title": "Customization",
  "category": "guides"
}
+++

To customize UI packages and components, there are several ways:

1. Override skin variables
2. Use parts
3. Use `styleDeep` attribute

## Override skin variables

At the [setup step](/ui/get-started), you can quickly override skin variables to customize the look of a skin. 

Override skin variables is suitable for a quick change of color, border, radius, ... For a more complex customization, you should [create your own skin](/ui/skin).

```ts
const ui = setupUI({

  skins: {
    'bootstrap/light': [
      bootstrapLightSkin,
      css`
        :root {
          --color-primary: abc;
          --color-success: xyz;
        }
      `,
    ],
  },

});
```

## Use parts

Use `::part()` selector to target a specific part of a component, this is the standard way to customize custom elements.

```css
tini-button::part(main) {
  color: aqua;
}
```

## Use `styleDeep` attribute

Write CSS to target any element inside a component shadow DOM.

```ts
class XXX {

  render() {
    return html`
      <tini-button .styleDeep=${this.customButtonStyles}>A button</tini-button>
    `;
  }

  readonly customButtonStyles = css`
    .main {
      color: aqua;
    }
  `;

}
```

Or inline, but please make sure the value is **SAFE** to use because [`unsafeCSS`](https://lit.dev/docs/api/styles/#unsafeCSS) is utilized under the hood for string value.

```html
<tini-button styleDeep=".main { color: aqua; }">A button</tini-button>
```
