import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniBoxElement} from '../../ui/elements/box.js';
import {TiniFlexElement} from '../../ui/elements/flex.js';

@element({
  elements: [TiniBoxElement, TiniFlexElement],
})
export class AppPageUIDevFlexElement extends TiniElement {
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
