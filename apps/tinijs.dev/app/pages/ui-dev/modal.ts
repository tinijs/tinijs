import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniModalElement} from '../../ui/elements/modal.js';

@element({
  elements: [TiniModalElement],
})
export class AppPageUIDevModalElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-modal';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-modal></tini-modal>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
