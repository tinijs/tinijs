+++json
{
  "status": "publish",
  "title": "Container",
  "category": "layout"
}
+++

## Import

<app-component-import componentName="container"></app-component-import>

## Editor

<content-ui-post-container block="editor"></content-ui-post-container>

## API

| Property           | Type - Description                                                                                                                                          | Default |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `display`          | `none` or `initial`                                                                                                                                         | -       |
| `size`             | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `align`            | `left`, `center` or `right`                                                                                                                                 | -       |
| _Responsive_       |
| `mediaQueries`     | `Record<string, BoxProps>` - query keys can be [breakpoints](/ui/design-token#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `(min-width: 500px)`      | -       |
| `containerQueries` | `Record<string, BoxProps>` - query keys can be [breakpoints](/ui/design-token#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `container-name (min-width: 500px)` | -       |
| _Common utilities_ |
| `container`        | `string`                                                                                                                                                    | -       |
| `containerName`    | `string`                                                                                                                                                    | -       |
| `containerType`    | `string`                                                                                                                                                    | -       |
| `visibility`       | `string`                                                                                                                                                    | -       |
| `opacity`          | `string`                                                                                                                                                    | -       |
| `overflow`         | `string`                                                                                                                                                    | -       |
| `overflowX`        | `string`                                                                                                                                                    | -       |
| `overflowY`        | `string`                                                                                                                                                    | -       |
| `order`            | `string`                                                                                                                                                    | -       |
| `alignSelf`        | `string`                                                                                                                                                    | -       |
| `justifySelf`      | `string`                                                                                                                                                    | -       |
| `placeSelf`        | `string`                                                                                                                                                    | -       |
| `position`         | `string`                                                                                                                                                    | -       |
| `inset`            | `string`                                                                                                                                                    | -       |
| `top`              | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `right`            | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `bottom`           | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `left`             | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `zIndex`           | `string`                                                                                                                                                    | -       |
| `width`            | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `minWidth`         | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `maxWidth`         | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `height`           | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `minHeight`        | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `maxHeight`        | `string` - valid CSS values or [wides](/ui/design-token#wides)                                                                                              | -       |
| `margin`           | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginX`          | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginY`          | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginTop`        | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginRight`      | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginBottom`     | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `marginLeft`       | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `padding`          | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingX`         | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingY`         | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingTop`       | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingRight`     | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingBottom`    | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `paddingLeft`      | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `color`            | `string` - valid CSS values or [colors](/ui/design-token#colors)                                                                                            | -       |
| `background`       | `string` - valid CSS values or [colors](/ui/design-token#colors) or [gradients](/ui/design-token#gradients)                                                 | -       |
| `shadow`           | `string` - valid CSS values or [shadows](/ui/design-token#shadows)                                                                                          | -       |
| `radius`           | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `radiusTop`        | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `radiusRight`      | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `radiusBottom`     | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `radiusLeft`       | `string` - valid CSS values or [radiuses](/ui/design-token#radiuses)                                                                                        | -       |
| `border`           | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `borderTop`        | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `borderRight`      | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `borderBottom`     | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `borderLeft`       | `string` - valid CSS values or [borders](/ui/design-token#borders)                                                                                          | -       |
| `outline`          | `string` - valid CSS values or [rings](/ui/design-token#rings)                                                                                              | -       |
| `outlineOffset`    | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `transform`        | `string`                                                                                                                                                    | -       |
| `translate`        | `string` - valid CSS values or [spaces](/ui/design-token#spaces)                                                                                            | -       |
| `scale`            | `string`                                                                                                                                                    | -       |
| `rotate`           | `string`                                                                                                                                                    | -       |
| `transition`       | `string`                                                                                                                                                    | -       |
| `animation`        | `string`                                                                                                                                                    | -       |
| `isolation`        | `string`                                                                                                                                                    | -       |
| `filter`           | `string`                                                                                                                                                    | -       |
| `backdropFilter`   | `string`                                                                                                                                                    | -       |
| `mixBlendMode`     | `string`                                                                                                                                                    | -       |
| `clipPath`         | `string`                                                                                                                                                    | -       |
| `mask`             | `string`                                                                                                                                                    | -       |
| `cursor`           | `string`                                                                                                                                                    | -       |

## Benchmark

<app-component-benchmark reportId="ui-container"></app-component-benchmark>
