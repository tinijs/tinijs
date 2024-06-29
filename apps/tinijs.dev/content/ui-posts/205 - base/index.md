+++json
{
  "status": "publish",
  "title": "Base Styles",
  "category": "guide"
}
+++

Bases enforce the styles of native elements, see the preview at [Native Elements](/ui/native-element).

Base styles can be provided in one or more files under the `bases` folder, upon building the UI package, all base files will be merged together.

After `setupUI()`, base styles will be applied globally in the light DOM, and will also be available automatically in the shadow DOM for any component which extends `TiniElement` or `TiniComponent`.

```ts
export default css`
  h1 {
    font-size: 2em;
  }

  a {
    color: var(--color-primary);
  }

  code {
    font-weight: bold;
  }
`;
```

See an example **Bootstrap base file**: [bootstrap/bases/content.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/bootstrap/bases/content.ts).
