import {LocalForage} from './create-local-forage.js';

export type GetBulk = typeof getBulk;

export async function getBulk<Result>(
  localForage: LocalForage,
  keys: string[]
) {
  const result = [] as unknown[];
  for (let i = 0; i < keys.length; i++) {
    const value = await localForage.getItem(keys[i]);
    result.push(value);
  }
  return result as unknown as Promise<Result>;
}

export default getBulk;
