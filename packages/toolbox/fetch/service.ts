import {
  fetchx,
  type Method,
  type Input,
  type Body,
  type Options,
} from './utils/fetch.js';

export class FetchService {
  private globalHeaders: Record<string, string> = {};

  constructor(readonly baseUrl: string) {}

  registerGlobalHeaders(headers: Record<string, string>) {
    this.globalHeaders = {...this.globalHeaders, ...headers};
    return this as FetchService;
  }

  get<Result>(input: Input, options?: Options) {
    return this.fetch<Result>('GET', input, undefined, options);
  }

  post<Result>(input: Input, body?: Body, options?: Options) {
    return this.fetch<Result>('POST', input, body, options);
  }

  patch<Result>(input: Input, body?: Body, options?: Options) {
    return this.fetch<Result>('PATCH', input, body, options);
  }

  put<Result>(input: Input, body?: Body, options?: Options) {
    return this.fetch<Result>('PUT', input, body, options);
  }

  delete<Result>(input: Input, body?: Body, options?: Options) {
    return this.fetch<Result>('DELETE', input, body, options);
  }

  fetch<Result>(method: Method, input: Input, body?: Body, options?: Options) {
    return fetchx<Result>(method, input, body, options, {
      baseUrl: this.baseUrl,
      globalHeaders: this.globalHeaders,
    });
  }
}

export default FetchService;
