import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniModalComponent} from '../../ui/components/modal.js';

@component({
  components: [TiniModalComponent],
})
export class AppPageUIDevModalComponent extends TiniComponent {
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
