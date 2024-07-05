import {html, css} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

import {TiniGridComponent} from '../../ui/components/grid.js';

@Component({
  components: [TiniGridComponent],
})
export class AppPageUIDevGridComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-grid';

  protected render() {
    return html`
      <ui-dev-section titleText="Default">
        <tini-grid>This is a grid.</tini-grid>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
