import {Workbox} from 'workbox-window/Workbox.js';

import {SW_UNSUPPORTED_ERROR} from './consts.js';

export function registerServiceWorker(
  swPath?: string,
  options?: RegistrationOptions
) {
  if (!('serviceWorker' in navigator)) throw new Error(SW_UNSUPPORTED_ERROR);
  const sw = new Workbox(swPath || '/sw.js', options);
  sw.register();
  return sw;
}
