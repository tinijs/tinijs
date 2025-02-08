import {ElementTypes} from '../classes/element.js';

import type {ElementOptions} from '../utils/element.js';

import {element} from './element.js';

export function layout(options?: Omit<ElementOptions, 'type'>) {
  return element({...options, type: ElementTypes.Layout});
}
