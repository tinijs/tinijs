import {GLOBAL_TINI as BASE_GLOBAL_TINI, PACKAGE_PREFIX} from '@tinijs/core';

import {Router} from './router.js';

export const PACKAGE_NAME = '@tinijs/router';

export const GLOBAL_TINI = BASE_GLOBAL_TINI as {
  clientApp?: (typeof BASE_GLOBAL_TINI)['clientApp'] & {
    router?: Router;
  };
};
export const ROUTE_CHANGE_EVENT = `${PACKAGE_PREFIX}:route-change`;

export const ROUTER_OUTLET_TAG_NAME = 'router-outlet';
export const NAV_INDICATOR_ID = 'nav-indicator';
export const NAV_INDICATOR = `app-${NAV_INDICATOR_ID}`;
export const CLASS_ACTIVE = 'active';

export const NO_ROUTER_ERROR = 'Router is not initialized.';
export const NO_OUTLET_ROUTER_ERROR = 'Router instance is not provided.';
