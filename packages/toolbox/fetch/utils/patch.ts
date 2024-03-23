import {fetchx, Input, Options, AdditionalOptions} from './fetch.js';

export type Patch = typeof patch;

export function patch<Result>(
  input: Input,
  body?: Body,
  options?: Options,
  additionalOptions?: AdditionalOptions
) {
  return fetchx<Result>('PATCH', input, body, options);
}

export default patch;
