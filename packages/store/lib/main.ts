import {Store, StoreOptions, StoreCallback} from './types.js';

export function createStore<States>(
  states: States,
  options: StoreOptions = {}
) {
  const store = new Proxy(states as Object, {
    get(target, prop: string) {
      if (prop === 'subscribe') {
        return (stateKey: string, callback: StoreCallback<unknown>) => {
          if (stateKey in target) {
            // subscribe
            const subscriptions: Map<symbol, StoreCallback<unknown>> = ((
              target as any
            )[`___${stateKey}$`] ||= new Map());
            const subscriptionId = Symbol();
            subscriptions.set(subscriptionId, callback);
            // unsubscribe
            return () => subscriptions.delete(subscriptionId);
          } else {
            throw new Error(`Unknown state: ${stateKey}`);
          }
        };
      } else if (prop === 'commit') {
        return (stateKey: string, value: unknown) =>
          ((store as any)[stateKey] = value);
      } else {
        return (target as any)[prop];
      }
    },
    set(target, prop: string, value) {
      const subscriptions = (target as any)[`___${prop}$`] as
        | undefined
        | Map<symbol, StoreCallback<unknown>>;
      // set value
      const currentValue = (target as any)[prop];
      const oldValue = !options.preserveOldValue
        ? currentValue
        : !(currentValue instanceof Object)
          ? currentValue
          : structuredClone(currentValue);
      (target as any)[prop] = value;
      // notify subscribers
      subscriptions?.forEach(callback => callback(value, oldValue));
      // success
      return true;
    },
  }) as Store<States>;
  return store;
}
