import {html, css, nothing} from 'lit';
import {property} from 'lit/decorators/property.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

import {element, TiniElement} from '@tinijs/core';

@element()
export class AppElementEditorPlainElement extends TiniElement {
  static readonly defaultTagName = 'app-element-editor-plain';

  @property() label?: string;
  @property() content!: string;

  protected render() {
    return html`
      <div class="main">
        ${!this.label
          ? nothing
          : html`<span class="label">${this.label}</span>`}
        <div class="content">${unsafeHTML(this.content)}</div>
      </div>
    `;
  }

  static styles = css`
    .label {
      display: block;
      font-weight: bold;
      font-size: var(--text-xs);
      text-transform: uppercase;
      margin-bottom: var(--space-xs);
    }
  `;
}
