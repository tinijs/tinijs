+++json
{
  "status": "publish",
  "title": "Properties and Events",
  "category": "core"
}
+++

Components usually has **properties** and **events** for data exchange and interaction.

## Properties

Use the decorator `@property()` to define properties.

```ts
import {property} from 'lit/decorators/property.js';

@component()
export class AppXXXComponent extends TiniComponent {

  @property() prop1?: string;
  @property() prop2?: {foo: number};
  @property() prop3?: boolean;

}
```

Passing properties to components is similar to set attributes in native HTML elements, string values as in `key="value"` and non-string as in `.key=${varOrValue}`.

```html
html`<app-xxx prop1="Lorem ipsum" .prop2={% raw %}${{ foo: 999 }}{% endraw %} prop3></app-xxx>`
```

Beside define properties, you can also use **Contexts** as a form of communicating data. Sometime certain values are required by many components in a long-nested chain of components, passing values down the whole chain (aka. prop drilling) would be very annoying. Use contexts to provide and consume such values is more efficient. Please see more detail at <https://lit.dev/docs/data/context/>.

## Events

Use the decorator `@event()` to define events.

```ts
import {event, type EventEmitter} from '@tinijs/core';

@component()
export class AppXXXComponent extends TiniComponent {

  @event() event1!: EventEmitter<string>;
  @event() event2!: EventEmitter<{ foo: number }>;

  emitEvent1() {
    this.event1.emit('Lorem ipsum');
  }

  protected render() {
    return html`<button @click=${() => this.event2.emit({ foo: 999 })}></button>`;
  }

}
```

Event payloads can be accessed via the `detail` field.

```html
html`
  <app-xxx
    @event1=${({detail: event1Payload}: CustomEvent<string>) => console.log(event1Payload)}
    @event2=${({detail: event2Payload}: CustomEvent<{ foo: number }>) => console.log(event2Payload)}
  ></app-xxx>
`
```
