import {LocalForage} from './create-local-forage.js';

export type Clear = typeof clear;

export function clear(localForage: LocalForage) {
  return localForage.clear();
}

export default clear;
