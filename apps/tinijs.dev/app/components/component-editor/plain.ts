import {html, css, nothing} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

import {Component, TiniComponent, Input} from '@tinijs/core';

@Component()
export class AppComponentEditorPlainComponent extends TiniComponent {
  static readonly defaultTagName = 'app-component-editor-plain';

  @Input() label?: string;
  @Input() content!: string;

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
