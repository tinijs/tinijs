import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniSpinnerElement} from '../../ui/elements/spinner.js';

@element({
  elements: [TiniSpinnerElement],
})
export class AppPageUIDevSpinnerElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-spinner';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-spinner></tini-spinner>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
