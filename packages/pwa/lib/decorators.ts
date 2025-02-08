import {getSW} from './methods.js';

export function useSW() {
  return function (prototype: any, propertyKey: string) {
    Object.defineProperty(prototype, propertyKey, {
      get: () => getSW(),
    });
  };
}
