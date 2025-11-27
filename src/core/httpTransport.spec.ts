import { expect } from 'chai';
import { HTTPTransport } from './httpTransport.js';

describe('HTTPTransport', () => {
  let transport: HTTPTransport;

  beforeEach(() => {
    transport = new HTTPTransport('https://api.test.com');
  });

  it('should create transport instance', () => {
    expect(transport).to.be.instanceOf(HTTPTransport);
  });

  it('should have post method', () => {
    expect(transport.post).to.be.a('function');
  });

  it('should have put method', () => {
    expect(transport.put).to.be.a('function');
  });

  it('should have patch method', () => {
    expect(transport.patch).to.be.a('function');
  });

  it('should have delete method', () => {
    expect(transport.delete).to.be.a('function');
  });

  it('should have get method', () => {
    expect(transport.get).to.be.a('function');
  });

  it('should return promise from request methods', () => {
    const postPromise = transport.post('/test', { data: 'test' });
    const getPromise = transport.get('/test');
    
    expect(postPromise).to.be.an.instanceOf(Promise);
    expect(getPromise).to.be.an.instanceOf(Promise);
  });
});
