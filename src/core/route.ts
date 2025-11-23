import Block from './block';
import type { RouteInterface } from './router';

interface BlockConstructable<P = unknown> {
  new (props: P): Block;
}

class Route implements RouteInterface {
  private _blockClass: BlockConstructable;
  private _block: Block | null;
  private _pathname: string;
  private _props: { rootQuery: string };

  constructor(pathname: string, view: BlockConstructable, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      // this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  _renderDom(query: string, block: Block) {
    const root = document.querySelector(query);
    if (root) {
      root.innerHTML = '';
      const content = block.getContent();
      if (content) {
        root.append(content);
      }
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
    }

    // this._block.show();
    this._renderDom(this._props.rootQuery, this._block);
    this._block.componentDidMount({});
  }
}

export default Route;
