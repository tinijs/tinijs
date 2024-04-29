import type {LocalForage} from './create-local-forage.js';

export function get<Data>(localForage: LocalForage, key: string) {
  return localForage.getItem<Data>(key);
}

export default get;
export type GetUtil = typeof get;
