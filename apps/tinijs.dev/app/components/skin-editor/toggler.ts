import {html, css, nothing} from 'lit';

import {Component, TiniComponent, Input, Scales} from '@tinijs/core';

import {mainStore} from '../../stores/main.js';

import {IconThemeComponent} from '../../icons/theme.js';

@Component({
  components: [IconThemeComponent],
})
export class AppSkinEditorTogglerComponent extends TiniComponent {
  static readonly defaultTagName = 'app-skin-editor-toggler';

  @Input({type: Boolean}) showText = false;

  private _toggleSkinEditor() {
    mainStore.skinEditorShown = !mainStore.skinEditorShown;
  }

  protected render() {
    return html`
      <button @click=${this._toggleSkinEditor}>
        <icon-theme scale=${Scales.SM}></icon-theme>
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
      gap: var(--size-space-0_5x);
      background: var(--color-back-tint);
      border: 1px solid var(--color-back-shade);
      border-radius: var(--size-radius);
      font-size: var(--size-text-0_85x);
      padding: var(--size-space-0_25x) var(--size-space-0_5x);

      &:hover {
        background: var(--color-back);
      }
    }
  `;
}
