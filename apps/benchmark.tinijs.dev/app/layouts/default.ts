import {html} from 'lit';

import {layout, TiniComponent} from '@tinijs/core';

@layout({
  name: 'app-layout-default',
})
export class AppLayoutDefault extends TiniComponent {
  protected render() {
    return html`<main class="page"><slot></slot></main>`;
  }
}
