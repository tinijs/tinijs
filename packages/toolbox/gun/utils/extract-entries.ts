export function extractEntries<Value>(data: Record<string, Value>) {
  return Object.entries<Value>(data).filter(([key]) => key && key !== '_');
}

export default extractEntries;
export type ExtractEntriesUtil = typeof extractEntries;
