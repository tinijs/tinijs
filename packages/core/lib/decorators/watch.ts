import {ReactiveController, ReactiveControllerHost} from 'lit';

export type Watcher = Watching['watch'];
export type WatchableHandler<Value> = (
  callback: WatchableCallback<Value>
) => Unwatch;
export type WatchableCallback<Value> = (
  newValue: Value,
  oldValue: Value
) => void;
export type Unwatch = () => void;

export class Watching implements ReactiveController {
  unwatches: Unwatch[] = [];

  constructor(host: ReactiveControllerHost) {
    host.addController(this);
  }

  watch(...unwatches: Unwatch[]) {
    if (unwatches.length) this.unwatches.push(...unwatches);
    return this;
  }

  hostDisconnected() {
    this.unwatches.forEach(unwatch => unwatch());
    this.unwatches = [];
  }
}

export function Watchable(handlerName?: string, skipInitial?: boolean) {
  return function (prototype: any, propertyName: string) {
    const valueKey = `___${propertyName}`;
    const handlerKey = handlerName || `${propertyName}Changes`;
    const callbacks: Map<symbol, WatchableCallback<unknown>> = new Map();
    Object.defineProperty(prototype, valueKey, {
      value: prototype[propertyName],
      writable: true,
    });
    Object.defineProperty(prototype, handlerKey, {
      value: (callback: WatchableCallback<unknown>) => {
        // initial
        const currentVal = prototype[valueKey];
        if (!skipInitial && currentVal !== undefined) {
          callback(currentVal, undefined);
        }
        // add callback & return unwatch
        const callbackId = Symbol();
        callbacks.set(callbackId, callback);
        return () => callbacks.delete(callbackId);
      },
    });
    Object.defineProperty(prototype, propertyName, {
      get: () => prototype[valueKey],
      set: newValue => {
        let oldValue = prototype[valueKey];
        oldValue =
          !oldValue || typeof oldValue !== 'object'
            ? oldValue
            : JSON.parse(JSON.stringify(oldValue));
        prototype[valueKey] = newValue;
        callbacks.forEach(callback => callback?.(newValue, oldValue));
      },
    });
  };
}

export function Watch() {
  return function (prototype: any, propertyName: string) {
    const watcherKey = Symbol();
    Object.defineProperty(prototype, propertyName, {
      get: function () {
        const watching = (this[watcherKey] ||= new Watching(this)) as Watching;
        return watching.watch.bind(watching);
      },
    });
  };
}
