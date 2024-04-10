import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import {TiniMessageComponent} from '@tinijs/ui-bootstrap/components/message.js';

@Page({
  name: 'app-page-framework',
  components: [TiniMessageComponent]
})
export class AppPageFramework extends TiniComponent {

  protected render() {
    return html`
      <div
        style="
          margin: auto;
          max-width: var(--wide-md);
          padding: var(--size-space-2x);
        "
      >

        <h2 style="margin-top: 0">Framework</h2>

        <p>Since I have wrapped up the experiment and heading for the future development. I'm working on the foundation of the project as a whole. For the source code and the roadmap, please see at <a href="https://github.com/tinijs/tinijs?tab=readme-ov-file#version-10" target="_blank">https://github.com/tinijs/tinijs</a>.</p>

        <p>While waiting for the next version, you can check out the experimental version (v0.16.0) at <a href="https://github.com/tinijs/core" target="_blank">https://github.com/tinijs/core</a>.</p>
      
      </div>
    `;
  }
}
