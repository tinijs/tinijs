+++json
{
  "status": "publish",
  "title": "Heading",
  "category": "elements"
}
+++

## Import

<app-element-import elementName="heading"></app-element-import>

## Editor

<content-ui-post-heading block="editor"></content-ui-post-heading>

## API

| Property                  | Description                                                                                    | Default  |
| ------------------------- | ---------------------------------------------------------------------------------------------- | -------- |
| `level`                   | `1`, `2`, `3`, `4`, `5`, `6`                                                                   | `1`      |
| `preset`                  | `selfLink`, `insideLinkBefore`, `insideLinkAfter` or [custom heading preset](#heading-presets) | -        |
| `linkHref`                | Auto generated or any custom link `href`                                                       | Auto     |
| `linkTarget`              | `string`                                                                                       | `_self`  |
| _Self permalink_          |
| `selfLinkVisibility`      | `always`, `hover`, `adaptive`                                                                  | `always` |
| `selfLinkColor`           | Self permalink color, [colors](/ui/design-tokens#colors) or valid CSS                          | -        |
| `selfLinkDecoration`      | `string`                                                                                       | -        |
| `selfLinkUnderlineOffset` | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                         | -        |
| _Inside permalink_        |
| `insideLinkSymbol`        | `string`                                                                                       | `#`      |
| `insideLinkPlacement`     | `before`, `after`                                                                              | `after`  |
| `insideLinkVisibility`    | `always`, `hover`, `adaptive`                                                                  | `always` |
| `insideLinkRawIcon`       | `boolean` - use raw symbol icon                                                                | -        |
| `insideLinkColor`         | Inside permalink color, [colors](/ui/design-tokens#colors) or valid CSS                        | -        |
| `insideLinkSize`          | `0.25` to `1`                                                                                  | `1`      |
| `insideLinkSpace`         | `0.25` to `1`                                                                                  | `0.25`   |

### Parts

| Part              | styleDeep  | Description                                 |
| ----------------- | ---------- | ------------------------------------------- |
| `tini-heading {}` | `:host {}` | The tini-heading element                    |
| `::part(link) {}` | `.link {}` | The permalink element (if enabled)          |
| `::part(icon) {}` | `.icon {}` | Inside permalink symbol icon (if available) |

## Guides

### What are heading links?

The term **link** in the context of the `tini-heading` element refers to these 2 kinds of things:
- Child links: normal links inside the heading
- Permalinks (or anchor links): which is attached to the heading as an additional part of the heading

There are 2 built-in types of permalink:
- `selfLink`: permalink on the heading itself
- `insideLink`: before/after permalink inside the heading

### Heading presets

Heading presets are a set of predefined configurations for the heading element.

There are 3 built-in presets:
- `selfLink`: heading with a permalink on the heading itself
- `insideLinkBefore`: inside permalink before the heading with the `#` symbol, visible on hover for desktop and always visible for mobile
- `insideLinkAfter`: inside permalink after the heading with the `#` symbol, always visible

Though some of the properties can be customized using the attributes, but it's recommended to register custom presets. At the beginning of the app, config the `tini-heading` element:

```js
import {TiniHeadingElement} from '/path/to/ui/elements/heading.js';

TiniHeadingElement.config({
  presets: {}, // custom presets
  styles: css``, // additional styles
});
```

#### Custom `selfLink` preset

Use the `headingSelfLinkPreset()` helper to create a custom `selfLink` preset:

```js
import {headingSelfLinkPreset} from '/path/to/ui/elements/heading.js';

TiniHeadingElement.config({
  presets: {
    presetName: headingSelfLinkPreset({
      visibility?: 'always' | 'hover' | 'adaptive',
      color?: string, // link color
      decoration?: string, // link decoration
      underlineOffset?: string, // underline offset value
    })
  },
});
```

#### Custom `insideLink` preset

Use the `headingInsideLinkPreset()` helper to create a custom `insideLink` preset:

```js
import {headingInsideLinkPreset} from '/path/to/ui/elements/heading.js';

TiniHeadingElement.config({
  presets: {
    presetName: headingInsideLinkPreset({
      symbol?: string, // symbol text or image URL/URI
      placement?: 'before' | 'after',
      visibility?: 'always' | 'hover' | 'adaptive',
      rawIcon?: boolean, // use raw symbol icon (if available)
      color?: string, // link color
      size?: number, // link size
      space?: number, // space between heading and link
    })
  },
});
```

#### Completely custom preset with or without permalink

Provide a `render()` function to render the custom heading with or without a permalink, use `styles` to provide styles, use `<slot></slot>` to display heading value.

```js
TiniHeadingElement.config({
  presets: {
    presetName: {
      render: ({linkHref}) => html`
        <span>Custom heading</span>
        <slot></slot>
      `,
    },
  },
  styles: css`
    :host([preset='presetName']) {
      /* ... */
    }
  `,
});
```

### RTL

Right to left direction can be set globally on the `<html>` or `<body>` element.

```html
<html dir="rtl"></html>
```

Or locally on the `tini-heading` element.

```html
<tini-heading dir="rtl">Right to left</tini-heading>
```

## Benchmark

<app-element-benchmark reportId="ui-heading"></app-element-benchmark>
