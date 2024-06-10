export function repeat(
  count: number,
  callback: (no: number) => any,
  suggestedCount: number
) {
  count = Math.round(count);
  const maxCount = suggestedCount * 3;
  const length = Math.min(count, maxCount || count);
  return Array.from({length}, (_, i) => callback(i + 1));
}
