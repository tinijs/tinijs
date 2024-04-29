import type {HookCallback} from 'hookable';

import type {TiniProject} from '../classes/project.js';

export interface CommonBuildOptions {
  configPath?: string;
  // dev
  devCommand?: string | string[];
  devPort?: number;
  devHost?: string;
  onDevServerStart?: () => void;
  // watch
  watchCommand?: string | string[];
  // build
  buildCommand?: string | string[];
}

export interface Builder {
  options: NonNullable<BuildConfig['options']>;
  dev:
    | (() => Promise<void>)
    | {
        command: string | string[];
        onServerStart?: () => void;
      };
  watch:
    | (() => Promise<void>)
    | {
        command: string | string[];
      };
  build:
    | (() => Promise<void>)
    | {
        command: string | string[];
      };
}

export interface BuildConfig {
  builder?: string;
  options?: Record<string, any>;
}

export type CustomBuildConfig = (tiniProject: TiniProject) => Builder;

export interface BuildHooks {
  'dev:before': () => ReturnType<HookCallback>;
  'watch:before': () => ReturnType<HookCallback>;
  'build:before': () => ReturnType<HookCallback>;
  'build:after': () => ReturnType<HookCallback>;
}
