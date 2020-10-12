import { Constructor, Token, RegistryConfig, DepsConfig, depsMetadata } from './declares';
import { Container } from './container';

export class BaseDIContainer {
  private services = new Map<Token, RegistryConfig>();
  scopeid: any;

  constructor(scopeid: Token) {
    this.scopeid = scopeid;
  }

  public registry(token: Token, val: RegistryConfig) {
    this.services.set(token, val);
  }

  public get<T>(token: Token): T {
    const value = this.services.get(token);
    if (value) {
      const { instance, transient } = value;
      if (instance === undefined || transient) {
        return this.createInstance<T>(token, value);
      }
      return instance;
    }
    throw new Error('没有获取到token的值');
  }

  public reset() {
    this.services.clear();
  }

  private createInstance<T>(token: Token, value: RegistryConfig): T {
    const { imp } = value;
    const providers = Reflect.getMetadata('design:paramtypes', imp) || [];
    const args = providers.map((provider: Constructor) => Container.get(this.scopeid, provider));
    const ins = new imp(...args);
    this.registry(token, { ...value, instance: ins });
    this.setInjectVal(imp, ins);
    return ins;
  }

  private setInjectVal(imp: Function, instance: { [key: string]: any }) {
    const deps: DepsConfig[] = Reflect.getMetadata(depsMetadata, imp.prototype) || [];
    deps.forEach(dep => {
      const v = Container.get(this.scopeid, dep.typeName());
      instance[dep.propertyKey] = v;
    });
  }
}
