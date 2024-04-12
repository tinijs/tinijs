import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

@Page({
  name: 'app-page-content',
})
export class AppPageContent extends TiniComponent {
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
        <h2 style="margin-top: 0">Content</h2>

        <p>
          The <strong>@tinijs/content</strong> module is under development at
          <a
            href="https://github.com/tinijs/tinijs/tree/main/packages/content"
            target="_blank"
            >https://github.com/tinijs/tinijs/tree/main/packages/content</a
          >.
        </p>
      </div>
    `;
  }
}
