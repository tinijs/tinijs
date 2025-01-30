import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniDialogComponent} from '../../ui/components/dialog.js';

@component({
  components: [TiniDialogComponent],
})
export class AppPageUIDevDialogComponent extends TiniComponent {
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
