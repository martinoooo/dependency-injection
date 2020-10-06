import { Container } from '../core/container';

export function Inject(): PropertyDecorator {
  return function (target, propertyKey) {
    console.log(target);
    const token = Reflect.getMetadata('design:type', target, propertyKey);

    try {
      Container.get(token);
    } catch {
      Container.registry(token);
    }
  };
}
