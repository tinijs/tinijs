import {GLOBAL_TINI, NO_SW_ERROR} from './consts.js';

export function getSW() {
  if (!GLOBAL_TINI.clientApp?.sw) throw new Error(NO_SW_ERROR);
  return GLOBAL_TINI.clientApp.sw;
}
