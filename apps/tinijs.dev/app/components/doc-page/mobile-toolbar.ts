import {html, css} from 'lit';
import {ref, createRef, type Ref} from 'lit/directives/ref.js';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  Scales,
  Colors,
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

  menuTogglerRef: Ref<HTMLButtonElement> = createRef();
  tocTogglerRef: Ref<HTMLButtonElement> = createRef();

  protected render() {
    return html`
      <div class="mobile-toolbar">
        <button
          ${ref(this.menuTogglerRef)}
          class="menu-toggler"
          @click=${() => this.toggleMenu.emit()}
        >
          <icon-menu scheme=${Colors.Foreground} scale=${Scales.SS}></icon-menu>
          <span>Menu</span>
        </button>

        <button
          ${ref(this.tocTogglerRef)}
          class="toc-toggler"
          @click=${() => this.toggleTOC.emit()}
        >
          <span>On this page</span>
          <tini-icon
            scheme=${Colors.Foreground}
            scale=${Scales.SS}
            src=${!this.tocOpened
              ? IconDownComponent.prebuiltSRC
              : IconUpComponent.prebuiltSRC}
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
      border-bottom: 1px solid var(--color-background-shade);
      position: fixed;
      top: var(--header-height);
      background: var(--color-background-tint);
      padding: 0 var(--size-space);
      z-index: 700;
    }

    button {
      background: none;
      border: none;
      display: flex;
      align-items: center;
      gap: var(--size-space-0_5x);
      font-size: var(--size-text-0_8x);
      font-weight: bold;
      opacity: 0.7;
      cursor: pointer;
    }

    button:hover {
      opacity: 1;
    }

    @media (min-width: 992px) {
      .menu-toggler {
        visibility: hidden;
        pointer-events: none;
      }
    }

    @media (min-width: 1200px) {
      .mobile-toolbar {
        display: none;
      }
    }
  `;
}
