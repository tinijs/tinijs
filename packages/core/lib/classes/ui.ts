import {adoptStyles, type CSSResultOrNative, type TemplateResult} from 'lit';

import {GLOBAL_TINI} from '../consts/global.js';
import {PACKAGE_PREFIX} from '../consts/common.js';
import {NO_UI_ERROR, DUPLICATED_UI_ERROR} from '../consts/error.js';

import {listify} from '../utils/common.js';
import {Breakpoints} from '../utils/vary.js';

export type Templating = Record<string, (host: HTMLElement) => TemplateResult>;

export type Theming = Record<
  string,
  {
    styles: CSSResultOrNative | CSSResultOrNative[];
    scripts:
      | undefined
      | ThemingScripts
      | ((host: HTMLElement) => ThemingScripts);
  }
>;

export interface ThemingScripts {
  willUpdate?(host: HTMLElement): void;
  unscriptWillUpdate?(host: HTMLElement): void;
  updated?(host: HTMLElement): void;
  unscriptUpdated?(host: HTMLElement): void;
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
  resolve?(icon: string, provider?: string): string;
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
  globals?: CSSResultOrNative | CSSResultOrNative[];
  skins: Record<string, CSSResultOrNative | CSSResultOrNative[]>;
  shares?: Record<string, CSSResultOrNative | CSSResultOrNative[]>;
  options?: UIOptions;
}

export const THEME_LOCAL_STORAGE_KEY = `${PACKAGE_PREFIX}:local-theme-id`;
export const THEME_CHANGE_EVENT = `${PACKAGE_PREFIX}:theme-change`;

export function getStylesFromTheming(
  theming: Theming | undefined,
  {themeId, familyId}: ActiveTheme
) {
  return listify<CSSResultOrNative>(
    (
      theming?.[themeId] ||
      theming?.[familyId] ||
      Object.values(theming || {})[0] ||
      {}
    ).styles || []
  );
}

export function getScriptsFromTheming(
  host: HTMLElement,
  theming: Theming | undefined,
  {themeId, familyId, prevThemeId, prevFamilyId}: ActiveTheme
) {
  const current = (
    theming?.[themeId] ||
    theming?.[familyId] ||
    Object.values(theming || {})[0]
  )?.scripts;
  const currentScripts = !current
    ? {}
    : typeof current !== 'function'
      ? current
      : current(host);
  const prev =
    prevThemeId === themeId
      ? undefined
      : (
          theming?.[prevThemeId] ||
          theming?.[prevFamilyId] ||
          Object.values(theming || {})[0]
        )?.scripts;
  const prevScripts = !prev
    ? {}
    : typeof prev !== 'function'
      ? prev
      : prev(host);
  return {prevScripts, currentScripts};
}

export function extractTextFromStyles(
  styles: Array<string | CSSResultOrNative>
) {
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
  allStyles: Array<string | CSSResultOrNative>,
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
      // 1. update local storage
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeId);
      // 2. adopt styles
      this._applyTheme(newFamilyId, newSkinId);
      // 3. dispatch a global event
      dispatchEvent(
        new CustomEvent(THEME_CHANGE_EVENT, {
          detail: this._rebuildActiveTheme(newFamilyId, newSkinId, {
            prevFamilyId: currentFamilyId || newFamilyId,
            prevSkinId: currentSkinId || newSkinId,
            prevThemeId: `${currentFamilyId}/${currentSkinId}`,
          }),
        })
      );
    }
    return this.activeTheme;
  }

  getStyles(familyId: string, skinId: string) {
    const themeId = `${familyId}/${skinId}`;
    const {skins, globals, shares} = this._init;
    const globalStyles = listify<CSSResultOrNative>(globals || []);
    const skinStyles = listify<CSSResultOrNative>(skins[themeId] || []);
    const shareStyles = ([] as CSSResultOrNative[])
      .concat(listify<CSSResultOrNative>(shares?.['*'] || []))
      .concat(listify<CSSResultOrNative>(shares?.[familyId] || []))
      .concat(listify<CSSResultOrNative>(shares?.[themeId] || []));
    return {globalStyles, skinStyles, shareStyles};
  }

  private _rebuildActiveTheme(
    familyId: string,
    skinId: string,
    prevData?: Pick<ActiveTheme, 'prevFamilyId' | 'prevSkinId' | 'prevThemeId'>
  ) {
    const themeId = `${familyId}/${skinId}`;
    // breakpoints
    const computedStyle = getComputedStyle(document.body);
    const breakpoints = Object.entries(Breakpoints).reduce(
      (result, [enumKey, defaultValue]) => {
        const key = enumKey.toLowerCase() as Lowercase<
          keyof typeof Breakpoints
        >;
        const value = computedStyle.getPropertyValue(`--wide-${key}`);
        result[key] = value || defaultValue;
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
    const {globalStyles, skinStyles, shareStyles} = this.getStyles(
      familyId,
      skinId
    );
    return adoptStyles(
      ((host as HTMLElement).shadowRoot || host) as ShadowRoot,
      [...skinStyles, ...globalStyles, ...shareStyles]
    );
  }
}
