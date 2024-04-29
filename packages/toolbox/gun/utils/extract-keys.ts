import {extractEntries} from './extract-entries.js';

export function extractKeys(data: Record<string, unknown>) {
  return extractEntries(data).map(([key]) => key) as string[];
}

export default extractKeys;
export type ExtractKeysUtil = typeof extractKeys;
