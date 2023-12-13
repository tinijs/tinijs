import {LitElement, CSSResult} from 'lit';
import {ClassInfo} from 'lit/directives/class-map.js';

export type PartInfo = ClassInfo;

export type ConstructorArgs = any[];
export type Constructor<T = {}> = new (...args: ConstructorArgs) => T;

export type LitElementInterface = LitElement;
export interface TiniElementInterface {
  readonly componentName: string;
  readonly componentMetas: ComponentMetas;
  rootClasses: ClassInfo;
  styleDeep?: string;
  refers?: RefersProp;
  extendRootClasses(input: ExtendRootClassesInput): ClassInfo;
}

export type TiniElementDerived = LitElementInterface & TiniElementInterface;
export type TiniElementConstructor = Constructor<TiniElementDerived>;
export type TiniElementInstance = Omit<TiniElementDerived, 'constructor'>;

export type RefersProp = Record<string, Record<string, any>>;

export interface ComponentMetas {
  colorOnlyScheme?: boolean;
}

export interface ExtendRootClassesInput {
  raw?: ClassInfo;
  pseudo?: Record<string, Record<string, undefined | string>>;
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
