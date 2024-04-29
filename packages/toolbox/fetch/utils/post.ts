import {
  fetch_,
  type Input,
  type Options,
  type AdditionalOptions,
} from './fetch.js';

export function post<Result>(
  input: Input,
  body?: Body,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetch_<Result>('POST', input, body, options);
}

export default post;
export type PostUtil = typeof post;
