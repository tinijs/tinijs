import {html, css, nothing} from 'lit';

import {Component, TiniComponent, Input, Sizes} from '@tinijs/core';

import {MAIN_STORE} from '../../stores/main.js';

import {IconThemeComponent} from '../../icons/theme.js';

@Component({
  components: [IconThemeComponent],
})
export class AppSkinEditorTogglerComponent extends TiniComponent {
  static readonly defaultTagName = 'app-skin-editor-toggler';

  @Input({type: Boolean, reflect: true}) showText = false;

  private _toggleSkinEditor() {
    MAIN_STORE.skinEditorShown = !MAIN_STORE.skinEditorShown;
  }

  protected render() {
    return html`
      <button @click=${this._toggleSkinEditor}>
        <icon-theme size=${Sizes.SM}></icon-theme>
        ${!this.showText ? nothing : html`<span>Skin Editor</span>`}
      </button>
    `;
  }

  static styles = css`
    button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      background: var(--color-body);
      border: 1px solid var(--color-body-semi);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      padding: var(--space-xs2) var(--space-xs);

      &:hover {
        background: var(--color-body-soft);
        border-color: var(--color-body-subtle);
      }
    }
  `;
}
