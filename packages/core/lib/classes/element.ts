import {
  LitElement,
  adoptStyles,
  html,
  nothing,
  type ComplexAttributeConverter,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import {property} from 'lit/decorators/property.js';
import type {ClassInfo} from 'lit/directives/class-map.js';

import {
  THEME_CHANGE_EVENT,
  getOptionalUI,
  extractTemplatesFromTheming,
  extractStylesFromTheming,
  extractScriptsFromTheming,
  extractStylesFromDirectOrRecordStyles,
  stylesToAdoptableStyles,
  stylesToText,
  mergeDirectOrRecordStyles,
  type ActiveTheme,
  type Theming,
  type CSSResultOrNativeOrRaw,
  type Styles,
  type DirectOrRecordStyles,
} from './ui.js';

import {BREAKPOINT_VALUES} from '../utils/variant.js';
import {
  registerElements,
  type ElementMetadata,
  type RegisterElementsList,
} from '../utils/element.js';
import {
  parseAndMergeEventForwardings,
  forwardEvents,
  type EventForwardingInput,
} from '../utils/event.js';
import {
  runGlobalHooks,
  LifecycleHooks,
  type OnCreate,
  type OnDestroy,
  type OnTheme,
  type OnChanges,
  type OnFirstRender,
  type OnRenders,
  type OnChildrenRender,
  type OnChildrenReady,
  type OnInit,
  type OnReady,
} from '../utils/hook.js';

export enum ElementParts {
  BG = 'bg',
  Main = 'main',
}

export enum ElementTypes {
  App = 'app',
  Layout = 'layout',
  Page = 'page',
  Element = 'element',
}

export interface ComputedStylesQuery {
  type: 'media' | 'container';
  key: string;
  value: string;
}

export const stringOrObjectOrArrayConverter: ComplexAttributeConverter = {
  toAttribute(value: unknown) {
    return !(value && value instanceof Object) ? value : JSON.stringify(value);
  },
  fromAttribute(value: string | null) {
    let result: unknown = value;
    if (
      value &&
      ((value[0] === '{' && value[value.length - 1] === '}') ||
        (value[0] === '[' && value[value.length - 1] === ']'))
    ) {
      try {
        result = JSON.parse(value!) as unknown;
      } catch (e) {
        result = value;
      }
    }
    return result;
  },
};

export class TiniElement extends LitElement {
  static readonly defaultTagName: string = 'tini-element';
  static readonly elementName: string = 'element';
  static readonly elementType: ElementTypes = ElementTypes.Element;
  static readonly elementMetadata: ElementMetadata = {};

  static theming?: Theming;
  static elements?: RegisterElementsList;
  static styles?: any; // any = DirectOrRecordStyles
  static events?: EventForwardingInput;

  static addStyles(styles: DirectOrRecordStyles) {
    this.styles = mergeDirectOrRecordStyles(this.styles, styles);
  }

  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) restyleAtUpdate = false;
  @property({converter: stringOrObjectOrArrayConverter}) styleDeep?: DirectOrRecordStyles;
  @property({converter: stringOrObjectOrArrayConverter}) events?: EventForwardingInput;
  /* eslint-enable prettier/prettier */

  private customTemplates = this.getTemplates();
  private themingScripts = this.getScripts();

  private readonly willApplyStylesAtUpdate = !!(
    this.restyleAtUpdate ||
    (this.constructor as typeof TiniElement).elementMetadata.restyleAtUpdate
  );

  protected computedStyles(
    props: Record<string, any>,
    query?: ComputedStylesQuery
  ): Styles {
    return [];
  }

  private handleThemeChanges = (e: any) => {
    const activeTheme = (e as CustomEvent<ActiveTheme>).detail;
    this.themeChanged(activeTheme);
    // get updated templates and scripts
    if (activeTheme.prevFamilyId !== activeTheme.familyId) {
      this.customTemplates = this.getTemplates();
      this.themingScripts = this.getScripts();
    }
    // re-adopt styles
    const element = this.constructor as typeof LitElement;
    element.elementStyles = element.finalizeStyles(element.styles);
    if (!this.willApplyStylesAtUpdate) {
      this.applyStyles(this.shadowRoot || this);
    }
    // continue update cycle
    return this.requestUpdate();
  };

  protected createRenderRoot() {
    const renderRoot =
      this.shadowRoot ??
      this.attachShadow(
        (this.constructor as typeof LitElement).shadowRootOptions
      );
    if (!this.willApplyStylesAtUpdate) {
      this.applyStyles(renderRoot);
    }
    return renderRoot;
  }

  connectedCallback() {
    // register elements
    const elements = (this.constructor as typeof TiniElement).elements;
    if (elements) registerElements(elements);
    // continue connectedCallback
    super.connectedCallback();
    // add theme changes listener
    addEventListener(THEME_CHANGE_EVENT, this.handleThemeChanges);

    // subscribe store
    this.subscribeStore();
    // run hooks
    runGlobalHooks(LifecycleHooks.OnCreate, this);
    (this as typeof this & OnCreate).onCreate?.();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // remove theme changes listener
    removeEventListener(THEME_CHANGE_EVENT, this.handleThemeChanges);

    // run hooks
    runGlobalHooks(LifecycleHooks.OnDestroy, this);
    (this as typeof this & OnDestroy).onDestroy?.();
    // unsubscribe store
    this.unsubscribeStore();
  }

  protected themeChanged(activeTheme: ActiveTheme): void {
    // placeholder for the onTheme() hook

    runGlobalHooks(LifecycleHooks.OnTheme, this);
    (this as typeof this & OnTheme).onTheme?.(activeTheme);
  }

  protected beforeUpdate(changedProperties: PropertyValues<this>) {
    // placeholder for before update
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    // before update
    this.beforeUpdate(changedProperties);
    // adopt styles at update
    if (this.willApplyStylesAtUpdate) {
      this.applyStyles(this.shadowRoot || this);
    }

    runGlobalHooks(LifecycleHooks.OnChanges, this);
    (this as typeof this & OnChanges).onChanges?.(changedProperties);
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>) {
    // process children rendering
    const root = this.shadowRoot as ShadowRoot;
    const children = root.querySelectorAll(
      '[await]'
    ) as unknown as TiniElement[];
    if (!children.length) {
      this.childrenRender();
      this.childrenReady();
    } else {
      const childrenList = Array.from(children);
      this.getChildrenLifecyclePromise(childrenList, 'childrenRender').then(
        () => this.childrenRender()
      );
      this.getChildrenLifecyclePromise(childrenList, 'childrenReady').then(() =>
        this.childrenReady()
      );
    }
    // run hooks
    runGlobalHooks(LifecycleHooks.OnFirstRender, this);
    (this as typeof this & OnFirstRender).onFirstRender?.(changedProperties);
  }

  protected updated(changedProperties: PropertyValues<this>) {
    this.applyScripts();
    this.forwardEvents();

    runGlobalHooks(LifecycleHooks.OnRenders, this);
    (this as typeof this & OnRenders).onRenders?.(changedProperties);
  }

  private childrenRender() {
    runGlobalHooks(LifecycleHooks.OnChildrenRender, this);
    (this as typeof this & OnChildrenRender).onChildrenRender?.();
  }

  private childrenReady() {
    runGlobalHooks(LifecycleHooks.OnChildrenReady, this);
    (this as typeof this & OnChildrenReady).onChildrenReady?.();
  }

  protected partRender(
    name: string,
    defaultTemplate?: (
      children: () => typeof nothing | TemplateResult
    ) => typeof nothing | TemplateResult,
    context?: any
  ) {
    const newTemplate = this.customTemplates[name];
    const siblingsTemplate = this.customTemplates[`${name}:siblings`];
    const childrenTemplate = this.customTemplates[`${name}:children`];
    return newTemplate
      ? newTemplate(this, context)
      : !defaultTemplate
        ? nothing
        : html`
            ${defaultTemplate(() =>
              !childrenTemplate ? nothing : childrenTemplate(this, context)
            )}
            ${!siblingsTemplate ? nothing : siblingsTemplate(this, context)}
          `;
  }

  emitEvent<Payload>(
    name: string,
    payload?: Payload,
    options?: Omit<CustomEventInit<Payload>, 'detail'>
  ) {
    this.dispatchEvent(
      new CustomEvent(name, {
        ...options,
        detail: payload,
      })
    );
  }

  protected deriveClassNames(
    name: string,
    suffixes: Record<string, any>
  ): ClassInfo {
    const result: Record<string, boolean> = {[name]: true};
    for (const suffix of Object.keys(suffixes)) {
      result[`${name}-${suffix}`] = !!suffixes[suffix];
    }
    return result;
  }

  protected setHostStyles(styles: Record<string, string | undefined>) {
    Object.entries(styles).forEach(([key, value]) => {
      if (!key.startsWith('--')) {
        this.style[key as any] = value || '';
      } else {
        if (value) {
          this.style.setProperty(key, value);
        } else {
          this.style.removeProperty(key);
        }
      }
    });
    return this;
  }

  private forwardEvents() {
    const eventForwardings = parseAndMergeEventForwardings([
      (this.constructor as typeof TiniElement).events,
      this.events,
    ]);
    if (!eventForwardings?.length) return;
    forwardEvents(this, eventForwardings);
  }

  private applyStyles(renderRoot: HTMLElement | DocumentFragment) {
    const optionalUI = getOptionalUI();
    const styles = (this.constructor as typeof LitElement).elementStyles
      .concat(stylesToAdoptableStyles(this.finalizeComputedStyles()))
      .concat(
        stylesToAdoptableStyles(
          extractStylesFromDirectOrRecordStyles(
            this.styleDeep,
            optionalUI?.activeTheme
          )
        )
      );
    adoptStyles(renderRoot as unknown as ShadowRoot, styles);
  }

  private applyScripts() {
    if (!this.themingScripts) return;
    this.themingScripts.deactivate?.(this);
    this.themingScripts.activate?.(this);
    this.themingScripts = undefined;
  }

  private getTemplates() {
    const optionalUI = getOptionalUI();
    return !optionalUI
      ? {}
      : extractTemplatesFromTheming(
          (this.constructor as typeof TiniElement).theming,
          optionalUI.activeTheme
        );
  }

  private getScripts() {
    const optionalUI = getOptionalUI();
    return !optionalUI
      ? undefined
      : extractScriptsFromTheming(
          (this.constructor as typeof TiniElement).theming,
          optionalUI.activeTheme
        );
  }

  private finalizeComputedStyles() {
    const result: string[] = [];
    const {mediaQueries, containerQueries} = this as unknown as {
      mediaQueries?: Record<string, Record<string, unknown>>;
      containerQueries?: Record<string, Record<string, unknown>>;
    };
    // main
    const mainStyles = this.computedStyles(this);
    if (mainStyles instanceof Array ? mainStyles.length : mainStyles) {
      result.push(stylesToText(mainStyles));
    }
    // media queries
    if (mediaQueries) {
      for (const [key, value] of Object.entries(mediaQueries)) {
        const query = !BREAKPOINT_VALUES[key]
          ? key
          : `(min-width: ${BREAKPOINT_VALUES[key]})`;
        const styles = this.computedStyles(value, {
          type: 'media',
          key,
          value: query,
        });
        if (styles instanceof Array ? styles.length : styles) {
          result.push(`@media ${query} { ${stylesToText(styles)} }`);
        }
      }
    }
    // container queries
    if (containerQueries) {
      for (const [key, value] of Object.entries(containerQueries)) {
        const query = !BREAKPOINT_VALUES[key]
          ? key
          : `(min-width: ${BREAKPOINT_VALUES[key]})`;
        const styles = this.computedStyles(value, {
          type: 'container',
          key,
          value: query,
        });
        if (styles instanceof Array ? styles.length : styles) {
          result.push(`@container ${query} { ${stylesToText(styles)} }`);
        }
      }
    }
    // result
    return result;
  }

  protected static finalizeStyles(styles?: any) {
    const optionalUI = getOptionalUI();
    const elementStyles: CSSResultOrNativeOrRaw[] = [];
    // 1. share styles
    if (optionalUI) {
      elementStyles.push(...optionalUI.getShareStyles(optionalUI.activeTheme));
    }
    // 2. theming styles
    if (optionalUI) {
      elementStyles.push(
        ...extractStylesFromTheming(this.theming, optionalUI.activeTheme)
      );
    }
    // 3. element styles (static styles = ...)
    elementStyles.push(
      ...extractStylesFromDirectOrRecordStyles(
        styles as DirectOrRecordStyles,
        optionalUI?.activeTheme
      )
    );
    // result
    return stylesToAdoptableStyles(elementStyles);
  }

  /**
   * Extended parts previously defined in the TiniComponent class.
   */

  private pendingDependencies?: Array<() => Promise<unknown>>;
  private storeManager?: {
    pending: Array<[any, string, string, boolean]>;
    unsubscribes: Array<() => void>;
  };

  private initialized = false;

  protected override async scheduleUpdate() {
    // A: subsequent updates
    if (this.initialized) {
      super.scheduleUpdate();
    }
    // B: no dependencies
    else if (!this.pendingDependencies?.length) {
      this.digestDI();
    }
    // C: has dependencies
    else {
      for (let i = 0; i < this.pendingDependencies.length; i++) {
        await this.pendingDependencies[i]();
      }
      this.digestDI();
    }
  }

  private digestDI() {
    this.initialized = true;
    this.pendingDependencies = [];
    // run hooks
    runGlobalHooks(LifecycleHooks.OnInit, this);
    const onInit = (this as typeof this & OnInit).onInit?.();
    if (!onInit?.then) {
      this.digestOnInit();
    } else {
      onInit.then(() => this.digestOnInit());
    }
    // continue
    super.scheduleUpdate();
  }

  private digestOnInit() {
    setTimeout(() => {
      runGlobalHooks(LifecycleHooks.OnReady, this);
      (this as unknown as OnReady).onReady?.();
    }, 0);
  }

  private getChildrenLifecyclePromise(
    children: TiniElement[],
    hookName: 'childrenRender' | 'childrenReady'
  ) {
    const promises = children
      .filter(item => !!item[hookName])
      .map(item => {
        let resolve = () => {};
        const original = item[hookName];
        item[hookName] = () => {
          original.call(item);
          resolve();
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new Promise(r => (resolve = r as any));
      });
    return Promise.all(promises);
  }

  private subscribeStore() {
    if (!this.storeManager?.pending?.length) return;
    const unsubscribes = (this.storeManager.unsubscribes ||= []);
    this.storeManager.pending.forEach(
      ([store, stateKey, propertyName, reactive]) => {
        const unsubscribe = store.subscribe(stateKey, (value: unknown) => {
          (this as any)[propertyName] = value;
          if (reactive) this.requestUpdate();
        });
        unsubscribes.push(unsubscribe);
      }
    );
  }

  private unsubscribeStore() {
    if (!this.storeManager?.unsubscribes?.length) return;
    this.storeManager.unsubscribes.forEach(unsubscribe => unsubscribe());
    this.storeManager.unsubscribes = [];
  }
}
