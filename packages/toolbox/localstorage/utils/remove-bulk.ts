import type {LocalForage} from './create-local-forage.js';

export async function removeBulk(localForage: LocalForage, keys: string[]) {
  for (let i = 0; i < keys.length; i++) {
    await localForage.removeItem(keys[i]);
  }
}

export default removeBulk;
export type RemoveBulkUtil = typeof removeBulk;
