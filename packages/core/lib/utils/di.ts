import {GLOBAL_TINI} from '../consts/global.js';

export type DependencyProvider = () => Promise<any>;

export interface DependencyDef {
  provider: DependencyProvider;
  deps?: (string | (() => unknown))[];
}

export type DependencyProviders = Record<
  string,
  DependencyProvider | DependencyDef
>;

export interface DIRegistry {
  registers: Map<string, () => Promise<any>>;
  instances: Map<string, any>;
  awaiters: Array<() => any>;
}

export function getDIRegistry() {
  return (GLOBAL_TINI.DIRegistry ||= {
    registers: new Map<string, () => Promise<any>>(),
    instances: new Map<string, any>(),
    awaiters: [],
  }) as DIRegistry;
}
