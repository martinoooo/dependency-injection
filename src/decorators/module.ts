import { Container } from '../core/container';
import { BaseDIContainer } from '../core/di-base';
import { ClassDecorator, ModuleConfig, ScopeConfig } from '../core/declares';

export function Module(config: ModuleConfig): ClassDecorator {
  return function (target) {
    const { providers = [], consumers = [] } = config;
    const scope = new BaseDIContainer(target);
    [...providers, ...consumers, target].forEach(item => {
      scope.registry(item, { imp: item, instance: undefined });
    });
    Container.registryScope(target, {
      scope,
      imp: target,
      providers,
      consumers,
    });
  };
}
