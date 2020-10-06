import { Constructor, Token, InjectVal } from './declares';
import { isFunction } from '../utils';

export class BaseDIContainer {
  private services = new Map<Token, InjectVal>();

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
    const args = providers.map((provider: Constructor) => new provider());
    const value = new imp(...args);
    this.registry(key, { imp, instance: value });
    return value;
  }
}
