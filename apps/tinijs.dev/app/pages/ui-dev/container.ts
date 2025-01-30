import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniContainerComponent} from '../../ui/components/container.js';

@component({
  components: [TiniContainerComponent],
})
export class AppPageUIDevContainerComponent extends TiniComponent {
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
