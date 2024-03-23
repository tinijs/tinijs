import {ComponentTypes, ComponentOptions} from '../classes/component.js';

import {Component} from './component.js';

export function Page(options?: Omit<ComponentOptions, 'type'>) {
  return Component({...options, type: ComponentTypes.Page});
}
