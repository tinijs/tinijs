import {
  fetchx,
  type Input,
  type Options,
  type AdditionalOptions,
} from './fetch.js';

export type Post = typeof post;

export function post<Result>(
  input: Input,
  body?: Body,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetchx<Result>('POST', input, body, options);
}

export default post;
