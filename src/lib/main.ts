import {
  LitElement,
  PropertyValues,
  CSSResultOrNative,
  unsafeCSS,
  getCompatibleStyle,
  adoptStyles,
} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ClassInfo} from 'lit/directives/class-map.js';

import {
  ExtendRootClassesInput,
  ComponentMetas,
  ThemingOptions,
  ActiveTheme,
  EventForwarding,
} from './types';
import {THEME_CHANGE_EVENT} from './consts';
import {
  getUIOptions,
  forwardEvents,
  getTheme,
  adoptScripts,
  processComponentStyles,
} from './methods';
import {COMMON_COLORS_TO_COMMON_GRADIENTS, VaryGroups} from './varies';

export class TiniElement extends LitElement {
  static readonly defaultTagName: string = 'tini-element';
  static readonly componentName: string = 'unnamed';
  static readonly componentMetas: ComponentMetas = {};
  static readonly mainNonRootSelector?: string;
  static readonly theming?: ThemingOptions<string>; // NOTE: only available by using the 'tini ui build' command (setted via the @TiniElementTheming() decorator)

  private uiOptions = getUIOptions();
  private activeTheme = getTheme();
  private extraStyleAdopted = false;

  protected rootClasses: ClassInfo = {root: true};

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) declare styleDeep?: string;
  @property({type: Object}) declare refers?: Record<string, Record<string, any>>;
  @property() declare events?: string | Array<string | EventForwarding>;
  /* eslint-enable prettier/prettier */

  protected createRenderRoot() {
    const renderRoot =
      this.shadowRoot ??
      this.attachShadow(
        (this.constructor as typeof LitElement).shadowRootOptions
      );
    this.customAdoptStyles(renderRoot);
    return renderRoot;
  }

  private onThemeChange = (e: Event) => {
    this.activeTheme = (e as CustomEvent<ActiveTheme>).detail;
    return this.requestUpdate();
  };

  connectedCallback() {
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
      if (!this.extraStyleAdopted) {
        this.extraStyleAdopted = true; // skip the first time, already adopted in createRenderRoot()
      } else {
        this.customAdoptStyles(this.shadowRoot || this);
      }
    }
  }

  protected firstUpdated() {
    if (this.events) forwardEvents(this, this.events);
  }

  protected updated() {
    this.customAdoptScripts();
  }

  extendRootClasses(input: ExtendRootClassesInput) {
    const {raw = {}, pseudo = {}, overridable = {}} = input;
    const {componentOptions} = this.getGlobalOptions();
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

  private getGlobalOptions() {
    const themeOptions =
      this.uiOptions?.[this.activeTheme.themeId] ||
      this.uiOptions?.[this.activeTheme.soulId] ||
      {};
    const componentOptions =
      (themeOptions.perComponent as any)?.[
        (this.constructor as typeof TiniElement).componentName
      ] || {};
    return {themeOptions, componentOptions};
  }

  private calculatePropertyValue(name: string, originalValue: string) {
    const {themeOptions} = this.getGlobalOptions();
    // no theme
    if (!this.activeTheme) return originalValue;
    // refers
    const camelName = name.replace(/-(\w)/g, (_, letter) =>
      letter.toUpperCase()
    );
    const referValue =
      this.refers?.[this.activeTheme.themeId]?.[camelName] ||
      this.refers?.[this.activeTheme.themeId]?.[name] ||
      this.refers?.[this.activeTheme.soulId]?.[camelName] ||
      this.refers?.[this.activeTheme.soulId]?.[name];
    if (referValue) return referValue;
    // refer gradient scheme
    if (
      !(this.constructor as typeof TiniElement).componentMetas
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
    const allStyles = [] as Array<string | CSSResultOrNative>;
    // theme styles (multiple themes, via @TiniElementTheming() only)
    const styling = (this.constructor as typeof TiniElement).theming?.styling;
    if (styling) {
      const {soulId, themeId} = this.activeTheme;
      allStyles.push(
        ...(styling[themeId] ||
          styling[soulId] ||
          Object.values(styling)[0] ||
          [])
      );
    }
    // element styles
    allStyles.push(...(this.constructor as typeof LitElement).elementStyles);
    // from styleDeep
    if (this.styleDeep) allStyles.push(this.styleDeep);
    // adopt styles
    const styleText = processComponentStyles(allStyles, this.activeTheme);
    adoptStyles(renderRoot as unknown as ShadowRoot, [
      getCompatibleStyle(unsafeCSS(styleText)),
    ]);
  }

  private customAdoptScripts() {
    // theme scripts (multiple themes, via @TiniElementTheming() only)
    adoptScripts(
      this,
      this.activeTheme,
      (this.constructor as typeof TiniElement).theming?.scripting
    );
  }
}
