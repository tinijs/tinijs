import {html, css} from 'lit';

import {Component, TiniComponent, Scales} from '@tinijs/core';

import {mainStore} from '../../stores/main.js';

import {IconThemeComponent} from '../../icons/theme.js';

@Component({
  components: [IconThemeComponent],
})
export class AppSkinEditorTogglerComponent extends TiniComponent {
  static readonly defaultTagName = 'app-skin-editor-toggler';

  private _toggleSkinEditor() {
    mainStore.skinEditorShown = !mainStore.skinEditorShown;
  }

  protected render() {
    return html`
      <button @click=${this._toggleSkinEditor}>
        <icon-theme scale=${Scales.SM}></icon-theme>
        <span>Skin Editor</span>
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
      background: var(--color-background-tint);
      border: 1px solid var(--color-background-shade);
      border-radius: var(--size-radius);
      font-size: var(--size-text-0_9x);
      padding: var(--size-space-0_1x) var(--size-space-0_5x);

      &:hover {
        background: var(--color-background);
      }
    }
  `;
}
