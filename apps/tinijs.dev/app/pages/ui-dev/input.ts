import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniInputElement} from '../../ui/elements/input.js';

@element({
  elements: [TiniInputElement],
})
export class AppPageUIDevInputElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-input';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-input></tini-input>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
