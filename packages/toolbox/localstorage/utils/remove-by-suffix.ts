import {LocalForage} from './create-local-forage.js';

export type RemoveBySuffix = typeof removeBySuffix;

export async function removeBySuffix(localForage: LocalForage, suffix: string) {
  const _keys = await localForage.keys();
  for (let i = 0; i < _keys.length; i++) {
    if (_keys[i].substring(-suffix.length) === suffix) {
      await localForage.removeItem(_keys[i]);
    }
  }
}

export default removeBySuffix;
