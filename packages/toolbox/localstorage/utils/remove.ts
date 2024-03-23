import {LocalForage} from './create-local-forage.js';

export type Remove = typeof remove;

export function remove(localForage: LocalForage, key: string) {
  return localForage.removeItem(key);
}

export default remove;
