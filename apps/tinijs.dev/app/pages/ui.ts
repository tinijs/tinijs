import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

@Page({
  name: 'app-page-ui'
})
export class AppPageUI extends TiniComponent {

  protected render() {
    return html`
      <div
        style="
          margin: auto;
          max-width: var(--wide-md);
          padding: var(--size-space-2x);
        "
      >

        <h2 style="margin-top: 0">UI</h2>

        <p>A new version is <strong>under development</strong> at <a href="https://github.com/tinijs/tinijs/tree/main/packages/ui" target="_blank">https://github.com/tinijs/tinijs/tree/main/packages/ui</a>.</p>

        <p>While waiting for the next version, you can check out the experimental version (v0.16.0) at <a href="https://ui.tinijs.dev" target="_blank">https://ui.tinijs.dev</a>.</p>
      
      </div>
    `;
  }
}
