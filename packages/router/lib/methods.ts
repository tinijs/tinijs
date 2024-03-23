import {NavIndicatorComponent, ActivatedRoute} from './types.js';
import {
  GLOBAL_TINI,
  NAV_INDICATOR_ID,
  NAV_INDICATOR,
  CLASS_ACTIVE,
  NO_ROUTER_ERROR,
} from './consts.js';

export function getRouter() {
  if (!GLOBAL_TINI.clientApp?.router) throw new Error(NO_ROUTER_ERROR);
  return GLOBAL_TINI.clientApp.router;
}

export function getActiveRoute(): ActivatedRoute | undefined {
  return getRouter().getActiveRoute();
}

export function getParams() {
  return getRouter().getParams();
}

export function getQuery() {
  return getRouter().getQuery();
}

export function getFragment() {
  return getRouter().getFragment();
}

export function requestChange() {
  return dispatchEvent(new PopStateEvent('popstate'));
}

export function go(to: string, replace?: boolean) {
  const url = new URL(to, location.origin);
  if (url.href === location.href) return false;
  history[!replace ? 'pushState' : 'replaceState']({}, '', url.href);
  return requestChange();
}

export function redirect(to: string) {
  return go(to, true);
}

export function back() {
  history.back();
  return requestChange();
}

export function forward() {
  history.forward();
  return requestChange();
}

export function getNavIndicator() {
  if (!GLOBAL_TINI.clientApp) return null;
  const root = GLOBAL_TINI.clientApp.renderRoot;
  return (
    root.querySelector(NAV_INDICATOR) ||
    root.querySelector(`#${NAV_INDICATOR_ID}`)
  );
}

export function showNavIndicator() {
  const node = getNavIndicator() as NavIndicatorComponent;
  if (!node) return;
  if (node.show instanceof Function) {
    node.show();
  } else {
    node.classList.add(CLASS_ACTIVE);
  }
}

export function hideNavIndicator() {
  const node = getNavIndicator() as NavIndicatorComponent;
  if (!node) return;
  if (node.hide instanceof Function) {
    node.hide();
  } else {
    node.classList.remove(CLASS_ACTIVE);
  }
}
