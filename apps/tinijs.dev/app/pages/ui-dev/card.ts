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
      <ui-dev-section titleText="Defaults">
        <tini-card>
          <h3>Card title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </tini-card>
      </ui-dev-section>

      <ui-dev-section titleText="Fluid">
        <tini-card fluid>
          <h3>Card title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </tini-card>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
