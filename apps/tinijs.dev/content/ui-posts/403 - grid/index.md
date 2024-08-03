+++json
{
  "status": "publish",
  "title": "Grid",
  "category": "layouts"
}
+++

Component for creating grid layouts.

## Import

<app-component-import componentName="grid"></app-component-import>

## Editor

<content-ui-post-grid block="editor"></content-ui-post-grid>

## API

| Property           | Value                                                                                                                                                                        | Default |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `display`          | `none`, `grid` or `inline-grid`                                                                                                                                              | `grid`  |
| `template`         | `string`                                                                                                                                                                     | -       |
| `columns`          | `string`                                                                                                                                                                     | -       |
| `rows`             | `string`                                                                                                                                                                     | -       |
| `areas`            | `string`                                                                                                                                                                     | -       |
| `autoColumns`      | `string`                                                                                                                                                                     | -       |
| `autoRows`         | `string`                                                                                                                                                                     | -       |
| `autoFlow`         | `string`                                                                                                                                                                     | -       |
| `alignItems`       | `string`                                                                                                                                                                     | -       |
| `alignContent`     | `string`                                                                                                                                                                     | -       |
| `justifyItems`     | `string`                                                                                                                                                                     | -       |
| `justifyContent`   | `string`                                                                                                                                                                     | -       |
| `placeItems`       | `string`                                                                                                                                                                     | -       |
| `placeContent`     | `string`                                                                                                                                                                     | -       |
| `gap`              | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `rowGap`           | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| `columnGap`        | [Spaces](/ui/design-tokens#spaces) or valid CSS values                                                                                                                       | -       |
| _Responsive_       |
| `mediaQueries`     | `Record<string, GridStyleProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `(min-width: 500px)`                | -       |
| `containerQueries` | `Record<string, GridStyleProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `container-name (min-width: 500px)` | -       |

### Common utilities

Please see [all common utilities](/ui/box#common-utilities).

## Benchmark

<app-component-benchmark reportId="ui-grid"></app-component-benchmark>
