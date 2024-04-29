import type {LocalForage} from './create-local-forage.js';

export function set<Data>(localForage: LocalForage, key: string, data: Data) {
  return localForage.setItem(key, data);
}

export default set;
export type SetUtil = typeof set;
