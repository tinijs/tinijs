import {LocalForage} from './create-local-forage.js';

export type IterateKeys = typeof iterateKeys;

export type LocalstorageIterateKeysHandler = (
  key: string,
  iterationNumber: number
) => Promise<unknown>;

export async function iterateKeys(
  localForage: LocalForage,
  handler: LocalstorageIterateKeysHandler
) {
  const keys = await localForage.keys();
  for (let i = 0; i < keys.length; i++) {
    await handler(keys[i], i);
  }
}

export default iterateKeys;
