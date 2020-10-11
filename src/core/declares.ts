import { BaseDIContainer } from './di-base';
export type Constructor<T = any> = new (...args: any[]) => T;

export type ClassDecorator = <T extends { new (...args: any[]): {} }>(target: T) => T | void;

export type Token = Constructor | string | Symbol | number;

export interface InjectVal {
  imp?: any;
  instance?: any;
}

export interface ModuleConfig {
  providers?: Constructor[];
}

export interface ScopeConfig {
  scope: BaseDIContainer;
  imp: any;
  providers: Constructor[];
}

export interface ServiceConfig {
  token: Token;
}

export interface DepsConfig {
  propertyKey: string;
  typeName: () => Constructor;
}

export const depsMetadata = Symbol('depsMetadata');

export const defaultContainer = Symbol('defalut');
