import {
  fetchx,
  type Input,
  type Options,
  type AdditionalOptions,
} from './fetch.js';

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
