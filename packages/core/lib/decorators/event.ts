import {TiniComponent} from '../classes/component.js';

export class EventEmitter<Payload> {
  constructor(
    private component: TiniComponent,
    private eventName: string,
    private options?: CustomEventInit<Payload>
  ) {}

  emit(payload?: Payload, customOptions: CustomEventInit<Payload> = {}) {
    return this.component.dispatchEvent(
      new CustomEvent(this.eventName, {
        detail: payload,
        ...this.options,
        ...customOptions,
      })
    );
  }
}

export function Event(options?: CustomEventInit<unknown>) {
  return function (prototype: any, propertyName: string) {
    const emitterKey = Symbol();
    Object.defineProperty(prototype, propertyName, {
      get: function () {
        return (this[emitterKey] ||= new EventEmitter<unknown>(
          this,
          propertyName,
          options
        ));
      },
    });
  };
}

export const Output = Event;
