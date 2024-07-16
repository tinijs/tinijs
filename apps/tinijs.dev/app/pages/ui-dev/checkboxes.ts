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
      <ui-dev-section titleText="Default">
        <tini-checkboxes
          .items=${[
            {label: 'Option 1', value: '1'},
            {label: 'Option 2', value: '2'},
            {label: 'Option 3', value: '3'},
          ]}
        ></tini-checkboxes>
      </ui-dev-section>

      <ui-dev-section titleText="Checked, disabled and indeterminate">
        <tini-checkboxes
          .items=${[
            {label: 'Option 1', value: '1'},
            {label: 'Option 2', value: '2', disabled: true},
            {label: 'Option 3', value: '3', disabled: true},
            {label: 'Option 4', value: '4'},
            {label: 'Option 5', value: '5'},
          ]}
          .values=${['1', '3', '[4]']}
        ></tini-checkboxes>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
