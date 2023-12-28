import {
  LitElement,
  ReactiveElement,
  PropertyValues,
  CSSResultOrNative,
  unsafeCSS,
  getCompatibleStyle,
  adoptStyles,
} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ClassInfo} from 'lit/directives/class-map.js';

import {
  ConstructorArgs,
  TiniElementConstructor,
  ExtendRootClassesInput,
  ComponentMetas,
  RefersProp,
} from './types';
import {CHANGE_THEME_EVENT} from './consts';
import {getTheme, getGlobalComponentOptions} from './methods';
import {VaryGroups, COMMON_COLORS_TO_COMMON_GRADIENTS} from './varies';

function TiniElementMixin(SuperClass: any) {
  class TiniElement extends SuperClass {
    private currentTheme = getTheme();
    private globalOptions = getGlobalComponentOptions();

    private themeStyles?: CSSResultOrNative[];
    private extraStyle?: CSSResultOrNative;
    private extraStyleAdopted = false;

    readonly componentName = 'unnamed';
    readonly componentMetas: ComponentMetas = {};

    protected rootClasses: ClassInfo = {root: true};

    /* eslint-disable prettier/prettier */
    @property({type: Object}) declare refers?: RefersProp;
    @property() declare styleDeep?: string | CSSResultOrNative;
    /* eslint-enable prettier/prettier */

    constructor(...args: ConstructorArgs) {
      super(...args);
    }

    protected createRenderRoot() {
      const renderRoot =
        this.shadowRoot ??
        this.attachShadow(
          (this.constructor as typeof ReactiveElement).shadowRootOptions
        );
      this.customAdoptStyles(renderRoot);
      return renderRoot;
    }

    private onThemeChange = (e: Event) => {
      this.currentTheme = (e as CustomEvent).detail.theme;
      return this.requestUpdate();
    };

    connectedCallback() {
      super.connectedCallback();
      // on theme change
      if (this.refers || Object.keys(this.globalOptions).length) {
        window.addEventListener(CHANGE_THEME_EVENT, this.onThemeChange);
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      // off theme change
      window.removeEventListener(CHANGE_THEME_EVENT, this.onThemeChange);
    }

    willUpdate(changedProperties: PropertyValues<this>) {
      // re-style deep
      if (changedProperties.has('styleDeep')) {
        if (!this.extraStyleAdopted) {
          this.extraStyleAdopted = true;
        } else {
          this.customAdoptStyles(this.shadowRoot || this);
        }
      }
    }

    extendRootClasses(input: ExtendRootClassesInput) {
      const {raw = {}, pseudo = {}, overridable = {}} = input;
      const {componentOptions} = this.retrieveGlobalOptions();
      // build pseudo info
      const pseudoInfo = Object.keys(pseudo).reduce(
        (result, key) => {
          const value = pseudo![key];
          return !value
            ? result
            : {
                ...result,
                ...Object.keys(value).reduce(
                  (r, k) => {
                    const v = value![k];
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
      const overridableInfo = Object.keys(overridable).reduce(
        (result, key) => {
          const originalValue = overridable![key];
          if (!originalValue) return result;
          const value = this.calculatePropValue(key, originalValue);
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

    private retrieveGlobalOptions() {
      const themeOptions =
        (!this.currentTheme ? null : this.globalOptions?.[this.currentTheme]) ||
        {};
      const componentOptions =
        (themeOptions.perComponent as any)?.[this.componentName] || {};
      return {themeOptions, componentOptions};
    }

    private calculatePropValue(name: string, originalValue: string) {
      const {themeOptions} = this.retrieveGlobalOptions();
      // no theme
      if (!this.currentTheme) return originalValue;
      // refers map
      const camelName = name.replace(/-(\w)/g, (_, letter) =>
        letter.toUpperCase()
      );
      const referValue =
        this.refers?.[this.currentTheme]?.[camelName] ||
        this.refers?.[this.currentTheme]?.[name];
      if (referValue) return referValue;
      // refer gradient scheme
      if (
        !this.componentMetas?.colorOnlyScheme &&
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
      // process extra style
      this.extraStyle = !this.styleDeep
        ? undefined
        : getCompatibleStyle(
            typeof this.styleDeep === 'string'
              ? unsafeCSS(this.styleDeep.replace(/&/g, '.root'))
              : this.styleDeep
          );
      // adopt styles
      adoptStyles(renderRoot as unknown as ShadowRoot, [
        ...(!this.themeStyles ? [] : this.themeStyles),
        ...(this.constructor as typeof ReactiveElement).elementStyles,
        ...(!this.extraStyle ? [] : [this.extraStyle]),
      ]);
    }
  }
  return TiniElement as unknown as TiniElementConstructor;
}

export const TiniElement = TiniElementMixin(LitElement);
