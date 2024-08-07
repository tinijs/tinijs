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

| Property            | Type - Description                                                                                                                                          | Default |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `display`           | `none`, `block`, `inline` or `inline-block`                                                                                                                 | -       |
| _Responsive_        |
| `mediaQueries`      | `Record<string, BoxProps>` - query keys can be [breakpoints](/ui/design-token#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `(min-width: 500px)`      | -       |
| `containerQueries`  | `Record<string, BoxProps>` - query keys can be [breakpoints](/ui/design-token#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `container-name (min-width: 500px)` | -       |
| _For Flex children_ |
| `flex`              | `string`                                                                                                                                                    | -       |
| `flexBasis`         | `string`                                                                                                                                                    | -       |
| `flexShrink`        | `string`                                                                                                                                                    | -       |
| `flexGrow`          | `string`                                                                                                                                                    | -       |
| _For Grid children_ |
| `gridColumn`        | `string`                                                                                                                                                    | -       |
| `gridColumnStart`   | `string`                                                                                                                                                    | -       |
| `gridColumnEnd`     | `string`                                                                                                                                                    | -       |
| `gridRow`           | `string`                                                                                                                                                    | -       |
| `gridRowStart`      | `string`                                                                                                                                                    | -       |
| `gridRowEnd`        | `string`                                                                                                                                                    | -       |
| `gridArea`          | `string`                                                                                                                                                    | -       |
| _Common utilities_  |
| `container`         | `string`                                                                                                                                                    | -       |
| `containerName`     | `string`                                                                                                                                                    | -       |
| `containerType`     | `string`                                                                                                                                                    | -       |
| `visibility`        | `string`                                                                                                                                                    | -       |
| `opacity`           | `string`                                                                                                                                                    | -       |
| `overflow`          | `string`                                                                                                                                                    | -       |
| `overflowX`         | `string`                                                                                                                                                    | -       |
| `overflowY`         | `string`                                                                                                                                                    | -       |
| `order`             | `string`                                                                                                                                                    | -       |
| `alignSelf`         | `string`                                                                                                                                                    | -       |
| `justifySelf`       | `string`                                                                                                                                                    | -       |
| `placeSelf`         | `string`                                                                                                                                                    | -       |
| `position`          | `string`                                                                                                                                                    | -       |
| `inset`             | `string`                                                                                                                                                    | -       |
| `top`               | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `right`             | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `bottom`            | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `left`              | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `zIndex`            | `string`                                                                                                                                                    | -       |
| `width`             | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `minWidth`          | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `maxWidth`          | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `height`            | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `minHeight`         | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `maxHeight`         | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `margin`            | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginX`           | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginY`           | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginTop`         | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginRight`       | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginBottom`      | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginLeft`        | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `padding`           | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingX`          | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingY`          | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingTop`        | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingRight`      | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingBottom`     | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingLeft`       | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `color`             | `string` - valid CSS values or [colors](/ui/design-token#colors)                                                                                            | -       |
| `background`        | `string` - valid CSS values or [colors](/ui/design-token#colors) or [gradients](/ui/design-token#gradients)                                                 | -       |
| `shadow`            | `string` - valid CSS values or [shadows](/ui/design-token#shadows)                                                                                          | -       |
| `radius`            | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `radiusTop`         | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `radiusRight`       | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `radiusBottom`      | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `radiusLeft`        | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `border`            | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `borderTop`         | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `borderRight`       | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `borderBottom`      | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `borderLeft`        | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `outline`           | `string` - valid CSS values or [rings](/ui/design-token#rings)                                                                                              | -       |
| `outlineOffset`     | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `transform`         | `string`                                                                                                                                                    | -       |
| `translate`         | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `scale`             | `string`                                                                                                                                                    | -       |
| `rotate`            | `string`                                                                                                                                                    | -       |
| `transition`        | `string`                                                                                                                                                    | -       |
| `animation`         | `string`                                                                                                                                                    | -       |
| `isolation`         | `string`                                                                                                                                                    | -       |
| `filter`            | `string`                                                                                                                                                    | -       |
| `backdropFilter`    | `string`                                                                                                                                                    | -       |
| `mixBlendMode`      | `string`                                                                                                                                                    | -       |
| `clipPath`          | `string`                                                                                                                                                    | -       |
| `mask`              | `string`                                                                                                                                                    | -       |
| `cursor`            | `string`                                                                                                                                                    | -       |

## Tailwind Comparison

Here are 2 examples inspired by Tailwind if you like to compare [Tini UI](/ui) to [Tailwind CSS](https://tailwindcss.com/).

1. [Traditional CSS vs Utility classes](https://tailwindcss.com/docs/utility-first)
2. [Why not just use inline styles?](https://tailwindcss.com/docs/utility-first#why-not-just-use-inline-styles)

<content-ui-post-box block="tailwind"></content-ui-post-box>

## Benchmark

<app-component-benchmark reportId="ui-box"></app-component-benchmark>
