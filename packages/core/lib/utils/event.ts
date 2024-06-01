import {TiniElement} from '../classes/element.js';

export interface EventForwarding {
  name: string;
  rename?: string;
  target?: string | Element[] | NodeListOf<Element>;
  keepPropagation?: boolean;
  preventDefault?: boolean;
  dispatchOptions?: Omit<CustomEventInit, 'detail'>;
}

export function forwardEvents(
  elem: TiniElement,
  events: string | Array<string | EventForwarding>
) {
  const renderRoot = elem.shadowRoot || elem;
  const cachedTargets = new Map<string, NodeListOf<Element>>();
  (typeof events !== 'string'
    ? events
    : events.split(',').map(item => item.trim())
  ).forEach(item => {
    const forwarding =
      typeof item !== 'string'
        ? item
        : !~item.indexOf(':')
          ? ({name: item} as EventForwarding)
          : (() => {
              const [name, rename] = item.split(':').map(item => item.trim());
              return {name, rename} as EventForwarding;
            })();
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
