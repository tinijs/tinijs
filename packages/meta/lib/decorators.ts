import {getMeta} from './methods.js';

export function useMeta() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getMeta(),
    });
  };
}
