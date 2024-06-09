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

import {TiniSwitchComponent} from '../../ui/components/switch.js';

@Component({
  components: [TiniSwitchComponent],
})
export class AppPageUIDevSwitchComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-switch';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-switch></tini-switch>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
