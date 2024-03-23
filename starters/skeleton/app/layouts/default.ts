import {html} from 'lit';

import {Layout, TiniComponent} from '@tinijs/core';

@Layout({
  name: 'app-layout-default',
})
export class AppLayoutDefault extends TiniComponent {
  protected render() {
    return html`<main class="page"><slot></slot></main>`;
  }
}
