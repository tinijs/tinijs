import {
  fetch_,
  type Input,
  type Options,
  type AdditionalOptions,
} from './fetch.js';

export function get<Result>(
  input: Input,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetch_<Result>('GET', input, undefined, options);
}

export default get;
export type GetUtil = typeof get;
