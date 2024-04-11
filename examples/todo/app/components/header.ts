import {html} from 'lit';

import {CommonGradients, Scales} from '@tinijs/core';
import {Component, TiniComponent, getUI} from '@tinijs/core';

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

  private ui = getUI();

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
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M400 48H112a64.07 64.07 0 0 0-64 64v288a64.07 64.07 0 0 0 64 64h288a64.07 64.07 0 0 0 64-64V112a64.07 64.07 0 0 0-64-64m-35.75 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58'/%3E%3C/svg%3E"
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
            href="https://github.com/tinijs/examples/tree/main/todo"
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
