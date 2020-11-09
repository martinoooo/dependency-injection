# @martinoooo/dependency-injection

依赖注入 nodejs 实现

## features

- property based injection
- constructor based injection
- singleton and transient services
- support for multiple DI containers

## 安装

```bash
yarn add @martinoooo/dependency-injection reflect-metadata
```

Import the `reflect-metadata` package at the **first line** of your application:

```ts
import 'reflect-metadata';

// Your other imports and initialization code
// comes here after you imported the reflect-metadata package!
```

As a last step, you need to enable emitting decorator metadata in your Typescript config. Add these two lines to your `tsconfig.json` file under the `compilerOptions` key:

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## 接入指南

```typescript
import { Container, Inject, Service } from '@martinoooo/dependency-injection';

// 通过装饰器自动注册
@Service()
class Duck {
  bark() {
    return 'barking';
  }
}

class Con {
  // 通过装饰器进行注入
  // 可以通过constructor自动注入
  @Inject()
  duck: Duck;

  public getDuck() {
    return this.duck.bark();
  }
}

// 手动注册
Container.registry(Con);
// 获取注册过的实例
let duck = Container.get<Con>(Con);
duck.getDuck();
```
