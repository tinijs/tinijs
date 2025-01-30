import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniPaginationComponent} from '../../ui/components/pagination.js';

@component({
  components: [TiniPaginationComponent],
})
export class AppPageUIDevPaginationComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-pagination';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-pagination></tini-pagination>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
