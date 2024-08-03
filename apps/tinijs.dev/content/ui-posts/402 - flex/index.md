+++json
{
  "status": "publish",
  "title": "Flex",
  "category": "layouts"
}
+++

Component for creating flex layouts.

## Import

<app-component-import componentName="flex"></app-component-import>

## Editor

<content-ui-post-flex block="editor"></content-ui-post-flex>

## API

| Property           | Value                                                                                                                                                                        | Default |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `display`          | `none`, `flex` or `inline-flex`                                                                                                                                              | `flex`  |
| `flow`             | `string`                                                                                                                                                                     | -       |
| `direction`        | `string`                                                                                                                                                                     | -       |
| `wrap`             | `string`                                                                                                                                                                     | -       |
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
| `mediaQueries`     | `Record<string, FlexStyleProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `(min-width: 500px)`                | -       |
| `containerQueries` | `Record<string, FlexStyleProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `container-name (min-width: 500px)` | -       |

### Common utilities

Please see [all common utilities](/ui/box#common-utilities).

## Benchmark

<app-component-benchmark reportId="ui-flex"></app-component-benchmark>
