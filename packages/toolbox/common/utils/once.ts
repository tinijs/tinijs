export function once<Target extends (...params: any[]) => any>(
  target: Target,
  id?: string | symbol | ((...params: Parameters<Target>) => string)
): Target {
  const tracker = new Map<string | symbol, boolean>();
  const autoId = Symbol();
  return ((...params: any[]) => {
    const callId: string | symbol = !id
      ? autoId
      : typeof id !== 'function'
        ? id
        : id(...(params as Parameters<Target>));
    if (!tracker.get(callId)) {
      tracker.set(callId, true);
      target.apply(target, params);
    }
  }) as Target;
}

export default once;
export type OnceUtil = typeof once;
