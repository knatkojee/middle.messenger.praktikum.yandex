// Базовые типы
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type QueryParams = Record<string, unknown>;

type RequestData =
  | Record<string, unknown>
  | FormData
  | URLSearchParams
  | string
  | Blob
  | ArrayBuffer;

interface HTTPHeaders {
  [key: string]: string;
}

interface HTTPRequestOptions {
  method?: HTTPMethod;
  data?: RequestData;
  headers?: HTTPHeaders;
  timeout?: number;
}

export interface HTTPResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: string;
}

export interface GetOptions extends Omit<HTTPRequestOptions, 'method' | 'data'> {
  data?: QueryParams;
}

export type PostOptions = Omit<HTTPRequestOptions, 'method'>;
export type PutOptions = Omit<HTTPRequestOptions, 'method'>;
export type PatchOptions = Omit<HTTPRequestOptions, 'method'>;
export type DeleteOptions = Omit<HTTPRequestOptions, 'method' | 'data'>;

export interface HTTPError extends Error {
  status?: number;
  method?: string;
  url?: string;
  data?: { reason: string };
}

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  MultipleChoices = 300,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}

export class HTTPTransport {
  private readonly baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  public async request<T = unknown>(
    url: string,
    options: HTTPRequestOptions = {}
  ): Promise<HTTPResponse<T>> {
    const { method = 'GET', data = null, headers = {}, timeout = 5000 } = options;

    return new Promise<HTTPResponse<T>>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const fullURL = this.baseURL + url;

      xhr.open(method, fullURL);

      xhr.withCredentials = true;

      Object.keys(headers).forEach((key: string) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;
      xhr.responseType = 'json';

      xhr.onload = (): void => {
        if (xhr.status >= HttpStatus.Ok && xhr.status < HttpStatus.MultipleChoices) {
          const response: HTTPResponse<T> = {
            data: xhr.response as T,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
          };
          resolve(response);
        } else {
          const error: HTTPError = new Error(
            `Request failed with status ${xhr.status}: ${xhr.statusText}`
          );
          error.status = xhr.status;
          error.method = method;
          error.url = fullURL;
          error.data = xhr.response;
          reject(error);
        }
      };

      xhr.onerror = (): void => {
        const error: HTTPError = new Error('Network error');
        error.method = method;
        error.url = fullURL;
        reject(error);
      };

      xhr.ontimeout = (): void => {
        const error: HTTPError = new Error(`Request timeout after ${timeout}ms`);
        error.method = method;
        error.url = fullURL;
        reject(error);
      };

      this.sendRequestData(xhr, method, data, headers);
    });
  }

  public get<T = unknown>(url: string, options: GetOptions = {}): Promise<HTTPResponse<T>> {
    let fullURL: string = url;

    if (options.data) {
      const queryString: string = this.objectToQueryString(options.data);
      if (queryString) {
        fullURL += (url.includes('?') ? '&' : '?') + queryString;
      }
      // Удаляем data из options, чтобы не отправлять в теле
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, ...restOptions }: { data?: QueryParams } & Omit<GetOptions, 'data'> = options;
      return this.request<T>(fullURL, { ...restOptions, method: 'GET' });
    }

    return this.request<T>(fullURL, { ...options, method: 'GET' });
  }

  public post<T = unknown>(
    url: string,
    data?: RequestData,
    options: Omit<PostOptions, 'data'> = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>(url, { ...options, method: 'POST', data });
  }

  public put<T = unknown>(
    url: string,
    data?: RequestData,
    options: Omit<PutOptions, 'data'> = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>(url, { ...options, method: 'PUT', data });
  }

  public patch<T = unknown>(
    url: string,
    data?: RequestData,
    options: Omit<PatchOptions, 'data'> = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>(url, { ...options, method: 'PATCH', data });
  }

  public delete<T = unknown>(
    url: string,
    data?: RequestData,
    options: DeleteOptions = {}
  ): Promise<HTTPResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE', data });
  }

  private sendRequestData(
    xhr: XMLHttpRequest,
    method: HTTPMethod,
    data: RequestData | null,
    headers: HTTPHeaders
  ): void {
    if (data && method !== 'GET') {
      if (this.isJSONData(data, headers)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else if (data instanceof FormData || data instanceof URLSearchParams) {
        xhr.send(data as FormData | URLSearchParams);
      } else if (typeof data === 'string' || data instanceof Blob || data instanceof ArrayBuffer) {
        xhr.send(data);
      } else {
        xhr.send(this.objectToFormData(data as Record<string, unknown>));
      }
    } else {
      xhr.send();
    }
  }

  private isJSONData(data: RequestData, headers: HTTPHeaders): boolean {
    const contentType: string | undefined = headers['Content-Type'];
    if (contentType === 'application/json') {
      return true;
    }

    return (
      !contentType &&
      typeof data === 'object' &&
      !(data instanceof FormData) &&
      !(data instanceof URLSearchParams) &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    );
  }

  private objectToQueryString(obj: QueryParams): string {
    const params: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) {
        continue;
      }

      const encodedKey: string = encodeURIComponent(key);

      if (Array.isArray(value)) {
        params.push(`${encodedKey}=${encodeURIComponent(value.join(','))}`);
      } else if (typeof value === 'object') {
        params.push(`${encodedKey}=${encodeURIComponent('[object Object]')}`);
      } else {
        params.push(`${encodedKey}=${encodeURIComponent(String(value))}`);
      }
    }

    return params.join('&');
  }

  private objectToFormData(obj: Record<string, unknown>): FormData {
    const formData: FormData = new FormData();

    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) {
        continue;
      }

      if (Array.isArray(value)) {
        formData.append(key, value.join(','));
      } else if (
        typeof value === 'object' &&
        !(value instanceof File) &&
        !(value instanceof Blob)
      ) {
        formData.append(key, '[object Object]');
      } else {
        formData.append(key, value as string | Blob | File);
      }
    }

    return formData;
  }
}
