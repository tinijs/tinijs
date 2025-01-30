import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniSelectComponent} from '../../ui/components/select.js';

@component({
  components: [TiniSelectComponent],
})
export class AppPageUIDevSelectComponent extends TiniComponent {
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
