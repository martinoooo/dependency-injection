import { Container } from '../core/container';
import { ClassDecorator, ServiceConfig } from '../core/declares';

export function Service(config?: ServiceConfig): ClassDecorator {
  return function (target) {
    const { token } = config || {};
    if (token) {
      Container.registry(token, { imp: target, instance: undefined });
    } else {
      Container.registry(target);
    }
  };
}
