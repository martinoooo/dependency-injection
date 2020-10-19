import { Constructor, Token, ScopeConfig, defaultContainer, RegistryConfig, ModuleConfig } from './declares';
import { BaseDIContainer } from './di-base';

export class Container {
  private static readonly dicontainer: BaseDIContainer = new BaseDIContainer(defaultContainer);
  private static readonly scopes = new Map<Token, ScopeConfig>();

  static registryScope(config: ModuleConfig) {
    const { providers = [], token, imp } = config;
    if (!token) return;
    const scope = new BaseDIContainer(token);
    [...providers, imp].forEach(item => {
      scope.registry(item, { imp: item, instance: undefined });
    });
    this.scopes.set(token, {
      scope,
      providers,
    });
  }

  static registry(token: Token, injectval?: RegistryConfig | Function): void {
    if (injectval) {
      if (typeof injectval === 'function') {
        this.dicontainer.registry(token, { imp: injectval });
      } else {
        this.dicontainer.registry(token, injectval);
      }
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
        // if not in dicontainer, that means it's not a service, it'a a module;
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
