import {html, css} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  Sizes,
  ContrastColors,
} from '@tinijs/core';

import {TiniIconComponent} from '../../ui/components/icon.js';

import {IconUpComponent} from '../../icons/up.js';
import {IconDownComponent} from '../../icons/down.js';
import {IconMenuComponent} from '../../icons/menu.js';

@Component({
  components: [TiniIconComponent, IconMenuComponent],
})
export class AppDocPageMobileToolbarComponent extends TiniComponent {
  static readonly defaultTagName = 'app-doc-page-mobile-toolbar';

  @Input() menuOpened?: boolean;
  @Input() tocOpened?: boolean;

  @Output() toggleMenu!: EventEmitter<void>;
  @Output() toggleTOC!: EventEmitter<void>;

  menuTogglerRef = createRef<HTMLButtonElement>();
  tocTogglerRef = createRef<HTMLButtonElement>();

  protected render() {
    return html`
      <div class="mobile-toolbar">
        <button
          ${ref(this.menuTogglerRef)}
          class="menu-toggler"
          @click=${() => this.toggleMenu.emit()}
        >
          <icon-menu scheme=${ContrastColors.Body} size=${Sizes.SM}></icon-menu>
          <span>Menu</span>
        </button>

        <button
          ${ref(this.tocTogglerRef)}
          class="toc-toggler"
          @click=${() => this.toggleTOC.emit()}
        >
          <span>On this page</span>
          <tini-icon
            scheme=${ContrastColors.Body}
            size=${Sizes.SM}
            src=${!this.tocOpened ? IconDownComponent.src : IconUpComponent.src}
          ></tini-icon>
        </button>
      </div>
    `;
  }

  static styles = css`
    .mobile-toolbar {
      width: 100vw;
      height: var(--toolbar-height);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--color-body-semi);
      position: fixed;
      top: var(--header-height);
      background: var(--color-body);
      padding: 0 var(--space-md);
      z-index: 700;
    }

    button {
      background: none;
      border: none;
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      font-size: var(--text-xs);
      font-weight: bold;
      opacity: 0.7;
      cursor: pointer;
    }

    button:hover {
      opacity: 1;
    }

    @media (min-width: 1024px) {
      .menu-toggler {
        visibility: hidden;
        pointer-events: none;
      }
    }

    @media (min-width: 1280px) {
      .mobile-toolbar {
        display: none;
      }
    }
  `;
}
