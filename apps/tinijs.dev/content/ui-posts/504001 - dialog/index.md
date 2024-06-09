+++json
{
  "status": "draft",
  "title": "Dialog",
  "category": "component"
}
+++

## Usage

<content-ui-post-dialog></content-ui-post-dialog>

```ts
import {ref, createRef} from 'lit/directives/ref.js';

import {TiniDialogComponent} from 'path/to/components/dialog.js';

class XXX extends TiniComponent {

  private readonly dialogRef = createRef<TiniDialogComponent>();

  showDialog() {
    this.dialogRef.value!.show();
  }

  hideDialog() {
    this.dialogRef.value!.hide();
  }
  
  protected render() {
    return html`

      <button @click=${this.showDialog}>Open dialog</button>

      <tini-dialog
        ${ref(this.dialogRef)}
        titleText="A dialog"
        @no=${this.hideDialog}
        @yes=${this.hideDialog}
      >
        <p>Dialog content.</p>
      </tini-dialog>

    `;
  }
}
```
