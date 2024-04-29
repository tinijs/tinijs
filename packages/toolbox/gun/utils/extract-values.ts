import {extractEntries} from './extract-entries.js';

export function extractValues<Value>(data: Record<string, Value>) {
  return extractEntries(data).map(([, value]) => value);
}

export default extractValues;
export type ExtractValuesUtil = typeof extractValues;
