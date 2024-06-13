+++json
{
  "status": "publish",
  "title": "Customization",
  "category": "guide"
}
+++

## For consumers

There are several ways to customize Tini UI components:

1. Override skin variables
2. Use parts
3. Use `styleDeep` attribute

### Override skin variables

At the setup step, you can override skin variables to customize the default look of a skin, see [Get started](/ui/get-started).

```ts
const customBootstrapLightSkin = css`
  :root {
    --color-primary: abc;
    --color-success: xyz;
  }
`;

const ui = setupUI({

  skins: {
    'bootstrap/light': [
      bootstrapLightSkin,
      customBootstrapLightSkin,
    ],
  },

});
```

### Use parts

Use `::part()` to target a specific part of a component. This is the standard way to customize custom elements.

```css
tini-button::part(main) {
  color: aqua;
}
```

### Use `styleDeep` attribute

Write any CSS to target any element inside a component shadow DOM.

```ts
class XXX {

  render() {
    return html`
      <tini-button .styleDeep=${this.customStyle}>A button</tini-button>
    `;
  }

  readonly customStyle = css`
    .main {
      color: aqua;
    }
  `;
}
```

Or inline style:

```html
<tini-button styleDeep=".main { color: aqua; }">A button</tini-button>
```

## For authors

TODO: add instructions
