import {html, css, render, nothing} from 'lit';
import {queryAll} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {ref, createRef} from 'lit/directives/ref.js';
import {
  Component,
  TiniComponent,
  UseUI,
  listify,
  themingStylesToText,
  type UI,
  type ThemingStyles,
} from '@tinijs/core';
import {Subscribe} from '@tinijs/store';

import {
  TiniSelectComponent,
  type SelectOption,
} from '../../ui/components/select.js';
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

import {IconCodeComponent} from '../../icons/code.js';

@Component({
  components: [
    TiniSelectComponent,
    TiniCodeComponent,
    TiniButtonComponent,
    TiniModalComponent,
    IconCodeComponent,
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

  private fetchSkinVariables() {
    const availableSkins = (this.ui as any)._init.skins as Record<
      string,
      ThemingStyles
    >;
    const skinText = themingStylesToText(
      listify(availableSkins[this.ui.activeTheme.themeId])
    );
    return extractCSSVariables(skinText);
  }

  private buildGroupedSkinVariables() {
    const result = [
      {name: 'Fonts', items: []},
      {name: 'Colors', items: []},
      {name: 'Sizes', items: []},
      {name: 'Shadows', items: []},
      {name: 'Config', items: []},
    ] as Array<{name: string; items: VariableDef[]}>;
    // group variables
    for (const item of this.variablesMap) {
      const [key, def] = item;
      if (key.startsWith('--font')) {
        result[0].items.push(def);
      } else if (key.startsWith('--color')) {
        if (
          !~key.indexOf('-more') &&
          !~key.indexOf('-less') &&
          !~key.indexOf('-semi') &&
          !~key.indexOf('-subtle') &&
          !~key.indexOf('-contrast')
        ) {
          result[1].items.push(def);
        }
      } else if (key.startsWith('--size')) {
        result[2].items.push(def);
      } else if (key.startsWith('--shadow')) {
        result[3].items.push(def);
      } else if (key.startsWith('--config')) {
        result[4].items.push(def);
      }
    }
    // result
    return result;
  }

  private showCodeModal() {
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
          the values further if you wish or override
          <a href="/ui/token" @click=${() => this.hideCodeModal()}
            >auto-generated tokens</a
          >.
        </p>
        <tini-code language="javascript" .content=${skinCode}></tini-code>
        <div style="width: 100%; height: 2rem"></div>
      `,
      this.modalContentRef.value!
    );
    // show modal
    this.modalRef.value?.show();
  }

  private hideCodeModal() {
    this.modalRef.value?.hide();
    render(nothing, this.modalContentRef.value!);
  }

  private updateVariables(values: Array<[string, string]>) {
    values.forEach(([key, value]) => {
      this.changedVariablesMap.set(key, value);
      document.documentElement.style.setProperty(key, value);
    });
  }

  private resetSkin() {
    this.changedVariablesMap.clear();
    document.documentElement.style.cssText = '';
    this.allInputs.forEach(item => {
      const input = item as HTMLInputElement;
      input.value = this.variablesMap.get(input.name)?.valueDirect || '';
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
      const {base, contrast} = buildColorVariants(value);
      this.updateVariables([
        [key, base],
        [`${key}-contrast`, contrast],
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

  private buildThemeOptions(familyId: string, items: SelectOption[]) {
    return items.map(item => {
      item.value = `${familyId}/${item.value}`;
      if (item.value === this.ui.activeTheme.themeId) item.selected = true;
      return item;
    });
  }

  private changeTheme({detail}: CustomEvent<InputEvent>) {
    this.resetSkin();
    this.ui.setTheme((detail.target as HTMLInputElement).value as string);
  }

  protected render() {
    return html`
      <div class="head">
        <strong class="title">Skin Editor</strong>
        <button
          class="reset"
          @click=${() => {
            if (confirm('All values will be reset?')) {
              this.resetSkin();
            }
          }}
        >
          Reset
        </button>
        <button
          class="close"
          @click=${() => mainStore.commit('skinEditorShown', false)}
        >
          ✕
        </button>
      </div>

      <div class="body">
        <section style="padding: var(--space-md)">
          <tini-select
            wrap
            block
            label="Current theme"
            events="change"
            @change=${this.changeTheme}
            .items=${[
              {
                label: 'Bootstrap',
                options: this.buildThemeOptions('bootstrap', [
                  {content: 'Bootstrap Light', value: 'light'},
                  {content: 'Bootstrap Dark', value: 'dark'},
                ]),
              },
              {
                label: 'Material',
                options: this.buildThemeOptions('material', [
                  {content: 'Material Light', value: 'light'},
                  {content: 'Material Dark', value: 'dark'},
                ]),
              },
              {
                label: 'iOS',
                options: this.buildThemeOptions('ios', [
                  {content: 'iOS Light', value: 'light'},
                  {content: 'iOS Dark', value: 'dark'},
                ]),
              },
              {
                label: 'Fluent',
                options: this.buildThemeOptions('fluent', [
                  {content: 'Fluent Light', value: 'light'},
                  {content: 'Fluent Dark', value: 'dark'},
                ]),
              },
              {
                label: 'Spectrum',
                options: this.buildThemeOptions('spectrum', [
                  {content: 'Spectrum Light', value: 'light'},
                  {content: 'Spectrum Dark', value: 'dark'},
                ]),
              },
              {
                label: 'Shadcn',
                options: this.buildThemeOptions('shadcn', [
                  {content: 'Shadcn Light', value: 'light'},
                  {content: 'Shadcn Dark', value: 'dark'},
                ]),
              },
              {
                label: 'Tailwind',
                options: this.buildThemeOptions('tailwind', [
                  {content: 'Tailwind Light', value: 'light'},
                  {content: 'Tailwind Dark', value: 'dark'},
                ]),
              },
              {
                label: 'Chakra',
                options: this.buildThemeOptions('chakra', [
                  {content: 'Chakra Light', value: 'light'},
                  {content: 'Chakra Dark', value: 'dark'},
                ]),
              },
            ]}
          ></tini-select>
        </section>
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
                                ? this.getFontSelectTemplate(item)
                                : group.name === 'Colors'
                                  ? html`<input
                                      type="color"
                                      class="field"
                                      name=${item.key}
                                      .value=${item.valueDirect}
                                      @input=${this.changeColor}
                                    />`
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
          @click=${this.showCodeModal}
        >
          <icon-code scheme="primary-contrast" size="sm"></icon-code>
          <span>Show code</span>
        </tini-button>
      </div>

      <tini-modal
        ${ref(this.modalRef)}
        titleText="Custom skin code"
        @yes=${this.hideCodeModal}
        @no=${this.hideCodeModal}
      >
        <div ${ref(this.modalContentRef)} class="modal-body"></div>
      </tini-modal>
    `;
  }

  private getFontSelectTemplate(item: VariableDef) {
    const activeFont = item.valueDirect;
    const missingFont = FONTS.some(([font]) => font === activeFont)
      ? undefined
      : activeFont;
    const buildLabel = (name: string) => name.replace(/'|"/g, '');
    return html`
      <select class="field" name=${item.key} @change=${this.changeFont}>
        ${!missingFont
          ? nothing
          : html`
              <option value=${missingFont} selected>
                ${buildLabel(missingFont)}
              </option>
            `}
        <optgroup label="Classic Fonts">
          ${FONTS.filter(([, webSafe]) => webSafe).map(
            ([font]) => html`
              <option .value=${font} .selected=${activeFont === font}>
                ${buildLabel(font)}
              </option>
            `
          )}
        </optgroup>
        <optgroup label="Google Fonts">
          ${FONTS.filter(([, webSafe]) => !webSafe).map(
            ([font]) => html`
              <option .value=${font} .selected=${activeFont === font}>
                ${buildLabel(font)}
              </option>
            `
          )}
        </optgroup>
      </select>
    `;
  }

  static styles = css`
    :host {
      --head-height: 42px;
      --foot-height: 50px;
      display: none;
      box-sizing: border-box;
      position: fixed;
      background: var(--color-body);
      width: 100vw;
      width: 100dvw;
      height: 50vh;
      height: 50dvh;
      bottom: 0;
      box-shadow: var(--shadow-xl);
    }

    .head {
      display: flex;
      align-items: center;
      height: var(--head-height);
      padding: var(--space-sm);
      border-bottom: 1px solid var(--color-body-semi);

      .title {
        flex: 1;
      }

      .reset {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: var(--space-xs-3) var(--space-sm);
        margin-right: var(--space-xl);
        background: var(--color-body);
        color: var(--color-body-contrast);
        border: 1px solid var(--color-body-contrast);
        border-radius: var(--radius-md);
        font-size: var(--text-sm);

        &:hover {
          background: var(--color-body-less);
        }
      }

      .close {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-body);
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
          padding: var(--space-xs);
          margin-bottom: 0;
        }
      }

      .properties {
        .group {
          padding: var(--space-xs);
          margin-bottom: var(--space-md);

          .group-title {
            color: var(--color-medium);
            text-transform: uppercase;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: var(--space-md) 0 0;
            line-height: var(--line-md);

            li {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-right: var(--space-xs);
              margin-bottom: var(--space-xs);
              padding: var(--space-xs-2) 0 var(--space-sm);
              border-bottom: 1px solid var(--color-body-semi);

              .value {
                input,
                select {
                  background: var(--color-body);
                  border: 1px solid var(--color-medium);
                  border-radius: var(--radius-md);
                  padding: var(--space-xs-2) var(--space-xs);
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
      border-top: 1px solid var(--color-body-semi);
      padding: var(--space-xs);

      tini-button.show-code {
        max-width: 480px;
        margin: 0 auto;

        &,
        &::part(main) {
          width: 100%;
        }

        icon-code {
          height: 24px;
        }

        span {
          margin-left: var(--space-xs);
        }
      }
    }

    tini-modal::part(main) {
      background: var(--color-body);
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
        border: 1px solid var(--color-body-semi);
        box-shadow: var(--shadow-lg);
      }
    }
  `;
}
