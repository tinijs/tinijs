import {customElement} from 'lit/decorators/custom-element.js';

import {ElementTypes} from '../classes/element.js';

import type {ElementOptions} from '../utils/element.js';

export function element(options: ElementOptions = {}) {
  return function (target: any) {
    target.elementType = options.type || ElementTypes.Element;
    target.elements = options.elements;
    target.theming = options.theming;
    return !options.name ? target : customElement(options.name)(target);
  };
}
