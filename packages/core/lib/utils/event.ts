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
  const cachedTargets = new Map<string, NodeListOf<Element>>();
  forwardings.forEach(forwarding => {
    const {name, rename, keepPropagation, preventDefault, dispatchOptions} =
      forwarding;
    const customMainSelector = (elem.constructor as typeof TiniElement)
      .componentMetadata.customMainSelector as undefined | string;
    const target =
      !forwarding.target && customMainSelector
        ? customMainSelector
        : forwarding.target;
    const targetNodes = !target
      ? [renderRoot.firstElementChild]
      : typeof target !== 'string'
        ? target
        : cachedTargets.has(target)
          ? cachedTargets.get(target)
          : cachedTargets
              .set(target, renderRoot.querySelectorAll(target))
              .get(target);
    if (!targetNodes?.length) return;
    targetNodes.forEach(targetNode => {
      if (!targetNode) return;
      targetNode.addEventListener(name, (e: Event) => {
        if (!keepPropagation) e.stopPropagation();
        if (preventDefault) e.preventDefault();
        elem.dispatchEvent(
          new CustomEvent(rename || name, {
            ...dispatchOptions,
            detail: e,
          })
        );
      });
    });
  });
}
