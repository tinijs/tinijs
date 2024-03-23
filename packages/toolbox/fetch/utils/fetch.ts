export type FetchX = typeof fetchx;

export type Params = Parameters<FetchX>;
export type Method = Params[0];
export type Input = Params[1];
export type Body = Params[2];
export type Options = Params[3];
export type AdditionalOptions = Params[4];

export async function fetchx<Result>(
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  input: RequestInfo | URL,
  body?: unknown,
  options?: RequestInit,
  {
    baseUrl,
    globalHeaders = {},
  }: {
    baseUrl?: string;
    globalHeaders?: Record<string, string>;
  } = {}
): Promise<Result> {
  const headers =
    method === 'GET'
      ? globalHeaders
      : {
          'Content-Type': 'application/json',
          ...globalHeaders,
          ...options?.headers,
        };
  const response = await fetch(
    !baseUrl || typeof input !== 'string' ? input : `${baseUrl}/${input}`,
    {
      method,
      body: method === 'GET' ? undefined : JSON.stringify(body || {}),
      headers,
      credentials: 'include',
      ...options,
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new (Error as any)(`${response.statusText} (${response.status})`, {
      cause: responseBody,
    });
  }
  return responseBody;
}

export default fetchx;
