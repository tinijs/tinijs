import {html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {
  Component,
  TiniComponent,
  Reactive,
  stylingWithBases,
} from '@tinijs/core';
import {Subscribe} from '@tinijs/store';
import {commonBases, linkBases, buttonBases, formBases} from '@tinijs/ui/bases';
import {TiniIconComponent} from '@tinijs/ui/components/icon';
import {IconGithubComponent} from '@tinijs/bootstrap-icons/github';
import {IconPaletteComponent} from '@tinijs/bootstrap-icons/palette';

import {Configurable} from '../configurable';
import {changeTheme} from '../helpers/theme';
import {mainStore} from '../stores/main';
import {ICON_EXPERIMENTAL} from '../consts/icons';

import {AppSkinEditorComponent} from './skin-editor';

@Component({
  components: [
    TiniIconComponent,
    IconGithubComponent,
    IconPaletteComponent,
    AppSkinEditorComponent,
  ],
  theming: {
    styling: stylingWithBases([commonBases, linkBases, buttonBases, formBases]),
  },
})
export class AppHeaderComponent extends TiniComponent {
  static readonly defaultTagName = 'app-header';

  private readonly APP_NAME = Configurable.getOption('appName');
  private readonly LOGO_URL = Configurable.getOption('logoUrl');
  private readonly REPO_URL = Configurable.getOption('repoUrl');
  private readonly SOUL_LIST = Configurable.getOption('soulList');

  @Subscribe(mainStore) @Reactive() private activeSoulId =
    mainStore.activeSoulId;
  @Subscribe(mainStore) @Reactive() private activeSkinId =
    mainStore.activeSkinId;
  @Subscribe(mainStore) @Reactive() private skinEditorShown =
    mainStore.skinEditorShown;

  private isThemeActivated(soul: string, skin: string) {
    return `${soul}/${skin}` === `${this.activeSoulId}/${this.activeSkinId}`;
  }

  private switchTheme(e: Event) {
    return changeTheme((e.target as HTMLSelectElement).value);
  }

  private toggleSkinEditor() {
    return mainStore.commit('skinEditorShown', !mainStore.skinEditorShown);
  }

  protected render() {
    return html`
      <header>
        <div class="brand">
          <a href="/">
            <img src=${this.LOGO_URL} alt=${this.APP_NAME} />
            <h1>
              <span>${this.APP_NAME}</span>
              <tini-icon src=${ICON_EXPERIMENTAL}></tini-icon>
            </h1>
          </a>
        </div>
        <div class="menu">
          <select class="theme-select" @change=${this.switchTheme}>
            ${this.SOUL_LIST.map(
              ({id: soulId, name: soulName, skins}) => html`
                <optgroup label=${soulName}>
                  ${skins.map(
                    ({id: skinId, name: skinName}) => html`
                      <option
                        value=${`${soulId}/${skinId}`}
                        ?selected=${this.isThemeActivated(soulId, skinId)}
                      >
                        ${skinName}
                      </option>
                    `
                  )}
                </optgroup>
              `
            )}
          </select>
          <button class="skin-editor-toggler" @click=${this.toggleSkinEditor}>
            <icon-palette scheme="primary-contrast" scale="sm"></icon-palette>
            <span>Skin Editor</span>
          </button>
          <a href=${this.REPO_URL} target="_blank" rel="noopener">
            <icon-github scheme="primary-contrast" scale="sm"></icon-github>
          </a>
        </div>
      </header>

      <div
        class=${classMap({
          'skin-editor-container': true,
          showed: this.skinEditorShown,
        })}
      >
        <app-skin-editor></app-skin-editor>
      </div>
    `;
  }

  static styles = css`
    :host {
      --header-height: 60px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: var(--header-height);
      padding: var(--size-space);
      background-color: var(--color-primary);
      color: var(--color-light);
      box-shadow: var(--shadow-normal);
    }

    .brand a {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      color: var(--color-primary-contrast);
      text-decoration: none;
      font-family: var(--font-head);

      img {
        width: 1.5rem;
        height: auto;
      }

      h1 {
        margin: 0 0 0 0.5rem;
        font-size: 1.25rem;
      }

      sup {
        display: inline-block;
        font-size: var(--size-text-0_85x);
        margin-left: var(--size-space-0_5x);
      }
    }

    .menu {
      display: flex;
      align-items: center;
      gap: var(--size-space-1_5x);

      & > * {
        color: var(--color-light);
        text-decoration: none;
        background: none;
        padding: var(--size-space-0_5x);
        border-radius: var(--size-radius);

        &:hover {
          background: var(--color-primary-shade);
        }
      }
    }

    .theme-select {
      cursor: pointer;
      border: var(--size-border) solid var(--color-primary-contrast);
      color: var(--color-primary-contrast);
    }

    .skin-editor-toggler {
      cursor: pointer;
      display: flex;
      align-items: center;
      background: none;
      border: none;
      color: var(--color-primary-contrast);

      span {
        margin-left: var(--size-space-0_5x);
      }
    }

    .skin-editor-container {
      display: none;
      box-sizing: border-box;
      position: fixed;
      top: var(--header-height);
      right: 0;
      width: 310px;
      height: calc(100vh - var(--header-height));
      height: calc(100dvh - var(--header-height));
      background: var(--color-background);
      border: var(--size-border) solid var(--color-background-shade);
      box-shadow: var(--shadow-normal);

      &.showed {
        display: block;
      }
    }
  `;
}
