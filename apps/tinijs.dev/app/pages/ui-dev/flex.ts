import {html, css} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

import {TiniFlexComponent} from '../../ui/components/flex.js';

@Component({
  components: [TiniFlexComponent],
})
export class AppPageUIDevFlexComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-flex';

  protected render() {
    return html`
      <ui-dev-section titleText="Default">
        <tini-flex>
          <div>Left</div>
          <div>Right</div>
        </tini-flex>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
