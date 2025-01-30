import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniInputComponent} from '../../ui/components/input.js';

@component({
  components: [TiniInputComponent],
})
export class AppPageUIDevInputComponent extends TiniComponent {
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
