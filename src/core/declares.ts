import { BaseDIContainer } from './di-base';
export type Constructor<T = any> = new (...args: any[]) => T;

export type ClassDecorator = <T extends { new (...args: any[]): {} }>(target: T) => T | void;

export type Token = Function | string | Symbol | number;

export interface RegistryConfig {
  imp?: any;
  instance?: any;
  transient?: boolean;
}

export interface InjectConfig {
  token?: Token;
  lazy?: Function;
}

export type DepsConfig = InjectConfig & {
  propertyKey: string;
  typeName: Function;
  index?: number;
};

export interface ModuleConfig {
  providers?: Constructor[];
}

export interface ScopeConfig {
  scope: BaseDIContainer;
  imp: any;
  providers: Constructor[];
}

export interface ServiceConfig {
  token?: Token;
  transient?: boolean;
}

export const depsMetadata = Symbol('depsMetadata');

export const defaultContainer = Symbol('defalut');
