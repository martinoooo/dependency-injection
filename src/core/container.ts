import { Constructor, Token } from './declares';
import { BaseDIContainer } from './di-base';

export class Container {
  private static readonly dicontainer: BaseDIContainer = new BaseDIContainer();

  static registry<T>(itfc: Token<T>, value?: any): void {
    this.dicontainer.registry(itfc, value);
  }

  static get<T>(itfc: Constructor): T {
    return this.dicontainer.get<T>(itfc);
  }

  static clear() {
    this.dicontainer.reset();
  }
}
