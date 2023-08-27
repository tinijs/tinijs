import {CSSResult} from 'lit';

export type UseComponentsList = Array<
  CustomElementConstructor | [CustomElementConstructor, string]
>;

export interface PartInfo {
  readonly [name: string]: string | boolean | number;
}

export interface ThemingScripting {
  script?: (host: HTMLElement) => void;
  unscript?: ThemingScripting['script'];
}

export interface ThemingOptions<Themes extends string> {
  styling?: Record<Themes, CSSResult[]>;
  scripting?: Record<Themes, ThemingScripting>;
}
