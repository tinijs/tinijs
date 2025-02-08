import {html} from 'lit';

import {element, TiniElement} from '@tinijs/core';

@element()
export class AppFooterElement extends TiniElement {
  static readonly defaultTagName = 'app-footer';

  protected render() {
    return html`
      <footer
        style="
          box-sizing: border-box;
          height: var(--footer-height);
          background: var(--color-body);
          padding: var(--space-md);
          border-top: 1px solid var(--color-body-semi);
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
