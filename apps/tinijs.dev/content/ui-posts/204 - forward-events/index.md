+++json
{
  "status": "publish",
  "title": "Forward Events",
  "category": "guides"
}
+++

For components with many nested children inside the shadow DOM, depends on the individual components, some essential events will be available for listening from the host elements. But, in some situations, it is required to use less common events of some individual child elements. Event forwarding is used to forward events from children to their hosts.

Let consider an example component:

```js
class ClickMeComponent extends TiniElement {
  static readonly defaultTagName = 'click-me';

  render() {
    return html`
      <div class="main" part="main">
        <button class="button">Button</button>
      </div>
    `;
  }

}
```

- The **red** box is the boundary of the host element (the `<click-me>` tag)
- The **green** box is the boundary of the main element (the `.main` tag)
- The **blue** box is the button element (the `.button` tag)

<svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
  <rect x="-0.195" y="6.424" width="499.295" height="249.801" style="fill: rgb(251, 191, 191);" transform="matrix(1, 0, -0.000801, 1, 0.209091, -5.881307)"></rect>
  <rect x="43.817" y="37.223" width="412.484" height="174.415" style="fill: rgb(201, 250, 199);"></rect>
  <rect x="84.846" y="77.069" width="328.551" height="98.767" style="fill: rgb(148, 185, 248);"></rect>
  <text style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 28px;" x="192.542" y="176.465" transform="matrix(1.833372, 0, 0, 1.881409, -184.060974, -189.769745)">Button</text>
</svg>

To add event listeners, for example the `click` event:

```html
<click-me @click=${this.doSomething}></click-me>
```

By doing so, it will trigger the click event when clicking on any part of the component (all the `red`, `green` and `blue` boxes). But if we want to target only the main element (`green` box) or the button element (`blue` box), we can use the `events` property.

The `events` property accepts these syntax:
- **Comma separated list** of events `name,name:newName`
  - `name` if the host does not have the same event name
  - `name:newName` rename the event if the host has the same event name
- **Array of events or objects** with the below signature

```js
interface EventForwarding {
  // original event name
  name: string;
  // rename the event
  rename?: string;
  // target elements or querySelectorAll() string
  target?: string | Element[] | NodeListOf<Element>;
  // continue propagate the original event
  keepPropagation?: boolean;
  // prevent default behavior
  preventDefault?: boolean;
  // custom event options
  dispatchOptions?: Omit<CustomEventInit, 'detail'>;
}
```

## The main element

By default, if no `target` provided, then the event target will be the element with `part="main"`.

```html
<click-me
  events="click:clickMain"
  @clickMain=${
    ({detail: originalEvent}: CustomEvent<PointerEvent>) => console.log(originalEvent)
  }
></click-me>
```

Sometimes, the main element is not the `part="main"`, in that case, we can set the `componentMetadata.customMainSelector` to whatever we want to be the event target.

```js
class ClickMeComponent extends TiniElement {

  static readonly componentMetadata = {
    customMainSelector: 'any selector'
  };

}
```

## Other elements

To target any other elements, we can use the `target` option.

```html
<click-me
  .events=${[
    'click:clickMain',
    {
      name: 'click',
      rename: 'clickButton',
      target: '.button'
    }
  ]}
  @clickMain=${...}
  @clickButton=${
    ({detail: originalEvent}: CustomEvent<PointerEvent>) => console.log(originalEvent)
  }
></click-me>
```

## Pre-defined event forwarding

We can use the static `events` to pre-define event forwarding, so that we can access the additional events from any instances.

```js
class ClickMeComponent extends TiniElement {

  static readonly events = [
    'click:clickMain',
    {
      name: 'click',
      rename: 'clickButton',
      target: '.button'
    }
  ];

}
```

Later, use the additional events without the need of manual configuration.

```html
<click-me
  @clickMain=${...}
  @clickButton=${...}
></click-me>
```
