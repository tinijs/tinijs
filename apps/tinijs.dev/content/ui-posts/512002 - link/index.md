+++json
{
  "status": "publish",
  "title": "Link",
  "category": "components"
}
+++

## Import

<app-component-import componentName="link"></app-component-import>

## Editor

<content-ui-post-link block="editor"></content-ui-post-link>

## API

| Property                             | Description                                                                                                    | Value        |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------ |
| `href`                               | Anchor [href](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href)                                | **Required** |
| `target`                             | Anchor [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target)                            | -            |
| `rel`                                | The [rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) attribute                          | -            |
| `download`                           | Anchor [download](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download)                        | -            |
| `referrerpolicy`                     | Anchor [referrerpolicy](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy)            | -            |
| `hreflang`                           | Anchor [hreflang](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang)                        | -            |
| `type`                               | Anchor [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#type)                                | -            |
| `disabled`                           | `boolean` - mark the link as disabled                                                                          | -            |
| *Active status*                      |
| `activeFull`                         | `boolean` - math full `pathname` with or without the `hash` part                                               | -            |
| `activeStartsAuto`                   | `boolean` - `pathname` starts with the same value as the current url `pathname`                                | -            |
| `activeStartsWith`, `activeEndsWith` | `string` - `pathname` starts/ends with custom strings (if no `activeStartsWith` use the auto start)            | -            |
| `activePatterns`                     | `string[]` - array of RegExp patterns, please see [path-to-regexp](https://github.com/pillarjs/path-to-regexp) | -            |
| `activeIncludesSearchParams`         | `boolean` - also check for search params                                                                       | -            |

### Parts

| Part           | styleDeep  | Description               |
| -------------- | ---------- | ------------------------- |
| `tini-link {}` | `:host {}` | The tini-link element     |
| `::part(a) {}` | `.a {}`    | The native anchor element |

### Handle active links

By default the `tini-link` component acts similar to the native anchor element, but with the ability to handle the active status of the link. The active status can be set by using the `activeFull`, `activeStartsAuto`, `activeStartsWith`, `activeEndsWith`, `activePatterns` and `activeIncludesSearchParams` properties.

The active status is evaluated initially and updated on route changes, reflected by the `linkIsActive` attribute, therefore it can be used to style the link based on its active status.

```css
tini-link::part(a) {
  /* base link style */
}

tini-link[linkIsActive]::part(a) {
  /* active link style */
}
```

## Benchmark

<app-component-benchmark reportId="ui-link"></app-component-benchmark>
