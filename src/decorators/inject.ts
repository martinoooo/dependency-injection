import { Container } from '../core/container';

export function Inject(): PropertyDecorator {
  return function (target, propertyKey) {
    const typeName = Reflect.getMetadata('design:type', target, propertyKey);
    Container.registryDeps(target.constructor, { propertyKey, typeName });
    //   {
    //   object: target,
    //   propertyName: propertyName,
    //   index: index,
    //   value: containerInstance => {
    //     let identifier: any;
    //     if (typeof typeOrName === 'string') {
    //       identifier = typeOrName;
    //     } else if (typeOrName instanceof Token) {
    //       identifier = typeOrName;
    //     } else {
    //       identifier = typeOrName();
    //     }

    //     if (identifier === Object) throw new CannotInjectError(target, propertyName);

    //     return containerInstance.get<any>(identifier);
    //   },
    // }
    // ();
    // try {
    //   Container.get(token);
    // } catch {
    //   Container.registry(token);
    // }
  };
}
