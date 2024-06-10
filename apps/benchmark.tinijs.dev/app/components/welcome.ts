import {html, css} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

@Component()
export class AppWelcomeComponent extends TiniComponent {
  static readonly defaultTagName = 'app-welcome';

  protected render() {
    return html`
      <article>
        <h1>Hello! 👋</h1>
        <p>Thank you for using the TiniJS <strong>Blank</strong> template.</p>
        <p>Get started from <code>./app/pages/home.ts</code>.</p>
        <p>
          For more detail, please visit
          <a href="https://tinijs.dev/" target="_blank">tinijs.dev</a>.
        </p>
      </article>
    `;
  }

  static styles = css`
    article {
      margin: 0 auto;
      padding: var(--space-md);
      max-width: var(--wide-md);
    }
  `;
}
