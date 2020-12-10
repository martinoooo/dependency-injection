import { BaseDIContainer } from './di-base';
export type Constructor<T = any> = new (...args: any[]) => T;

export type ClassDecorator = <T extends { new (...args: any[]): {} }>(target: T) => T | void;

export type Token = Function | string | Symbol | number;

export type ObjectType<T> = { new (...args: any[]): T };

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
  token?: Token;
  providers?: Array<Constructor | (RegistryConfig & { token: Token })>;
  imp?: any;
}

export interface ScopeConfig {
  scope: BaseDIContainer;
  providers: Array<Constructor | (RegistryConfig & { token: Token })>;
}

export interface ServiceConfig {
  token?: Token;
  transient?: boolean;
}

export const depsMetadata = Symbol('depsMetadata');

export const defaultContainer = Symbol('defalut');
