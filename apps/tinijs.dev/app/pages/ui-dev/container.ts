import {html, css} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

import {TiniContainerComponent} from '../../ui/components/container.js';

@Component({
  components: [TiniContainerComponent],
})
export class AppPageUIDevContainerComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-container';

  protected render() {
    return html`
      <ui-dev-section titleText="Default">
        <tini-container>This is a container.</tini-container>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
