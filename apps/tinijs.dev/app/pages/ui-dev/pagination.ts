import {html, css, nothing} from 'lit';

import {
  Component,
  TiniComponent,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Sizes,
} from '@tinijs/core';

import {TiniPaginationComponent} from '../../ui/components/pagination.js';

@Component({
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
