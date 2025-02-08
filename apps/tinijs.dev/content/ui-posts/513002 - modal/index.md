+++json
{
  "status": "draft",
  "title": "Modal",
  "category": "elements"
}
+++

## Usage

<content-ui-post-modal></content-ui-post-modal>

```ts
import {ref, createRef} from 'lit/directives/ref.js';

import {TiniModalElement} from 'path/to/elements/modal.js';

class XXX extends TiniElement {

  private readonly modalRef = createRef<TiniModalElement>();

  showModal() {
    this.modalRef.value!.show();
  }

  hideModal() {
    this.modalRef.value!.hide();
  }
  
  protected render() {
    return html`

      <button @click=${this.showModal}>Open modal</button>

      <tini-modal
        ${ref(this.modalRef)}
        titleText="Modal title"
        @no=${this.hideModal}
        @yes=${this.hideModal}
      >
        <h3>Content</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae
          enim felis.
        </p>
      </tini-modal>

    `;
  }
}
```
