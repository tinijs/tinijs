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

import {TiniCardComponent} from '../../ui/components/card.js';

@Component({
  components: [TiniCardComponent],
})
export class AppPageUIDevCardComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-card';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-card></tini-card>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
