import {html} from 'lit';

import {Layout, TiniComponent} from '@tinijs/core';

import {HeaderComponent} from '../components/header.js';
import {FooterComponent} from '../components/footer.js';

@Layout({
  name: 'app-layout-default',
  components: [HeaderComponent, FooterComponent],
})
export class AppLayoutDefault extends TiniComponent {
  protected render() {
    return html`
      <div
        style='
          --header-height: 64px;
          display: grid;
          width: 100vw;
          width: 100dvw;
          height: 100vh;
          height: 100dvh;
          grid:
            "header" auto
            "main" 1fr
            "footer" auto
            / 1fr;
        '
      >
        <app-header
          style="
            grid-area: header;
            position: sticky;
            z-index: 900;
          "
        ></app-header>
        <main
          style="
            grid-area: main;
            background: var(--color-background-tint);
          "
        >
          <slot></slot>
        </main>
        <app-footer style="grid-area: footer"></app-footer>
      </div>
    `;
  }
}
