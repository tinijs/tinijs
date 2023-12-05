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
  ContainerTypes,
  Displays,
  AlignItems,
  JustifyContents,
  Positions,
  Visibilities,
  MixBlendModes,
  COMMON_COLORS_TO_COMMON_GRADIENTS,
} from './varies';

function TiniElementMixin(SuperClass: any) {
  class TiniElement extends SuperClass {
    private globalComponentOptions = getGlobalComponentOptions();
    private currentTheme = getTheme();
    private currentTransforms?: StyleInfo;
    private currentCustomRootStyles?: StyleInfo;

    protected activeRootClassesParts: ClassInfo | PartInfo = {};
    protected activeRootStyles: StyleInfo = {};

    readonly componentName = 'unnamed';
    readonly componentMetas: ComponentMetas = {};
    readonly referLightDOM = false;

    /* eslint-disable prettier/prettier */
    @property({type: String, reflect: true}) declare xContainerType?: ContainerTypes;
    @property({type: String, reflect: true}) declare xContainerName?: string;
    @property({type: String, reflect: true}) declare xDisplay?: Displays;
    @property({type: String, reflect: true}) declare xAlignItems?: AlignItems;
    @property({type: String, reflect: true}) declare xJustifyContent?: JustifyContents;
    @property({type: String, reflect: true}) declare xWidth?: string;
    @property({type: String, reflect: true}) declare xHeight?: string;
    @property({type: String, reflect: true}) declare xOpacity?: string;
    @property({type: String, reflect: true}) declare xVisibility?: Visibilities;
    @property({type: String, reflect: true}) declare xPosition?: Positions;
    @property({type: String, reflect: true}) declare xInset?: string;
    @property({type: String, reflect: true}) declare xTop?: string;
    @property({type: String, reflect: true}) declare xRight?: string;
    @property({type: String, reflect: true}) declare xBottom?: string;
    @property({type: String, reflect: true}) declare xLeft?: string;
    @property({type: String, reflect: true}) declare xMargin?: string;
    @property({type: String, reflect: true}) declare xPadding?: string;
    @property({type: String, reflect: true}) declare xColor?: string;
    @property({type: String, reflect: true}) declare xBackground?: string;
    @property({type: String, reflect: true}) declare xBorder?: string;
    @property({type: String, reflect: true}) declare xBorderRadius?: string;
    @property({type: String, reflect: true}) declare xShadow?: string;
    @property({type: String, reflect: true}) declare xZIndex?: string;
    @property({type: String, reflect: true}) declare xTransform?: Transform;
    @property({type: String, reflect: true}) declare xFilter?: string;
    @property({type: String, reflect: true}) declare xTransition?: string;
    @property({type: String, reflect: true}) declare xAnimation?: string;
    @property({type: String, reflect: true}) declare xMixBlendMode?: MixBlendModes;
    @property({type: String, reflect: true}) declare xBackdropFilter?: string;
    @property({type: String, reflect: true}) declare xClipPath?: string;
    @property({type: String, reflect: true}) declare xMask?: string;
    @property({type: Object}) declare hostStyles?: StyleInfo;
    @property({type: Object}) declare rootStyles?: StyleInfo;
    @property({type: Object}) declare hoverMap?: Record<string, any>;
    @property({type: Object}) declare focusMap?: Record<string, any>;
    @property({type: Object}) declare activeMap?: Record<string, any>;
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
      this.activeRootClassesParts = {root: true};
      // root styles
      this.activeRootStyles = {
        padding: this.xPadding,
        width: this.xWidth,
        height: this.xHeight,
        opacity: this.xOpacity,
        visibility: this.xVisibility,
        color: this.xColor,
        background: this.xBackground,
        border: this.xBorder,
        borderRadius: this.xBorderRadius,
        shadow: this.xShadow,
        filter: this.xFilter,
        webkitFilter: this.xFilter,
        transition: this.xTransition,
        animation: this.xAnimation,
        mixBlendMode: this.xMixBlendMode,
        backdropFilter: this.xBackdropFilter,
        clipPath: this.xClipPath,
        mask: this.xMask,
        webkitMask: this.xMask,
        // custom root styles
        ...this.rootStyles,
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
      return (this.activeRootClassesParts = {
        ...this.activeRootClassesParts,
        ...info,
        ...hoverInfo,
        ...overridableInfo,
        ...otherInfo,
      });
    }

    extendRootStyles(info: StyleInfo) {
      return (this.activeRootStyles = {...this.activeRootStyles, ...info});
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
      const camelName = name.replace(/-(\w)/g, (_, letter) =>
        letter.toUpperCase()
      );
      const referValue =
        this.refers?.[this.currentTheme]?.[camelName] ||
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
      this.style.display = !this.xDisplay ? '' : this.xDisplay;
      this.style.alignItems = !this.xAlignItems ? '' : this.xAlignItems;
      this.style.justifyContent = !this.xJustifyContent
        ? ''
        : this.xJustifyContent;
      this.style.position = !this.xPosition ? '' : this.xPosition;
      this.style.inset = !this.xInset ? '' : this.xInset;
      this.style.top = !this.xTop ? '' : this.xTop;
      this.style.right = !this.xRight ? '' : this.xRight;
      this.style.bottom = !this.xBottom ? '' : this.xBottom;
      this.style.left = !this.xLeft ? '' : this.xLeft;
      this.style.margin = !this.xMargin ? '' : this.xMargin;
      this.style.zIndex = !this.xZIndex ? '' : this.xZIndex;
      // apply all styles to the host
      if (this.referLightDOM) {
        Object.keys(this.activeRootStyles).forEach(key => {
          const value = this.activeRootStyles![key];
          return (this.style[key] = !value ? '' : value);
        });
      }
      // transform
      if (this.xTransform) {
        this.currentTransforms = transformToStyleInfo(this.xTransform);
        Object.keys(this.currentTransforms).forEach(key => {
          const value = this.currentTransforms![key];
          return (this.style[key] = !value ? '' : value);
        });
        this.style.webkitFilter = 'blur(0px)';
      } else if (this.currentTransforms) {
        Object.keys(this.currentTransforms).forEach(
          key => (this.style[key] = '')
        );
        this.style.webkitFilter = '';
        this.currentTransforms = undefined;
      }
      // custom host styles
      if (this.hostStyles) {
        this.currentCustomRootStyles = this.hostStyles;
        Object.keys(this.currentCustomRootStyles).forEach(key => {
          const value = this.currentCustomRootStyles![key];
          return (this.style[key] = !value ? '' : value);
        });
      } else if (this.currentCustomRootStyles) {
        Object.keys(this.currentCustomRootStyles).forEach(
          key => (this.style[key] = '')
        );
        this.currentCustomRootStyles = undefined;
      }
    }
  }
  return TiniElement as unknown as TiniElementConstructor;
}

export const TiniElement = TiniElementMixin(LitElement);
