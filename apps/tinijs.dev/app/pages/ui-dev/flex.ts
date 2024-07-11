import {html, css} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

import {TiniBoxComponent} from '../../ui/components/box.js';
import {TiniFlexComponent} from '../../ui/components/flex.js';

@Component({
  components: [TiniBoxComponent, TiniFlexComponent],
})
export class AppPageUIDevFlexComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-flex';

  protected render() {
    return html`
      <ui-dev-section titleText="Default">
        <tini-flex gap="md">
          <tini-box padding="md" background="body-subtle" flex="1"
            >Item 1</tini-box
          >
          <tini-box padding="md" background="body-subtle" flex="1"
            >Item 2</tini-box
          >
        </tini-flex>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
