import { Constructor, Token, ScopeConfig, ModuleConfig } from './declares';
import { BaseDIContainer } from './di-base';

export class Container {
  private static readonly dicontainer: BaseDIContainer = new BaseDIContainer();
  private static readonly scopes = new Map<Token, ScopeConfig>();

  static registryScope(token: Constructor, config: ScopeConfig): void {
    this.scopes.set(token, config);
  }

  static registry(token: Constructor): void;
  static registry(token: string, instance: any): void;
  static registry(token: Constructor, instance: any): void;
  static registry(token: Token, instance?: any): void {
    this.dicontainer.registry(token, { imp: token, instance });
  }

  // static get<T>(scopeid: any, token: Token): T;
  static get<T>(token: Token): T {
    return this.dicontainer.get<T>(token);
  }

  static clear() {
    this.dicontainer.reset();
  }
}
