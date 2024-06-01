import {
  LitElement,
  adoptStyles,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import {property} from 'lit/decorators/property.js';
import type {ClassInfo} from 'lit/directives/class-map.js';
import {defu} from 'defu';

import {
  THEME_CHANGE_EVENT,
  getOptionalUI,
  extractTemplatesFromTheming,
  extractStylesFromTheming,
  extractScriptsFromTheming,
  themingStylesToAdoptableStyles,
  ThemingScriptTypes,
  type UIOptions,
  type UIButtonOptions,
  type ThemingTemplates,
  type ThemingScripts,
  type Theming,
  type StyleDeepInput,
  type CSSResultOrNativeOrRaw,
} from './ui.js';

import {listify} from '../utils/common.js';
import {isGradient, colorToGradient} from '../utils/variant.js';
import {
  UnstableStates,
  registerComponents,
  type RegisterComponentsList,
} from '../utils/component.js';
import {forwardEvents, type EventForwarding} from '../utils/event.js';

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

export class TiniElement extends LitElement {
  static readonly componentName: string = 'element';
  static readonly defaultTagName: string = 'tini-element';
  static readonly componentMetadata: ComponentMetadata = {};

  static readonly theming?: Theming;
  static readonly components?: RegisterComponentsList;

  /* eslint-disable prettier/prettier */
  @property() styleDeep?: StyleDeepInput;
  @property({type: Object}) refers?: Record<string, Record<string, any>>;
  @property({type: Object}) templates?: ThemingTemplates;
  @property() events?: string | Array<string | EventForwarding>;
  /* eslint-enable prettier/prettier */

  protected bgClasses: ClassInfo = {[ElementParts.BG]: true};
  protected mainClasses: ClassInfo = {[ElementParts.Main]: true};
  protected customTemplates: ThemingTemplates = {};

  private _uiTracker = {
    styleDeepAdopted: false,
    readoptStylesRequired: false,
    scripts: this.getScripts(),
  };

  protected createRenderRoot() {
    const renderRoot =
      this.shadowRoot ??
      this.attachShadow(
        (this.constructor as typeof LitElement).shadowRootOptions
      );
    this.customAdoptStyles(renderRoot);
    return renderRoot;
  }

  private onThemeChange = () => {
    this._uiTracker.readoptStylesRequired = true;
    this._uiTracker.scripts = this.getScripts();
    return this.requestUpdate();
  };

  connectedCallback() {
    // register components
    const components = (this.constructor as typeof TiniElement).components;
    if (components) registerComponents(components);
    // continue connectedCallback
    super.connectedCallback();
    addEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
    // adopt scripts
    this.adoptScripts('connectedCallback');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
    // adopt scripts
    this.adoptScripts('disconnectedCallback');
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    // process templates
    if (changedProperties.has('templates')) {
      this.customTemplates = this.getTemplates();
    }
    // adopt styles
    if (
      // styleDeep changed but not the first time
      (changedProperties.has('styleDeep') &&
        this._uiTracker.styleDeepAdopted) ||
      // theme changed, re-adopt share styles
      this._uiTracker.readoptStylesRequired
    ) {
      this.customAdoptStyles(this.shadowRoot || this);
      this._uiTracker.readoptStylesRequired = false;
    }
    // mark styleDeep already adopted in createRenderRoot()
    if (!this._uiTracker.styleDeepAdopted) {
      this._uiTracker.styleDeepAdopted = true;
    }
    // adopt scripts
    this.adoptScripts('willUpdate', changedProperties);
  }

  protected firstUpdated(changedProperties: PropertyValues<this>) {
    if (this.events) forwardEvents(this, this.events);
    // adopt scripts
    this.adoptScripts('firstUpdated', changedProperties);
  }

  protected updated(changedProperties: PropertyValues<this>) {
    // adopt scripts
    this.adoptScripts('updated', changedProperties);
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
      const hoverScheme = colorToGradient(schemeValue);
      otherInfo[`scheme-${hoverScheme}-hover`] = true;
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
        : colorToGradient(originalValue);
    }
    // default value
    return originalValue;
  }

  private getTemplates() {
    const optionalUI = getOptionalUI();
    return {
      ...(!optionalUI
        ? {}
        : extractTemplatesFromTheming(
            (this.constructor as typeof TiniElement).theming,
            optionalUI.activeTheme
          )),
      ...this.templates,
    };
  }

  renderPart(
    name: string,
    defaultTemplate?: (
      child: () => typeof nothing | TemplateResult
    ) => typeof nothing | TemplateResult,
    context?: {
      main?: any;
      sibling?: any;
      child?: any;
    }
  ) {
    const mainTemplate = this.customTemplates[name];
    const siblingTemplate = this.customTemplates[`${name}:sibling`];
    const childTemplate = this.customTemplates[`${name}:child`];
    return mainTemplate
      ? mainTemplate(this, context?.main)
      : !defaultTemplate
        ? nothing
        : html`
            ${defaultTemplate(() =>
              !childTemplate ? nothing : childTemplate(this, context?.child)
            )}
            ${!siblingTemplate
              ? nothing
              : siblingTemplate(this, context?.sibling)}
          `;
  }

  private customAdoptStyles(renderRoot: HTMLElement | DocumentFragment) {
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
          this.styleDeep?.[themeId] ||
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
      ? {
          prevScripts: {},
          currentScripts: {},
        }
      : extractScriptsFromTheming(
          this,
          (this.constructor as typeof TiniElement).theming,
          optionalUI.activeTheme
        );
  }

  private adoptScripts(
    hookName: keyof ThemingScripts,
    changedProperties?: PropertyValues<this>
  ) {
    const {prevScripts, currentScripts} = this._uiTracker.scripts;
    if (hookName === 'connectedCallback') {
      prevScripts.connectedCallback?.(ThemingScriptTypes.Unscript, this);
      currentScripts.connectedCallback?.(ThemingScriptTypes.Script, this);
      delete this._uiTracker.scripts.prevScripts.connectedCallback;
    } else if (hookName === 'disconnectedCallback') {
      prevScripts.disconnectedCallback?.(ThemingScriptTypes.Unscript, this);
      currentScripts.disconnectedCallback?.(ThemingScriptTypes.Script, this);
      delete this._uiTracker.scripts.prevScripts.disconnectedCallback;
    } else if (hookName === 'willUpdate' && changedProperties) {
      prevScripts.willUpdate?.(
        ThemingScriptTypes.Unscript,
        this,
        changedProperties
      );
      currentScripts.willUpdate?.(
        ThemingScriptTypes.Script,
        this,
        changedProperties
      );
      delete this._uiTracker.scripts.prevScripts.willUpdate;
    } else if (hookName === 'firstUpdated' && changedProperties) {
      prevScripts.firstUpdated?.(
        ThemingScriptTypes.Unscript,
        this,
        changedProperties
      );
      currentScripts.firstUpdated?.(
        ThemingScriptTypes.Script,
        this,
        changedProperties
      );
      delete this._uiTracker.scripts.prevScripts.firstUpdated;
    } else if (hookName === 'updated' && changedProperties) {
      prevScripts.updated?.(
        ThemingScriptTypes.Unscript,
        this,
        changedProperties
      );
      currentScripts.updated?.(
        ThemingScriptTypes.Script,
        this,
        changedProperties
      );
      delete this._uiTracker.scripts.prevScripts.updated;
    }
  }
}
