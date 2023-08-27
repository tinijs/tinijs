export const GLOBAL = window as unknown as {
  $tiniThemingSubscriptions?: Map<symbol, (soul: string) => void>;
};

export const CHANGE_THEME_EVENT = 'tini:changetheme';
