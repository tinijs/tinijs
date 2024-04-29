import {
  fetch_,
  type Input,
  type Options,
  type AdditionalOptions,
} from './fetch.js';

export function patch<Result>(
  input: Input,
  body?: Body,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetch_<Result>('PATCH', input, body, options);
}

export default patch;
export type PatchUtil = typeof patch;
