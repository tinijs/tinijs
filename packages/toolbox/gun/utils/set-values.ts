import type {IGunChain} from 'gun';

import {retry} from '../../common/utils/retry.js';
import {setValue} from './set-value.js';

export type SetValues = typeof setValues;

export async function setValues(
  chain: IGunChain<any>,
  data: Record<string, any>,
  retries = 7
): Promise<true> {
  const clonedData = retries < 7 ? data : JSON.parse(JSON.stringify(data));
  for (const [key, value] of Object.entries(clonedData)) {
    try {
      await setValue(chain, key, value);
      delete clonedData[key];
    } catch (error: any) {
      if (retries <= 0)
        throw new Error(`Failed to set values! ${error.message}`);
      return await retry(() => setValues(chain, clonedData, --retries));
    }
  }
  return true;
}

export default setValues;
