import type {HookCallback} from 'hookable';

import type {TiniProject} from '../classes/project.js';

export interface CommonCompileOptions {
  ignorePatterns?: string[];
}

export interface Compiler {
  options: NonNullable<CompileConfig['options']>;
  compile: () => Promise<void>;
  compileFile: (path: string) => Promise<void>;
}

export interface CompileConfig {
  compiler?: string;
  options?: Record<string, any>;
}

export type CustomCompileConfig = (tiniProject: TiniProject) => Compiler;

export interface CompileHooks {
  'compile:before': () => ReturnType<HookCallback>;
  'compile:after': () => ReturnType<HookCallback>;
  'compile:beforeCompileFile': (
    context: CompileFileHookContext
  ) => ReturnType<HookCallback>;
  'compile:afterCompileFile': (
    context: CompileFileHookContext
  ) => ReturnType<HookCallback>;
  'compile:beforeOutputFile': (
    context: CompileFileHookContext
  ) => ReturnType<HookCallback>;
  'compile:afterOutputFile': (
    context: CompileFileHookContext
  ) => ReturnType<HookCallback>;
  'compile:beforeRemoveFile': (
    context: CompileFileHookContext
  ) => ReturnType<HookCallback>;
  'compile:afterRemoveFile': (
    context: CompileFileHookContext
  ) => ReturnType<HookCallback>;
}

export interface CompileFileHookContext {
  env: string;
  isDevelopment: boolean;
  base: string;
  name: string;
  ext: string;
  inPath: string;
  outPath: string;
  content?: string;
  copyOnly: boolean;
  isPublic: boolean;
  isAppEntry: boolean;
  isAppRoot: boolean;
  isActiveConfig: boolean;
}
