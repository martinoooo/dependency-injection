import { Constructor, Token, ScopeConfig, defaultContainer, InjectVal } from './declares';
import { BaseDIContainer } from './di-base';

export class Container {
  private static readonly dicontainer: BaseDIContainer = new BaseDIContainer(defaultContainer);
  private static readonly scopes = new Map<Token, ScopeConfig>();

  static registryScope(scopeid: Constructor, config: ScopeConfig): void {
    this.scopes.set(scopeid, config);
  }

  static registry(token: Token, injectval?: InjectVal): void {
    if (injectval) {
      this.dicontainer.registry(token, injectval);
    } else {
      this.dicontainer.registry(token, { imp: token });
    }
  }

  static get<T>(scopeid: Token, token?: Token): T {
    if (token && scopeid === defaultContainer) {
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
        throw new Error(`还未注册该module ${scopeid}`);
      }
    }
  }

  static clear() {
    this.dicontainer.reset();
    this.scopes.clear();
  }
}
