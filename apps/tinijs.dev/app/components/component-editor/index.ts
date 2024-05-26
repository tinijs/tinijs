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
import JSON5 from 'json5';

import {
  Component,
  TiniComponent,
  Input,
  Reactive,
  createComponentLoader,
  UseUI,
  Colors,
  Scales,
  type UI,
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

import {IconExpandComponent} from '../../icons/expand.js';
import {IconCollapseComponent} from '../../icons/collapse.js';
import {IconMobileComponent} from '../../icons/mobile.js';
import {IconTabletComponent} from '../../icons/tablet.js';
import {IconLaptopComponent} from '../../icons/laptop.js';
import {IconDesktopComponent} from '../../icons/desktop.js';
import {IconTiniComponent} from '../../icons/tini.js';
import {IconVueComponent} from '../../icons/vue.js';
import {IconReactComponent} from '../../icons/react.js';
import {IconAngularComponent} from '../../icons/angular.js';
import {IconSvelteComponent} from '../../icons/svelte.js';
import {IconHTMLComponent} from '../../icons/html.js';

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
  Laptop = 'laptop',
  Desktop = 'desktop',
}

const componentLoader = createComponentLoader(
  {
    heading: () => import('../../ui/components/heading.js'),
    text: () => import('../../ui/components/text.js'),
    link: () => import('../../ui/components/link.js'),
    box: () => import('../../ui/components/box.js'),
    skeleton: () => import('../../ui/components/skeleton.js'),
    icon: () => import('../../ui/components/icon.js'),
    button: () => import('../../ui/components/button.js'),
    badge: () => import('../../ui/components/badge.js'),
    label: () => import('../../ui/components/label.js'),
    message: () => import('../../ui/components/message.js'),
    spinner: () => import('../../ui/components/spinner.js'),
    card: () => import('../../ui/components/card.js'),
    breadcrumb: () => import('../../ui/components/breadcrumb.js'),
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
    figure: () => import('../../ui/components/figure.js'),
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
    IconLaptopComponent,
    IconDesktopComponent,
    IconTiniComponent,
    IconVueComponent,
    IconReactComponent,
    IconAngularComponent,
    IconSvelteComponent,
    IconHTMLComponent,
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

  @UseUI() readonly ui!: UI;
  @Subscribe(mainStore) uiConsumerTarget = mainStore.uiConsumerTarget;

  @Input() name!: string;
  @Input({type: Object}) sections!: FunctionSection[];

  @Reactive() commonViewport?: string;
  @Reactive() isFullscreen = false;
  @Reactive() data?: ComponentData;

  private readonly _rootRef = createRef<HTMLDivElement>();
  private readonly _previewRef = createRef<HTMLDivElement>();
  private readonly _resizableRef = createRef<HTMLDivElement>();
  private readonly _viewportSizeRef = createRef<HTMLDivElement>();

  importCode?: string;
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
    this.importCode = this.buildImportCode();
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

  private buildImportCode() {
    const {familyId} = this.ui.activeTheme;
    const constructorName = `Tini${this.names.className}Component`;
    const importPath = `@tinijs/ui-${familyId}/components/${this.name}.js`;
    switch (this.uiConsumerTarget) {
      case UIConsumerTargets.Tini: {
        return `import {${constructorName}} from '${importPath}';

@App|Layout|Page|Component({components: [ ${constructorName} ]})`;
      }
      case UIConsumerTargets.React: {
        const reactTag = `Tini${this.names.className}`;
        const reactPath = `@tinijs/ui-${familyId}-react/components/${this.name}.js`;
        return `import {${reactTag}, ${constructorName}} from '${reactPath}';

registerComponents([ ${constructorName} ])`;
      }
      case UIConsumerTargets.Vanilla: {
        const cdnPath = `https://cdn.jsdelivr.net/npm/@tinijs/ui-${familyId}/bundled/components.js`;
        return `import {${constructorName}} from '${cdnPath}';

setupUI(/* setup */, [ ${constructorName} ]);`;
      }
      default: {
        return `import {${constructorName}} from '${importPath}';

registerComponents([ ${constructorName} ]);`;
      }
    }
  }

  private buildUsageProperties(
    props: Record<string, any> | undefined,
    nonPrimitiveModifiers: [string, string, string, string] = [
      '.',
      '',
      '${',
      '}',
    ],
    stringifyObject = false
  ) {
    const [prefix, suffix, open, close] = nonPrimitiveModifiers;
    return !props
      ? ''
      : Object.entries(props)
          .map(([key, value]) => {
            if (!value) return null;
            if (value === true) {
              return key;
            } else if (typeof value === 'number') {
              return `${prefix}${key}${suffix}=${open}${value}${close}`;
            } else if (value instanceof Object) {
              return `${prefix}${key}${suffix}=${open}${
                stringifyObject
                  ? JSON.stringify(value, null, 2)
                  : JSON5.stringify(value, null, 2)
              }${close}`;
            } else {
              return `${key}="${value}"`;
            }
          })
          .filter(Boolean)
          .join(' ');
  }
  private buildUsageCode() {
    const {props = {}, inner = ''} = this.data || {};
    let tag = `tini-${this.name}`;
    let properties!: string;
    switch (this.uiConsumerTarget) {
      case UIConsumerTargets.Vue: {
        properties = this.buildUsageProperties(props, ['.', '', '"', '"']);
        break;
      }
      case UIConsumerTargets.React: {
        tag = `Tini${this.names.className}`;
        properties = this.buildUsageProperties(props, ['', '', '{', '}']);
        break;
      }
      case UIConsumerTargets.Angular: {
        properties = this.buildUsageProperties(props, ['[', ']', '"', '"']);
        break;
      }
      case UIConsumerTargets.Svelte: {
        properties = this.buildUsageProperties(props, ['', '', '{', '}']);
        break;
      }
      case UIConsumerTargets.Vanilla: {
        properties = this.buildUsageProperties(props, ['', '', "'", "'"], true);
        break;
      }
      case UIConsumerTargets.Tini:
      default: {
        properties = this.buildUsageProperties(props);
        break;
      }
    }
    return `<${tag} ${properties}>${inner}</${tag}>`;
  }

  private buildPreviewCode() {
    const {props = {}, inner = ''} = this.data || {};
    const tag = unsafeStatic(`tini-${this.name}`);
    const properties = !props
      ? ''
      : unsafeStatic(
          Object.entries(props)
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
    return staticHTML`<${tag} ${properties}>${unsafeStatic(inner)}</${tag}>`;
  }

  private changeCommonViewport(viewport: CommonViewports) {
    if (viewport === this.commonViewport) {
      this.commonViewport = undefined;
    } else {
      const availableWidth = this._previewRef.value!.clientWidth;
      const targetWidth = {
        [CommonViewports.Mobile]: 320,
        [CommonViewports.Tablet]: 768,
        [CommonViewports.Laptop]: 1024,
        [CommonViewports.Desktop]: 1440,
      }[viewport];
      this.commonViewport = viewport;
      this._resizableRef.value!.style.width = `${
        targetWidth <= availableWidth ? targetWidth : availableWidth
      }px`;
    }
  }

  private changeConsumerTarget(target: UIConsumerTargets) {
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
      screenfull.request(this._rootRef.value!);
      this.isFullscreen = true;
    }
  }

  protected render() {
    return html`
      <div
        ${ref(this._rootRef)}
        class=${classMap({root: true, fullscreen: this.isFullscreen})}
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
          <a href="/ui/customization">Not sastify, more options?</a>
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
              scheme=${Colors.Front}
              scale=${Scales.XS}
            ></icon-mobile>
          </button>
          <button
            class=${classMap({
              selected: this.commonViewport === CommonViewports.Tablet,
            })}
            @click=${() => this.changeCommonViewport(CommonViewports.Tablet)}
          >
            <icon-tablet
              scheme=${Colors.Front}
              scale=${Scales.XS}
            ></icon-tablet>
          </button>
          <button
            class=${classMap({
              selected: this.commonViewport === CommonViewports.Laptop,
            })}
            @click=${() => this.changeCommonViewport(CommonViewports.Laptop)}
          >
            <icon-laptop
              scheme=${Colors.Front}
              scale=${Scales.XS}
            ></icon-laptop>
          </button>
          <button
            class=${classMap({
              selected: this.commonViewport === CommonViewports.Desktop,
            })}
            @click=${() => this.changeCommonViewport(CommonViewports.Desktop)}
          >
            <icon-desktop
              scheme=${Colors.Front}
              scale=${Scales.XS}
            ></icon-desktop>
          </button>
          <span class="separator"></span>
          <button @click=${this.toggleFullScreen}>
            <tini-icon
              scheme=${Colors.Front}
              src=${this.isFullscreen
                ? IconCollapseComponent.src
                : IconExpandComponent.src}
              scale=${Scales.XS}
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
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Tini,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Tini)}
        >
          <icon-tini scale=${Scales.XS}></icon-tini>
          <span>Tini</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Vue,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Vue)}
        >
          <icon-vue scale=${Scales.XS}></icon-vue>
          <span>Vue</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.React,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.React)}
        >
          <icon-react scale=${Scales.XS}></icon-react>
          <span>React</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Angular,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Angular)}
        >
          <icon-angular scale=${Scales.XS}></icon-angular>
          <span>Angular</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Svelte,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Svelte)}
        >
          <icon-svelte scale=${Scales.XS}></icon-svelte>
          <span>Svelte</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Vanilla,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Vanilla)}
        >
          <icon-html scale=${Scales.XS}></icon-html>
          <span>Vanilla</span>
        </button>
      </div>
      <div class="body">
        ${!this.importCode
          ? nothing
          : html`
              <div>
                <p>
                  <strong>Step 1</strong>: Import and register the component,
                  please see <a href="/ui/get-started">Get started</a> for more
                  details.
                </p>
                <tini-code
                  language="javascript"
                  content=${this.importCode}
                ></tini-code>
              </div>
            `}
        ${!this.usageCode
          ? nothing
          : html`
              <div>
                <p><strong>Step 2</strong>: Copy below code to the template.</p>
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
    .root {
      display: flex;
      flex-flow: column;
      gap: 1rem;
      background: var(--color-back);

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
      border: 1px solid var(--color-back-shade);
      border-radius: var(--radius-md);

      .head {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        height: var(--head-height);
        padding: var(--space-xs);
        border-bottom: 1px solid var(--color-back-shade);
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
        background: var(--color-back-shade);

        .head {
          background: var(--color-back);

          .buttons {
            display: flex;
            align-items: center;
            gap: var(--space-xs);

            .separator {
              display: block;
              width: 1px;
              height: 20px;
              background: var(--color-back-shade);
            }

            button {
              display: flex;
              align-items: center;
              justify-content: center;
              background: none;
              border: none;
              border-radius: var(--radius-md);
              padding: var(--space-2xs);
              cursor: pointer;

              &:hover {
                background: color-mix(
                  in oklab,
                  var(--color-back),
                  var(--color-front) 5%
                );
              }

              &.selected {
                background: var(--color-back-shade);
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
          background: var(--color-back);
          overflow: scroll;
        }

        .viewport-size {
          display: none;
          position: absolute;
          top: var(--space-md);
          right: var(--space-md);
          padding: var(--space-2xs) var(--space-xs);
          font-size: var(--text-sm);
          border-radius: var(--radius-md);
          background: color-mix(in oklab, var(--color-front), transparent 30%);
          color: var(--color-back);
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
          background: var(--color-back-shade);
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

          button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-2xs);
            background: var(--color-back);
            border: none;
            padding: var(--space-xs) var(--space-sm);
            cursor: pointer;
            box-sizing: border-box;
            height: calc(var(--head-height) + 1px);
            border-bottom: 1px solid var(--color-back-shade);
            border-right: 1px solid var(--color-back-shade);
            background: color-mix(
              in oklab,
              var(--color-back),
              var(--color-front) 5%
            );

            &:hover {
              background: var(--color-back);
            }

            &.selected {
              background: var(--color-back);
              border-bottom-color: var(--color-back);
            }

            span {
              display: none;
            }
          }
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
      .root {
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
