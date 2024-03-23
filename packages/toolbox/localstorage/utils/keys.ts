import {LocalForage} from './create-local-forage.js';

export type Keys = typeof keys;

export function keys(localForage: LocalForage) {
  return localForage.keys();
}

export default keys;
