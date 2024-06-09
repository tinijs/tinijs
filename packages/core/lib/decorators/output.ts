import {TiniComponent} from '../classes/component.js';

export class EventEmitter<Payload> {
  private comp: TiniComponent;
  private eventName: string;

  constructor(comp: TiniComponent, eventName: string) {
    this.comp = comp;
    this.eventName = eventName;
  }

  emit(payload?: Payload, customEventInit: CustomEventInit<Payload> = {}) {
    return this.comp.dispatchEvent(
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
