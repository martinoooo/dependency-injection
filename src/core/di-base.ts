import { Constructor, Token, RegistryConfig, DepsConfig, depsMetadata, Scope } from './declares';
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
      const { instance } = value;
      if (instance === undefined) {
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
    const { imp, scope } = value;
    const providers = Reflect.getMetadata('design:paramtypes', imp) || [];
    const args = this.initializeParams(imp, providers);
    const ins = new imp(...args);
    if (scope !== Scope.TRANSIENT) {
      this.registry(token, { ...value, instance: ins });
    }
    this.setInjectVal(imp, ins);
    return ins;
  }

  private initializeParams(imp: Function, providers: any[]) {
    const deps: DepsConfig[] = Reflect.getMetadata(depsMetadata, imp) || [];
    return providers.map((provider: Constructor, index) => {
      const paramDep = deps.find(dep => dep.index === index);
      if (paramDep && paramDep.typeName()) return Container.get(this.scopeid, paramDep.typeName());
      return Container.get(this.scopeid, provider);
    });
  }

  private setInjectVal(imp: Function, instance: { [key: string]: any }) {
    const deps: DepsConfig[] = Reflect.getMetadata(depsMetadata, imp.prototype) || [];
    deps.forEach(dep => {
      if (dep.propertyKey) {
        const v = Container.get(this.scopeid, dep.typeName());
        instance[dep.propertyKey] = v;
      }
    });
  }
}
