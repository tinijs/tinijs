import type {StreamContext, StreamCallback} from './create-stream.js';

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
export type EmitStreamValueUtil = typeof emitStreamValue;
