import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniMessageComponent} from '../../ui/components/message.js';

@component({
  components: [TiniMessageComponent],
})
export class AppPageUIDevMessageComponent extends TiniComponent {
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
