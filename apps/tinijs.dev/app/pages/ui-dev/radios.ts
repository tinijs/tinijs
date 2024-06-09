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

import {TiniRadiosComponent} from '../../ui/components/radios.js';

@Component({
  components: [TiniRadiosComponent],
})
export class AppPageUIDevRadiosComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-radios';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-radios></tini-radios>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
