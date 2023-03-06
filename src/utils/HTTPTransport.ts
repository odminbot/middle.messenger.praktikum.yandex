export enum Methods {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Delete = 'Delete'
}

type Options = {
  method?: Methods;
  timeout?: number;
  data?: any;
  headers?: Record<string, string>;
};

type HTTPMethod = (url: string, options: Options) => Promise<XMLHttpRequest>

export function queryStringify(data: Record<string, any>) {
  return Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
}

export class HTTPTransport {
  
  get: HTTPMethod = (url, options = {}) => {
    if (options.data) {
      url += `?${queryStringify(options.data)}`;
      options.data = {};
    }
    return this.request(url, { ...options, method: Methods.Get }, options.timeout);
  };

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.Post }, options.timeout)
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.Put }, options.timeout)
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.Delete }, options.timeout)
  );

  request(
    url: string, 
    options: Options,
    timeout = 5000,
  ): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {

      if (!method) {
        reject();
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });      

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === Methods.Get || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
