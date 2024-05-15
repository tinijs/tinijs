+++json
{
  "status": "publish",
  "title": "Modal",
  "category": "component"
}
+++

## Usage

<content-ui-post-modal-usage></content-ui-post-modal-usage>

```ts
import {ref, createRef} from 'lit/directives/ref.js';

import {TiniModalComponent} from 'path/to/components/modal.js';

class XXX extends TiniComponent {

  private readonly modalRef = createRef<TiniModalComponent>();

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
