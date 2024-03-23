import {StreamResult, StreamCallback} from './create-stream.js';

export type PromisifyStream = typeof promisifyStream;

export type ExcludeLastStreamMethodParam<T extends any[]> = T extends [
  ...infer ExcludeLastStreamMethodParam,
  any,
]
  ? ExcludeLastStreamMethodParam
  : any[];

export type ExtractStreamCallbackType<Type> = Type extends StreamCallback<
  infer Target
>
  ? Target
  : never;

export async function promisifyStream<
  Method extends (...params: any[]) => any,
  Data = ExtractStreamCallbackType<Parameters<Method>[1]>,
>(method: Method, ...params: ExcludeLastStreamMethodParam<Parameters<Method>>) {
  return new Promise<Data>(resolve =>
    method(...params, ({data, unstream}: StreamResult<Data>) => {
      unstream();
      resolve(data);
    })
  );
}

export default promisifyStream;
