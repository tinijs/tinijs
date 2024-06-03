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

import {TiniSelectComponent} from '../../ui/components/select.js';

@Component({
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
