import {html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';

import {
  Component,
  TiniComponent,
  Reactive,
  ContrastColors,
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
import {AppSkinEditorComponent} from './skin-editor/index.js';

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
          background: var(--color-body);
          padding: var(--space-md);
          padding-left: var(--space-lg);
          border-bottom: 1px solid var(--color-body-semi);
        "
      >
        <div class="brand">
          <a
            href="/"
            style="
              display: flex;
              align-items: center;
              text-decoration: none;
              color: var(--color-body-contrast);
              gap: var(--space-sm);
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
                ><icon-github color=${ContrastColors.Body}></icon-github
              ></a>
              <a href="https://twitter.com/tini_js" target="_blank"
                ><icon-x color=${ContrastColors.Body}></icon-x
              ></a>
              <a href="https://discord.gg/EABbZVbPAb" target="_blank"
                ><icon-discord
                  color=${ContrastColors.Body}
                  size="lg"
                ></icon-discord
              ></a>
            </div>
          </div>

          <button
            class="mobile-toggler"
            @click=${() => (this.mobileMenuOpened = !this.mobileMenuOpened)}
          >
            <tini-icon
              color=${ContrastColors.Body}
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
      gap: var(--space-xl);
      top: var(--header-height);
      right: 0;
      width: 100vw;
      width: 100dvw;
      height: calc(100vh - var(--header-height));
      height: calc(100dvh - var(--header-height));
      background: var(--color-body);
      padding: var(--space-lg);

      &.opened {
        display: flex;
      }
    }

    .menu {
      display: flex;
      flex-direction: column;

      tini-link {
        border-bottom: 1px solid var(--color-body-semi);

        &::part(main) {
          display: block;
          padding: var(--space-sm) 0;
          color: var(--color-body-contrast);
          text-decoration: none;
          font-weight: 500;
        }
      }
    }

    .theme {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-md);
      background: var(--color-body-soft);
      border-radius: var(--radius-md);
    }

    .social {
      display: flex;
      gap: var(--space-lg);
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
      padding: var(--space-xs);
      cursor: pointer;
    }

    @media (min-width: 768px) {
      .navbar {
        display: flex;
        position: initial;
        flex-direction: row;
        gap: var(--space-md);
        top: initial;
        right: initial;
        width: initial;
        height: initial;
        padding: 0;
      }

      .menu {
        flex-direction: row;
        align-items: center;
        gap: var(--space-xs2);

        tini-link {
          border-bottom: none;

          &::part(main) {
            padding: var(--space-xs2) var(--space-md);
            border-radius: var(--radius-md);
          }
          &:hover::part(main) {
            background: var(--color-body-soft);
          }
          &.active::part(main) {
            background: var(--color-body-semi);
          }
        }
      }

      .theme {
        background: none;
        border-radius: 0;
        padding: 0 var(--space-md);
        border-left: 1px solid var(--color-body-soft);
        border-right: 1px solid var(--color-body-soft);

        span {
          display: none;
        }
      }

      .social {
        gap: var(--space-md);
      }

      .mobile-toggler {
        display: none;
      }
    }
  `;
}
