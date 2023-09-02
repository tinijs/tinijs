import {LitElement, CSSResult} from 'lit';
import {ClassInfo} from 'lit/directives/class-map.js';
import {StyleInfo} from 'lit/directives/style-map.js';

export type ConstructorArgs = any[];
export type Constructor<T = {}> = new (...args: ConstructorArgs) => T;

export type LitElementInterface = LitElement;
export interface TiniElementInterface {
  rootClassesParts: ClassInfo | PartInfo;
  rootStyles: StyleInfo;
  extendRootClassesParts(info: ClassInfo | PartInfo): ClassInfo | PartInfo;
  extendRootStyles(info: StyleInfo): StyleInfo;
  transform?: Transform;
  filter?: string;
}

export type TiniElementDerived = LitElementInterface & TiniElementInterface;
export type TiniElementConstructor = Constructor<TiniElementDerived>;
export type TiniElementInstance = Omit<TiniElementDerived, 'constructor'>;

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
export type ThemingSubscription = (soulId: string) => void;

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
