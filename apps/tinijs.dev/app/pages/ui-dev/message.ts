import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniMessageElement} from '../../ui/elements/message.js';

@element({
  elements: [TiniMessageElement],
})
export class AppPageUIDevMessageElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-message';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-message></tini-message>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
