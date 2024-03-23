export function get<Result>(url: string, requestInit?: RequestInit) {
  return http<Result>(url, {...requestInit, method: 'GET'});
}

export function getText<Result>(url: string, requestInit?: RequestInit) {
  return http<Result>(url, {...requestInit, method: 'GET'}, 'text');
}

export function getFile<Result>(url: string, requestInit?: RequestInit) {
  return http<Result>(url, {...requestInit, method: 'GET'}, 'file');
}

export function post<Result>(url: string, requestInit?: RequestInit) {
  return http<Result>(url, {...requestInit, method: 'POST'});
}

export function put<Result>(url: string, requestInit?: RequestInit) {
  return http<Result>(url, {...requestInit, method: 'PUT'});
}

export function patch<Result>(url: string, requestInit?: RequestInit) {
  return http<Result>(url, {...requestInit, method: 'PATCH'});
}

export function deletex<Result>(url: string, requestInit?: RequestInit) {
  return http<Result>(url, {...requestInit, method: 'DELETE'});
}

export async function http<Result>(
  input: RequestInfo,
  requestInit?: RequestInit,
  responseType: 'text' | 'json' | 'file' = 'json'
): Promise<Result> {
  const response = await fetch(input, {
    ...requestInit,
    ...(requestInit?.method === 'GET'
      ? {}
      : {
          headers: {'Content-Type': 'application/json'},
        }),
  });
  if (!response.ok) throw new Error('Fetch failed!');
  return responseType === 'file'
    ? response.arrayBuffer()
    : responseType === 'text'
      ? response.text()
      : response.json();
}
