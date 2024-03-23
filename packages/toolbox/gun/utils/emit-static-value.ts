import {StreamCallback, StreamContextEntry} from './create-stream.js';

export type EmitStaticValue = typeof emitStaticValue;

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
