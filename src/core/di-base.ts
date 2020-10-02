import { Constructor } from './declares';

export class BaseDIContainer {
  private services = new Map<Constructor, any>();

  public registry(itfc: Constructor, val: any) {
    this.services.set(itfc, val);
  }

  public get<T>(itfc: Constructor): T {
    const value = this.services.get(itfc);
    if (!value) {
      return this.createInstance<T>(itfc);
    }
    return value;
  }

  public reset() {
    this.services.clear();
  }

  private createInstance<T>(key: Constructor): T {
    const providers = Reflect.getMetadata('design:paramtypes', key) || [];
    const args = providers.map((provider: Constructor) => new provider());
    const value = new key(...args);
    this.registry(key, value);
    return value;
  }
}
