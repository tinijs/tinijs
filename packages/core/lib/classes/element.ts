import {
  LitElement,
  unsafeCSS,
  getCompatibleStyle,
  adoptStyles,
  type PropertyValues,
  type CSSResultOrNative,
  type TemplateResult,
} from 'lit';
import {property} from 'lit/decorators/property.js';
import type {ClassInfo} from 'lit/directives/class-map.js';
import {defu} from 'defu';

import {
  THEME_CHANGE_EVENT,
  getOptionalUI,
  getStylesFromTheming,
  getScriptsFromTheming,
  processComponentStyles,
  type UIOptions,
  type UIButtonOptions,
  type Theming,
} from './ui.js';

import {COMMON_COLORS_TO_COMMON_GRADIENTS, VaryGroups} from '../utils/vary.js';
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
  static readonly componentName: string = 'unnamed';
  static readonly defaultTagName: string = 'tini-element';
  static readonly componentMetadata: ComponentMetadata = {};

  static readonly theming?: Theming;
  static readonly components?: RegisterComponentsList;

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) styleDeep?: string;
  @property({type: Object}) refers?: Record<string, Record<string, any>>;
  @property() events?: string | Array<string | EventForwarding>;
  /* eslint-enable prettier/prettier */

  protected rootClasses: ClassInfo = {root: true};
  protected additionalParts: Record<string, TemplateResult> = {};

  private _uiTracker = {
    extraStylesAdopted: false,
    pendingScriptsAdoption: this.getScripts(),
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
    this._uiTracker.pendingScriptsAdoption = this.getScripts();
    return this.requestUpdate();
  };

  connectedCallback() {
    this.registerComponents();
    super.connectedCallback();
    addEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    // re-style when deepStyle changed
    if (changedProperties.has('styleDeep')) {
      if (!this._uiTracker.extraStylesAdopted) {
        this._uiTracker.extraStylesAdopted = true; // skip the first time, already adopted in createRenderRoot()
      } else {
        this.customAdoptStyles(this.shadowRoot || this);
      }
    }
    // adopt scripts
    const {prevScripts, currentScripts} =
      this._uiTracker.pendingScriptsAdoption;
    prevScripts?.unscriptWillUpdate?.(this);
    currentScripts?.willUpdate?.(this);
  }

  protected firstUpdated(changedProperties: PropertyValues<this>) {
    if (this.events) forwardEvents(this, this.events);
  }

  protected updated(changedProperties: PropertyValues<this>) {
    // adopt scripts
    const {prevScripts, currentScripts} =
      this._uiTracker.pendingScriptsAdoption;
    prevScripts?.unscriptUpdated?.(this);
    currentScripts?.updated?.(this);
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
    const schemeValue = overridableFinalValues[VaryGroups.Scheme];
    if (
      componentOptions.referGradientSchemeOnHover &&
      schemeValue &&
      !~schemeValue.indexOf('gradient')
    ) {
      const hoverScheme =
        (COMMON_COLORS_TO_COMMON_GRADIENTS as Record<string, string>)[
          schemeValue
        ] || `gradient-${schemeValue}`;
      otherInfo[`${VaryGroups.Scheme}-${hoverScheme}-hover`] = true;
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

  private registerComponents() {
    const components = (this.constructor as typeof TiniElement).components;
    if (components) registerComponents(components);
  }

  private calculatePropertyValue(name: string, originalValue: string) {
    const {optionalUI, themeOptions} = this.getUIContext();
    // no theme
    if (!optionalUI?.activeTheme) return originalValue;
    // refers
    const camelName = name.replace(/-(\w)/g, (_, letter) =>
      letter.toUpperCase()
    );
    const referValue =
      this.refers?.[optionalUI.activeTheme.themeId]?.[camelName] ||
      this.refers?.[optionalUI.activeTheme.themeId]?.[name] ||
      this.refers?.[optionalUI.activeTheme.familyId]?.[camelName] ||
      this.refers?.[optionalUI.activeTheme.familyId]?.[name];
    if (referValue) return referValue;
    // refer gradient scheme
    if (
      !(this.constructor as typeof TiniElement).componentMetadata
        ?.colorOnlyScheme &&
      name === VaryGroups.Scheme &&
      themeOptions.referGradientScheme
    ) {
      return ~originalValue.indexOf('gradient')
        ? originalValue
        : (COMMON_COLORS_TO_COMMON_GRADIENTS as Record<string, string>)[
            originalValue
          ] || `gradient-${originalValue}`;
    }
    // default value
    return originalValue;
  }

  private customAdoptStyles(renderRoot: HTMLElement | DocumentFragment) {
    const optionalUI = getOptionalUI();
    const allStyles = [] as Array<string | CSSResultOrNative>;
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
    if (this.styleDeep) allStyles.push(this.styleDeep);
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
          prevScripts: undefined,
          currentScripts: undefined,
        }
      : getScriptsFromTheming(
          this,
          (this.constructor as typeof TiniElement).theming,
          optionalUI.activeTheme
        );
  }
}
