import {IGunOnEvent} from 'gun';

import {GunResult} from './create-gun-instance.js';
import {emitStaticValue} from './emit-static-value.js';
import {emitStreamValue} from './emit-stream-value.js';

export type CreateStream = typeof createStream;

export interface StreamOptions {
  timeout?: number;
}
export interface StreamContextEntry {
  raw: GunResult<unknown>;
  message: any;
  event: IGunOnEvent;
}
export type StreamContext = Map<string, StreamContextEntry>;
export interface StreamResult<Data> {
  data: Data;
  unstream: () => void;
  context: StreamContext;
}
export type StreamCallback<Data> = (result: StreamResult<Data>) => void;

export class Stream<Data> {
  resolveCount = 0;

  constructor(private callback: StreamCallback<Data>) {}

  emitValue(data: Data, context: StreamContext, success = true) {
    if (success) this.resolveCount++;
    emitStreamValue(data, context, this.callback);
    return this;
  }
}

export function createStream<Data>(
  callback: StreamCallback<Data>,
  {timeout = 5000}: StreamOptions = {}
) {
  const stream = new Stream(callback);
  // handle timeout
  if (timeout && timeout > -1) {
    setTimeout(() => {
      if (stream.resolveCount > 0 || !callback) return;
      emitStaticValue(callback);
    }, timeout);
  }
  // return stream
  return stream;
}

export default createStream;
