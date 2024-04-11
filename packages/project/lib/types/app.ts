import type {HookCallback} from 'hookable';

import type {CompileConfig, CustomCompileConfig} from './compile.js';
import type {BuildConfig, CustomBuildConfig} from './build.js';

export interface AppDirs {
  assets?: string;
  configs?: string;
  consts?: string;
  classes?: string;
  components?: string;
  layouts?: string;
  pages?: string;
  partials?: string;
  services?: string;
  utils?: string;
  stores?: string;
  types?: string;
  public?: string;
  vendor?: string;
}

export interface AppConfig {
  srcDir: string;
  compileDir: string;
  outDir: string;
  dirs?: AppDirs;
  compile?: false | CompileConfig | CustomCompileConfig;
  build?: BuildConfig | CustomBuildConfig;
}

export interface AppHooks {
  'app:foo': () => ReturnType<HookCallback>;
}
