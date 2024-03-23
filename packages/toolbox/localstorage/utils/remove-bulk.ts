import {LocalForage} from './create-local-forage.js';

export type RemoveBulk = typeof removeBulk;

export async function removeBulk(localForage: LocalForage, keys: string[]) {
  for (let i = 0; i < keys.length; i++) {
    await localForage.removeItem(keys[i]);
  }
}

export default removeBulk;
