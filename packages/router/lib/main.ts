/* eslint-disable @typescript-eslint/no-explicit-any */
import {ComponentTypes, LifecycleHooks, registerGlobalHook} from '@tinijs/core';

import {ROUTE_CHANGE_EVENT} from './consts.js';
import {Route, RouterOptions} from './types.js';
import {hideNavIndicator, showNavIndicator} from './methods.js';
import {Router} from './router.js';

export function createRouter(routes: Route[], options: RouterOptions = {}) {
  const router = new Router(routes, options).init();
  // handle nav indicator
  if (options.navIndicator) {
    router.indicatorSchedule = null;
    // exit
    registerGlobalHook(
      ComponentTypes.Page,
      LifecycleHooks.OnChildrenReady,
      () => {
        if (router.indicatorSchedule === null) return;
        hideNavIndicator();
        // cancel schedule (if scheduled)
        clearTimeout(router.indicatorSchedule);
        router.indicatorSchedule = null;
      }
    );
    // entry
    addEventListener(ROUTE_CHANGE_EVENT, e => {
      const {url} = (e as CustomEvent).detail;
      if (url.pathname === location.pathname) return;
      router.indicatorSchedule = setTimeout(
        () => showNavIndicator(),
        500
      ) as unknown as number;
    });
  }
  // result
  return router;
}
