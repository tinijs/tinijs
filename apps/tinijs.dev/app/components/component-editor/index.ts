import {html, css, nothing, type TemplateResult} from 'lit';
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
  Component,
  TiniComponent,
  Input,
  Reactive,
  createComponentLoader,
  ContrastColors,
  Sizes,
  type OnCreate,
  type OnChanges,
  type OnFirstRender,
} from '@tinijs/core';
import {Subscribe} from '@tinijs/store';

import {TiniLinkComponent} from '../../ui/components/link.js';
import {TiniIconComponent} from '../../ui/components/icon.js';
import {TiniCodeComponent} from '../../ui/components/code.js';

import {UIConsumerTargets} from '../../consts/common.js';

import {mainStore} from '../../stores/main.js';

import {parseName, type Names} from '../../utils/name.js';
import {buildUsageCode, buildPreviewCode} from '../../utils/code.js';

import {IconExpandComponent} from '../../icons/expand.js';
import {IconCollapseComponent} from '../../icons/collapse.js';
import {IconMobileComponent} from '../../icons/mobile.js';
import {IconTabletComponent} from '../../icons/tablet.js';
import {IconTVComponent} from '../../icons/tv.js';
import {IconDesktopComponent} from '../../icons/desktop.js';

import {AppConsumerTabsComponent} from '../consumer-tabs.js';
import {AppSkinEditorTogglerComponent} from '../skin-editor/toggler.js';
import {AppComponentEditorInputComponent} from './input.js';
import {AppComponentEditorTextareaComponent} from './textarea.js';
import {AppComponentEditorSelectComponent} from './select.js';
import {AppComponentEditorRadiosComponent} from './radios.js';
import {AppComponentEditorSwitchComponent} from './switch.js';
import {AppComponentEditorHTMLComponent} from './html.js';
import {AppComponentEditorCSSComponent} from './css.js';
import {AppComponentEditorJSComponent} from './js.js';

export interface FunctionSection {
  section: string;
  target: string;
  value?: any;
  attrs?: Record<string, any>;
}

export interface ComponentData {
  props?: Record<string, any>;
  inner?: string;
}

export enum CommonViewports {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
  TV = 'tv',
}

const componentLoader = createComponentLoader(
  {
    box: () => import('../../ui/components/box.js'),
    flex: () => import('../../ui/components/flex.js'),
    grid: () => import('../../ui/components/grid.js'),
    container: () => import('../../ui/components/container.js'),
    heading: () => import('../../ui/components/heading.js'),
    text: () => import('../../ui/components/text.js'),
    link: () => import('../../ui/components/link.js'),
    skeleton: () => import('../../ui/components/skeleton.js'),
    icon: () => import('../../ui/components/icon.js'),
    button: () => import('../../ui/components/button.js'),
    badge: () => import('../../ui/components/badge.js'),
    label: () => import('../../ui/components/label.js'),
    message: () => import('../../ui/components/message.js'),
    spinner: () => import('../../ui/components/spinner.js'),
    card: () => import('../../ui/components/card.js'),
    breadcrumbs: () => import('../../ui/components/breadcrumbs.js'),
    pagination: () => import('../../ui/components/pagination.js'),
    dialog: () => import('../../ui/components/dialog.js'),
    modal: () => import('../../ui/components/modal.js'),
    input: () => import('../../ui/components/input.js'),
    textarea: () => import('../../ui/components/textarea.js'),
    select: () => import('../../ui/components/select.js'),
    checkboxes: () => import('../../ui/components/checkboxes.js'),
    radios: () => import('../../ui/components/radios.js'),
    switch: () => import('../../ui/components/switch.js'),
    image: () => import('../../ui/components/image.js'),
    embed: () => import('../../ui/components/embed.js'),
    table: () => import('../../ui/components/table.js'),
    code: () => import('../../ui/components/code.js'),
  },
  {
    prefixes: ['tini'],
  }
);

@Component({
  components: [
    TiniLinkComponent,
    TiniIconComponent,
    TiniCodeComponent,
    IconMobileComponent,
    IconTabletComponent,
    IconTVComponent,
    IconDesktopComponent,
    AppConsumerTabsComponent,
    AppSkinEditorTogglerComponent,
    AppComponentEditorInputComponent,
    AppComponentEditorTextareaComponent,
    AppComponentEditorSelectComponent,
    AppComponentEditorRadiosComponent,
    AppComponentEditorSwitchComponent,
    AppComponentEditorHTMLComponent,
    AppComponentEditorCSSComponent,
    AppComponentEditorJSComponent,
  ],
})
export class AppComponentEditorComponent
  extends TiniComponent
  implements OnCreate, OnChanges, OnFirstRender
{
  static readonly defaultTagName = 'app-component-editor';

  @Subscribe(mainStore) uiConsumerTarget = mainStore.uiConsumerTarget;

  @Input() name!: string;
  @Input({type: Object}) sections!: FunctionSection[];

  @Reactive() commonViewport?: string;
  @Reactive() isFullscreen = false;
  @Reactive() data?: ComponentData;

  private readonly _mainRef = createRef<HTMLDivElement>();
  private readonly _previewRef = createRef<HTMLDivElement>();
  private readonly _resizableRef = createRef<HTMLDivElement>();
  private readonly _viewportSizeRef = createRef<HTMLDivElement>();

  usageCode?: string;
  previewTemplate?: TemplateResult;

  private names!: Names;
  onCreate() {
    if (!this.name) throw new Error('name is required');
    if (!this.sections) throw new Error('sections is required');
    // parse name
    this.names = parseName(this.name);
    // initial data
    this.data = this.sections.reduce((result, {target, value}) => {
      if (target === 'inner') {
        if (value) result.inner = value;
      } else {
        if (!result.props) result.props = {};
        if (value) result.props[target] = value;
      }
      return result;
    }, {} as ComponentData);
  }

  onChanges() {
    // load constructors
    if (!this.data?.inner) {
      componentLoader.load([this.name]);
    } else {
      componentLoader.extractAndLoad([[this.name], this.data?.inner]);
    }
    // build codes
    this.usageCode = this.buildUsageCode();
    this.previewTemplate = this.buildPreviewCode();
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
          const viewportSizeElem = this._viewportSizeRef.value!;
          viewportSizeElem.textContent = `${Math.round(width)}×${Math.round(
            height
          )}`;
          if (this.viewportSizeTimeout) clearTimeout(this.viewportSizeTimeout);
          viewportSizeElem.classList.add('showed');
          this.viewportSizeTimeout = setTimeout(() => {
            viewportSizeElem.classList.remove('showed');
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

  private buildUsageCode() {
    return buildUsageCode(this.uiConsumerTarget, {
      ...this.data,
      name: this.name,
    });
  }

  private buildPreviewCode() {
    return buildPreviewCode({...this.data, name: this.name});
  }

  private changeCommonViewport(viewport: CommonViewports) {
    if (viewport === this.commonViewport) {
      this.commonViewport = undefined;
    } else {
      const availableWidth = this._previewRef.value!.clientWidth;
      const targetWidth = {
        [CommonViewports.Mobile]: 320,
        [CommonViewports.Tablet]: 768,
        [CommonViewports.Desktop]: 992,
        [CommonViewports.TV]: 1400,
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
    mainStore.uiConsumerTarget = target;
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
    const editTemplate = !this.sections.length
      ? nothing
      : this.sections.map(({section, attrs, target, value}) => {
          const tag = unsafeStatic(`app-component-editor-${section}`);
          // attributes
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
          // value event
          const onChange = (value: any) => {
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
          };
          // build section
          return staticHTML`
        <${tag} ${attributes} .value=${value} @change=${({
          detail,
        }: CustomEvent<any>) => onChange(detail)}></${tag}>
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
        ${editTemplate}
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
              scheme=${ContrastColors.Body}
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
              scheme=${ContrastColors.Body}
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
              scheme=${ContrastColors.Body}
              size=${Sizes.XS}
            ></icon-desktop>
          </button>
          <button
            class=${classMap({
              selected: this.commonViewport === CommonViewports.TV,
            })}
            @click=${() => this.changeCommonViewport(CommonViewports.TV)}
          >
            <icon-tv scheme=${ContrastColors.Body} size=${Sizes.XS}></icon-tv>
          </button>
          <span class="separator"></span>
          <button @click=${this.toggleFullScreen}>
            <tini-icon
              scheme=${ContrastColors.Body}
              src=${this.isFullscreen
                ? IconCollapseComponent.src
                : IconExpandComponent.src}
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

    @media (min-width: 1400px) {
      .main {
        flex-flow: row;

        .edit {
          max-width: 320px;
        }

        main {
          flex: 1;
        }
      }
    }
  `;
}
