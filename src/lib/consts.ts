import {ThemingSubscription} from './types';

export const GLOBAL_TINI = ((
  window as unknown as Record<string, unknown>
).TiniJS = {} as {
  themingSubscriptions?: Map<symbol, ThemingSubscription>;
});

export const CHANGE_THEME_EVENT = 'tini:changetheme';
