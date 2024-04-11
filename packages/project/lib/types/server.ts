import type {HookCallback} from 'hookable';

export interface ServerConfig {
  foo?: string;
}

export interface ServerHooks {
  'server:foo': () => ReturnType<HookCallback>;
}
