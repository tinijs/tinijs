+++json
{
  "status": "publish",
  "title": "Image",
  "category": "components"
}
+++

## Import

<app-component-import componentName="image"></app-component-import>

## Editor

<content-ui-post-image block="editor"></content-ui-post-image>

## API

| Property           | Description                                                                                                                                                                                                                                                  | Value        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| src                | Image [src](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src)                                                                                                                                                                               | **Required** |
| alt                | Image [alt](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#usage_notes)                                                                                                                                                               | -            |
| srcset             | Image [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset)                                                                                                                                                                         | -            |
| sizes              | Image [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes)                                                                                                                                                                           | -            |
| loading            | Image [loading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading)                                                                                                                                                                       | -            |
| decoding           | Image [decoding](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#decoding)                                                                                                                                                                     | -            |
| fetchpriority      | Image [fetchpriority](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#fetchpriority)                                                                                                                                                           | -            |
| crossorigin        | Image [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin)                                                                                                                                                                | -            |
| referrerpolicy     | Image [referrerpolicy](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#referrerpolicy)                                                                                                                                                         | -            |
| *Styles*           |
| shape              | `square`, `rounded-square`, `squircle`, `circle`, `rectangle`, `vertical-rectangle`, `rounded-rectangle`, `rounded-vertical-rectangle`, `pill`, `vertical-pill`, `ellipse`, `vertical-ellipse`, `hexagon`, `rounded-hexagon`, `triangle`, `rounded-triangle` | -            |
| ratio              | Valid [aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) value                                                                                                                                                                    | -            |
| width              | [Wides](/ui/design-tokens#wides) or valid CSS                                                                                                                                                                                                                | -            |
| height             | [Wides](/ui/design-tokens#wides) or valid CSS                                                                                                                                                                                                                | -            |
| transform          | Valid [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) value                                                                                                                                                                          | -            |
| background         | [Colors](/ui/design-tokens#colors) or `gradient-` prefixed [gradients](/ui/design-tokens#gradients) or valid CSS values                                                                                                                                      | -            |
| padding            | [Spaces](/ui/design-tokens#spaces) or valid CSS                                                                                                                                                                                                              | -            |
| border             | [Borders](/ui/design-tokens#borders) or valid CSS                                                                                                                                                                                                            | -            |
| radius             | [Radiuses](/ui/design-tokens#radiuses) or valid CSS                                                                                                                                                                                                          | -            |
| shadow             | [Shadows](/ui/design-tokens#shadows) or valid CSS                                                                                                                                                                                                            | -            |
| opacity            | `string`                                                                                                                                                                                                                                                     | -            |
| backdrop           | Valid [backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) value                                                                                                                                                              | -            |
| filter             | Valid [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) value                                                                                                                                                                                | -            |
| clip               | Valid [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) value                                                                                                                                                                          | -            |
| mask               | Valid [mask](https://developer.mozilla.org/en-US/docs/Web/CSS/mask) value                                                                                                                                                                                    | -            |
| *Inner styles*     |
| innerShape         | `match` or above shape values                                                                                                                                                                                                                                | -            |
| fit                | Valid [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) value                                                                                                                                                                        | -            |
| innerRadius        | `match` or above radius values                                                                                                                                                                                                                               | -            |
| innerOpacity       | `string`                                                                                                                                                                                                                                                     | -            |
| innerFilter        | Valid [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) value                                                                                                                                                                                | -            |
| blend              | Valid [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) value                                                                                                                                                                | -            |
| innerClip          | `match` or above clip values                                                                                                                                                                                                                                 | -            |
| innerMask          | `match` or above mask values                                                                                                                                                                                                                                 | -            |
| _Responsive_       |
| `mediaQueries`     | `Record<string, ImageStyleProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `(min-width: 500px)`                                                                                               | -            |
| `containerQueries` | `Record<string, ImageStyleProps>` - query keys can be [breakpoints](/ui/design-tokens#breakpoints) `xs`, `sm`, `md`, `lg`, `xl` or custom `container-name (min-width: 500px)`                                                                                | -            |

## Benchmark

<app-component-benchmark reportId="ui-image"></app-component-benchmark>
