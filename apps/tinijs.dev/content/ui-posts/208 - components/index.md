+++json
{
  "status": "publish",
  "title": "Components",
  "category": "guides"
}
+++

Components live in the `components` folder, the name of the file will be used in the class name `TiniFooComponent` and the tag name `tini-foo`.

See the example **button component**: [components/button.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/components/button.ts)

## Structure and functions

A component is structured as follow.

```ts
import {html} from 'lit';
import {property} from 'lit/decorators.js';

import {TiniElement} from '@tinijs/core';

export default class extends TiniElement {

  @property({type: String, reflect: true}) prop1?: string;
  @property({type: Number, reflect: true}) prop2?: number;

  // normal render
  protected render() {
    return html`
      <div class="main" part="main">
        A Tini UI component
      </div>
    `;
  }

  // or, using partRender() (support custom templates)
  protected render() {
    return this.partRender(
      'main',
      mainChildren => html`
        <div class="main" part="main">
          A Tini UI component
          ${mainChildren()}
        </div>
      `
    );
  }

}
```

Notice that UI components are different from app components, they are extends `TiniElement` (instead of `TiniComponent`) and using pure Lit syntax.

## Component soul

Souls are the styles of the components, the name of the file must match the component name.

Example Shadcn button soul: [shadcn/souls/button.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/shadcn/souls/button.ts)

```ts
const styles = css`
  :host {
    --color: abc;
  }

  .main {
    color: var(--color);
  }
`;

export default {styles};
```

Beside styles, you can also provide the custom templates and scripts for the component. It is optional, but useful when you need addtional elements or behaviors.

For example, scripting the ripple effect for **Material button**: [material/souls/button.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/material/souls/button.ts)

```ts
export const templates = {
  'main:children': html`<p>Add this as a child of the main part.</p>`,
  'main:siblings': html`<p>Add this as a sibling of the main part.</p>`,
  'main': html`<p>Or, replace the main part with this.</p>`,
};

export const scripts: ThemingScripts = {
  activate: elem => {
    // do something when the theme family is activated
  },
  deactivate: elem => {
    // do something when the theme family is deactivated
  },
};

export default {styles, templates, scripts};
```

## Utilize `StyleBuilder`

Instead of writing the soul directly, you can use `createStyleBuilder` to create default styles to enforce certain contraints and be extended when needed.

- **Step 1**: create styles with `createStyleBuilder`

```ts
import { createStyleBuilder, generateColorVariants, generateSizeVariants } from '@tinijs/core';

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVariants>[0];
  sizeGen: Parameters<typeof generateSizeVariants>[0];
}>(outputs => [
  css`
    :host {
      --color: abc;
      --size: 16px;
    }

    .main {
      color: var(--color);
      font-size: var(--size);
    }
  `,

  outputs.statics,

  generateColorVariants(values => {
    const {hostSelector, color} = values;
    return `
      ${hostSelector} {
        --color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateSizeVariants(values => {
    const {hostSelector, size} = values;
    return `
      ${hostSelector} {
        --size: ${size};
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
```

Notice `statics`, `colorGen`, and `sizeGen` are called style slots, they enforce the structure of the styles and can be extended in the next step.

There are 2 types of slot: **static** and **dynamic**. Static slots are normal tagged `css`, while dynamic slots are generated using a custom generators.

- **Step 2**: extends the styles

```ts
export const styles = defaultStyles.extends({
  statics: css`...`,
  colorGen: values => '...',
  gradientGen: values => '...',
  sizeGen: values => '...',
});

export default {styles};
```

New styles provided in the corresponding style slots will have a higher order, therefore they will override the default styles.

You can also append new static styles using the `append` method.

```ts
export const styles = defaultStyles
.extends({/* ... */})
.append(
  css`/* more rules higher than the predefined slots */`
);
```
