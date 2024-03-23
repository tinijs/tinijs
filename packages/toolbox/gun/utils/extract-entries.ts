export type ExtractEntries = typeof extractEntries;

export function extractEntries<Value>(data: Record<string, Value>) {
  return Object.entries<Value>(data).filter(([key]) => key && key !== '_');
}

export default extractEntries;
