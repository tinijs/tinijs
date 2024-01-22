import {CSSResultOrNative} from 'lit';
import {ClassInfo} from 'lit/directives/class-map.js';
import {Breakpoints} from './varies';

export type PartAttrInfo = ClassInfo;

export interface ExtendRootClassesInput {
  raw?: ClassInfo;
  pseudo?: Record<string, Record<string, undefined | string>>;
  overridable?: Record<string, undefined | string>;
}

export interface ComponentMetas {
  colorOnlyScheme?: boolean;
}

export type UIOptions = Record<
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

export type RegisterComponentsList = Array<
  CustomElementConstructor | [CustomElementConstructor, string]
>;

export interface EventForwarding {
  name: string;
  rename?: string;
  target?: string | Element[] | NodeListOf<Element>;
  keepPropagation?: boolean;
  preventDefault?: boolean;
  dispatchOptions?: Omit<CustomEventInit, 'detail'>;
}

export interface ActiveTheme {
  prevSoulId: string;
  prevSkinId: string;
  prevThemeId: string;
  soulId: string;
  skinId: string;
  themeId: string;
  breakpoints: Record<Lowercase<keyof typeof Breakpoints>, string>;
}
export interface ThemingScripting {
  script?: (host: HTMLElement) => void;
  unscript?: ThemingScripting['script'];
}
export interface ThemingOptions<ThemeId extends string> {
  styling?: Record<ThemeId, CSSResultOrNative[]>;
  scripting?: Record<ThemeId, ThemingScripting>;
}
export interface GenericThemingOptions {
  styling?: Record<string, string>;
  scripting?: ThemingOptions<string>['scripting'];
}
