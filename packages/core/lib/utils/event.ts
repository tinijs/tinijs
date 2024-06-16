import {TiniElement} from '../classes/element.js';

export interface EventForwarding {
  name: string;
  rename?: string;
  target?: string | Element[] | NodeListOf<Element>;
  keepPropagation?: boolean;
  preventDefault?: boolean;
  dispatchOptions?: Omit<CustomEventInit, 'detail'>;
}

export type EventForwardingInput = string | Array<string | EventForwarding>;

export function parseEventForwarding(input: EventForwardingInput) {
  return (
    typeof input !== 'string'
      ? input
      : input.split(',').map(item => item.trim())
  ).map(item =>
    typeof item !== 'string'
      ? item
      : !~item.indexOf(':')
        ? ({name: item} as EventForwarding)
        : (() => {
            const [name, rename] = item.split(':').map(item => item.trim());
            return {name, rename} as EventForwarding;
          })()
  );
}

export function parseAndMergeEventForwardings(
  inputs: (EventForwardingInput | undefined)[]
) {
  const forwardings: Record<string, EventForwarding> = {};
  for (const input of inputs) {
    if (!input) continue;
    for (const item of parseEventForwarding(input)) {
      forwardings[item.name] = item;
    }
  }
  return Object.values(forwardings);
}

export function forwardEvents(
  elem: TiniElement,
  forwardings: EventForwarding[]
) {
  const renderRoot = elem.shadowRoot || elem;
  const customMainSelector = (elem.constructor as typeof TiniElement)
    .componentMetadata.customMainSelector as undefined | string;
  forwardings.forEach(
    ({
      name,
      rename,
      target,
      keepPropagation,
      preventDefault,
      dispatchOptions,
    }) => {
      const customEventName = rename || name;
      const targetNodeOrNodeListOrSelector =
        !target && customMainSelector ? customMainSelector : target;
      (!targetNodeOrNodeListOrSelector
        ? [renderRoot.firstElementChild]
        : typeof targetNodeOrNodeListOrSelector !== 'string'
          ? targetNodeOrNodeListOrSelector
          : renderRoot.querySelectorAll(targetNodeOrNodeListOrSelector)
      ).forEach(targetNode => {
        const forwardedEvents = ((targetNode as any).forwardedEvents ||=
          {}) as Record<string, EventListener>;
        if (!targetNode || forwardedEvents[customEventName]) return;
        forwardedEvents[customEventName] = e => {
          if (!keepPropagation) e.stopPropagation();
          if (preventDefault) e.preventDefault();
          elem.dispatchEvent(
            new CustomEvent(customEventName, {
              ...dispatchOptions,
              detail: e,
            })
          );
        };
        targetNode.addEventListener(name, forwardedEvents[customEventName]);
      });
    }
  );
}
