import { Container } from '../core/container';
import { ClassDecorator, ServiceConfig } from '../core/declares';

export function Service(config?: ServiceConfig): ClassDecorator {
  return function (target) {
    const { token, transient} = config || {};
    Container.registry(token || target, { imp: target, instance: undefined, transient });
  };
}
