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
import {defu} from 'defu';

import {
  THEME_CHANGE_EVENT,
  getOptionalUI,
  isThemingStyles,
  extractTemplatesFromTheming,
  extractStylesFromTheming,
  extractScriptsFromTheming,
  themingStylesToAdoptableStyles,
  type ActiveTheme,
  type UIOptions,
  type UIButtonOptions,
  type Theming,
  type StyleDeepInput,
  type CSSResultOrNativeOrRaw,
} from './ui.js';

import {listify} from '../utils/common.js';
import {isGradient} from '../utils/variant.js';
import {
  UnstableStates,
  registerComponents,
  type RegisterComponentsList,
} from '../utils/component.js';
import {
  parseAndMergeEventForwardings,
  forwardEvents,
  type EventForwardingInput,
} from '../utils/event.js';

export interface ExtendMainClassesInput {
  raw?: ClassInfo;
  pseudo?: Record<string, Record<string, undefined | string>>;
  overridable?: Record<string, undefined | string>;
}

export interface ComponentMetadata {
  colorOnlyScheme?: boolean;
  customMainSelector?: string;
  // dev only
  unstable?: UnstableStates;
  unstableMessage?: string;
}

export enum ElementParts {
  BG = 'bg',
  Main = 'main',
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
  static readonly componentName: string = 'element';
  static readonly defaultTagName: string = 'tini-element';
  static readonly componentMetadata: ComponentMetadata = {};

  static readonly theming?: Theming;
  static readonly components?: RegisterComponentsList;
  static readonly events?: EventForwardingInput;

  /* eslint-disable prettier/prettier */
  @property({converter: stringOrObjectOrArrayConverter}) styleDeep?: StyleDeepInput;
  @property({converter: stringOrObjectOrArrayConverter}) events?: EventForwardingInput;
  @property({type: Object}) refers?: Record<string, Record<string, any>>;
  /* eslint-enable prettier/prettier */

  protected mainClasses: ClassInfo = {[ElementParts.Main]: true};

  private _uiTracker = {
    styleDeepAdopted: false,
    readoptStylesRequired: false,
    templates: this.getTemplates(),
    scripts: this.getScripts(),
  };

  protected createRenderRoot() {
    const renderRoot =
      this.shadowRoot ??
      this.attachShadow(
        (this.constructor as typeof LitElement).shadowRootOptions
      );
    this.adoptStyles(renderRoot);
    return renderRoot;
  }

  private onThemeChange = (e: any) => {
    const {prevFamilyId, familyId} = (e as CustomEvent<ActiveTheme>).detail;
    this._uiTracker.readoptStylesRequired = true;
    if (prevFamilyId !== familyId) {
      this._uiTracker.templates = this.getTemplates();
      this._uiTracker.scripts = this.getScripts();
    }
    return this.requestUpdate();
  };

  connectedCallback() {
    // register components
    const components = (this.constructor as typeof TiniElement).components;
    if (components) registerComponents(components);
    // continue connectedCallback
    super.connectedCallback();
    addEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    // adopt styles
    if (
      // styleDeep changed but not the first time
      (changedProperties.has('styleDeep') &&
        this._uiTracker.styleDeepAdopted) ||
      // theme changed, re-adopt share styles
      this._uiTracker.readoptStylesRequired
    ) {
      this.adoptStyles(this.shadowRoot || this);
      this._uiTracker.readoptStylesRequired = false;
    }
    // mark styleDeep already adopted in createRenderRoot()
    if (!this._uiTracker.styleDeepAdopted) {
      this._uiTracker.styleDeepAdopted = true;
    }
  }

  protected firstUpdated(changedProperties: PropertyValues<this>) {
    this.forwardEvents();
  }

  protected updated(changedProperties: PropertyValues<this>) {
    this.adoptScripts();
  }

  protected getUIContext<
    ComponentSpecificOptions extends Record<string, unknown> = {},
    ExtendedOptions extends Record<string, unknown> = {},
  >() {
    const optionalUI = getOptionalUI();
    const themeOptions = !optionalUI
      ? {}
      : (defu(
          optionalUI.options?.[optionalUI.activeTheme.themeId],
          optionalUI.options?.[optionalUI.activeTheme.familyId],
          optionalUI.options?.['*'],
          {}
        ) as UIOptions<ExtendedOptions>);
    const componentOptions = ((themeOptions as any)?.[
      (this.constructor as typeof TiniElement).componentName
    ] || {}) as ComponentSpecificOptions;
    return {optionalUI, themeOptions, componentOptions};
  }

  setHostStyles(styles: Record<string, string | undefined>) {
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

  buildClassVariants(name: string, variants: Record<string, any>): ClassInfo {
    const result: Record<string, boolean> = {[name]: true};
    for (const suffix of Object.keys(variants)) {
      result[`${name}-${suffix}`] = !!variants[suffix];
    }
    return result;
  }

  extendMainClasses(input: ExtendMainClassesInput) {
    const {raw = {}, pseudo = {}, overridable = {}} = input;
    const {componentOptions} = this.getUIContext<UIButtonOptions>();
    // build pseudo info
    const pseudoInfo = Object.entries(pseudo).reduce(
      (result, [key, value]) => {
        return !value
          ? result
          : {
              ...result,
              ...Object.entries(value).reduce(
                (r, [k, v]) => {
                  if (!v) return r;
                  r[`${k}-${v}-${key}`] = true;
                  return r;
                },
                {} as Record<string, boolean>
              ),
            };
      },
      {} as Record<string, boolean>
    );
    // build overridable info
    const overridableFinalValues = {} as Record<string, string>;
    const overridableInfo = Object.entries(overridable).reduce(
      (result, [key, originalValue]) => {
        if (!originalValue) return result;
        const value = this.calculatePropertyValue(key, originalValue);
        overridableFinalValues[key] = value;
        result[`${key}-${value}`] = true;
        return result;
      },
      {} as Record<string, boolean>
    );
    // other info:
    // + refer gradient scheme on hover
    const otherInfo = {} as Record<string, boolean>;
    const schemeValue = overridableFinalValues['scheme'];
    if (
      componentOptions.referGradientSchemeOnHover &&
      schemeValue &&
      !isGradient(schemeValue)
    ) {
      const hoverScheme = `gradient-${schemeValue}-hover`;
      otherInfo[`scheme-${hoverScheme}`] = true;
    }
    // result
    return (this.mainClasses = {
      ...this.mainClasses,
      ...raw,
      ...pseudoInfo,
      ...overridableInfo,
      ...otherInfo,
    });
  }

  private calculatePropertyValue(name: string, originalValue: string) {
    const {optionalUI, themeOptions} = this.getUIContext();
    // no theme
    if (!optionalUI?.activeTheme) return originalValue;
    // refers
    const {themeId, familyId} = optionalUI.activeTheme;
    const camelName = name.replace(/-(\w)/g, (_, letter) =>
      letter.toUpperCase()
    );
    const referValue =
      this.refers?.[themeId]?.[camelName] ||
      this.refers?.[themeId]?.[name] ||
      this.refers?.[familyId]?.[camelName] ||
      this.refers?.[familyId]?.[name];
    if (referValue) return referValue;
    // refer gradient scheme
    if (
      !(this.constructor as typeof TiniElement).componentMetadata
        ?.colorOnlyScheme &&
      name === 'scheme' &&
      themeOptions.referGradientScheme
    ) {
      return isGradient(originalValue)
        ? originalValue
        : `gradient-${originalValue}`;
    }
    // default value
    return originalValue;
  }

  private forwardEvents() {
    const eventForwardings = parseAndMergeEventForwardings([
      (this.constructor as typeof TiniElement).events,
      this.events,
    ]);
    if (!eventForwardings?.length) return;
    forwardEvents(this, eventForwardings);
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

  partRender(
    name: string,
    defaultTemplate?: (
      children: () => typeof nothing | TemplateResult
    ) => typeof nothing | TemplateResult,
    context?: any
  ) {
    const customTemplates = this._uiTracker.templates;
    const newTemplate = customTemplates[name];
    const siblingsTemplate = customTemplates[`${name}:siblings`];
    const childrenTemplate = customTemplates[`${name}:children`];
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

  private adoptStyles(renderRoot: HTMLElement | DocumentFragment) {
    const optionalUI = getOptionalUI();
    const allStyles: CSSResultOrNativeOrRaw[] = [];
    // theme styles
    if (optionalUI) {
      const {familyId, skinId} = optionalUI.activeTheme;
      allStyles.push(
        ...optionalUI.getShareStyles(familyId, skinId),
        ...extractStylesFromTheming(
          (this.constructor as typeof TiniElement).theming,
          optionalUI.activeTheme
        )
      );
    }
    // element styles
    allStyles.push(...(this.constructor as typeof LitElement).elementStyles);
    // from styleDeep
    if (this.styleDeep) {
      if (typeof this.styleDeep === 'string') {
        allStyles.push(this.styleDeep);
      } else if (optionalUI) {
        const {themeId, familyId} = optionalUI.activeTheme;
        const styleDeepStyles = listify<CSSResultOrNativeOrRaw>(
          isThemingStyles(this.styleDeep)
            ? this.styleDeep
            : this.styleDeep?.[themeId] ||
                this.styleDeep?.[familyId] ||
                this.styleDeep?.['*']
        );
        if (styleDeepStyles?.length) allStyles.push(...styleDeepStyles);
      }
    }
    // adopt all the styles
    adoptStyles(
      renderRoot as unknown as ShadowRoot,
      themingStylesToAdoptableStyles(allStyles)
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

  private adoptScripts() {
    if (!this._uiTracker.scripts) return;
    const {activate, deactivate} = this._uiTracker.scripts;
    deactivate?.(this);
    activate?.(this);
    this._uiTracker.scripts = undefined;
  }
}
