import { Constructor, Token, InjectVal, DepsConfig, depsMetadata } from './declares';
import { Container } from './container';

export class BaseDIContainer {
  private services = new Map<Token, InjectVal>();
  scopeid: any;

  constructor(scopeid: Token) {
    this.scopeid = scopeid;
  }

  public registry(token: Token, val: InjectVal) {
    this.services.set(token, val);
  }

  public get<T>(token: Token): T {
    const value = this.services.get(token);
    if (value) {
      const { imp, instance } = value;
      if (instance === undefined) {
        return this.createInstance<T>(token, imp);
      }
      return instance;
    }
    throw new Error('没有获取到token的值');
  }

  public reset() {
    this.services.clear();
  }

  private createInstance<T>(key: Token, imp: Constructor): T {
    const providers = Reflect.getMetadata('design:paramtypes', imp) || [];
    const args = providers.map((provider: Constructor) => Container.get(this.scopeid, provider));
    const ins = new imp(...args);
    this.setInjectVal(imp, ins);
    this.registry(key, { imp, instance: ins });
    return ins;
  }

  private setInjectVal(imp: Function, instance: { [key: string]: any }) {
    const deps: DepsConfig[] = Reflect.getMetadata(depsMetadata, imp.prototype) || [];
    deps.forEach(dep => {
      const v = Container.get(this.scopeid, dep.typeName);
      instance[dep.propertyKey] = v;
    });
  }
}
