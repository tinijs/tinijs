import {fetchx, Input, Options, AdditionalOptions} from './fetch.js';

export type Put = typeof put;

export function put<Result>(
  input: Input,
  body?: Body,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetchx<Result>('PUT', input, body, options);
}

export default put;
