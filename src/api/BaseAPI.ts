import HTTPTransport from '../utils/HTTPTransport';

export default class BaseAPI {
  protected http: HTTPTransport;

    protected constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }

  create?(data: unknown) { throw new Error('Not implemented'); }

  request?(identifier?: string) { throw new Error('Not implemented'); }

  update?(identifier: string) { throw new Error('Not implemented'); }

  delete?(identifier: string) { throw new Error('Not implemented'); }
}
