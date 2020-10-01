import { Constructor } from './declares';
import { BaseDIContainer } from './di-base';

export class Container {
  private static readonly dicontainer: BaseDIContainer = new BaseDIContainer();

  static registry(itfc: Constructor) {
    this.dicontainer.registry(itfc, null);
  }

  static get<T>(itfc: Constructor): T {
    return this.dicontainer.get<T>(itfc);
  }
}
