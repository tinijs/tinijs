import {html, css} from 'lit';

import {layout, TiniElement} from '@tinijs/core';

import {AppHeaderElement} from '../elements/header.js';
import {AppFooterElement} from '../elements/footer.js';

@layout({
  name: 'app-layout-default',
  elements: [AppHeaderElement, AppFooterElement],
})
export class AppLayoutDefaultElement extends TiniElement {
  protected render() {
    return html`
      <div
        style='
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
            position: fixed;
            z-index: 900;
            top: 0;
            width: 100%;
          "
        ></app-header>
        <main
          style="
            grid-area: main;
            background: var(--color-body);
            margin-top: var(--header-height);
          "
        >
          <slot></slot>
        </main>
        <app-footer style="grid-area: footer"></app-footer>
      </div>
    `;
  }

  static styles = css`
    :host {
      --header-height: 64px;
      --footer-height: 112px;
      --page-height: calc(100vh - var(--header-height) - var(--footer-height));
    }

    @supports (height: 100dvh) {
      :host {
        --page-height: calc(
          100dvh - var(--header-height) - var(--footer-height)
        );
      }
    }

    @media (min-width: 1024px) {
      app-footer {
        z-index: 800;
      }
    }
  `;
}
