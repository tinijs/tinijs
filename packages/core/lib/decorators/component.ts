import {customElement} from 'lit/decorators/custom-element.js';

import {ComponentTypes, type ComponentOptions} from '../classes/component.js';

export function Component(options: ComponentOptions = {}) {
  return function (target: any) {
    target.componentType = options.type || ComponentTypes.Component;
    target.components = options.components;
    target.theming = options.theming;
    return !options.name ? target : customElement(options.name)(target);
  };
}
