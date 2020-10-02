import { Constructor, Token } from './declares';
import { BaseDIContainer } from './di-base';

export class Container {
  private static readonly dicontainer: BaseDIContainer = new BaseDIContainer();

  static registry(token: Constructor): void;
  static registry(token: string, instance: any): void;
  static registry(token: Constructor, instance: any): void;
  static registry(token: Token, instance?: any): void {
    this.dicontainer.registry(token, { imp: token, instance });
  }

  static get<T>(token: Token): T {
    return this.dicontainer.get<T>(token);
  }

  static clear() {
    this.dicontainer.reset();
  }
}
