export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete'
}
type Options = {
  method: Method;
  data?: any;
};
type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>

function queryStringify(data: Record<string, any>) {
  return Object.entries(data).map(([key, value]) => key + '=' + value).join('&');
}

export default class HTTPTransport {
  get: HTTPMethod = (url, options = { method: Method.Get }) => {
    if (options.data) {
      url += '?' + queryStringify(options.data);
      options.data = {};
    }
    return this.request(url, { ...options, method: Method.Get });
  }

  post: HTTPMethod = (url, options = { method: Method.Post }) => {
    return this.request(url, options);
  }

  put: HTTPMethod = (url, options = { method: Method.Put }) => {
    return this.request(url, options);
  }

  delete: HTTPMethod = (url, options = { method: Method.Delete }) => {
    return this.request(url, options);
  }

  request(url: string, options: Options = { method: Method.Get }): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;

      xhr.onload = function () {
        const { status, response } = xhr;
        if (status === 200 || status === 201) {
          return resolve(JSON.parse(response));
        }
        return reject(JSON.parse(response));
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
