+++json
{
  "status": "publish",
  "title": "Container",
  "category": "layouts"
}
+++

Constrains the maximum width of page content.

## Import

<app-component-import componentName="container"></app-component-import>

## Editor

<content-ui-post-container block="editor"></content-ui-post-container>

## API

| Property              | Value                                                                                                                                                                        | Default |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `display`             | `none` or `initial`                                                                                                                                                          | -       |
| `size`                | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                                                                         | -       |
| `align`               | `left`, `center` or `right`                                                                                                                                                  | -       |
| _Responsive_          |
| `mediaQueries`        | `Record<string, ContainerProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `(min-width: 500px)`                | -       |
| `containerQueries`    | `Record<string, ContainerProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `container-name (min-width: 500px)` | -       |
| _Common utilities_    |
| `container`           | `string`                                                                                                                                                                     | -       |
| `containerName`       | `string`                                                                                                                                                                     | -       |
| `containerType`       | `string`                                                                                                                                                                     | -       |
| `visibility`          | `string`                                                                                                                                                                     | -       |
| `opacity`             | `string`                                                                                                                                                                     | -       |
| `overflow`            | `string`                                                                                                                                                                     | -       |
| `overflowX`           | `string`                                                                                                                                                                     | -       |
| `overflowY`           | `string`                                                                                                                                                                     | -       |
| `order`               | `string`                                                                                                                                                                     | -       |
| `alignSelf`           | `string`                                                                                                                                                                     | -       |
| `justifySelf`         | `string`                                                                                                                                                                     | -       |
| `placeSelf`           | `string`                                                                                                                                                                     | -       |
| `position`            | `string`                                                                                                                                                                     | -       |
| `inset`               | `string`                                                                                                                                                                     | -       |
| `top`                 | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `right`               | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `bottom`              | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `left`                | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `zIndex`              | `string`                                                                                                                                                                     | -       |
| `width`               | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                                                                         | -       |
| `minWidth`            | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                                                                         | -       |
| `maxWidth`            | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                                                                         | -       |
| `height`              | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                                                                         | -       |
| `minHeight`           | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                                                                         | -       |
| `maxHeight`           | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                                                                         | -       |
| `margin`              | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `marginX`             | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `marginY`             | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `marginTop`           | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `marginRight`         | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `marginBottom`        | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `marginLeft`          | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `padding`             | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `paddingX`            | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `paddingY`            | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `paddingTop`          | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `paddingRight`        | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `paddingBottom`       | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `paddingLeft`         | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `color`               | [Colors](/ui/design-tokens#colors) or valid CSS values                                                                                                                       | -       |
| `background`          | [Colors](/ui/design-tokens#colors) or `gradient-` prefixed [gradients](/ui/design-tokens#gradients) or valid CSS values                                                      | -       |
| `backgroundBlendMode` | `string`                                                                                                                                                                     | -       |
| `shadow`              | [Shadows](/ui/design-tokens#shadows) or valid CSS values                                                                                                                     | -       |
| `radius`              | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                                                                                   | -       |
| `radiusTop`           | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                                                                                   | -       |
| `radiusRight`         | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                                                                                   | -       |
| `radiusBottom`        | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                                                                                   | -       |
| `radiusLeft`          | [Radiuses](/ui/design-tokens#radiuses) or valid CSS values                                                                                                                   | -       |
| `border`              | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                                                                     | -       |
| `borderTop`           | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                                                                     | -       |
| `borderRight`         | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                                                                     | -       |
| `borderBottom`        | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                                                                     | -       |
| `borderLeft`          | [Borders](/ui/design-tokens#borders) or valid CSS values                                                                                                                     | -       |
| `outline`             | [Outlines](/ui/design-tokens#outlines) or valid CSS values                                                                                                                   | -       |
| `outlineOffset`       | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `transform`           | `string`                                                                                                                                                                     | -       |
| `move`                | [Spaces](/ui/design-tokens#spaces) or valid CSS `translate` values                                                                                                           | -       |
| `scale`               | `string`                                                                                                                                                                     | -       |
| `rotate`              | `string`                                                                                                                                                                     | -       |
| `transition`          | `string`                                                                                                                                                                     | -       |
| `animation`           | `string`                                                                                                                                                                     | -       |
| `isolation`           | `string`                                                                                                                                                                     | -       |
| `filter`              | `string`                                                                                                                                                                     | -       |
| `backdropFilter`      | `string`                                                                                                                                                                     | -       |
| `mixBlendMode`        | `string`                                                                                                                                                                     | -       |
| `clipPath`            | `string`                                                                                                                                                                     | -       |
| `mask`                | `string`                                                                                                                                                                     | -       |
| `cursor`              | `string`                                                                                                                                                                     | -       |

## Benchmark

<app-component-benchmark reportId="ui-container"></app-component-benchmark>
