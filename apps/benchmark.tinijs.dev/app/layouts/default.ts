import {html} from 'lit';

import {layout, TiniElement} from '@tinijs/core';

@layout({
  name: 'app-layout-default',
})
export class AppLayoutDefault extends TiniElement {
  protected render() {
    return html`<main class="page"><slot></slot></main>`;
  }
}
