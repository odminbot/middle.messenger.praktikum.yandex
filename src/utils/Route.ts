import { Block } from './Block';
import {renderDom} from './renderDom';

export default class Route {

  private _pathname: string;
  private _blockClass: any;
  private _block: Block | null;
  private _props: any;

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname:string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname:string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      if (this._block) {
        renderDom(this._props.rootQuery, this._block);
      }
    }
  }
} 
