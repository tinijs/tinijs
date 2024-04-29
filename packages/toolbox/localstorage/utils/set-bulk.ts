import type {LocalForage} from './create-local-forage.js';
import set from './set.js';

export function setBulk(
  localForage: LocalForage,
  input: Record<string, unknown>
) {
  return Promise.all(
    Object.keys(input).map(key => set(localForage, key, input[key]))
  );
}

export default setBulk;
export type SetBulkUtil = typeof setBulk;
