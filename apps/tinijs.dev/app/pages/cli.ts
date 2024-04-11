import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

@Page({
  name: 'app-page-cli',
})
export class AppPageCLI extends TiniComponent {
  protected render() {
    return html`
      <div
        style="
          margin: auto;
          max-width: var(--wide-md);
          padding: var(--size-space-2x);
        "
      >
        <h2 style="margin-top: 0">CLI</h2>

        <p>
          A new version is <strong>under development</strong> at
          <a
            href="https://github.com/tinijs/tinijs/tree/main/packages/cli"
            target="_blank"
            >https://github.com/tinijs/tinijs/tree/main/packages/cli</a
          >.
        </p>

        <p>
          While waiting for the next version, you can check out the experimental
          version (v0.16.0) at
          <a href="https://github.com/tinijs/cli" target="_blank"
            >https://github.com/tinijs/cli</a
          >.
        </p>
      </div>
    `;
  }
}
