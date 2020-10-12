import { depsMetadata, InjectConfig, DepsConfig } from '../core/declares';

export function Inject(config?: InjectConfig): Function {
  return function (target: Object, propertyKey: string) {
    const { token } = config || {};
    let typeName;
    if (token) {
      typeName = () => token;
    } else {
      typeName = () => Reflect.getMetadata('design:type', target, propertyKey);
    }
    const deps: DepsConfig[] = Reflect.getMetadata(depsMetadata, target) || [];
    deps.push({ ...config, propertyKey, typeName });
    Reflect.defineMetadata(depsMetadata, deps, target);
  };
}
