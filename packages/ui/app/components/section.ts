import {html, css, nothing, HTMLTemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {StyleInfo} from 'lit/directives/style-map.js';
import {repeat} from 'lit/directives/repeat.js';
import {cache} from 'lit/directives/cache.js';
import {until} from 'lit/directives/until.js';
import {
  Component,
  TiniComponent,
  Input,
  Reactive,
  stylingWithBases,
} from '@tinijs/core';
import {commonBases, buttonBases} from '@tinijs/ui/bases';
import {IconCodeComponent} from '@tinijs/bootstrap-icons/code';

import {ConsumerPlatforms} from '../consts/main';
import {
  ICON_TINI,
  ICON_VUE,
  ICON_REACT,
  ICON_ANGULAR,
  ICON_SVELTE,
  ICON_HTML,
} from '../consts/icons';
import {mainStore} from '../stores/main';
import {formatHTML} from '../helpers/format';
import {CodeBuilder, CodeBuilderHelper} from '../helpers/code-builder';

import {AppTabsComponent, TabItem} from '../components/tabs';
import {AppCodeComponent} from '../components/code';

export const WRAPPER_CLASS_NAME = 'wrapper';

export const BLOCK_STYLES: StyleInfo = {
  display: 'block',
};

export const FLEX_COLUMN_STYLES: StyleInfo = {
  display: 'flex',
  flexFlow: 'column',
  gap: 'var(--size-space-0_5x)',
};

export const FLEX_COLUMN_GAP2X_STYLES: StyleInfo = {
  ...FLEX_COLUMN_STYLES,
  gap: 'var(--size-space-2x)',
};

export const FLEX_ROW_STYLES: StyleInfo = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--size-space-0_5x)',
};

export const FLEX_ROW_GAP2X_STYLES: StyleInfo = {
  ...FLEX_ROW_STYLES,
  gap: 'var(--size-space-2x)',
};

export const WIDE_XXXS_STYLES: StyleInfo = {
  width: 'var(--wide-xxxs)',
};

export const WIDE_XXS_STYLES: StyleInfo = {
  width: 'var(--wide-xxs)',
};

export const WIDE_XS_STYLES: StyleInfo = {
  width: 'var(--wide-xs)',
};

export const WIDE_SS_STYLES: StyleInfo = {
  width: 'var(--wide-ss)',
};

export const WIDE_SM_STYLES: StyleInfo = {
  width: 'var(--wide-sm)',
};

export const WIDE_MD_STYLES: StyleInfo = {
  width: 'var(--wide-md)',
};

export interface SectionCodeGroup {
  name: string;
  code: HTMLTemplateResult;
}

function extractHTMLCode(elem: null | HTMLElement) {
  if (elem?.firstElementChild?.classList.contains(WRAPPER_CLASS_NAME)) {
    elem = elem.firstElementChild as HTMLElement;
  }
  return elem?.innerHTML;
}

@Component({
  theming: {
    styling: stylingWithBases([commonBases]),
  },
})
class AppSectionPreviewComponent extends TiniComponent {
  static readonly defaultTagName = 'app-section-preview';

  @Input({type: String}) groupCode?: string;

  onRenders() {
    setTimeout(
      () =>
        this.dispatchEvent(
          new CustomEvent('code', {
            detail: {
              code: extractHTMLCode(this.renderRoot.querySelector('.code')),
            },
          })
        ),
      0
    );
  }

  protected render() {
    return html`
      <div class="preview">
        ${!this.groupCode
          ? html`<slot></slot>`
          : html`<div class="code">${this.groupCode}</div>`}
      </div>
    `;
  }

  static styles = css`
    .preview {
      padding: 1rem;
      border-radius: var(--size-radius);
      background: var(--color-background-tint);
    }
  `;
}

@Component({
  components: [IconCodeComponent, AppTabsComponent, AppCodeComponent],
  theming: {
    styling: stylingWithBases([commonBases]),
  },
})
class AppSectionCodeComponent extends TiniComponent {
  static readonly defaultTagName = 'app-section-code';

  private readonly CODE_TAB_ITEMS: TabItem[] = [
    {name: ConsumerPlatforms.Tini, icon: ICON_TINI},
    {name: ConsumerPlatforms.Vue, icon: ICON_VUE},
    {name: ConsumerPlatforms.React, icon: ICON_REACT},
    {name: ConsumerPlatforms.Angular, icon: ICON_ANGULAR},
    {name: ConsumerPlatforms.Svelte, icon: ICON_SVELTE},
    {name: ConsumerPlatforms.HTML, icon: ICON_HTML},
  ];

  @Input({type: String}) originalCode!: string;
  @Input({type: Object}) codeBuilders?: Record<string, CodeBuilder>;
  @Input({type: Object}) codeBuildContext?: unknown;
  @Input({type: Boolean}) codePostFormat?: boolean;

  protected render() {
    return html`
      <app-tabs
        class="code-tabs"
        .tabItems=${this.CODE_TAB_ITEMS}
        @change=${({detail}: CustomEvent<{name: string}>) =>
          mainStore.commit('referPlatform', detail.name)}
      >
        <div slot="title">
          <icon-code scheme="foreground" scale="sm"></icon-code>
          <span>Code</span>
        </div>
        ${repeat(
          this.CODE_TAB_ITEMS,
          item => item.name,
          ({name}) => {
            const code =
              name === ConsumerPlatforms.Tini || !this.codeBuilders?.[name]
                ? this.originalCode
                : this.codeBuilders[name](
                    new CodeBuilderHelper(
                      this.originalCode,
                      this.codeBuildContext
                    )
                  ).toString();
            return html`
              <div data-tab=${name}>
                <app-code
                  language="html"
                  .code=${!this.codePostFormat ? code : until(formatHTML(code))}
                ></app-code>
                <p>
                  <strong>Please note</strong>: Code sample is NOT correct for
                  Vue, React, Angular & Svelte. Events and non-primitive props
                  are not reflected in the sample as well, in the mean time,
                  please see <strong>Component Source</strong> for detail.
                </p>
              </div>
            `;
          }
        )}
      </app-tabs>
    `;
  }

  static styles = css`
    .code-tabs {
      margin-top: 2rem;

      [slot='title'] {
        display: flex;
        align-items: center;

        span {
          margin-left: var(--size-space-0_5x);
        }
      }

      &::part(head) {
        background: var(--color-background);
        border: var(--size-border) solid var(--color-background-shade);
        border-radius: var(--size-radius);
        padding: var(--size-space-0_3x);
        padding-right: var(--size-space);
      }

      &::part(head-expanded) {
        border-radius: var(--size-radius) var(--size-radius) 0 0;
      }

      &::part(tablinks) {
        align-items: center;
      }

      &::part(tablink) {
        font-size: var(--size-text-0_8x);
        padding: var(--size-space-0_4x) var(--size-space-0_8x);
        border-radius: var(--size-radius);
        border: var(--size-border) solid transparent;
        opacity: 0.8;
      }

      &::part(tablink):hover {
        background: var(--color-background-tint);
        border-color: var(--color-background-shade);
        opacity: 1;
      }

      &::part(tablink-active) {
        border: var(--size-border) solid var(--color-medium-tint) !important;
        opacity: 1;
      }

      &::part(body) {
        border-color: var(--color-background-shade);
        background: var(--color-background);
      }
    }
  `;
}

@Component({
  components: [AppSectionPreviewComponent, AppSectionCodeComponent],
  theming: {
    styling: stylingWithBases([commonBases, buttonBases]),
  },
})
export class AppSectionComponent extends TiniComponent {
  static readonly defaultTagName = 'app-section';

  @Input({type: Boolean}) noCodeSample?: boolean;
  @Input({type: Object}) preprocessCode?: CodeBuilder;
  @Input({type: Object}) codeBuilders?: Record<string, CodeBuilder>;
  @Input({type: Object}) codeBuildContext?: unknown;
  @Input({type: Boolean}) codePostFormat?: boolean;

  @Input({type: Array}) codeGroups?: Array<null | SectionCodeGroup>;
  @Reactive() private groupIndex = 0;

  @Reactive() private originalCode?: string;

  private async handleCode(code?: string) {
    if (!code) return;
    // format
    code = await formatHTML(
      code
        .replace(/<!--.*?-->/g, '')
        .replace(/( style )|( class )/g, ' ')
        .replace(/( style>)|( class>)/g, '>')
        .replace(/ style="--mode:internal;([\s\S]*?)"/g, '')
        .replace(/ class="_([\s\S]*?)"/g, '')
        .replace(/<style>([\s\S]*?)<\/style>/g, '')
    );
    // custom preprocess
    this.originalCode = !this.preprocessCode
      ? code
      : this.preprocessCode(
          new CodeBuilderHelper(code, this.codeBuildContext)
        ).toString();
  }

  protected render() {
    return html`
      <section>
        <slot name="title"></slot>
        <slot name="content"></slot>

        <!-- group buttons -->
        ${cache(
          !this.codeGroups?.length
            ? nothing
            : html`
                <div class="grouplinks">
                  ${this.codeGroups.map((group, index) =>
                    !group
                      ? html`<div class="separator"></div>`
                      : html`
                          <button
                            class=${classMap({
                              active: this.groupIndex === index,
                            })}
                            @click=${() => (this.groupIndex = index)}
                          >
                            ${group.name}
                          </button>
                        `
                  )}
                </div>
              `
        )}

        <!-- preview -->
        ${this.noCodeSample
          ? nothing
          : html`
              <app-section-preview
                .groupCode=${this.codeGroups?.[this.groupIndex]?.code}
                @code=${(e: CustomEvent) => this.handleCode(e.detail.code)}
              >
                <slot
                  name="code"
                  @slotchange=${() =>
                    this.handleCode(
                      extractHTMLCode(this.querySelector('[slot="code"]'))
                    )}
                ></slot>
              </app-section-preview>
            `}

        <!-- code -->
        ${this.noCodeSample || !this.originalCode
          ? nothing
          : html`
              <app-section-code
                .originalCode=${this.originalCode}
                .codeBuilders=${this.codeBuilders}
                .codeBuildContext=${this.codeBuildContext}
                .codePostFormat=${this.codePostFormat}
              ></app-section-code>
            `}
      </section>
    `;
  }

  static styles = css`
    :host {
      margin-top: 3rem;
    }

    ::slotted([slot='title']) {
      text-transform: capitalize;
    }

    .grouplinks {
      display: flex;
      align-items: center;
      margin: var(--size-space-2x) 0;

      button {
        position: relative;
        cursor: pointer;
        padding: var(--size-space-0_4x) var(--size-space-0_8x);
        font-size: var(--size-text-0_9x);
        border: var(--size-border) solid var(--color-background-shade);
        border-right: none;
        color: var(--color-foreground);
        text-align: center;
        height: 32px;

        &:first-child {
          border-radius: var(--size-radius) 0 0 var(--size-radius);
        }
        &:last-child {
          border-radius: 0 var(--size-radius) var(--size-radius) 0;
          border-right: var(--size-border) solid var(--color-background-shade);
        }
        &.active {
          background: var(--color-background-tint);
          color: var(--color-foreground);
        }
      }

      .separator {
        width: 2px;
        height: 32px;
        background: var(--color-background-shade);
      }
    }
  `;
}
