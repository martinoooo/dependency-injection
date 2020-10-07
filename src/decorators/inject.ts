import { Container } from '../core/container';

export function Inject(): PropertyDecorator {
  return function (target, propertyKey) {
    const token = Reflect.getMetadata('design:type', target, propertyKey);
    console.log(token);

    // try {
    //   Container.get(token);
    // } catch {
    //   Container.registry(token);
    // }
  };
}
