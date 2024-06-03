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

import {TiniMessageComponent} from '../../ui/components/message.js';

@Component({
  components: [TiniMessageComponent],
})
export class AppPageUIDevMessageComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-message';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-message></tini-message>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
