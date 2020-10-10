import { Container } from '../core/container';
import { depsMetadata } from '../core/declares';

export function Inject(typeName?: () => Function): PropertyDecorator {
  return function (target, propertyKey) {
    if (!typeName) typeName = () => Reflect.getMetadata('design:type', target, propertyKey);
    const deps = Reflect.getMetadata(depsMetadata, target) || [];
    deps.push({ propertyKey, typeName });
    Reflect.defineMetadata(depsMetadata, deps, target);
  };
}
