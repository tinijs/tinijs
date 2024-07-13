import {TiniElement, ElementParts} from '../classes/element.js';

export interface EventForwarding {
  name: string;
  rename?: string;
  target?: string | Element[] | NodeListOf<Element>;
  keepPropagation?: boolean;
  preventDefault?: boolean;
  dispatchOptions?: Omit<CustomEventInit<unknown>, 'detail'>;
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
      const elementsOrSelector =
        !target && customMainSelector ? customMainSelector : target;
      (!elementsOrSelector
        ? [renderRoot.querySelector(`[part='${ElementParts.Main}']`)]
        : typeof elementsOrSelector !== 'string'
          ? elementsOrSelector
          : renderRoot.querySelectorAll(elementsOrSelector)
      ).forEach(targetNode => {
        const forwardedEvents = ((targetNode as any).forwardedEvents ||=
          {}) as Record<string, EventListener>;
        if (!targetNode || forwardedEvents[customEventName]) return;
        forwardedEvents[customEventName] = e => {
          if (!keepPropagation) e.stopPropagation();
          if (preventDefault) e.preventDefault();
          elem.emitEvent(customEventName, e, dispatchOptions);
        };
        targetNode.addEventListener(name, forwardedEvents[customEventName]);
      });
    }
  );
}
