import {html, css} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';

import {Component, TiniComponent} from '@tinijs/core';

import {TiniButtonComponent} from '../../../app/ui/components/button.js';
import {TiniDialogComponent} from '../../../app/ui/components/dialog.js';

@Component({
  components: [TiniButtonComponent, TiniDialogComponent],
})
export class ContentUIPostDialogComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-dialog';

  private readonly alertDialogRef = createRef<TiniDialogComponent>();

  protected render() {
    return html`
      <tini-button
        scheme="primary"
        @click=${() => this.alertDialogRef.value?.show()}
        >Open alert</tini-button
      >
      <tini-dialog
        ${ref(this.alertDialogRef)}
        titleText="An alert dialog"
        @no=${() => this.alertDialogRef.value?.hide()}
        @yes=${() => this.alertDialogRef.value?.hide()}
      >
        <p>Alert dialog content.</p>
      </tini-dialog>
    `;
  }

  static styles = css``;
}
