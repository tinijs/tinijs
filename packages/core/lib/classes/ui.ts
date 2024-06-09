import {
  getCompatibleStyle,
  adoptStyles,
  unsafeCSS,
  type PropertyValues,
  type CSSResultOrNative,
  type TemplateResult,
} from 'lit';
import {defu} from 'defu';

import {GLOBAL_TINI} from '../consts/global.js';
import {PACKAGE_PREFIX} from '../consts/common.js';
import {NO_UI_ERROR, DUPLICATED_UI_ERROR} from '../consts/error.js';

import {listify} from '../utils/common.js';
import {StyleBuilder} from '../utils/style.js';

import type {TiniElement} from './element.js';

export type ThemingEntry = {
  templates?: ThemingTemplates;
  styles: ThemingStyles;
  scripts?: ThemingScripts;
};

export type Theming = Record<string, ThemingEntry>;

export type ThemingTemplates = Record<
  string,
  <Elem extends TiniElement>(elem: Elem, context?: any) => TemplateResult
>;

export type CSSResultOrNativeOrRaw = CSSResultOrNative | string;

export type ThemingStyles = CSSResultOrNativeOrRaw | CSSResultOrNativeOrRaw[];

export type StyleDeepInput = ThemingStyles | Record<string, ThemingStyles>;

export interface ThemingScripts {
  activate?<Elem extends TiniElement>(elem: Elem): void;
  deactivate?<Elem extends TiniElement>(elem: Elem): void;
}

export interface ActiveTheme {
  prevFamilyId: string;
  prevSkinId: string;
  prevThemeId: string;
  familyId: string;
  skinId: string;
  themeId: string;
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
  skins: Record<string, ThemingStyles>;
  globals?: ThemingStyles;
  shares?: Record<string, ThemingStyles>;
  host?: HTMLElement;
  options?: UIOptions;
}

export const THEME_LOCAL_STORAGE_KEY = `${PACKAGE_PREFIX}:local-theme-id`;
export const THEME_CHANGE_EVENT = `${PACKAGE_PREFIX}:theme-change`;

export function processThemingEntry(
  entry: ThemingEntry & {
    styles: ThemingStyles | StyleBuilder<any>;
  }
): ThemingEntry {
  return !(entry.styles instanceof StyleBuilder)
    ? entry
    : {
        ...entry,
        styles: entry.styles.toResult(),
      };
}

export function isThemingStyles(
  value: ThemingStyles | Record<string, ThemingStyles> | null | undefined
): value is ThemingStyles | null | undefined {
  return (
    !value ||
    typeof value === 'string' ||
    value instanceof Array ||
    value instanceof CSSStyleSheet ||
    (value as any).toString instanceof Function
  );
}

export function themingStylesToAdoptableStyles(
  styles: ThemingStyles | null | undefined
) {
  return listify<CSSResultOrNativeOrRaw>(styles).map(item =>
    getCompatibleStyle(typeof item !== 'string' ? item : unsafeCSS(item))
  );
}

export function themingStylesToText(styles: ThemingStyles | null | undefined) {
  return listify<CSSResultOrNativeOrRaw>(styles)
    .map(style => {
      if (typeof style === 'string') {
        return style;
      } else if (style instanceof CSSStyleSheet) {
        let text = '';
        for (const rule of style.cssRules as any) {
          text += rule.cssText;
        }
        return text;
      } else {
        return style.cssText;
      }
    })
    .join('');
}

export function mergeThemingStylesRecords(
  ...records: (Record<string, ThemingStyles> | null | undefined)[]
) {
  const processedRecords: Record<string, CSSResultOrNativeOrRaw[]>[] = [];
  for (let i = records.length - 1; i >= 0; i--) {
    const record = records[i];
    if (!record) continue;
    processedRecords.push(
      Object.entries(record).reduce(
        (result, [key, value]) => {
          result[key] = listify<CSSResultOrNativeOrRaw>(value);
          return result;
        },
        {} as Record<string, CSSResultOrNativeOrRaw[]>
      )
    );
  }
  return defu(
    {} as Record<string, CSSResultOrNativeOrRaw[]>,
    ...processedRecords
  );
}

export function extractTemplatesFromTheming(
  theming: Theming | undefined,
  {themeId, familyId}: ActiveTheme
) {
  return (theming?.[themeId] || theming?.[familyId])?.templates || {};
}

export function extractStylesFromTheming(
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

export function extractScriptsFromTheming(
  theming: Theming | undefined,
  {themeId, familyId, prevThemeId, prevFamilyId}: ActiveTheme
) {
  const current = (theming?.[themeId] || theming?.[familyId])?.scripts;
  const prev =
    prevThemeId === themeId
      ? undefined
      : (theming?.[prevThemeId] || theming?.[prevFamilyId])?.scripts;
  return {activate: current?.activate, deactivate: prev?.deactivate};
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
      // A. update active theme
      const prevFamilyId = currentFamilyId || newFamilyId;
      const prevSkinId = currentSkinId || newSkinId;
      const prevThemeId = `${prevFamilyId}/${prevSkinId}`;
      const activeTheme = (this._activeTheme = {
        prevFamilyId,
        prevSkinId,
        prevThemeId,
        familyId: newFamilyId,
        skinId: newSkinId,
        themeId,
      });
      // B. update local storage
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeId);
      // C. adopt styles
      this._applyTheme(newFamilyId, newSkinId);
      // D. dispatch a global event
      dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, {detail: activeTheme}));
    }
    return this.activeTheme;
  }

  getGlobalStyles() {
    const {globals} = this._init;
    return listify<CSSResultOrNativeOrRaw>(globals);
  }

  getSkinStyles(familyId: string, skinId: string) {
    const {skins} = this._init;
    return listify<CSSResultOrNativeOrRaw>(skins[`${familyId}/${skinId}`]);
  }

  getShareStyles(familyId: string, skinId: string) {
    const {shares} = this._init;
    return [
      ...listify<CSSResultOrNativeOrRaw>(shares?.['*']),
      ...listify<CSSResultOrNativeOrRaw>(shares?.[familyId]),
      ...listify<CSSResultOrNativeOrRaw>(shares?.[`${familyId}/${skinId}`]),
    ];
  }

  private _applyTheme(familyId: string, skinId: string) {
    const host = this._init.host || document;
    const globalStyles = this.getGlobalStyles();
    const skinStyles = this.getSkinStyles(familyId, skinId);
    const shareStyles = this.getShareStyles(familyId, skinId);
    return adoptStyles(
      ((host as HTMLElement).shadowRoot || host) as ShadowRoot,
      themingStylesToAdoptableStyles([
        ...globalStyles,
        ...skinStyles,
        ...shareStyles,
      ])
    );
  }
}
