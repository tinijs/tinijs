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

import {TiniLabelComponent} from '../../ui/components/label.js';

@Component({
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
