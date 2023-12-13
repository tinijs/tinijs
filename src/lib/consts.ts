import {GlobalComponentOptions, ThemingSubscription} from './types';

export const GLOBAL_TINI = ((globalThis as Record<string, unknown>).TiniJS =
  {} as {
    themingSubscriptions?: Map<symbol, ThemingSubscription>;
    globalComponentOptions?: GlobalComponentOptions;
  });

export const CHANGE_THEME_EVENT = 'tini:changetheme';
