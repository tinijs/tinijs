import {Store} from './types.js';

export function Subscribe<States>(
  store: Store<States>,
  stateKey?: keyof States | null,
  reactive = true
) {
  return function (prototype: any, propertyName: string) {
    prototype.storeManager ||= {pending: []};
    prototype.storeManager.pending.push([
      store,
      stateKey || propertyName,
      propertyName,
      reactive,
    ]);
  };
}
