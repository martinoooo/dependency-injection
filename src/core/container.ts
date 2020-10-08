import { Constructor, Token, ScopeConfig, DepsConfig } from './declares';
import { BaseDIContainer } from './di-base';

const default_container = Symbol('defalut');

export class Container {
  private static readonly dicontainer: BaseDIContainer = new BaseDIContainer(default_container);
  private static readonly scopes = new Map<Token, ScopeConfig>();
  private static readonly deps = new Map<Object, DepsConfig[]>();

  static registryScope(scopeid: Constructor, config: ScopeConfig): void {
    this.scopes.set(scopeid, config);
  }

  static registry(token: Constructor): void;
  static registry(token: string, instance: any): void;
  static registry(token: Constructor, instance: any): void;
  static registry(token: Token, instance?: any): void {
    this.dicontainer.registry(token, { imp: token, instance });
  }

  static get<T>(token: Token): T;
  static get<T>(scopeid: Constructor): T;
  static get<T>(scopeid: Constructor, token: Token): T;
  static get<T>(scopeid: Token, token?: Token): T {
    if (token && scopeid === default_container) {
      scopeid = token;
      token = undefined;
    }
    if (token) {
      // means get instance from scoped container
      const scopeConfig = this.scopes.get(scopeid);
      if (scopeConfig) {
        return scopeConfig.scope.get(token);
      }
      throw new Error('还未注册该module');
    } else {
      try {
        return this.dicontainer.get<T>(scopeid);
      } catch {
        // if not in dicontainer, that means it's not a service;
        const scopeConfig = this.scopes.get(scopeid);
        if (scopeConfig) {
          return scopeConfig.scope.get(scopeid);
        }
        throw new Error('还未注册该module');
      }
    }
  }

  static registryDeps(key: Object, val: any) {
    const v = this.deps.get(key);
    const value = (v || []).concat([val]);
    this.deps.set(key, value);
  }

  static getDeps(key: Object): DepsConfig[] {
    return this.deps.get(key) || [];
  }

  static clear() {
    this.dicontainer.reset();
  }
}
