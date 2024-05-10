import {html, css, render, nothing, type CSSResultOrNative} from 'lit';
import {queryAll} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {ref, createRef} from 'lit/directives/ref.js';
import {
  Component,
  TiniComponent,
  UseUI,
  listify,
  extractTextFromStyles,
  type UI,
} from '@tinijs/core';
import {Subscribe} from '@tinijs/store';

import {TiniCodeComponent} from '../../ui/components/code.js';
import {TiniButtonComponent} from '../../ui/components/button.js';
import {TiniModalComponent} from '../../ui/components/modal.js';

import {mainStore} from '../../stores/main.js';

import {debouncer} from '../../utils/common.js';
import {
  FONTS,
  isGoogleFont,
  buildGoogleFontUrl,
  loadGoogleFont,
} from '../../utils/font.js';
import {extractCSSVariables, type VariableDef} from '../../utils/css.js';
import {buildColorVariants} from '../../utils/color.js';
import {buildGradientVariants} from '../../utils/gradient.js';

import {IconCodeComponent} from '../../icons/code.js';

import {AppSkinEditorGradientPickerComponent} from './gradient-picker.js';

@Component({
  components: [
    TiniCodeComponent,
    TiniButtonComponent,
    TiniModalComponent,
    IconCodeComponent,
    AppSkinEditorGradientPickerComponent,
  ],
})
export class AppSkinEditorComponent extends TiniComponent {
  static readonly defaultTagName = 'app-skin-editor';

  @UseUI() readonly ui!: UI;
  @queryAll('.field') private allInputs!: NodeListOf<HTMLElement>;
  @Subscribe(mainStore) skinEditorShown = mainStore.skinEditorShown;

  private modalRef = createRef<TiniModalComponent>();
  private modalContentRef = createRef<HTMLDivElement>();

  private variablesMap: Map<string, VariableDef> = new Map();
  private changedVariablesMap: Map<string, string> = new Map();
  private groupedSkinVariables!: ReturnType<
    typeof this.buildGroupedSkinVariables
  >;
  onChanges() {
    this.variablesMap = this.fetchSkinVariables();
    this.groupedSkinVariables = this.buildGroupedSkinVariables();
    this.style.display = this.skinEditorShown ? 'block' : 'none';
  }

  private buildGroupedSkinVariables() {
    const result = [
      {name: 'Fonts', items: []},
      {name: 'Colors', items: []},
      {name: 'Gradients', items: []},
      {name: 'Sizes', items: []},
      {name: 'Scales', items: []},
      {name: 'Wides', items: []},
      {name: 'Shadows', items: []},
    ] as Array<{name: string; items: VariableDef[]}>;
    // group variables
    for (const item of this.variablesMap) {
      const [key, def] = item;
      if (key.startsWith('--font')) {
        result[0].items.push(def);
      } else if (key.startsWith('--color')) {
        if (
          !~key.indexOf('-subtle') &&
          !~key.indexOf('-contrast') &&
          !~key.indexOf('-shade') &&
          !~key.indexOf('-tint')
        ) {
          result[1].items.push(def);
        }
      } else if (key.startsWith('--gradient')) {
        if (
          !~key.indexOf('-subtle') &&
          !~key.indexOf('-contrast') &&
          !~key.indexOf('-shade') &&
          !~key.indexOf('-tint')
        ) {
          result[2].items.push(def);
        }
      } else if (key.startsWith('--size')) {
        result[3].items.push(def);
      } else if (key.startsWith('--scale')) {
        result[4].items.push(def);
      } else if (key.startsWith('--wide')) {
        result[5].items.push(def);
      } else if (key.startsWith('--shadow')) {
        result[6].items.push(def);
      }
    }
    // result
    return result;
  }

  private fetchSkinVariables() {
    const availableSkins = (this.ui as any)._init.skins as Record<
      string,
      CSSResultOrNative | CSSResultOrNative[]
    >;
    const skinText = extractTextFromStyles(
      listify(availableSkins[this.ui.activeTheme.themeId])
    );
    return extractCSSVariables(skinText);
  }

  private resetSkin() {
    if (!confirm('All values will be reset?')) return;
    document.body.style.cssText = '';
    this.changedVariablesMap.clear();
    this.allInputs.forEach(item => {
      const input = item as HTMLInputElement;
      input.value = this.variablesMap.get(input.name)?.valueDirect || '';
    });
  }

  private showModal() {
    const {familyId} = this.ui.activeTheme;
    // extract google fonts and code
    const googleFonts: Array<{font: string}> = [];
    const allVariables: string[] = [];
    for (const [key, def] of this.variablesMap) {
      const value = this.changedVariablesMap.get(key) || def.value;
      allVariables.push(`${key}: ${value};`);
      if (key.startsWith('--font-') && isGoogleFont(value)) {
        googleFonts.push({font: value});
      }
    }
    const googleFontCode = !googleFonts.length
      ? null
      : `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${buildGoogleFontUrl(googleFonts)}" rel="stylesheet">`;
    const skinCode = `import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css\`:root {\n  ${allVariables.join('\n  ')}\n}\`;
/* eslint-enable prettier/prettier */
`;
    // render modal content
    render(
      html`
        ${!googleFontCode
          ? nothing
          : html`
              <p>
                Include Google Font stylesheet in <code>app/index.html</code>,
                you can add more weights or include italics if needed:
              </p>
              <tini-code language="html" .content=${googleFontCode}></tini-code>
            `}
        <p>
          Copy the code below and save as
          <code>ui/styles/${familyId}/skins/some-name.ts</code>. You can edit
          the values further if you wish.
        </p>
        <tini-code language="typescript" .content=${skinCode}></tini-code>
        <div style="width: 100%; height: 2rem"></div>
      `,
      this.modalContentRef.value!
    );
    // show modal
    this.modalRef.value?.show();
  }

  private hideModal() {
    this.modalRef.value?.hide();
    render(nothing, this.modalContentRef.value!);
  }

  private updateVariables(values: Array<[string, string]>) {
    values.forEach(([key, value]) => {
      this.changedVariablesMap.set(key, value);
      document.body.style.setProperty(key, value);
    });
  }

  private async changeFont(e: InputEvent) {
    const input = e.target as HTMLSelectElement;
    const key = input.name;
    const value = input.value;
    if (isGoogleFont(value)) await loadGoogleFont(value);
    this.updateVariables([[key, value]]);
  }

  private changeColor(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const key = input.name;
    const value = input.value;
    return debouncer('AppSkinEditorComponent:change_color', 100, () => {
      const {base, contrast, subtle, shade, tint} = buildColorVariants(value);
      this.updateVariables([
        [key, base],
        [`${key}-subtle`, subtle],
        [`${key}-contrast`, contrast],
        [`${key}-shade`, shade],
        [`${key}-tint`, tint],
      ]);
    });
  }

  private changeGradient(e: CustomEvent<string>) {
    const input = e.target as AppSkinEditorGradientPickerComponent;
    const key = input.name;
    const value = e.detail;
    return debouncer('AppSkinEditorComponent:change_gradient', 100, () => {
      const {base, subtle, contrast, shade, tint} =
        buildGradientVariants(value);
      this.updateVariables([
        [key, base],
        [`${key}-subtle`, subtle],
        [`${key}-contrast`, contrast],
        [`${key}-shade`, shade],
        [`${key}-tint`, tint],
      ]);
    });
  }

  private changeValue(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const key = input.name;
    const value = input.value;
    return debouncer('AppSkinEditorComponent:change_value', 100, () =>
      this.updateVariables([[key, value]])
    );
  }

  protected render() {
    return html`
      <div class="head">
        <strong class="title">Skin Editor</strong>
        <button class="reset" @click=${this.resetSkin}>Reset</button>
        <button
          class="close"
          @click=${() => mainStore.commit('skinEditorShown', false)}
        >
          ✕
        </button>
      </div>

      <div class="body">
        <section class="properties">
          <ul class="content">
            ${repeat(
              this.groupedSkinVariables,
              item => item.name,
              group => html`
                <li class="group">
                  <strong class="group-title">${group.name}</strong>
                  <ul>
                    ${repeat(
                      group.items,
                      item => item.key,
                      item => {
                        return html`
                          <li>
                            <div class="key">${item.title}</div>
                            <div class="value">
                              ${group.name === 'Fonts'
                                ? html`
                                    <select
                                      class="field"
                                      name=${item.key}
                                      @change=${this.changeFont}
                                    >
                                      <optgroup label="Classic Fonts">
                                        ${FONTS.filter(
                                          ([, webSafe]) => webSafe
                                        ).map(
                                          ([font]) => html`
                                            <option
                                              .value=${font}
                                              .selected=${item.valueDirect ===
                                              font}
                                            >
                                              ${font.replace(/'|"/g, '')}
                                            </option>
                                          `
                                        )}
                                      </optgroup>
                                      <optgroup label="Google Fonts">
                                        ${FONTS.filter(
                                          ([, webSafe]) => !webSafe
                                        ).map(
                                          ([font]) => html`
                                            <option
                                              .value=${font}
                                              .selected=${item.valueDirect ===
                                              font}
                                            >
                                              ${font.replace(/'|"/g, '')}
                                            </option>
                                          `
                                        )}
                                      </optgroup>
                                    </select>
                                  `
                                : group.name === 'Colors'
                                  ? html`<input
                                      type="color"
                                      class="field"
                                      name=${item.key}
                                      .value=${item.valueDirect}
                                      @input=${this.changeColor}
                                    />`
                                  : group.name === 'Gradients'
                                    ? html`<app-skin-editor-gradient-picker
                                        class="field"
                                        name=${item.key}
                                        .value=${item.valueDirect}
                                        @change=${this.changeGradient}
                                      ></app-skin-editor-gradient-picker>`
                                    : html`<input
                                        type="text"
                                        class="field"
                                        name=${item.key}
                                        .value=${item.valueDirect}
                                        @input=${this.changeValue}
                                      />`}
                            </div>
                          </li>
                        `;
                      }
                    )}
                  </ul>
                </li>
              `
            )}
          </ul>
        </section>
      </div>

      <div class="foot">
        <tini-button
          class="show-code"
          scheme="primary"
          @click=${this.showModal}
        >
          <icon-code scheme="primary-contrast" scale="sm"></icon-code>
          <span>Show code</span>
        </tini-button>
      </div>

      <tini-modal
        ${ref(this.modalRef)}
        titleText="Custom skin code"
        @yes=${this.hideModal}
        @no=${this.hideModal}
      >
        <div ${ref(this.modalContentRef)} class="modal-body"></div>
      </tini-modal>
    `;
  }

  static styles = css`
    :host {
      --head-height: 42px;
      --foot-height: 50px;
      display: none;
      box-sizing: border-box;
      position: fixed;
      background: var(--color-background-tint);
      width: 100vw;
      width: 100dvw;
      height: 50vh;
      height: 50dvh;
      bottom: 0;
      box-shadow: var(--shadow-excess);
    }

    .head {
      display: flex;
      align-items: center;
      height: var(--head-height);
      padding: var(--size-space-0_75x);
      border-bottom: var(--size-border) solid var(--color-background-shade);

      .title {
        flex: 1;
      }

      .reset {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: var(--size-space-0_4x) var(--size-space-0_8x);
        margin-right: var(--size-space-2x);
        background: var(--color-background-tint);
        color: var(--color-foreground);
        border: var(--size-border) solid var(--color-foreground);
        border-radius: var(--size-radius);
        font-size: var(--size-text-0_9x);
        line-height: 1;

        &:hover {
          background: var(--color-background);
        }
      }

      .close {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-background-tint);
        border: none;
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }
    }

    .body {
      height: calc(100% - var(--head-height) - var(--foot-height));
      overflow-x: hidden;
      overflow-y: scroll;
      max-width: 480px;
      margin: 0 auto;

      section {
        .content {
          padding: var(--size-space-0_5x);
          margin-bottom: 0;
        }
      }

      .properties {
        .group {
          padding: var(--size-space-0_5x);
          margin-bottom: var(--size-space);

          .group-title {
            color: var(--color-medium);
            text-transform: uppercase;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: var(--size-space) 0 0;

            li {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-right: var(--size-space-0_5x);
              margin-bottom: var(--size-space-0_5x);
              padding: var(--size-space-0_25x) 0 var(--size-space-0_75x);
              border-bottom: var(--size-border) solid
                var(--color-background-shade);

              .value {
                input,
                select {
                  background: var(--color-background-tint);
                  border: var(--size-border) solid var(--color-medium);
                  border-radius: var(--size-radius);
                  padding: var(--size-space-0_25x) var(--size-space-0_5x);
                }

                input {
                  max-width: 100px;
                }

                select {
                  max-width: 150px;
                }

                input[type='color'] {
                  padding: 0 2px;
                }

                select,
                input[type='color'] {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }

    .foot {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: var(--foot-height);
      position: absolute;
      bottom: 0;
      left: 0;
      border-top: var(--size-border) solid var(--color-background-shade);
      padding: var(--size-space-0_5x);

      tini-button.show-code {
        max-width: 480px;
        margin: 0 auto;

        &,
        &::part(root) {
          width: 100%;
        }

        icon-code {
          height: 24px;
        }

        span {
          margin-left: var(--size-space-0_5x);
        }
      }
    }

    tini-modal::part(root) {
      background: var(--color-background-tint);
    }

    .modal-body {
      display: block;
      width: 100%;
      padding: 0 2rem;
    }

    @media (min-width: 768px) {
      :host {
        bottom: auto;
        top: calc(var(--header-height) - 1px);
        right: 0;
        width: 310px;
        height: calc(100vh - var(--header-height) + 1px);
        height: calc(100dvh - var(--header-height) + 1px);
        border: var(--size-border) solid var(--color-background-shade);
        box-shadow: var(--shadow-normal);
      }
    }
  `;
}
