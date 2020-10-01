import 'reflect-metadata';

export { Container } from './core/container';
export { Service } from './decorators/service';

// @Reflect.metadata('inClass', 'A')
// class Test {
//   @Reflect.metadata('inMethod', 'B')
//   public hello(): string {
//     return 'hello world';
//   }
// }

// console.log(Reflect.getMetadata('inClass', Test)); // 'A'
// console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'

// function Prop(): PropertyDecorator {
//   return (target, key: string| symbol) => {
//     const type = Reflect.getMetadata('design:type', target, key);
//     console.log(`${String(key)} type: ${type.name}`);
//     // other...
//   };
// }

// class SomeClass {
//   @Prop()
//   public Aprop!: string;
// }

// function classDecorator(): ClassDecorator {
//   return target => {
//     // 在类上定义元数据，key 为 `classMetaData`，value 为 `a`
//     Reflect.defineMetadata('classMetaData', 'a', target);
//   };
// }

// function methodDecorator(): MethodDecorator {
//   return (target, key, descriptor) => {
//     // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
//     Reflect.defineMetadata('methodMetaData', 'b', target, key);
//   };
// }

// @classDecorator()
// class SomeClass {
//   @methodDecorator()
//   someMethod() {}
// }

// console.log(Reflect.getMetadata('classMetaData', SomeClass)); // 'a'
// console.log(Reflect.getMetadata('methodMetaData', new SomeClass(), 'someMethod')); // 'b'

// const METHOD_METADATA = 'method';
// const PATH_METADATA = 'path';

// const Controller = (path: string): ClassDecorator => {
//   return target => {
//     Reflect.defineMetadata(PATH_METADATA, path, target);
//   }
// }

// const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
//   return (target, key, descriptor) => {
//     Reflect.defineMetadata(PATH_METADATA, path, descriptor.value as any);
//     Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value as any);
//   }
// }

// const Get = createMappingDecorator('GET');
// const Post = createMappingDecorator('POST');

// @Controller('/test')
// class SomeClass {
//   @Get('/a')
//   someGetMethod() {
//     return 'hello world';
//   }

//   @Post('/b')
//   somePostMethod() {}
// }

// function mapRoute(instance: Object) {
//   const prototype = Object.getPrototypeOf(instance);

//   // 筛选出类的 methodName
//   const methodsNames = Object.getOwnPropertyNames(prototype)
//                               .filter(item => !isConstructor(item) && isFunction(prototype[item]));
//   return methodsNames.map(methodName => {
//     const fn = prototype[methodName];

//     // 取出定义的 metadata
//     const route = Reflect.getMetadata(PATH_METADATA, fn);
//     const method = Reflect.getMetadata(METHOD_METADATA, fn);
//     return {
//       route,
//       method,
//       fn,
//       methodName
//     }
//   })
// };

// Reflect.getMetadata(PATH_METADATA, SomeClass); // '/test'

// console.log(mapRoute(new SomeClass()));

// function isConstructor(item: any) {
//   return false
// }

// function isFunction(item: any) {
//   return true
// }
