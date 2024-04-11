import {html} from 'lit';

import {CommonGradients, Scales} from '@tinijs/core';
import {Component, TiniComponent, UseUI, UI} from '@tinijs/core';

import {TiniIconComponent} from '@tinijs/ui-bootstrap/components/icon.js';
import {
  TiniSwitchComponent,
  SwitchEventDetail,
} from '@tinijs/ui-bootstrap/components/switch.js';

enum Themes {
  BootstrapLight = 'bootstrap/light',
  BootstrapDark = 'bootstrap/dark',
}

@Component({
  components: [TiniIconComponent, TiniSwitchComponent],
})
export class AppHeaderComponent extends TiniComponent {
  static readonly defaultTagName = 'app-header';

  @UseUI() private ui!: UI;

  protected render() {
    return html`
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--color-background);
          max-width: var(--wide-sm);
          padding: var(--size-space-0_75x) var(--size-space);
          margin: 0 auto;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            gap: var(--size-space);
          "
        >
          <tini-link href="/" style="transform: translateY(5px)">
            <tini-icon
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M9.592 3.2a5.574 5.574 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.713 2.713 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a5.707 5.707 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.713 2.713 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.713 2.713 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a5.574 5.574 0 0 1-.399-.495a2.713 2.713 0 0 1-.408-.985a5.72 5.72 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.713 2.713 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a5.707 5.707 0 0 1-.632-.068a2.713 2.713 0 0 1-.985-.408a5.73 5.73 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.713 2.713 0 0 0-2.34 0c-.32.153-.626.414-1.238.935m6.781 6.663a.814.814 0 0 0-1.15-1.15l-4.85 4.85l-1.596-1.595a.814.814 0 0 0-1.15 1.15l2.17 2.17a.814.814 0 0 0 1.15 0z' clip-rule='evenodd'/%3E%3C/svg%3E"
              scheme=${CommonGradients.KaleSalad}
              scale=${Scales.ML}
            ></tini-icon>
          </tini-link>
          <h1 style="font-size: 1.25rem; margin: 0; font-weight: 700;">
            To Do
          </h1>
        </div>

        <div
          style="
            display: flex;
            align-items: center;
            gap: var(--size-space-1_5x);
          "
        >
          <tini-switch
            style="line-height: 1"
            scheme=${CommonGradients.KaleSalad}
            scale="ml"
            @change=${({detail}: CustomEvent<SwitchEventDetail>) =>
              this.ui.setTheme(
                detail.checked ? Themes.BootstrapDark : Themes.BootstrapLight
              )}
            .checked=${this.ui.activeTheme.themeId === Themes.BootstrapDark}
          ></tini-switch>
          <a
            href="https://github.com/tinijs/tinijs/tree/main/examples/todo"
            target="_blank"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              border: none;
              background: none;
              padding: var(--size-space-0_25x);
              cursor: pointer;
            "
          >
            <tini-icon
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2'/%3E%3C/svg%3E"
              scheme=${CommonGradients.KaleSalad}
              scale=${Scales.MD}
            ></tini-icon>
          </a>
        </div>
      </div>
    `;
  }
}
