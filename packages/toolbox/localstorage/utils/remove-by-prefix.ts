import {LocalForage} from './create-local-forage.js';

export type RemoveByPrefix = typeof removeByPrefix;

export async function removeByPrefix(localForage: LocalForage, prefix: string) {
  const _keys = await localForage.keys();
  for (let i = 0; i < _keys.length; i++) {
    if (_keys[i].substring(0, prefix.length) === prefix) {
      await localForage.removeItem(_keys[i]);
    }
  }
}

export default removeByPrefix;
