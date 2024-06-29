+++json
{
  "status": "publish",
  "title": "Async Data",
  "category": "core"
}
+++

Pages are usually rendered **based on some async data from server**. You can use these techniques to work with such cases.

## Task render

The `@lit/task` package provides a `Task` reactive controller to help manage this async data workflow.

```ts
import {Task} from '@lit/task';

@Component()
export class AppXXXComponent extends TiniComponent {

  @Reactive() productId?: string;

  private _productTask = new Task(this, {
    task: async ([productId], {signal}) => {
      const response = await fetch(`http://example.com/product/${productId}`, {signal});
      if (!response.ok) { throw new Error(response.status); }
      return response.json() as Product;
    },
    args: () => [this.productId]
  });

  protected render() {
    return this._productTask.render({
      pending: () => html`<p>Loading product...</p>`,
      complete: (product) => html`
          <h1>${product.name}</h1>
          <p>${product.price}</p>
        `,
      error: (e) => html`<p>Error: ${e}</p>`
    });
  }

}
```

For more detail, please see <https://lit.dev/docs/data/task/>

## Section render

Similar to Task Render, Section Render renders a section of a page based on **the values of local states**. There are 4 render states:
- `main`: all are not `undefined` and not empty (`null` or `[]` or `{}` or zero-size Map)
- `error`: any instanceof Error
- `empty`: all are empty
- `loading`: else

```ts
import {sectionRender, type SectionRenderData} from '@tinijs/core';

@Component()
export class AppXXXComponent extends TiniComponent {

  @Reactive() product: SectionRenderData<Product>;

  async onInit() {
    this.product = await fetchProduct();
  }

  protected render() {
    return sectionRender([this.product], {
      loading: () => html`<p>Loading product ...</p>`,
      empty: () => html`<p>No product found!</p>`,
      error: () => html`<p>Errors!</p>`
      main: ([product]) => html`
        <h1>${product.name}</h1>
        <p>${product.price}</p>
      `,
    });
  }

}
```
