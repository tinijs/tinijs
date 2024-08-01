+++json
{
  "status": "publish",
  "title": "Text",
  "category": "components"
}
+++

## Import

<app-component-import componentName="text"></app-component-import>

## Editor

<content-ui-post-text block="editor"></content-ui-post-text>

## API

| Property     | Value                                                                                         | Default |
| ------------ | --------------------------------------------------------------------------------------------- | ------- |
| `block`      | `boolean`                                                                                     | -       |
| `color`      | [Colors](/ui/design-tokens#colors) or valid CSS values                                        | -       |
| `gradient`   | [Gradients](/ui/design-tokens#gradients) or valid CSS values                                  | -       |
| `font`       | [Font families](/ui/design-tokens#font-families) or valid CSS values                          | -       |
| `size`       | [Font sizes](/ui/design-tokens#font-sizes) or valid CSS values                                | -       |
| `weight`     | `string`                                                                                      | -       |
| `italic`     | `boolean`                                                                                     | -       |
| `decoration` | `string`                                                                                      | -       |
| `line`       | [Line heights](/ui/design-tokens#line-heights) or valid CSS values                            | -       |
| `letter`     | [Letter spacings](/ui/design-tokens#letter-spacings) or valid CSS values                      | -       |
| `word`       | [Word spacings](/ui/design-tokens#word-spacings) or valid CSS values                          | -       |
| `transform`  | `string`                                                                                      | -       |
| `shadow`     | `string`                                                                                      | -       |
| `writing`    | `string`                                                                                      | -       |
| `overflow`   | `clip`, `ellipsis`, `fade`                                                                    | -       |
| `max`        | Max horizontal width or vertical height, [wides](/ui/design-tokens#wides) or valid CSS values | -       |
| `align`      | `string`                                                                                      | -       |

## Benchmark

Using `tini-text` is fine for most cases, but if you need to render a lot of text, you might want to consider using classes or inline styles.

### Using `tini-text`

<app-component-benchmark reportId="ui-text"></app-component-benchmark>

### Using classes

<app-component-benchmark reportId="ui-text-class"></app-component-benchmark>

### Using inline styles

<app-component-benchmark reportId="ui-text-inline"></app-component-benchmark>
