+++json
{
  "status": "publish",
  "order": 3,
  "title": "Handle States",
  "category": "core"
}
+++

By default, class properties changes won't trigger the UI changes. In order to trigger `render()` every time a value changes you must implicitly define a state, states can either be local or global.

## Local states

The properties defined using `@property()` or `@Input()` as we see above are already local states which means changing those properties will trigger `render()`.

To define local states but not in the form of property, use the `@state()` or `@Reactive()`.

```ts
import {state} from 'lit/decorators/state.js';
import {Reactive} from '@tinijs/core';

@Component()
export class AppXXXComponent extends TiniComponent {

  // Lit syntax
  @state() state1?: string;

  // or, TiniJS syntax
  @Reactive() state2: number = 123;

  protected render() {
    return html`
      <div>${this.state1}</div>
      <div>${this.state2}</div>
    `;
  }
}
```

## Global states

States can also be organized in some central places (aka. stores). You can use [Tini Store](https://github.com/tinijs/tinijs/tree/main/packages/store) (_very simple, ~50 lines_) or other state management solutions such as [MobX](https://mobx.js.org/), [TinyX](https://github.com/dmaevsky/tinyx), ...

Getting started with **Tini Store** by install `npm i @tinijs/store`. Then create a store:

```ts
import {createStore} from '@tinijs/store';

export const mainStore = createStore({
  foo: 'bar'
});
```

After creating a store, you now can **access its states**, **subscribe to state changes** and **mutate states**.

```ts
import {Subscribe} from '@tinijs/store';

import {mainStore} from './stores/main.js';

/*
 * Access states
 */

const foo = mainStore.foo;

/*
 * Mutate states
 */

// assign a new value
mainStore.foo = 'bar2';

// or, using the 'commit' method
mainStore.commit('foo', 'bar3');

/*
 * Subscribe to state changes
 */

@Component()
export class AppXXXComponent extends TiniComponent {

  // Use the @Subscribe() decorator
  // this.foo will be updated when mainStore.foo changes it is reactive by default
  @Subscribe(mainStore) foo = mainStore.foo;

  // use a different variable name
  @Subscribe(mainStore, 'foo') xyz = mainStore.foo;

  // to turn of reactive, set the third argument to false
  @Subscribe(mainStore, null, false) foo = mainStore.foo;

  // Or, subscribe and unsubscribe manually
  onInit() {
    this.unsubscribeFoo = mainStore.subscribe('foo', value => {
      // do something with the new value
    });
  }
  // NOTE: remember to unsubscribe when the component is destroyed
  onDestroy() {
    this.unsubscribeFoo();
  }

}
```

## Use Signals

Another method for managing states is using **Signals**. Signals are an easy way to create shared observable state, state that many elements can use and update when it changes. Please see more detail at <https://www.npmjs.com/package/@lit-labs/preact-signals>.
