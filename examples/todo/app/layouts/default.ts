import {html, css} from 'lit';

import {Layout, TiniComponent} from '@tinijs/core';

import {AppHeaderComponent} from '../components/header.js';

@Layout({
  name: 'app-layout-default',
  components: [AppHeaderComponent],
})
export class AppLayoutDefault extends TiniComponent {
  protected render() {
    return html`
      <header
        style="
          display: block;
          position: sticky;
          top: 0;
          z-index: 900;
          height: var(--header-height);
          background: var(--color-background);
        "
      >
        <app-header></app-header>
      </header>
      <main
        style="
          min-height: calc(100vh - var(--header-height));
          min-height: calc(100dvh - var(--header-height));
        "
      >
        <slot></slot>
      </main>
    `;
  }

  static styles = css`
    :host {
      --header-height: 69px;
    }
  `;
}
