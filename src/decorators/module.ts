import { Container } from '../core/container';
import { BaseDIContainer } from '../core/di-base';
import { ClassDecorator, ModuleConfig, ScopeConfig } from '../core/declares';

/**
 * 定义一个scoped的container,里面的service会被限制在该module下面
 * @param config
 */
export function Module(config: ModuleConfig): ClassDecorator {
  return function (target) {
    const { providers = [], token } = config;
    Container.registryModule({
      token: token || target,
      imp: target,
      providers,
    });
  };
}
