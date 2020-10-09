import { Container } from '../core/container';
import { depsMetadata } from '../core/declares';

export function Inject(): PropertyDecorator {
  return function (target, propertyKey) {
    const typeName = Reflect.getMetadata('design:type', target, propertyKey);
    const deps = Reflect.getMetadata(depsMetadata, target) || [];
    deps.push({ propertyKey, typeName });
    Reflect.defineMetadata(depsMetadata, deps, target);
  };
}
