import { depsMetadata, InjectConfig, DepsConfig } from '../core/declares';

export function Inject(config?: InjectConfig): Function {
  return function (target: Object, propertyKey: string, index?: number) {
    const { token, lazy } = config || {};
    let typeName;
    if (token) {
      typeName = () => token;
    } else if (lazy) {
      typeName = lazy;
    } else {
      typeName = () => Reflect.getMetadata('design:type', target, propertyKey);
    }
    const deps: DepsConfig[] = Reflect.getMetadata(depsMetadata, target) || [];
    deps.push({ ...config, propertyKey, typeName, index });
    Reflect.defineMetadata(depsMetadata, deps, target);
  };
}
