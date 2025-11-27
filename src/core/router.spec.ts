import { expect } from 'chai';
import Router from './router';
import Block from './block';

class TestBlock extends Block {
  render() {
    return '<div>Test</div>';
  }
}

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router('#app');
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should create router instance', () => {
    expect(router).to.be.an.instanceOf(Router);
  });

  it('should add route', () => {
    router.use('/test', TestBlock);
    expect(router.routes).to.have.length(1);
  });

  it('should find route by pathname', () => {
    router.use('/test', TestBlock);
    const route = router.getRoute('/test');
    expect(route).to.not.equal(undefined);
  });

  it('should return fallback route for unknown path', () => {
    router.use('*', TestBlock);
    const route = router.getRoute('/unknown');
    expect(route).to.not.equal(undefined);
  });

  it('should have go method', () => {
    expect(router.go).to.be.a('function');
  });
});
