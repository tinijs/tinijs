import {
  fetch_,
  type Input,
  type Options,
  type AdditionalOptions,
} from './fetch.js';

export function delete_<Result>(
  input: Input,
  body?: Body,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetch_<Result>('DELETE', input, body, options);
}

export default delete_;
export type DeleteUtil = typeof delete_;
