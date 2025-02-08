import {getUI} from '../classes/ui.js';

import {getOptions, getApp} from '../utils/app.js';
import {getConfig} from '../utils/config.js';
import {getSplashscreen} from '../utils/splashscreen.js';

export function useApp() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getApp(),
    });
  };
}

export function useOptions() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getOptions(),
    });
  };
}

export function useConfig() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getConfig(),
    });
  };
}

export function useSplashscreen() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getSplashscreen(),
    });
  };
}

export function useUI() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getUI(),
    });
  };
}
