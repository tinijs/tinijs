import {html} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

@Component()
export class FooterComponent extends TiniComponent {
  static readonly defaultTagName = 'app-footer';

  protected render() {
    return html`
      <footer
        style="
          box-sizing: border-box;
          height: var(--footer-height);
          background: var(--color-background-tint);
          padding: var(--size-space);
          border-top: 1px solid var(--color-background-shade);
          text-align: center;
        "
      >
        <p>
          Built with 💖 and released under the MIT License.<br />Copyright ©
          2024-present by Nhan Lam
        </p>
      </footer>
    `;
  }
}
