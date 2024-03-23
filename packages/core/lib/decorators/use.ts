import {getOptions, getApp} from '../utils/app.js';
import {getConfig} from '../utils/config.js';
import {getSplashscreen} from '../utils/splashscreen.js';

export function UseApp() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getApp(),
    });
  };
}

export function UseOptions() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getOptions(),
    });
  };
}

export function UseConfig() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getConfig(),
    });
  };
}

export function UseSplashscreen() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getSplashscreen(),
    });
  };
}
