import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniDialogElement} from '../../ui/elements/dialog.js';

@element({
  elements: [TiniDialogElement],
})
export class AppPageUIDevDialogElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-dialog';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-dialog></tini-dialog>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
