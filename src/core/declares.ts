import { BaseDIContainer } from './di-base';
export type Constructor<T = any> = new (...args: any[]) => T;

export type ClassDecorator = <T extends { new (...args: any[]): {} }>(target: T) => T | void;

export type Token = Constructor | string | Symbol;

export interface InjectVal {
  imp: any;
  instance: any;
}

export interface ModuleConfig {
  providers?: Constructor[];
}

export interface ScopeConfig {
  scope: BaseDIContainer;
  imp: any;
  providers: Constructor[];
}

export interface DepsConfig {
  propertyKey: string;
  typeName: any;
}


export const depsMetadata = Symbol("depsMetadata");

// export interface IRegisterConfig<K, V, ID extends ScopeID, DEPTS extends any[] = []> {
//   token: InjectToken<K>;
//   imp: Implement<V, ID, DEPTS>;
//   scope: InjectScope;
//   depts?: DEPTS;
// }
