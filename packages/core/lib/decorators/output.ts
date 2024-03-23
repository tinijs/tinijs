import {TiniComponent} from '../classes/component.js';

export class EventEmitter<Payload> {
  private host: TiniComponent;
  private eventName: string;

  constructor(host: TiniComponent, eventName: string) {
    this.host = host;
    this.eventName = eventName;
  }

  emit(payload?: Payload, customEventInit: CustomEventInit<Payload> = {}) {
    return this.host.dispatchEvent(
      new CustomEvent(this.eventName, {
        detail: payload,
        ...customEventInit,
      })
    );
  }
}

export function Output() {
  return function (prototype: any, propertyName: string) {
    const emitterKey = Symbol();
    Object.defineProperty(prototype, propertyName, {
      get: function () {
        return (this[emitterKey] ||= new EventEmitter<unknown>(
          this,
          propertyName
        ));
      },
    });
  };
}
