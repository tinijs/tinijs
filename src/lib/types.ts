import {LitElement, CSSResult} from 'lit';
import {ClassInfo} from 'lit/directives/class-map.js';
import {StyleInfo} from 'lit/directives/style-map.js';
import {Displays, Positions} from './varies';

export type ConstructorArgs = any[];
export type Constructor<T = {}> = new (...args: ConstructorArgs) => T;

export type LitElementInterface = LitElement;
export interface TiniElementInterface {
  componentName: string;
  componentMetas: ComponentMetas;
  rootClassesParts: ClassInfo | PartInfo;
  rootStyles: StyleInfo;
  display?: Displays;
  position?: Positions;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  margin?: string;
  padding?: string;
  zIndex?: string;
  transform?: Transform;
  filter?: string;
  transition?: string;
  animation?: string;
  hoverMap?: Record<string, any>;
  refers?: ComponentRefers;
  extendRootClassesParts(
    input: ExtendRootClassesPartsInput
  ): ClassInfo | PartInfo;
  extendRootStyles(info: StyleInfo): StyleInfo;
}

export type TiniElementDerived = LitElementInterface & TiniElementInterface;
export type TiniElementConstructor = Constructor<TiniElementDerived>;
export type TiniElementInstance = Omit<TiniElementDerived, 'constructor'>;

export interface ComponentMetas {
  colorOnlyScheme?: boolean;
}
export type ComponentRefers = Record<string, Record<string, any>>;
export interface ExtendRootClassesPartsInput {
  info?: ClassInfo | PartInfo;
  hover?: Record<string, undefined | string>;
  overridable?: Record<string, undefined | string>;
}

export type GlobalComponentOptions = Record<
  string,
  {
    referGradientScheme?: boolean;
    perComponent?: {
      button?: {
        referGradientSchemeOnHover?: boolean;
      };
    };
  }
>;

export type UseComponentsList = Array<
  CustomElementConstructor | [CustomElementConstructor, string]
>;

export interface ThemingScripting {
  script?: (host: HTMLElement) => void;
  unscript?: ThemingScripting['script'];
}
export interface ThemingOptions<Themes extends string> {
  styling?: Record<Themes, CSSResult[]>;
  scripting?: Record<Themes, ThemingScripting>;
}
export type ThemingSubscription = (param: ThemingSubscriptionParam) => void;
export interface ThemingSubscriptionParam {
  theme: string;
  soulId: string;
  skinId: string;
  prevSoulId: string;
  prevSkinId: string;
}

export interface PartInfo {
  readonly [name: string]: string | boolean | number;
}

export interface CustomTransform {
  value: string;
  origin?: string;
  box?: string;
  style?: string;
}
export type Transform = string | CustomTransform;
