import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniPaginationElement} from '../../ui/elements/pagination.js';

@element({
  elements: [TiniPaginationElement],
})
export class AppPageUIDevPaginationElement extends TiniElement {
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
