import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniLabelElement} from '../../ui/elements/label.js';

@element({
  elements: [TiniLabelElement],
})
export class AppPageUIDevLabelElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-label';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-label></tini-label>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
