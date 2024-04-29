import {HashEncoding, sha256} from '../../crypto/utils/sha-256.js';

export function deduplicateCallback<Target extends (...params: any[]) => any>(
  target: Target
): Target {
  const registry = new Map<string, string>();
  return (async (...params: any[]) => {
    const key = params[1] as string;
    const data = params[0] as any;
    // calculate new digest
    let newDigest: string | undefined;
    try {
      newDigest = await sha256(
        data instanceof Object ? JSON.stringify(data) : String(data),
        HashEncoding.Hex
      );
    } catch (error) {
      console.error(error);
    }
    // retrieve current digest
    const currentDigest = registry.get(key);
    // no change or no new digest
    if (newDigest && newDigest === currentDigest) return;
    // change detected
    if (newDigest) registry.set(key, newDigest);
    return target.apply(target, params);
  }) as Target;
}

export default deduplicateCallback;
export type DeduplicateCallbackUtil = typeof deduplicateCallback;
