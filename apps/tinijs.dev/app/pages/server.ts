import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

@Page({
  name: 'app-page-server',
})
export class AppPageServer extends TiniComponent {
  protected render() {
    return html`
      <div
        style="
          margin: auto;
          max-width: var(--wide-md);
          padding: var(--size-space-2x);
        "
      >
        <h2 style="margin-top: 0">Server</h2>

        <p>
          The <strong>@tinijs/server</strong> module is under development at
          <a
            href="https://github.com/tinijs/tinijs/tree/main/packages/server"
            target="_blank"
            >https://github.com/tinijs/tinijs/tree/main/packages/server</a
          >.
        </p>
      </div>
    `;
  }
}
