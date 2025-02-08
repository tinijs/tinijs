import {html, css, nothing, type TemplateResult} from 'lit';
import {property} from 'lit/decorators/property.js';
import {state} from 'lit/decorators/state.js';
import {ref, createRef} from 'lit/directives/ref.js';
import {classMap} from 'lit/directives/class-map.js';
import {html as staticHTML, unsafeStatic} from 'lit/static-html.js';
import '@interactjs/auto-start';
import '@interactjs/actions/resize';
import '@interactjs/modifiers';
import interact from '@interactjs/interact'; // eslint-disable-next-line node/no-extraneous-import
import type {InteractStatic} from '@interactjs/core/InteractStatic.js';
import screenfull from 'screenfull';

import {
  element,
  createElementLoader,
  TiniElement,
  ContrastColors,
  Sizes,
  type OnCreate,
  type OnChanges,
  type OnFirstRender,
} from '@tinijs/core';
import {globalState} from '@tinijs/store';

import {TiniLinkElement} from '../../ui/elements/link.js';
import {TiniIconElement} from '../../ui/elements/icon.js';
import {TiniCodeElement} from '../../ui/elements/code.js';
import {TiniSelectElement} from '../../ui/elements/select.js';

import {UIConsumerTargets} from '../../consts/common.js';

import {MAIN_STORE} from '../../stores/main.js';

import {buildUsageCode, buildPreviewCode} from '../../utils/code.js';

import {IconExpandElement} from '../../icons/expand.js';
import {IconCollapseElement} from '../../icons/collapse.js';
import {IconMobileElement} from '../../icons/mobile.js';
import {IconTabletElement} from '../../icons/tablet.js';
import {IconTVElement} from '../../icons/tv.js';
import {IconDesktopElement} from '../../icons/desktop.js';

import {AppConsumerTabsElement} from '../consumer-tabs.js';
import {AppSkinEditorTogglerElement} from '../skin-editor/toggler.js';
import {AppElementEditorInputElement} from './input.js';
import {AppElementEditorTextareaElement} from './textarea.js';
import {AppElementEditorSelectElement} from './select.js';
import {AppElementEditorRadiosElement} from './radios.js';
import {AppElementEditorSwitchElement} from './switch.js';
import {AppElementEditorHTMLElement} from './html.js';
import {AppElementEditorCSSElement} from './css.js';
import {AppElementEditorJSElement} from './js.js';
import {AppElementEditorPlainElement} from './plain.js';

export interface QuickExample {
  content: string;
  items: Array<{
    target: string;
    value: any;
  }>;
}

export interface FunctionSection {
  section: string;
  target: string;
  value?: any;
  attrs?: Record<string, any>;
}

export interface ElementData {
  props?: Record<string, any>;
  inner?: string;
}

export enum CommonViewports {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
  TV = 'tv',
}

const elementLoader = createElementLoader(
  {
    box: () => import('../../ui/elements/box.js'),
    flex: () => import('../../ui/elements/flex.js'),
    grid: () => import('../../ui/elements/grid.js'),
    container: () => import('../../ui/elements/container.js'),
    heading: () => import('../../ui/elements/heading.js'),
    text: () => import('../../ui/elements/text.js'),
    link: () => import('../../ui/elements/link.js'),
    skeleton: () => import('../../ui/elements/skeleton.js'),
    icon: () => import('../../ui/elements/icon.js'),
    button: () => import('../../ui/elements/button.js'),
    badge: () => import('../../ui/elements/badge.js'),
    label: () => import('../../ui/elements/label.js'),
    message: () => import('../../ui/elements/message.js'),
    spinner: () => import('../../ui/elements/spinner.js'),
    card: () => import('../../ui/elements/card.js'),
    breadcrumbs: () => import('../../ui/elements/breadcrumbs.js'),
    pagination: () => import('../../ui/elements/pagination.js'),
    dialog: () => import('../../ui/elements/dialog.js'),
    modal: () => import('../../ui/elements/modal.js'),
    input: () => import('../../ui/elements/input.js'),
    textarea: () => import('../../ui/elements/textarea.js'),
    select: () => import('../../ui/elements/select.js'),
    checkboxes: () => import('../../ui/elements/checkboxes.js'),
    radios: () => import('../../ui/elements/radios.js'),
    switch: () => import('../../ui/elements/switch.js'),
    image: () => import('../../ui/elements/image.js'),
    embed: () => import('../../ui/elements/embed.js'),
    table: () => import('../../ui/elements/table.js'),
    code: () => import('../../ui/elements/code.js'),
  },
  {
    prefixes: ['tini'],
  }
);

@element({
  elements: [
    TiniLinkElement,
    TiniIconElement,
    TiniCodeElement,
    TiniSelectElement,
    IconMobileElement,
    IconTabletElement,
    IconTVElement,
    IconDesktopElement,
    AppConsumerTabsElement,
    AppSkinEditorTogglerElement,
    AppElementEditorInputElement,
    AppElementEditorTextareaElement,
    AppElementEditorSelectElement,
    AppElementEditorRadiosElement,
    AppElementEditorSwitchElement,
    AppElementEditorHTMLElement,
    AppElementEditorCSSElement,
    AppElementEditorJSElement,
    AppElementEditorPlainElement,
  ],
})
export class AppElementEditorElement
  extends TiniElement
  implements OnCreate, OnChanges, OnFirstRender
{
  static readonly defaultTagName = 'app-element-editor';

  @globalState(MAIN_STORE) uiConsumerTarget = MAIN_STORE.uiConsumerTarget;

  @property() name!: string;
  @property({type: Object}) examples?: Record<string, QuickExample>;
  @property({type: Object}) sections!: FunctionSection[];

  @state() commonViewport?: string;
  @state() isFullscreen = false;
  @state() selectedExampleValue = '_default';
  @state() data?: ElementData;

  private readonly _mainRef = createRef<HTMLDivElement>();
  private readonly _previewRef = createRef<HTMLDivElement>();
  private readonly _resizableRef = createRef<HTMLDivElement>();
  private readonly _viewportSizeRef = createRef<HTMLDivElement>();

  usageCode?: string;
  previewTemplate?: TemplateResult;

  onCreate() {
    if (!this.name) throw new Error('name is required');
    if (!this.sections) throw new Error('sections is required');
    // build initial data
    this.data = this.getInitialData();
  }

  onChanges() {
    // load constructors
    if (!this.data?.inner) {
      elementLoader.load([this.name]);
    } else {
      elementLoader.extractAndLoad([[this.name], this.data?.inner]);
    }
    // build codes
    this.usageCode = buildUsageCode(this.uiConsumerTarget, {
      ...this.data,
      name: this.name,
    });
    this.previewTemplate = buildPreviewCode({...this.data, name: this.name});
  }

  private originalAvailableWidth!: number;
  private viewportSizeTimeout?: any;
  onFirstRender() {
    this.originalAvailableWidth = this._previewRef.value!.clientWidth;
    // init resizable
    (interact as InteractStatic)(this._resizableRef.value!).resizable({
      edges: {right: true, bottom: true},
      listeners: {
        move: (event: any) => {
          const target = event.target;
          const {width, height} = event.rect;
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          // show viewport size
          const viewportSizeElement = this._viewportSizeRef.value!;
          viewportSizeElement.textContent = `${Math.round(width)}×${Math.round(
            height
          )}`;
          if (this.viewportSizeTimeout) clearTimeout(this.viewportSizeTimeout);
          viewportSizeElement.classList.add('showed');
          this.viewportSizeTimeout = setTimeout(() => {
            viewportSizeElement.classList.remove('showed');
          }, 2500);
        },
      },
      modifiers: [
        interact.modifiers.restrictEdges({
          outer: 'parent',
        }),
        interact.modifiers.restrictSize({
          min: {width: 240, height: 240},
        }),
      ],
    });
  }

  private changeCommonViewport(viewport: CommonViewports) {
    if (viewport === this.commonViewport) {
      this.commonViewport = undefined;
    } else {
      const availableWidth = this._previewRef.value!.clientWidth;
      const targetWidth = {
        [CommonViewports.Mobile]: 320,
        [CommonViewports.Tablet]: 768,
        [CommonViewports.Desktop]: 1024,
        [CommonViewports.TV]: 1640,
      }[viewport];
      this.commonViewport = viewport;
      this._resizableRef.value!.style.width = `${
        targetWidth <= availableWidth ? targetWidth : availableWidth
      }px`;
    }
  }

  private changeConsumerTarget({
    detail: target,
  }: CustomEvent<UIConsumerTargets>) {
    if (target === this.uiConsumerTarget) return;
    MAIN_STORE.uiConsumerTarget = target;
  }

  private toggleFullScreen() {
    if (!screenfull.isEnabled) return;
    if (screenfull.isFullscreen) {
      this._resizableRef.value!.style.width = `${this.originalAvailableWidth}px`;
      screenfull.exit();
      this.isFullscreen = false;
    } else {
      screenfull.request(this._mainRef.value!);
      this.isFullscreen = true;
    }
  }

  private getInitialData() {
    return this.sections.reduce((result, {target, value}) => {
      if (target === 'inner') {
        if (value) result.inner = value;
      } else {
        if (!result.props) result.props = {};
        if (value) result.props[target] = value;
      }
      return result;
    }, {} as ElementData);
  }

  private changeExample({detail}: CustomEvent<InputEvent>) {
    const value = (detail.target as any).value as string;
    const example = this.examples![value];
    this.data = {}; // reset data
    if (!example) {
      this.selectedExampleValue = '_default';
      this.data = this.getInitialData();
    } else {
      this.selectedExampleValue = value;
      example.items.forEach(({target, value}) => {
        this.changeElementData(target, value, true);
      });
    }
  }

  private changeElementData(target: string, value: any, keepExample = false) {
    // reset example
    if (!keepExample) this.selectedExampleValue = '_default';
    // update data
    const data = {...this.data};
    if (target === 'inner') {
      data.inner = value;
    } else {
      data.props ||= {};
      if (!value || value === '_default') {
        delete data.props[target];
      } else {
        data.props[target] = value;
      }
    }
    this.data = data;
  }

  protected render() {
    return html`
      <div
        ${ref(this._mainRef)}
        class=${classMap({main: true, fullscreen: this.isFullscreen})}
      >
        <aside class="edit">${this.getEditTemplate()}</aside>

        <main>
          <div ${ref(this._previewRef)} class="preview">
            ${this.getPreviewTemplate()}
          </div>

          <div class="code">${this.getCodeTemplate()}</div>
        </main>
      </div>
    `;
  }

  private getEditTemplate() {
    const selectedExample = (
      this.examples?.[this.selectedExampleValue!]?.items || []
    ).reduce(
      (result, item) => {
        result[item.target] = item.value;
        return result;
      },
      {} as Record<string, any>
    );
    const currentData: Record<string, any> = {
      ...this.data?.props,
      inner: this.data?.inner,
    };
    const examplesTemplate = !this.examples
      ? nothing
      : html`
          <div class="examples">
            <tini-select
              wrap
              block
              label="Quick examples"
              .items=${[
                {value: '_default', content: 'None (manually)'},
                ...Object.entries(this.examples).map(([value, {content}]) => ({
                  value,
                  content,
                })),
              ]}
              .value=${this.selectedExampleValue}
              events="change"
              @change=${this.changeExample}
            ></tini-select>
          </div>
          <hr />
        `;
    const editTemplate = !this.sections.length
      ? nothing
      : this.sections.map(({section, attrs, target}) => {
          const tag = unsafeStatic(`app-element-editor-${section}`);
          const attributes = !attrs
            ? ''
            : unsafeStatic(
                Object.entries(attrs)
                  .map(([key, value]) => {
                    if (!value) return null;
                    if (value === true) {
                      return key;
                    } else if (value instanceof Object) {
                      return `${key}='${JSON.stringify(value)}'`;
                    } else {
                      return `${key}="${value}"`;
                    }
                  })
                  .filter(Boolean)
                  .join(' ')
              );
          return staticHTML`
            <${tag}
              ${attributes}
              target=${target}
              .value=${selectedExample[target] || currentData[target]}
              @change=${({detail}: CustomEvent<any>) =>
                this.changeElementData(target, detail)}
            ></${tag}>
          `;
        });
    return html`
      <div class="head">
        <strong>Edit</strong>
        ${this.isFullscreen
          ? nothing
          : html`<app-skin-editor-toggler></app-skin-editor-toggler>`}
      </div>
      <div class="body">
        ${examplesTemplate} ${editTemplate}
        <div class="foot">
          <!-- <a href="/ui/customization">Not sastify, more options?</a> -->
        </div>
      </div>
    `;
  }

  private getPreviewTemplate() {
    return html`
      <div class="head">
        <div class="title"><strong>Preview</strong></div>
        <div class="buttons">
          <button
            class=${classMap({
              selected: this.commonViewport === CommonViewports.Mobile,
            })}
            @click=${() => this.changeCommonViewport(CommonViewports.Mobile)}
          >
            <icon-mobile
              color=${ContrastColors.Body}
              size=${Sizes.XS}
            ></icon-mobile>
          </button>
          <button
            class=${classMap({
              selected: this.commonViewport === CommonViewports.Tablet,
            })}
            @click=${() => this.changeCommonViewport(CommonViewports.Tablet)}
          >
            <icon-tablet
              color=${ContrastColors.Body}
              size=${Sizes.XS}
            ></icon-tablet>
          </button>
          <button
            class=${classMap({
              selected: this.commonViewport === CommonViewports.Desktop,
            })}
            @click=${() => this.changeCommonViewport(CommonViewports.Desktop)}
          >
            <icon-desktop
              color=${ContrastColors.Body}
              size=${Sizes.XS}
            ></icon-desktop>
          </button>
          <button
            class=${classMap({
              selected: this.commonViewport === CommonViewports.TV,
            })}
            @click=${() => this.changeCommonViewport(CommonViewports.TV)}
          >
            <icon-tv color=${ContrastColors.Body} size=${Sizes.XS}></icon-tv>
          </button>
          <span class="separator"></span>
          <button @click=${this.toggleFullScreen}>
            <tini-icon
              color=${ContrastColors.Body}
              src=${this.isFullscreen
                ? IconCollapseElement.src
                : IconExpandElement.src}
              size=${Sizes.XS}
            ></tini-icon>
          </button>
        </div>
      </div>
      <div ${ref(this._resizableRef)} class="body resizable">
        <div class="viewport">${this.previewTemplate}</div>
        <div class="viewport-size" ${ref(this._viewportSizeRef)}></div>
        <div class="right-grip"></div>
        <div class="bottom-grip"></div>
      </div>
    `;
  }

  private getCodeTemplate() {
    return html`
      <div class="head">
        <app-consumer-tabs
          target=${this.uiConsumerTarget}
          @change=${this.changeConsumerTarget}
        ></app-consumer-tabs>
      </div>
      <div class="body">
        ${!this.usageCode
          ? nothing
          : html`
              <div>
                <tini-code
                  language="html"
                  content=${this.usageCode}
                ></tini-code>
              </div>
            `}
      </div>
    `;
  }

  static styles = css`
    .main {
      display: flex;
      flex-flow: column;
      gap: 1rem;
      background: var(--color-body);

      &.fullscreen {
        padding: var(--space-md);
      }
    }

    .edit,
    .preview,
    .code {
      --head-height: 40px;
      overflow: hidden;
      width: 100%;
      border: 1px solid var(--color-body-semi);
      border-radius: var(--radius-md);

      .head {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        height: var(--head-height);
        padding: var(--space-xs);
        border-bottom: 1px solid var(--color-body-semi);
      }

      .body {
        padding: var(--space-md);
      }
    }

    aside {
      .body {
        display: flex;
        flex-flow: column;
        gap: var(--space-lg);

        .examples {
          border: 1px solid var(--color-medium);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          background: var(--gradient-body);

          tini-select::part(label) {
            font-weight: bold;
            font-size: var(--text-xs);
            text-transform: uppercase;
            margin-top: -4px;
          }
        }
      }
    }

    main {
      display: flex;
      flex-flow: column;
      gap: 1rem;

      .preview {
        --head-height: 40px;
        height: 480px;
        background: var(--color-body-soft);

        .head {
          background: var(--color-body);

          .buttons {
            display: flex;
            align-items: center;
            gap: var(--space-xs);

            .separator {
              display: block;
              width: 1px;
              height: 20px;
              background: var(--color-body-semi);
            }

            button {
              display: flex;
              align-items: center;
              justify-content: center;
              background: none;
              border: none;
              border-radius: var(--radius-md);
              padding: var(--space-xs2);
              cursor: pointer;

              &:hover {
                background: var(--color-body-soft);
              }

              &.selected {
                background: var(--color-body-semi);
              }
            }
          }
        }

        .resizable {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          height: calc(100% - var(--head-height));
          min-width: 240px;
          min-height: 240px;
          background: var(--color-body);
          overflow: scroll;
        }

        .viewport-size {
          display: none;
          position: absolute;
          top: var(--space-md);
          right: var(--space-md);
          padding: var(--space-xs2) var(--space-xs);
          font-size: var(--text-sm);
          border-radius: var(--radius-md);
          background: color-mix(
            in oklab,
            var(--color-body-contrast),
            transparent 30%
          );
          color: var(--color-body);
          user-select: none;

          &.showed {
            display: block;
          }
        }

        .right-grip,
        .bottom-grip {
          content: '';
          position: absolute;
          border-radius: 1000rem;
          background: var(--color-body-semi);
        }

        .right-grip {
          --height: 40px;
          width: 5px;
          height: var(--height);
          top: calc(50% - (var(--height) / 2));
          right: 10px;
        }

        .bottom-grip {
          --width: 40px;
          width: var(--width);
          height: 5px;
          left: calc(50% - (var(--width) / 2));
          bottom: 10px;
        }
      }

      .code {
        .head {
          display: flex;
          padding: 0;
          justify-content: flex-start;
        }

        tini-code {
          display: grid;
        }
      }
    }

    @media (min-width: 768px) {
      main .code .head button span {
        display: inline;
      }
    }

    @media (min-width: 1440px) {
      .main {
        flex-flow: row;

        .edit {
          max-width: 320px;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;

          .preview {
            flex: 1;
          }
        }
      }
    }
  `;
}
