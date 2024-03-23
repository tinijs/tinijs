import {StreamContext, StreamCallback} from './create-stream.js';

export type EmitStreamValue = typeof emitStreamValue;

export function emitStreamValue<Data>(
  data: Data,
  context: StreamContext,
  callback: StreamCallback<Data>
) {
  if (!context || !callback) return;
  return callback({
    data,
    unstream: () => context.forEach(item => item.event.off()),
    context,
  });
}

export default emitStreamValue;
