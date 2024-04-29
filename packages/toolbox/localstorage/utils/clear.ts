import type {LocalForage} from './create-local-forage.js';

export function clear(localForage: LocalForage) {
  return localForage.clear();
}

export type ClearUtil = typeof clear;
export default clear;
