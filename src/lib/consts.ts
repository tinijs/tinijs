import {CSSResultOrNative} from 'lit';
import {ActiveTheme, UIOptions} from './types';

export const GLOBAL_TINI = ((globalThis as Record<string, unknown>).TiniJS ||=
  {}) as {
  activeTheme?: ActiveTheme;
  uiOptions?: UIOptions;
  cachedGenericStyles?: Record<string, undefined | CSSResultOrNative[]>;
  cachedGenericUnscopedStyles?: Record<string, undefined | string[]>;
};

export const THEME_CHANGE_EVENT = 'tini:theme-change';
