import {getWorkbox} from './methods.js';

export function UseWorkbox() {
  return function (prototype: any, propertyKey: string) {
    Object.defineProperty(prototype, propertyKey, {
      get: () => getWorkbox(),
    });
  };
}
