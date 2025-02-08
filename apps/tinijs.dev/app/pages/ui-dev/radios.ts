import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniRadiosElement} from '../../ui/elements/radios.js';

@element({
  elements: [TiniRadiosElement],
})
export class AppPageUIDevRadiosElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-radios';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-radios></tini-radios>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
