import {
  LitElement,
  unsafeCSS,
  getCompatibleStyle,
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
  getTemplatesFromTheming,
  getStylesFromTheming,
  getScriptsFromTheming,
  processComponentStyles,
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
import {COLORS_TO_GRADIENTS} from '../utils/vary.js';
import {
  UnstableStates,
  registerComponents,
  type RegisterComponentsList,
} from '../utils/component.js';
import {forwardEvents, type EventForwarding} from '../utils/event.js';

export interface ExtendRootClassesInput {
  raw?: ClassInfo;
  pseudo?: Record<string, Record<string, undefined | string>>;
  overridable?: Record<string, undefined | string>;
}

export interface ComponentMetadata {
  colorOnlyScheme?: boolean;
  mainNonRootSelector?: string;
  // dev only
  unstable?: UnstableStates;
  unstableMessage?: string;
}

export class TiniElement extends LitElement {
  static readonly componentName: string = 'element';
  static readonly defaultTagName: string = 'tini-element';
  static readonly componentMetadata: ComponentMetadata = {};

  static readonly theming?: Theming;
  static readonly components?: RegisterComponentsList;

  /* eslint-disable prettier/prettier */
  @property({type: Object}) templates?: ThemingTemplates;
  @property({type: Object}) refers?: Record<string, Record<string, any>>;
  @property() styleDeep?: StyleDeepInput;
  @property() events?: string | Array<string | EventForwarding>;
  /* eslint-enable prettier/prettier */

  protected rootClasses: ClassInfo = {root: true};
  protected customTemplates: ThemingTemplates = {};

  private _uiTracker = {
    styleDeepAdopted: false,
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
    // re-style when deepStyle changed
    if (changedProperties.has('styleDeep')) {
      if (!this._uiTracker.styleDeepAdopted) {
        this._uiTracker.styleDeepAdopted = true; // skip the first time, already adopted in createRenderRoot()
      } else {
        this.customAdoptStyles(this.shadowRoot || this);
      }
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

  extendRootClasses(input: ExtendRootClassesInput) {
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
      !~schemeValue.indexOf('gradient')
    ) {
      const hoverScheme = COLORS_TO_GRADIENTS[schemeValue];
      otherInfo[`scheme-${hoverScheme}-hover`] = true;
    }
    // result
    return (this.rootClasses = {
      ...this.rootClasses,
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
      return ~originalValue.indexOf('gradient')
        ? originalValue
        : COLORS_TO_GRADIENTS[originalValue];
    }
    // default value
    return originalValue;
  }

  private getTemplates() {
    const optionalUI = getOptionalUI();
    return {
      ...(!optionalUI
        ? {}
        : getTemplatesFromTheming(
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
      const {shareStyles} = optionalUI.getStyles(familyId, skinId);
      allStyles.push(
        ...shareStyles,
        ...getStylesFromTheming(
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
    const styleText = processComponentStyles(
      allStyles,
      optionalUI?.activeTheme
    );
    adoptStyles(renderRoot as unknown as ShadowRoot, [
      getCompatibleStyle(unsafeCSS(styleText)),
    ]);
  }

  private getScripts() {
    const optionalUI = getOptionalUI();
    return !optionalUI
      ? {
          prevScripts: {},
          currentScripts: {},
        }
      : getScriptsFromTheming(
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
