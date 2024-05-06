import {html, css, nothing, type TemplateResult} from 'lit';
import {ref, createRef, type Ref} from 'lit/directives/ref.js';
import {classMap} from 'lit/directives/class-map.js';
import {html as staticHTML, unsafeStatic} from 'lit/static-html.js';
import '@interactjs/auto-start';
import '@interactjs/actions/resize';
import '@interactjs/modifiers';
import interact from '@interactjs/interact'; // eslint-disable-next-line node/no-extraneous-import
import type {InteractStatic} from '@interactjs/core/InteractStatic.js';
import screenfull from 'screenfull';
import {genObjectFromRaw} from 'knitwork';

import {
  Component,
  TiniComponent,
  Input,
  Reactive,
  registerComponents,
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
import {AppComponentEditorSelectComponent} from './select.js';
import {AppComponentEditorTextareaComponent} from './textarea.js';

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

export enum PresetViewports {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Laptop = 'laptop',
  Desktop = 'desktop',
}

const componentLoaders: Record<
  string,
  () => Promise<CustomElementConstructor>
> = {
  button: () =>
    import('../../ui/components/button.js').then(m => m.TiniButtonComponent),
};

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
    AppComponentEditorSelectComponent,
    AppComponentEditorTextareaComponent,
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
  @Input({type: Object, reflect: false}) sections!: FunctionSection[];

  @Reactive() presetViewport?: string;
  @Reactive() isFullscreen = false;
  @Reactive() data?: ComponentData;

  private readonly _rootRef: Ref<HTMLDivElement> = createRef();
  private readonly _previewRef: Ref<HTMLDivElement> = createRef();
  private readonly _resizableRef: Ref<HTMLDivElement> = createRef();
  private readonly _viewportSizeRef: Ref<HTMLDivElement> = createRef();

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
    this.loadComponents();
    // build codes
    this.importCode = this.buildImportCode();
    this.usageCode = this.buildUsageCode();
    this.previewTemplate = this.buildPreviewCode();
  }

  private viewportSizeTimeout?: any;
  onFirstRender() {
    (interact as InteractStatic)(this._resizableRef.value!).resizable({
      edges: {right: true, bottom: true},
      listeners: {
        move: (event: any) => {
          const target = event.target;
          const {width, height} = event.rect;
          target.style.width = width + 'px';
          target.style.height = height + 'px';
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

  private async loadComponents() {
    const inner = this.data?.inner;
    const childNames = !inner
      ? []
      : (inner.match(/<tini-([\s\S]*?) /g) || []).map(item =>
          item.slice(6, -1)
        );
    // get loaders
    const loaders = [this.name, ...childNames].map(
      name => componentLoaders[name]
    );
    const components: CustomElementConstructor[] = [];
    for (const loader of loaders) {
      const component = await loader();
      if (!component) continue;
      components.push(component);
    }
    // register components
    registerComponents(components);
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
        const cdnPath = `https://cdn.jsdelivr.net/npm/@tinijs/ui-${familyId}/bundled/components/${this.name}.js`;
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
                  ? JSON.stringify(value)
                  : genObjectFromRaw(value)
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
        tag = `Tini${this.names.className}`;
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
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ')
        );
    return staticHTML`<${tag} ${properties}>${unsafeStatic(inner)}</${tag}>`;
  }

  private availableWidth?: number;
  private changePresetViewport(preset: PresetViewports) {
    if (preset === this.presetViewport) {
      this.presetViewport = undefined;
    } else {
      const availableWidth =
        this.availableWidth || this._previewRef.value!.clientWidth;
      const targetWidth = {
        [PresetViewports.Mobile]: 320,
        [PresetViewports.Tablet]: 768,
        [PresetViewports.Laptop]: 1024,
        [PresetViewports.Desktop]: 1440,
      }[preset];
      this.presetViewport = preset;
      this._resizableRef.value!.style.width =
        (targetWidth <= availableWidth ? targetWidth : availableWidth) + 'px';
    }
  }

  private changeConsumerTarget(target: UIConsumerTargets) {
    if (target === this.uiConsumerTarget) return;
    mainStore.uiConsumerTarget = target;
  }

  private toggleFullScreen() {
    if (!screenfull.isEnabled) return;
    if (screenfull.isFullscreen) {
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
                  .map(([key, value]) => `${key}="${value}"`)
                  .join(' ')
              );
          // value event
          const onChange = (value: any) => {
            const data = {...this.data};
            if (target === 'inner') {
              data.inner = value;
            } else {
              data.props ||= {};
              if (value === '_default') {
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
      <div class="header">
        <strong>Edit</strong>
        ${this.isFullscreen
          ? nothing
          : html`<app-skin-editor-toggler></app-skin-editor-toggler>`}
      </div>
      <div class="content">
        ${editTemplate}
        <div>
          <a href="/ui/customization">Not sastify, more options?</a>
        </div>
      </div>
    `;
  }

  private getPreviewTemplate() {
    return html`
      <div class="header">
        <div class="title"><strong>Preview</strong></div>
        <div class="buttons">
          <button
            class=${classMap({
              selected: this.presetViewport === PresetViewports.Mobile,
            })}
            @click=${() => this.changePresetViewport(PresetViewports.Mobile)}
          >
            <icon-mobile
              scheme=${Colors.Foreground}
              scale=${Scales.SS}
            ></icon-mobile>
          </button>
          <button
            class=${classMap({
              selected: this.presetViewport === PresetViewports.Tablet,
            })}
            @click=${() => this.changePresetViewport(PresetViewports.Tablet)}
          >
            <icon-tablet
              scheme=${Colors.Foreground}
              scale=${Scales.SS}
            ></icon-tablet>
          </button>
          <button
            class=${classMap({
              selected: this.presetViewport === PresetViewports.Laptop,
            })}
            @click=${() => this.changePresetViewport(PresetViewports.Laptop)}
          >
            <icon-laptop
              scheme=${Colors.Foreground}
              scale=${Scales.SS}
            ></icon-laptop>
          </button>
          <button
            class=${classMap({
              selected: this.presetViewport === PresetViewports.Desktop,
            })}
            @click=${() => this.changePresetViewport(PresetViewports.Desktop)}
          >
            <icon-desktop
              scheme=${Colors.Foreground}
              scale=${Scales.SS}
            ></icon-desktop>
          </button>
          <span class="separator"></span>
          <button @click=${this.toggleFullScreen}>
            <tini-icon
              scheme=${Colors.Foreground}
              src=${this.isFullscreen
                ? IconCollapseComponent.src
                : IconExpandComponent.src}
              scale=${Scales.SS}
            ></tini-icon>
          </button>
        </div>
      </div>
      <div ${ref(this._resizableRef)} class="content resizable">
        <div class="viewport">${this.previewTemplate}</div>
        <div class="viewport-size" ${ref(this._viewportSizeRef)}></div>
        <div class="right-grip"></div>
        <div class="bottom-grip"></div>
      </div>
    `;
  }

  private getCodeTemplate() {
    return html`
      <div class="header">
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Tini,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Tini)}
        >
          <icon-tini scale=${Scales.SS}></icon-tini>
          <span>Tini</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Vue,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Vue)}
        >
          <icon-vue scale=${Scales.SS}></icon-vue>
          <span>Vue</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.React,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.React)}
        >
          <icon-react scale=${Scales.SS}></icon-react>
          <span>React</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Angular,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Angular)}
        >
          <icon-angular scale=${Scales.SS}></icon-angular>
          <span>Angular</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Svelte,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Svelte)}
        >
          <icon-svelte scale=${Scales.SS}></icon-svelte>
          <span>Svelte</span>
        </button>
        <button
          class=${classMap({
            selected: this.uiConsumerTarget === UIConsumerTargets.Vanilla,
          })}
          @click=${() => this.changeConsumerTarget(UIConsumerTargets.Vanilla)}
        >
          <icon-html scale=${Scales.SS}></icon-html>
          <span>Vanilla</span>
        </button>
      </div>
      <div class="content">
        ${!this.importCode
          ? nothing
          : html`
              <div>
                <p>
                  <strong>Step 1</strong>: import and register the component,
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
                <p><strong>Step 2</strong>: copy below code to the template.</p>
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
      background: var(--color-background-tint);

      &.fullscreen {
        padding: var(--size-space);
      }
    }

    .edit,
    .preview,
    .code {
      --header-height: 40px;
      overflow: hidden;
      width: 100%;
      border: 1px solid var(--color-background-shade);
      border-radius: var(--size-radius);

      .header {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        height: var(--header-height);
        padding: var(--size-space-0_5x);
        border-bottom: 1px solid var(--color-background-shade);
      }

      .content {
        padding: var(--size-space);
      }
    }

    aside {
      .content {
        display: flex;
        flex-flow: column;
        gap: 1rem;
      }
    }

    main {
      display: flex;
      flex-flow: column;
      gap: 1rem;

      .preview {
        --header-height: 40px;
        height: 480px;
        background: var(--color-background);

        .header {
          background: var(--color-background-tint);

          .buttons {
            display: flex;
            align-items: center;
            gap: var(--size-space-0_5x);

            .separator {
              display: block;
              width: 1px;
              height: 20px;
              background: var(--color-background-shade);
            }

            button {
              display: flex;
              align-items: center;
              justify-content: center;
              background: none;
              border: none;
              border-radius: var(--size-radius);
              padding: var(--size-space-0_25x);
              cursor: pointer;

              &:hover {
                background: var(--color-background);
              }

              &.selected {
                background: var(--color-background-shade);
              }
            }
          }
        }

        .resizable {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          height: calc(100% - var(--header-height));
          min-width: 240px;
          min-height: 240px;
          background: var(--color-background-tint);
          overflow: scroll;
        }

        .viewport-size {
          display: none;
          position: absolute;
          top: var(--size-space);
          right: var(--size-space);
          padding: var(--size-space-0_25x) var(--size-space-0_5x);
          font-size: var(--size-text-0_9x);
          border-radius: var(--size-radius);
          background: color-mix(
            in oklab,
            var(--color-foreground),
            transparent 30%
          );
          color: var(--color-background);

          &.showed {
            display: block;
          }
        }

        .right-grip,
        .bottom-grip {
          content: '';
          position: absolute;
          border-radius: 1000rem;
          background: var(--color-background-shade);
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
        .header {
          display: flex;
          padding: 0;
          justify-content: flex-start;

          button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--size-space-0_25x);
            background: var(--color-background);
            border: none;
            padding: var(--size-space-0_5x) var(--size-space-0_75x);
            cursor: pointer;
            box-sizing: border-box;
            height: calc(var(--header-height) + 1px);
            border-bottom: 1px solid var(--color-background-shade);
            border-right: 1px solid var(--color-background-shade);

            &:hover {
              background: var(--color-background-tint);
            }

            &.selected {
              background: var(--color-background-tint);
              border-bottom-color: var(--color-background-tint);
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
      main .code .header button span {
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
