import { BaseDIContainer } from './di-base';
export type Constructor<T = any> = new (...args: any[]) => T;

export type ClassDecorator = <T extends { new (...args: any[]): {} }>(target: T) => T | void;

export type Token = Function | string | Symbol | number;

export interface RegistryConfig {
  imp?: any;
  instance?: any;
  scope?: Scope;
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
  providers?: Constructor[];
  imp?: any;
}

export interface ScopeConfig {
  scope: BaseDIContainer;
  imp?: any;
  providers: Constructor[];
}

export enum Scope {
  /**
   * The provider can be shared across multiple classes. The provider lifetime
   * is strictly tied to the application lifecycle. Once the application has
   * bootstrapped, all providers have been instantiated.
   */
  DEFAULT = 0,
  /**
   * A new private instance of the provider is instantiated for every use
   */
  TRANSIENT = 1,
}

export interface ServiceConfig {
  token?: Token;
  scope?: Scope;
}

export const depsMetadata = Symbol('depsMetadata');

export const defaultContainer = Symbol('defalut');
