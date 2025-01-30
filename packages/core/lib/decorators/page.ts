import {ComponentTypes, type ComponentOptions} from '../classes/component.js';

import {component} from './component.js';

export function page(options?: Omit<ComponentOptions, 'type'>) {
  return component({...options, type: ComponentTypes.Page});
}
