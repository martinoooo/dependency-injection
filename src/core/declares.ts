export type Constructor<T = any> = new (...args: any[]) => T;

export type ClassDecorator = <T extends { new (...args: any[]): {} }>(target: T) => T | void;

export type Token<T> = Constructor<T>;

// export interface IRegisterConfig<K, V, ID extends ScopeID, DEPTS extends any[] = []> {
//   token: InjectToken<K>;
//   imp: Implement<V, ID, DEPTS>;
//   scope: InjectScope;
//   depts?: DEPTS;
// }
