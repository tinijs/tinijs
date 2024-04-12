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
          width: 100vw;
          max-width: var(--wide-md);
          padding: var(--size-space-2x);
        "
      >
        <h2 style="margin-top: 0">CLI</h2>

        <p>
          <strong>Status note</strong>: I'm migrating the package to the new
          architect at
          <a
            href="https://github.com/tinijs/tinijs/tree/main/packages/cli"
            target="_blank"
            >https://github.com/tinijs/tinijs/tree/main/packages/cli</a
          >.
        </p>

        <p>
          If you want to use the experimental version still, please use the
          version <code>0.16.0</code> at
          <a href="https://github.com/tinijs/cli" target="_blank"
            >https://github.com/tinijs/cli</a
          >.
        </p>
      </div>
    `;
  }
}
