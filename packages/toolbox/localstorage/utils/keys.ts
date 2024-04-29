import type {LocalForage} from './create-local-forage.js';

export function keys(localForage: LocalForage) {
  return localForage.keys();
}

export default keys;
export type KeysUtil = typeof keys;
