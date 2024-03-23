import {
  getRouter,
  getActiveRoute,
  getParams,
  getQuery,
  getFragment,
  getNavIndicator,
} from './methods.js';

export function UseRouter() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getRouter(),
    });
  };
}

export function UseRoute() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getActiveRoute(),
    });
  };
}

export function UseParams() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getParams(),
    });
  };
}

export function UseQuery() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getQuery(),
    });
  };
}

export function UseFragment() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getFragment(),
    });
  };
}

export function UseNavIndicator() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getNavIndicator(),
    });
  };
}
