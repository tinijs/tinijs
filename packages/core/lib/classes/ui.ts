import {
  getCompatibleStyle,
  adoptStyles,
  unsafeCSS,
  type CSSResultOrNative,
  type TemplateResult,
} from 'lit';

import {GLOBAL_TINI} from '../consts/global.js';
import {PACKAGE_PREFIX} from '../consts/common.js';
import {NO_UI_ERROR, DUPLICATED_UI_ERROR} from '../consts/error.js';

import {listify} from '../utils/common.js';
import {StyleBuilder} from '../utils/style.js';

import type {TiniElement} from './element.js';

export type CSSResultOrNativeOrRaw = CSSResultOrNative | string;

export type Styles = CSSResultOrNativeOrRaw | CSSResultOrNativeOrRaw[];

export type DirectOrRecordStyles = Styles | Record<string, Styles>;

export type Theming = Record<string, ThemingEntry>;

export type ThemingEntry = {
  templates?: ThemingTemplates;
  styles: ThemingStyles;
  scripts?: ThemingScripts;
};

export type ThemingTemplates = Record<
  string,
  <Elem extends TiniElement>(elem: Elem, context?: any) => TemplateResult
>;

export type ThemingStyles = Styles;

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

export type UIOptions = {};

export interface UIInit {
  skins: Record<string, Styles>;
  globals?: Styles;
  shares?: DirectOrRecordStyles;
  host?: HTMLElement;
  options?: UIOptions;
}

export const THEME_LOCAL_STORAGE_KEY = `${PACKAGE_PREFIX}:local-theme-id`;
export const THEME_CHANGE_EVENT = `${PACKAGE_PREFIX}:theme-change`;

export function processThemingEntry(
  entry: ThemingEntry & {
    styles: Styles | StyleBuilder<any>;
  }
): ThemingEntry {
  return !(entry.styles instanceof StyleBuilder)
    ? entry
    : {
        ...entry,
        styles: entry.styles.toResult(),
      };
}

export function isDirectStyles(
  value: Styles | Record<string, Styles> | undefined
): value is Styles | undefined {
  return (
    !value ||
    typeof value === 'string' ||
    value instanceof Array ||
    value instanceof CSSStyleSheet ||
    (value as any)._$cssResult$ === true
  );
}

export function stylesToAdoptableStyles(styles: Styles | undefined) {
  const set = new Set(
    listify(styles)
      .map(item => (typeof item !== 'string' ? item : unsafeCSS(item)))
      .flat(Infinity)
      .reverse()
  );
  const result: CSSResultOrNative[] = [];
  for (const item of set) {
    result.unshift(getCompatibleStyle(item));
  }
  return result;
}

export function stylesToText(styles: Styles | undefined) {
  return stylesToAdoptableStyles(styles)
    .map(style => {
      if (style instanceof CSSStyleSheet) {
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

export function mergeRecordStyles(
  ...records: (Record<string, Styles> | undefined)[]
) {
  const result: Record<string, CSSResultOrNativeOrRaw[]> = {};
  for (const record of records) {
    if (!record) continue;
    for (const [key, value] of Object.entries(record)) {
      result[key] = listify(result[key] || []);
      result[key].push(...listify(value));
    }
  }
  return result;
}

export function mergeDirectOrRecordStyles(
  ...directsOrRecords: (Styles | Record<string, Styles> | undefined)[]
) {
  const items = directsOrRecords.filter(Boolean) as Array<
    Styles | Record<string, Styles>
  >;
  // convert directs to arrays and find a record with longest length
  let longestRecordKeys: string[] = [];
  for (const item of items) {
    if (isDirectStyles(item)) continue;
    const recordKeys = Object.keys(item);
    if (recordKeys.length >= longestRecordKeys.length) {
      longestRecordKeys = recordKeys;
    }
  }
  // all are direct styles
  if (!longestRecordKeys.length) {
    return (items as Styles[]).reduce((result, item) => {
      result.push(...listify<CSSResultOrNativeOrRaw>(item));
      return result;
    }, [] as any) as CSSResultOrNativeOrRaw[];
  }
  // has at least 1 record
  return mergeRecordStyles(
    ...items.map(item => {
      if (!isDirectStyles(item)) return item;
      return longestRecordKeys.reduce(
        (result, key) => {
          result[key] = item;
          return result;
        },
        {} as Record<string, Styles>
      );
    })
  );
}

export function extractTemplatesFromTheming(
  theming: Theming | undefined,
  {familyId}: ActiveTheme
) {
  return theming?.[familyId]?.templates || {};
}

export function extractScriptsFromTheming(
  theming: Theming | undefined,
  {themeId, familyId, prevThemeId, prevFamilyId}: ActiveTheme
) {
  const current = theming?.[familyId]?.scripts;
  const prev =
    prevThemeId === themeId ? undefined : theming?.[prevFamilyId]?.scripts;
  return {activate: current?.activate, deactivate: prev?.deactivate};
}

export function extractStylesFromTheming(
  theming: Theming | undefined,
  {themeId, familyId}: ActiveTheme
): CSSResultOrNativeOrRaw[] {
  return [
    ...listify(theming?.[familyId]?.styles),
    ...listify(theming?.[themeId]?.styles),
  ];
}

export function extractStylesFromDirectOrRecordStyles(
  input: DirectOrRecordStyles | undefined,
  activeTheme?: ActiveTheme
): CSSResultOrNativeOrRaw[] {
  if (!input) return [];
  if (isDirectStyles(input)) return listify(input);
  return !activeTheme
    ? []
    : [
        ...listify(input[activeTheme.familyId]),
        ...listify(input[activeTheme.themeId]),
      ];
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

  get prevFamilyId() {
    return this.activeTheme.prevFamilyId;
  }

  get familyId() {
    return this.activeTheme.familyId;
  }

  get prevSkinId() {
    return this.activeTheme.prevSkinId;
  }

  get skinId() {
    return this.activeTheme.skinId;
  }

  get prevThemeId() {
    return this.activeTheme.prevThemeId;
  }

  get themeId() {
    return this.activeTheme.themeId;
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
      this._applyTheme(activeTheme);
      // D. dispatch a global event
      dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, {detail: activeTheme}));
    }
    return this.activeTheme;
  }

  getGlobalStyles() {
    return listify<CSSResultOrNativeOrRaw>(this._init.globals);
  }

  getSkinStyles({themeId}: ActiveTheme) {
    return listify<CSSResultOrNativeOrRaw>(this._init.skins[themeId]);
  }

  getShareStyles(activeTheme: ActiveTheme) {
    return extractStylesFromDirectOrRecordStyles(
      this._init.shares,
      activeTheme
    );
  }

  private _applyTheme(activeTheme: ActiveTheme) {
    const host = this._init.host || document;
    const globalStyles = this.getGlobalStyles();
    const skinStyles = this.getSkinStyles(activeTheme);
    const shareStyles = this.getShareStyles(activeTheme);
    return adoptStyles(
      ((host as HTMLElement).shadowRoot || host) as ShadowRoot,
      stylesToAdoptableStyles([...globalStyles, ...skinStyles, ...shareStyles])
    );
  }
}
