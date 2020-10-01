import { Container } from '../core/container';
import { ClassDecorator } from '../core/declares';

export function Service(): ClassDecorator {
  return function (target) {
    Container.registry(target);
  };
}
