import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniContainerElement} from '../../ui/elements/container.js';

@element({
  elements: [TiniContainerElement],
})
export class AppPageUIDevContainerElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-container';

  protected render() {
    return html`
      <ui-dev-section titleText="Default">
        <tini-container size="sm" padding="md" background="body-subtle"
          >A small centered container</tini-container
        >
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
