+++json
{
  "status": "publish",
  "title": "Lifecycle Hooks",
  "category": "core"
}
+++

Custom elements created by extending `HTMLElement` as well as `LitElement` have their **lifecycle hooks** for tapping into when needed, please see <https://lit.dev/docs/elements/lifecycle/> for more detail.

There are some other hooks supported by `TiniElement`, includes: **OnCreate, OnDestroy, OnChanges, OnFirstRender, OnRenders, OnInit, OnReady, OnChildrenRender, OnChildrenReady**. Here is a quick summary of them.

## OnCreate

Alias of `connectedCallback()` without the need of calling `super.connectedCallback()`. The very beginning of a element, the element has got connected to the DOM ([more detail](https://lit.dev/docs/elements/lifecycle/#connectedcallback)).

```ts
import {type OnCreate} from '@tinijs/core';

export class Something extends TiniElement implements OnCreate {
  onCreate() {}
}
```

## OnDestroy

Alias of `disconnectedCallback()` without the need of calling `super.disconnectedCallback()`. The end of an element, got removed from the DOM ([more detail](https://lit.dev/docs/elements/lifecycle/#disconnectedcallback)). 

```ts
import {type OnDestroy} from '@tinijs/core';

export class Something extends TiniElement implements OnDestroy {
  onDestroy() {}
}
```

## OnChanges

Alias of `willUpdate()` of LitElement. Used to computed values using in the `render()` ([more detail](https://lit.dev/docs/elements/lifecycle/#willupdate)).

```ts
import {type OnChanges} from '@tinijs/core';

export class Something extends TiniElement implements OnChanges {
  onChanges() {}
}
```

## OnFirstRender

Alias of `firstUpdated()` of LitElement. The `render()` has run the first time ([more detail](https://lit.dev/docs/elements/lifecycle/#firstupdated)).

```ts
import {type OnFirstRender} from '@tinijs/core';

export class Something extends TiniElement implements OnFirstRender {
  onFirstRender() {}
}
```

## OnRenders

Alias of `updated()` of LitElement. Changes has been updated and rendered ([more detail](https://lit.dev/docs/elements/lifecycle/#updated)).

```ts
import {type OnRenders} from '@tinijs/core';

export class Something extends TiniElement implements OnRenders {
  onRenders() {}
}
```

## OnInit

Can be used in interchangeable with `OnCreate`. When use with Lazy DI injection, injected dependencies available starting from `onInit()`, usually used to handle async tasks.

```ts
import {type OnInit} from '@tinijs/core';

export class Something extends TiniElement implements OnInit {
  async onInit() {}
}
```

## OnReady

Similar to `OnFirstRender` but it only counts after any async tasks in `OnInit` has been resolved and render (first stateful render).

```ts
import {type OnReady} from '@tinijs/core';

export class Something extends TiniElement implements OnReady {
  async onReady() {}
}
```
