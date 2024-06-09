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

import {TiniCheckboxesComponent} from '../../ui/components/checkboxes.js';

@Component({
  components: [TiniCheckboxesComponent],
})
export class AppPageUIDevCheckboxesComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-checkboxes';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-checkboxes></tini-checkboxes>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
