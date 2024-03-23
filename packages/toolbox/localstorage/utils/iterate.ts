import {LocalForage} from './create-local-forage.js';

export type Iterate = typeof iterate;

export type LocalstorageIterateHandler<Data> = (
  value: Data,
  key: string,
  iterationNumber: number
) => Promise<unknown>;

export function iterate<Data>(
  localForage: LocalForage,
  handler: LocalstorageIterateHandler<Data>
) {
  return localForage.iterate(handler);
}

export default iterate;
