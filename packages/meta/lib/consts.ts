import {GLOBAL_TINI as BASE_GLOBAL_TINI} from '@tinijs/core';

import {Meta} from './main.js';

export const PACKAGE_NAME = '@tinijs/meta';

export const GLOBAL_TINI = BASE_GLOBAL_TINI as {
  clientApp?: (typeof BASE_GLOBAL_TINI)['clientApp'] & {
    meta?: Meta;
  };
};

export const NO_META_ERROR = 'Meta module is not initialized.';
