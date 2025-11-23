import Route from './route';

export interface RouteInterface {
  render: () => void;
  match: (path: string) => boolean;
  leave: () => void;
}

class Router {
  public routes: RouteInterface[] = [];
  private static __instance: Router;
  private history!: History;
  private _currentRoute!: RouteInterface | null;
  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find(route => route.match(pathname));
    if (!route) {
      return this.routes.find(route => route.match('*'));
    }
    return route;
  }
}

export default Router;
