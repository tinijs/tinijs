import {
  getCompatibleStyle,
  adoptStyles,
  unsafeCSS,
  type PropertyValues,
  type CSSResultOrNative,
  type TemplateResult,
} from 'lit';

import {GLOBAL_TINI} from '../consts/global.js';
import {PACKAGE_PREFIX} from '../consts/common.js';
import {NO_UI_ERROR, DUPLICATED_UI_ERROR} from '../consts/error.js';

import {listify} from '../utils/common.js';

import type {TiniElement} from './element.js';

export type Theming = Record<
  string,
  {
    templates?: ThemingTemplates;
    styles: ThemingStyles;
    scripts?:
      | ThemingScripts
      | (<Elem extends TiniElement>(elem: Elem) => ThemingScripts);
  }
>;

export type ThemingTemplates = Record<
  string,
  <Elem extends TiniElement>(elem: Elem, context?: any) => TemplateResult
>;

export type CSSResultOrNativeOrRaw = CSSResultOrNative | string;

export type ThemingStyles = CSSResultOrNativeOrRaw | CSSResultOrNativeOrRaw[];

export type StyleDeepInput = string | Record<string, ThemingStyles>;

export interface ThemingScripts {
  connectedCallback?<Elem extends TiniElement>(
    type: ThemingScriptTypes,
    elem: Elem
  ): void;
  disconnectedCallback?<Elem extends TiniElement>(
    type: ThemingScriptTypes,
    elem: Elem
  ): void;
  willUpdate?<Elem extends TiniElement>(
    type: ThemingScriptTypes,
    elem: Elem,
    changedProperties: PropertyValues<Elem>
  ): void;
  firstUpdated?<Elem extends TiniElement>(
    type: ThemingScriptTypes,
    elem: Elem,
    changedProperties: PropertyValues<Elem>
  ): void;
  updated?<Elem extends TiniElement>(
    type: ThemingScriptTypes,
    elem: Elem,
    changedProperties: PropertyValues<Elem>
  ): void;
}

export enum ThemingScriptTypes {
  Script = 'script',
  Unscript = 'unscript',
}

export enum Breakpoints {
  '2XS' = '320px',
  XS = '480px',
  SM = '576px',
  MD = '768px',
  LG = '992px',
  XL = '1024px',
  '2XL' = '1200px',
  '3XL' = '1440px',
}

export interface ActiveTheme {
  prevFamilyId: string;
  prevSkinId: string;
  prevThemeId: string;
  familyId: string;
  skinId: string;
  themeId: string;
  breakpoints: Record<Lowercase<keyof typeof Breakpoints>, string>;
}

export type UIIconOptions = {
  resolve?(name: string, provider?: string): string;
};

export type UIButtonOptions = {
  referGradientSchemeOnHover?: boolean;
};

export type UICodeOptions = {
  engine: string;
  highlight: (
    language: string,
    code: string,
    styleElement: HTMLStyleElement
  ) => string | Promise<string>;
  theme?: string;
};

export interface UIOptions<
  ExtendedOptions extends Record<string, unknown> = {},
> {
  [asteriskOrThemeIdOrFamilyId: string]: {
    referGradientScheme?: boolean;
    // component specific options
    icon?: UIIconOptions;
    button?: UIButtonOptions;
    code?: UICodeOptions;
  } & ExtendedOptions;
}

export interface UIInit {
  host?: HTMLElement;
  globals?: ThemingStyles;
  skins: Record<string, ThemingStyles>;
  shares?: Record<string, ThemingStyles>;
  options?: UIOptions;
}

export const THEME_LOCAL_STORAGE_KEY = `${PACKAGE_PREFIX}:local-theme-id`;
export const THEME_CHANGE_EVENT = `${PACKAGE_PREFIX}:theme-change`;

export function getTemplatesFromTheming(
  theming: Theming | undefined,
  {themeId, familyId}: ActiveTheme
) {
  return (theming?.[themeId] || theming?.[familyId])?.templates || {};
}

export function getStylesFromTheming(
  theming: Theming | undefined,
  {themeId, familyId}: ActiveTheme
) {
  return listify<CSSResultOrNativeOrRaw>(
    (
      theming?.[themeId] ||
      theming?.[familyId] ||
      Object.values(theming || {})[0]
    )?.styles
  );
}

export function getScriptsFromTheming(
  elem: TiniElement,
  theming: Theming | undefined,
  {themeId, familyId, prevThemeId, prevFamilyId}: ActiveTheme
) {
  const current = (theming?.[themeId] || theming?.[familyId])?.scripts;
  const currentScripts = !current
    ? {}
    : typeof current !== 'function'
      ? current
      : current(elem);
  const prev =
    prevThemeId === themeId
      ? undefined
      : (theming?.[prevThemeId] || theming?.[prevFamilyId])?.scripts;
  const prevScripts = !prev
    ? {}
    : typeof prev !== 'function'
      ? prev
      : prev(elem);
  return {prevScripts, currentScripts};
}

export function convertThemingStylesToAdoptableStyles(
  styles: ThemingStyles | undefined
) {
  return listify<CSSResultOrNativeOrRaw>(styles).map(item =>
    typeof item !== 'string' ? item : unsafeCSS(item)
  );
}

export function extractTextFromStyles(styles: CSSResultOrNativeOrRaw[]) {
  return styles
    .map(style => {
      if (typeof style === 'string') {
        return style;
      } else if (style instanceof CSSStyleSheet) {
        let text = '';
        for (const rule of style.cssRules as any) {
          text += '\n' + rule.cssText;
        }
        return text;
      } else {
        return style.cssText;
      }
    })
    .join('\n');
}

export function processComponentStyles(
  allStyles: CSSResultOrNativeOrRaw[],
  activeTheme?: ActiveTheme,
  additionalProcess?: (styleText: string, activeTheme?: ActiveTheme) => string
) {
  // 1. combine all styles
  let styleText = extractTextFromStyles(allStyles);
  // 2. run additional process
  if (additionalProcess) styleText = additionalProcess(styleText, activeTheme);
  // 3. replace breakpoints
  if (activeTheme) {
    Object.entries(activeTheme.breakpoints).forEach(
      ([key, value]) =>
        (styleText = styleText.replace(
          new RegExp(`: ?(${key}|${key.toUpperCase()})\\)`, 'g'),
          `: ${value})`
        ))
    );
  }
  // result
  return styleText;
}

export function getOptionalUI() {
  return GLOBAL_TINI.ui;
}

export function getUI() {
  if (!GLOBAL_TINI.ui) throw NO_UI_ERROR;
  return GLOBAL_TINI.ui;
}

export function initUI(
  init: UIInit,
  customThemeIdRetriever?: (init: UIInit) => string
) {
  if (GLOBAL_TINI.ui) throw DUPLICATED_UI_ERROR;
  return (GLOBAL_TINI.ui = new UI(init)).init(customThemeIdRetriever);
}

export class UI {
  private _activeTheme?: ActiveTheme;

  constructor(private _init: UIInit) {}

  init(customThemeIdRetriever?: (init: UIInit) => string) {
    const initialThemeId =
      customThemeIdRetriever?.(this._init) ||
      localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    this.setTheme(
      initialThemeId && this._init.skins[initialThemeId]
        ? initialThemeId
        : Object.keys(this._init.skins)[0]
    );
    return this;
  }

  get options() {
    return this._init.options || ({} as UIOptions);
  }

  get activeTheme() {
    if (!this._activeTheme) throw new Error('No active theme found!');
    return this._activeTheme;
  }

  async setTheme(themeId: string) {
    const [newFamilyId, newSkinId] = themeId.split('/');
    const {familyId: currentFamilyId, skinId: currentSkinId} =
      this._activeTheme || {};
    if (newFamilyId !== currentFamilyId || newSkinId !== currentSkinId) {
      const prevFamilyId = currentFamilyId || newFamilyId;
      const prevSkinId = currentSkinId || newSkinId;
      const prevThemeId = `${prevFamilyId}/${prevSkinId}`;
      const activeTheme = this._rebuildActiveTheme(newFamilyId, newSkinId, {
        prevFamilyId,
        prevSkinId,
        prevThemeId,
      });
      // 1. update local storage
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeId);
      // 2. adopt styles
      this._applyTheme(newFamilyId, newSkinId);
      // 3. dispatch a global event
      dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, {detail: activeTheme}));
    }
    return this.activeTheme;
  }

  getGlobalStyles() {
    const {globals} = this._init;
    return convertThemingStylesToAdoptableStyles(globals);
  }

  getSkinStyles(familyId: string, skinId: string) {
    const {skins} = this._init;
    return convertThemingStylesToAdoptableStyles(
      skins[`${familyId}/${skinId}`]
    );
  }

  getShareStyles(familyId: string, skinId: string) {
    const {shares} = this._init;
    return [
      ...convertThemingStylesToAdoptableStyles(shares?.['*']),
      ...convertThemingStylesToAdoptableStyles(shares?.[familyId]),
      ...convertThemingStylesToAdoptableStyles(
        shares?.[`${familyId}/${skinId}`]
      ),
    ];
  }

  private _rebuildActiveTheme(
    familyId: string,
    skinId: string,
    prevData?: Pick<ActiveTheme, 'prevFamilyId' | 'prevSkinId' | 'prevThemeId'>
  ) {
    const themeId = `${familyId}/${skinId}`;
    // breakpoints
    const skinText = extractTextFromStyles(listify(this._init.skins[themeId]));
    const breakpoints = Object.entries(Breakpoints).reduce(
      (result, [enumKey, defaultValue]) => {
        const key = enumKey.toLowerCase() as Lowercase<
          keyof typeof Breakpoints
        >;
        const matching = skinText.match(new RegExp(`--wide-${key}: ?([^;]+);`));
        result[key] = matching?.[1] || defaultValue;
        return result;
      },
      {} as Record<Lowercase<keyof typeof Breakpoints>, string>
    );
    // result
    return (this._activeTheme = {
      prevFamilyId: prevData?.prevFamilyId || familyId,
      prevSkinId: prevData?.prevSkinId || skinId,
      prevThemeId: prevData?.prevThemeId || themeId,
      familyId,
      skinId,
      themeId,
      breakpoints,
    });
  }

  private _applyTheme(familyId: string, skinId: string) {
    const host = this._init.host || document;
    const globalStyles = this.getGlobalStyles();
    const skinStyles = this.getSkinStyles(familyId, skinId);
    const shareStyles = this.getShareStyles(familyId, skinId);
    const styleText = processComponentStyles(
      [...skinStyles, ...globalStyles, ...shareStyles],
      this._activeTheme
    );
    return adoptStyles(
      ((host as HTMLElement).shadowRoot || host) as ShadowRoot,
      [getCompatibleStyle(unsafeCSS(styleText))]
    );
  }
}
