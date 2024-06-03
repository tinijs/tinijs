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

import {TiniButtonComponent} from '../../ui/components/button.js';

@Component({
  components: [TiniButtonComponent],
})
export class AppPageUIDevButtonComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-button';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-button></tini-button>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
