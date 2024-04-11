import {
  fetchx,
  type Input,
  type Options,
  type AdditionalOptions,
} from './fetch.js';

export type Get = typeof get;

export function get<Result>(
  input: Input,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetchx<Result>('GET', input, undefined, options);
}

export default get;
