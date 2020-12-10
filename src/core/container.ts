import { Token, ScopeConfig, defaultContainer, RegistryConfig, ModuleConfig, ObjectType } from './declares';
import { BaseDIContainer } from './di-base';

export class Container {
  private static readonly dicontainer: BaseDIContainer = new BaseDIContainer(defaultContainer);
  private static readonly scopes = new Map<Token, ScopeConfig>();

  static registryScope(config: ModuleConfig) {
    const { providers = [], token, imp } = config;
    if (!token) return;
    const scope = new BaseDIContainer(token);
    [...providers, imp].forEach(item => {
      if (typeof item === 'function') {
        scope.registry(item, { imp: item, instance: undefined });
      } else {
        const { token } = item;
        scope.registry(token, { ...item });
      }
    });
    this.scopes.set(token, {
      scope,
      // other inform
      providers,
    });
  }

  static deleteScope(token: Token) {
    this.scopes.delete(token);
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

  static get<T>(type: ObjectType<T>): T;
  static get<T>(type: Token): T;
  static get<T>(scopeid: Token, token?: ObjectType<T>): T;
  static get<T>(scopeid: Token, token?: Token): T;
  static get<T>(scopeid: Token, token?: Token): T {
    if (token && scopeid === defaultContainer) {
      scopeid = token;
      token = undefined;
    }
    if (token) {
      try {
        // means get instance from scoped container
        const scopeConfig = this.scopes.get(scopeid);
        if (scopeConfig) {
          return scopeConfig.scope.get(token);
        }
        throw new Error('还未注册该module');
      } catch {
        return this.dicontainer.get<T>(token);
      }
    } else {
      return this.dicontainer.get<T>(scopeid);
    }
  }

  static getServerConfig(token: Token) {
    return this.dicontainer.getConfig(token);
  }

  static clear() {
    this.dicontainer.reset();
    this.scopes.clear();
  }
}
