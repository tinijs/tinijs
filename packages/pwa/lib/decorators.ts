import {getSW} from './methods.js';

export function UseSW() {
  return function (prototype: any, propertyKey: string) {
    Object.defineProperty(prototype, propertyKey, {
      get: () => getSW(),
    });
  };
}
