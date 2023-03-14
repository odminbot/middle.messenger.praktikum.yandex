import { Block } from './Block';
import Route from "./Route";

export default class Router {
  private static __instance: Router;
  private _routes: Route[] = [];
  private _currentRoute: Route | null = null;
  private _history = window.history;
    
  constructor(private readonly rootQuery:string) {
      if (Router.__instance) {
          return Router.__instance;
      }

      this._routes = [];
      Router.__instance = this;
  }

  use(pathname:string, block: typeof Block) {
      const route = new Route(pathname, block, {rootQuery: this.rootQuery});
      this._routes.push(route);
      return this;
  }

  start() {
      window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname:string) {
      const route = this.getRoute(pathname);

      if (!route) {
        this.go('/404');
        return;
      }

      if (this._currentRoute) {
          this._currentRoute.leave();
      }

      this._currentRoute = route;
      route.render();
  }

  go(pathname:string) {
    this._history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname:string) {
      return this._routes.find((route: Route) => route.match(pathname));
  }
}
