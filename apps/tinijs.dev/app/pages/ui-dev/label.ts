import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniLabelComponent} from '../../ui/components/label.js';

@component({
  components: [TiniLabelComponent],
})
export class AppPageUIDevLabelComponent extends TiniComponent {
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
