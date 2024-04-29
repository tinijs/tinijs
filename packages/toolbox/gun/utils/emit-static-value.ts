import type {StreamCallback, StreamContextEntry} from './create-stream.js';

export function emitStaticValue<Data>(
  callback: StreamCallback<Data>,
  value?: Data
) {
  if (!callback) return;
  return callback({
    data: value ?? (null as Data),
    unstream: () => undefined,
    context: new Map<string, StreamContextEntry>(),
  });
}

export default emitStaticValue;
export type EmitStaticValueUtil = typeof emitStaticValue;
