import {Workbox} from 'workbox-window';
import {GLOBAL_TINI as BASE_GLOBAL_TINI} from '@tinijs/core';

export const PACKAGE_NAME = '@tinijs/pwa';

export const GLOBAL_TINI = BASE_GLOBAL_TINI as {
  clientApp?: (typeof BASE_GLOBAL_TINI)['clientApp'] & {
    workbox?: Workbox;
  };
};

export const NO_PWA_ERROR = 'PWA module is not initialized.';
export const SW_UNSUPPORTED_ERROR = 'Service worker not supported.';
