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

| Property           | Value                                                                                                                                                                        | Default |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `display`          | `none` or `initial`                                                                                                                                                          | -       |
| `size`             | [Wides](/ui/design-tokens#wides) or valid CSS values                                                                                                                         | -       |
| `align`            | `left`, `center` or `right`                                                                                                                                                  | -       |
| _Responsive_       |
| `mediaQueries`     | `Record<string, ContainerProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `(min-width: 500px)`                | -       |
| `containerQueries` | `Record<string, ContainerProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `container-name (min-width: 500px)` | -       |

### Common utilities

Please see [all common utilities](/ui/box#common-utilities).

## Benchmark

<app-component-benchmark reportId="ui-container"></app-component-benchmark>
