import {TiniComponent} from '../classes/component.js';

export type EventOptions<Payload> = Omit<CustomEventInit<Payload>, 'detail'>;

export class EventEmitter<Payload> {
  constructor(
    private component: TiniComponent,
    private eventName: string,
    private options?: EventOptions<Payload>
  ) {}

  emit(payload?: Payload, options: EventOptions<Payload> = {}) {
    return this.component.emitEvent(this.eventName, payload, {
      ...this.options,
      ...options,
    });
  }
}

export function Event(options?: EventOptions<unknown>) {
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
