+++json
{
  "status": "publish",
  "title": "Box",
  "category": "layouts"
}
+++

Fundamental layout building block.

## Import

<app-component-import componentName="box"></app-component-import>

## Editor

<content-ui-post-box block="editor"></content-ui-post-box>

## API

| Property            | Value                                                                                                                                                                       | Default |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `display`           | `none`, `block`, `inline` or `inline-block`                                                                                                                                 | -       |
| _For Flex children_ |
| `flex`              | `string`                                                                                                                                                                    | -       |
| `flexBasis`         | `string`                                                                                                                                                                    | -       |
| `flexShrink`        | `string`                                                                                                                                                                    | -       |
| `flexGrow`          | `string`                                                                                                                                                                    | -       |
| _For Grid children_ |
| `gridColumn`        | `string`                                                                                                                                                                    | -       |
| `gridColumnStart`   | `string`                                                                                                                                                                    | -       |
| `gridColumnEnd`     | `string`                                                                                                                                                                    | -       |
| `gridRow`           | `string`                                                                                                                                                                    | -       |
| `gridRowStart`      | `string`                                                                                                                                                                    | -       |
| `gridRowEnd`        | `string`                                                                                                                                                                    | -       |
| `gridArea`          | `string`                                                                                                                                                                    | -       |
| _Responsive_        |
| `mediaQueries`      | `Record<string, BoxStyleProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `(min-width: 500px)`                | -       |
| `containerQueries`  | `Record<string, BoxStyleProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `container-name (min-width: 500px)` | -       |

### Common utilities

The below properties are also available for [flex](/ui/flex), [grid](/ui/grid) and [container](/ui/container).

| Property              | Value                                                                                                                   | Default |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------- |
| `container`           | `string`                                                                                                                | -       |
| `containerName`       | `string`                                                                                                                | -       |
| `containerType`       | `string`                                                                                                                | -       |
| `visibility`          | `string`                                                                                                                | -       |
| `opacity`             | `string`                                                                                                                | -       |
| `overflow`            | `string`                                                                                                                | -       |
| `overflowX`           | `string`                                                                                                                | -       |
| `overflowY`           | `string`                                                                                                                | -       |
| `order`               | `string`                                                                                                                | -       |
| `alignSelf`           | `string`                                                                                                                | -       |
| `justifySelf`         | `string`                                                                                                                | -       |
| `placeSelf`           | `string`                                                                                                                | -       |
| `position`            | `string`                                                                                                                | -       |
| `inset`               | `string`                                                                                                                | -       |
| `top`                 | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `right`               | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `bottom`              | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `left`                | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `zIndex`              | `string`                                                                                                                | -       |
| `ratio`               | `string`                                                                                                                | -       |
| `width`               | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                    | -       |
| `minWidth`            | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                    | -       |
| `maxWidth`            | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                    | -       |
| `height`              | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                    | -       |
| `minHeight`           | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                    | -       |
| `maxHeight`           | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                    | -       |
| `margin`              | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `marginX`             | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `marginY`             | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `marginTop`           | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `marginRight`         | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `marginBottom`        | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `marginLeft`          | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `padding`             | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `paddingX`            | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `paddingY`            | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `paddingTop`          | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `paddingRight`        | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `paddingBottom`       | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `paddingLeft`         | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `color`               | [Colors](/ui/design-tokens#colors) or valid CSS values                                                                  | -       |
| `background`          | [Colors](/ui/design-tokens#colors) or `gradient-` prefixed [gradients](/ui/design-tokens#gradients) or valid CSS values | -       |
| `backgroundBlendMode` | `string`                                                                                                                | -       |
| `shadow`              | [Shadows](/ui/design-tokens#shadows) or valid CSS values                                                                | -       |
| `radius`              | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                              | -       |
| `radiusTop`           | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                              | -       |
| `radiusRight`         | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                              | -       |
| `radiusBottom`        | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                              | -       |
| `radiusLeft`          | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                              | -       |
| `border`              | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                | -       |
| `borderTop`           | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                | -       |
| `borderRight`         | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                | -       |
| `borderBottom`        | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                | -       |
| `borderLeft`          | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                | -       |
| `outline`             | [Outlines](/ui/design-tokens#outlines) or valid CSS values                                                              | -       |
| `outlineOffset`       | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                  | -       |
| `transform`           | `string`                                                                                                                | -       |
| `move`                | [Spaces](/ui/design-tokens#spaces) or valid CSS `translate` values                                                      | -       |
| `scale`               | `string`                                                                                                                | -       |
| `rotate`              | `string`                                                                                                                | -       |
| `transition`          | `string`                                                                                                                | -       |
| `animation`           | `string`                                                                                                                | -       |
| `isolation`           | `string`                                                                                                                | -       |
| `filter`              | `string`                                                                                                                | -       |
| `backdropFilter`      | `string`                                                                                                                | -       |
| `mixBlendMode`        | `string`                                                                                                                | -       |
| `clipPath`            | `string`                                                                                                                | -       |
| `mask`                | `string`                                                                                                                | -       |
| `cursor`              | `string`                                                                                                                | -       |

## Tailwind Comparison

Here are 2 examples inspired by Tailwind if you like to compare [Tini UI](/ui) to [Tailwind CSS](https://tailwindcss.com/).

1. [Traditional CSS vs Utility classes](https://tailwindcss.com/docs/utility-first)
2. [Why not just use inline styles?](https://tailwindcss.com/docs/utility-first#why-not-just-use-inline-styles)

<content-ui-post-box block="tailwind"></content-ui-post-box>

## Benchmark

Using `tini-box` is fine for most cases, but if you need to render a lot of boxes, you might want to consider using native elements with classes or inline styles.

### Basic usage

<app-component-benchmark reportId="ui-box"></app-component-benchmark>

### All properties and queries

<app-component-benchmark reportId="ui-box-full"></app-component-benchmark>

### All common properties and queries

<app-component-benchmark reportId="ui-box-overload"></app-component-benchmark>
