import type Router from '../core/router';
import type { Store } from '../core/store';

export {};

declare global {
  interface Window {
    store: Store;
    router: Router;
  }
}
