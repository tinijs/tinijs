import {GLOBAL_TINI, NO_PWA_ERROR} from './consts.js';

export function getWorkbox() {
  if (!GLOBAL_TINI.clientApp) throw new Error(NO_PWA_ERROR);
  return GLOBAL_TINI.clientApp?.workbox;
}
