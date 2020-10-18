import { Container } from '../core/container';
import { ClassDecorator, ServiceConfig, Scope } from '../core/declares';

export function Service(config?: ServiceConfig): ClassDecorator {
  return function (target) {
    const { token, scope = Scope.DEFAULT } = config || {};
    Container.registry(token || target, { imp: target, instance: undefined, scope });
  };
}
