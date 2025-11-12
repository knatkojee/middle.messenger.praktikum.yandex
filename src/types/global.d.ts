import type Router from '../core/router';
import type { Store, StoreProps } from '../core/store';

export {};

declare global {
  interface Window {
    store: Store<StoreProps>;
    router: Router;
  }
}
