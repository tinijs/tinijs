import {LocalForage} from './create-local-forage.js';
import set from './set.js';

export type SetBulk = typeof setBulk;

export function setBulk(
  localForage: LocalForage,
  input: Record<string, unknown>
) {
  return Promise.all(
    Object.keys(input).map(key => set(localForage, key, input[key]))
  );
}

export default setBulk;
