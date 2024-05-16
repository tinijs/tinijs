import {html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';

import {
  Component,
  TiniComponent,
  Reactive,
  Colors,
  type OnCreate,
  type OnDestroy,
} from '@tinijs/core';
import {ROUTE_CHANGE_EVENT} from '@tinijs/router';

import {TiniLinkComponent} from '../ui/components/link.js';
import {TiniIconComponent} from '../ui/components/icon.js';

import {LOGO_URL} from '../consts/common.js';

import {IconMenuComponent} from '../icons/menu.js';
import {IconCloseComponent} from '../icons/close.js';
import {IconGithubComponent} from '../icons/github.js';
import {IconXComponent} from '../icons/x.js';
import {IconDiscordComponent} from '../icons/discord.js';

import {AppSkinEditorTogglerComponent} from './skin-editor/toggler.js';
import {AppSkinEditorComponent} from '../components/skin-editor/index.js';

@Component({
  components: [
    TiniLinkComponent,
    TiniIconComponent,
    IconGithubComponent,
    IconXComponent,
    IconDiscordComponent,
    AppSkinEditorTogglerComponent,
    AppSkinEditorComponent,
  ],
})
export class HeaderComponent
  extends TiniComponent
  implements OnCreate, OnDestroy
{
  static readonly defaultTagName = 'app-header';

  @Reactive() mobileMenuOpened = false;

  private _onRouteChange = () => (this.mobileMenuOpened = false);
  onCreate() {
    addEventListener(ROUTE_CHANGE_EVENT, this._onRouteChange);
  }
  onDestroy() {
    removeEventListener(ROUTE_CHANGE_EVENT, this._onRouteChange);
  }

  private _closeMobileMenu() {
    this.mobileMenuOpened = false;
  }

  protected render() {
    return html`
      <header
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          height: var(--header-height);
          background: var(--color-back-tint);
          padding: var(--size-space);
          padding-left: var(--size-space-1_5x);
          border-bottom: 1px solid var(--color-back-shade);
        "
      >
        <div class="brand">
          <a
            href="/"
            style="
              display: flex;
              align-items: center;
              text-decoration: none;
              color: var(--color-text);
              gap: var(--size-space-0_75x);
            "
          >
            <img src=${LOGO_URL} alt="TiniJS" style="height: 28px;" />
            <h1
              style="
                margin: 0;
                font-weight: 700;
                font-size: 1rem;
              "
            >
              Tini
            </h1>
          </a>
        </div>

        <div style="position: relative">
          <div class=${classMap({navbar: true, opened: this.mobileMenuOpened})}>
            <nav class="menu">
              <tini-link
                active="active"
                href="/framework"
                @click=${this._closeMobileMenu}
                >Framework</tini-link
              >
              <tini-link
                active="active"
                href="/ui"
                @click=${this._closeMobileMenu}
                >UI</tini-link
              >
              <tini-link
                active="active"
                href="/module"
                @click=${this._closeMobileMenu}
                >Modules</tini-link
              >
              <tini-link
                active="active"
                href="/toolbox"
                @click=${this._closeMobileMenu}
                >Toolbox</tini-link
              >
              <tini-link
                active="active"
                href="/cli"
                @click=${this._closeMobileMenu}
                >CLI</tini-link
              >
            </nav>

            <div class="theme">
              <span>Select theme</span>
              <app-skin-editor-toggler></app-skin-editor-toggler>
            </div>

            <div class="social">
              <a href="https://github.com/tinijs/tinijs" target="_blank"
                ><icon-github scheme=${Colors.Front}></icon-github
              ></a>
              <a href="https://twitter.com/tini_js" target="_blank"
                ><icon-x scheme=${Colors.Front}></icon-x
              ></a>
              <a href="https://discord.gg/EABbZVbPAb" target="_blank"
                ><icon-discord scheme=${Colors.Front} scale="ml"></icon-discord
              ></a>
            </div>
          </div>

          <button
            class="mobile-toggler"
            @click=${() => (this.mobileMenuOpened = !this.mobileMenuOpened)}
          >
            <tini-icon
              scheme=${Colors.Front}
              .src=${!this.mobileMenuOpened
                ? IconMenuComponent.src
                : IconCloseComponent.src}
            ></tini-icon>
          </button>
        </div>
      </header>

      <app-skin-editor></app-skin-editor>
    `;
  }

  static styles = css`
    .navbar {
      position: fixed;
      display: none;
      flex-direction: column;
      gap: var(--size-space-2x);
      top: var(--header-height);
      right: 0;
      width: 100vw;
      width: 100dvw;
      height: calc(100vh - var(--header-height));
      height: calc(100dvh - var(--header-height));
      background: var(--color-back-tint);
      padding: var(--size-space-1_5x);

      &.opened {
        display: flex;
      }
    }

    .menu {
      display: flex;
      flex-direction: column;

      tini-link {
        border-bottom: 1px solid var(--color-back-shade);

        &::part(root) {
          display: block;
          padding: var(--size-space-0_75x) 0;
          color: var(--color-front);
          text-decoration: none;
        }
      }
    }

    .theme {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--size-space);
      background: var(--color-back);
      border-radius: var(--size-radius);
    }

    .social {
      display: flex;
      gap: var(--size-space-1_5x);
      align-items: center;
      justify-content: center;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .mobile-toggler {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      padding: var(--size-space-0_5x);
      cursor: pointer;
    }

    @media (min-width: 768px) {
      .navbar {
        display: flex;
        position: initial;
        flex-direction: row;
        gap: var(--size-space);
        top: initial;
        right: initial;
        width: initial;
        height: initial;
        padding: 0;
      }

      .menu {
        flex-direction: row;
        align-items: center;
        gap: var(--size-space-0_25x);

        tini-link {
          border-bottom: none;

          &::part(root) {
            padding: var(--size-space-0_25x) var(--size-space);
            border-radius: var(--size-radius);
          }
          &:hover::part(root) {
            background: var(--color-back);
          }
          &.active::part(root) {
            background: var(--color-back-shade);
          }
        }
      }

      .theme {
        background: none;
        border-radius: 0;
        padding: 0 var(--size-space);
        border-left: 1px solid var(--color-back);
        border-right: 1px solid var(--color-back);

        span {
          display: none;
        }
      }

      .social {
        gap: var(--size-space);
      }

      .mobile-toggler {
        display: none;
      }
    }
  `;
}
