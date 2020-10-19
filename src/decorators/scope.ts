import { Container } from '../core/container';
import { BaseDIContainer } from '../core/di-base';
import { ClassDecorator, ModuleConfig, ScopeConfig } from '../core/declares';

/**
 * 定义一个scoped的container,里面的service会被限制在该module下面
 * @param config
 */
export function Scope(config: ModuleConfig): ClassDecorator {
  return function (target) {
    const { providers = [], token } = config;
    Container.registryScope({
      token: token || target,
      imp: target,
      providers,
    });
  };
}
