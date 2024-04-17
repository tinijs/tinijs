import type {HookCallback} from 'hookable';

import type {TiniProject} from '../classes/project.js';

export interface Compiler {
  options: Record<string, any>;
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
  'compile:beforeFile': (
    context: CompileFileHookContext
  ) => ReturnType<HookCallback>;
  'compile:afterFile': (
    context: CompileFileHookContext
  ) => ReturnType<HookCallback>;
  'compile:after': () => ReturnType<HookCallback>;
}

export interface CompileFileHookContext {
  base: string;
  inPath: string;
  outPath: string;
  content: string;
}
