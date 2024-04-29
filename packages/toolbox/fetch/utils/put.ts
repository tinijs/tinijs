import {
  fetch_,
  type Input,
  type Options,
  type AdditionalOptions,
} from './fetch.js';

export function put<Result>(
  input: Input,
  body?: Body,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetch_<Result>('PUT', input, body, options);
}

export default put;
export type PutUtil = typeof put;
