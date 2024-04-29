import type {LocalForage} from './create-local-forage.js';

export function remove(localForage: LocalForage, key: string) {
  return localForage.removeItem(key);
}

export default remove;
export type RemoveUtil = typeof remove;
