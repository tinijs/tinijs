import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

@Page({
  name: 'app-page-ui',
})
export class AppPageUI extends TiniComponent {
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
        <h2 style="margin-top: 0">UI</h2>

        <p>
          <strong>Status note</strong>: I'm migrating the package to the new
          architect at
          <a
            href="https://github.com/tinijs/tinijs/tree/main/packages/ui"
            target="_blank"
            >https://github.com/tinijs/tinijs/tree/main/packages/ui</a
          >.
        </p>

        <p>
          If you want to use the experimental version still, please use the
          version <code>0.16.0</code> at
          <a href="https://ui.tinijs.dev" target="_blank"
            >https://ui.tinijs.dev</a
          >.
        </p>
      </div>
    `;
  }
}
