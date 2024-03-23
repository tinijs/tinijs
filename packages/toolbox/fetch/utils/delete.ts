import {fetchx, Input, Options, AdditionalOptions} from './fetch.js';

export type DeleteX = typeof deletex;

export function deletex<Result>(
  input: Input,
  body?: Body,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetchx<Result>('DELETE', input, body, options);
}

export default deletex;
