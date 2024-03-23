import {Workbox} from 'workbox-window';

import {SW_UNSUPPORTED_ERROR} from './consts.js';

export function registerServiceWorker(swPath?: string) {
  if (!('serviceWorker' in navigator)) throw new Error(SW_UNSUPPORTED_ERROR);
  // register service worker
  const workbox = new Workbox(swPath || '/sw.js');
  workbox.register();
  // result
  return workbox;
}
