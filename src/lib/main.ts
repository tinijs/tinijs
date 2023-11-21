import {LitElement} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ClassInfo} from 'lit/directives/class-map.js';
import {StyleInfo} from 'lit/directives/style-map.js';

import {
  ConstructorArgs,
  TiniElementConstructor,
  Transform,
  PartInfo,
  ComponentMetas,
  ExtendRootClassesPartsInput,
  ComponentRefers,
} from './types';
import {CHANGE_THEME_EVENT} from './consts';
import {
  transformToStyleInfo,
  getTheme,
  getGlobalComponentOptions,
} from './methods';
import {
  VaryGroups,
  Displays,
  Positions,
  COMMON_COLORS_TO_COMMON_GRADIENTS,
} from './varies';

function TiniElementMixin(SuperClass: any) {
  class TiniElement extends SuperClass {
    private currentTransforms?: StyleInfo;
    private currentTheme = getTheme();
    private globalComponentOptions = getGlobalComponentOptions();

    readonly componentName = 'unnamed';
    readonly componentMetas: ComponentMetas = {};
    protected rootClassesParts: ClassInfo | PartInfo = {};
    protected rootStyles: StyleInfo = {};

    /* eslint-disable prettier/prettier */
    @property({type: String, reflect: true}) declare display?: Displays;
    @property({type: String, reflect: true}) declare position?: Positions;
    @property({type: String, reflect: true}) declare top?: string;
    @property({type: String, reflect: true}) declare right?: string;
    @property({type: String, reflect: true}) declare bottom?: string;
    @property({type: String, reflect: true}) declare left?: string;
    @property({type: String, reflect: true}) declare margin?: string;
    @property({type: String, reflect: true}) declare padding?: string;
    @property({type: String, reflect: true}) declare zIndex?: string;
    @property({type: String, reflect: true}) declare transform?: Transform;
    @property({type: String, reflect: true}) declare filter?: string;
    @property({type: String, reflect: true}) declare transition?: string;
    @property({type: String, reflect: true}) declare animation?: string;
    @property({type: Object}) declare hoverMap?: Record<string, any>;
    @property({type: Object}) declare refers?: ComponentRefers;
    /* eslint-enable prettier/prettier */

    private onThemeChange = (e: Event) => {
      this.currentTheme = (e as CustomEvent).detail.theme;
      return this.requestUpdate();
    };

    constructor(...args: ConstructorArgs) {
      super(...args);
    }

    connectedCallback() {
      super.connectedCallback();
      // on theme change
      if (this.refers || Object.keys(this.globalComponentOptions).length) {
        window.addEventListener(CHANGE_THEME_EVENT, this.onThemeChange);
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      // off theme change
      window.removeEventListener(CHANGE_THEME_EVENT, this.onThemeChange);
    }

    willUpdate() {
      // root classes and parts
      this.rootClassesParts = {root: true};
      // root styles
      this.rootStyles = {
        filter: this.filter,
        transition: this.transition,
        animation: this.animation,
      };
      // host styles
      this.updateHostStyles();
    }

    extendRootClassesParts(input: ExtendRootClassesPartsInput) {
      const {info = {}, hover = {}, overridable = {}} = input;
      const otherInfo = {} as Record<string, boolean>;
      const overridableFinalValues = {} as Record<string, string>;
      const {componentOptions} = this.getGlobalOptions();
      // build hover info
      const hoverInfo = Object.keys(hover).reduce(
        (result, key) => {
          const value = hover![key];
          if (!value) return result;
          result[`${key}-${value}-hover`] = true;
          return result;
        },
        {} as Record<string, boolean>
      );
      // build overridable info
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
      // refer gradient scheme on hover
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
      return (this.rootClassesParts = {
        ...this.rootClassesParts,
        ...info,
        ...hoverInfo,
        ...overridableInfo,
        ...otherInfo,
      });
    }

    extendRootStyles(info: StyleInfo) {
      return (this.rootStyles = {...this.rootStyles, ...info});
    }

    private getGlobalOptions() {
      const themeOptions =
        (!this.currentTheme
          ? null
          : this.globalComponentOptions?.[this.currentTheme]) || {};
      const componentOptions =
        (themeOptions.perComponent as any)?.[this.componentName] || {};
      return {themeOptions, componentOptions};
    }

    private calculatePropValue(name: string, originalValue: string) {
      const {themeOptions} = this.getGlobalOptions();
      // no theme info
      if (!this.currentTheme) return originalValue;
      // refer map
      const pascalName = name.replace(/-(\w)/g, (_, letter) =>
        letter.toUpperCase()
      );
      const referValue =
        this.refers?.[this.currentTheme]?.[pascalName] ||
        this.refers?.[this.currentTheme]?.[name];
      if (referValue) return referValue;
      // refer gradient scheme
      if (
        !this.componentMetas.colorOnlyScheme &&
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

    private updateHostStyles() {
      this.style.display = !this.display ? '' : this.display;
      this.style.position = !this.position ? '' : this.position;
      this.style.top = !this.top ? '' : this.top;
      this.style.right = !this.right ? '' : this.right;
      this.style.bottom = !this.bottom ? '' : this.bottom;
      this.style.left = !this.left ? '' : this.left;
      this.style.margin = !this.margin ? '' : this.margin;
      this.style.padding = !this.padding ? '' : this.padding;
      this.style.zIndex = !this.zIndex ? '' : this.zIndex;
      if (this.transform) {
        this.currentTransforms = transformToStyleInfo(this.transform);
        Object.keys(this.currentTransforms).forEach(
          key => (this.style[key] = this.currentTransforms![key])
        );
        this.style.webkitFilter = 'blur(0px)';
      } else if (this.currentTransforms) {
        Object.keys(this.currentTransforms).forEach(
          key => (this.style[key] = '')
        );
        this.style.webkitFilter = '';
      }
    }
  }
  return TiniElement as unknown as TiniElementConstructor;
}

export const TiniElement = TiniElementMixin(LitElement);
