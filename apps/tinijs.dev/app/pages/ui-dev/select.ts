import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniSelectElement} from '../../ui/elements/select.js';

@element({
  elements: [TiniSelectElement],
})
export class AppPageUIDevSelectElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-select';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-select></tini-select>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
