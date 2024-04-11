import {ComponentTypes, type ComponentOptions} from '../classes/component.js';

import {Component} from './component.js';

export function Layout(options?: Omit<ComponentOptions, 'type'>) {
  return Component({...options, type: ComponentTypes.Layout});
}
