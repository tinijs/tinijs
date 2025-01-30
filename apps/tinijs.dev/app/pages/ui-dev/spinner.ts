import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniSpinnerComponent} from '../../ui/components/spinner.js';

@component({
  components: [TiniSpinnerComponent],
})
export class AppPageUIDevSpinnerComponent extends TiniComponent {
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
