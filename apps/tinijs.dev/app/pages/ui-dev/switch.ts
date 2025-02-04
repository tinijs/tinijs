import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniSwitchElement} from '../../ui/elements/switch.js';

@element({
  elements: [TiniSwitchElement],
})
export class AppPageUIDevSwitchElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-switch';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-switch></tini-switch>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
