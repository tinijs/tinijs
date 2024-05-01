import type {HookCallback} from 'hookable';

import type {CompileConfig, CustomCompileConfig} from './compile.js';
import type {BuildConfig, CustomBuildConfig} from './build.js';

export interface AppDirs {
  assets?: string;
  configs?: string;
  consts?: string;
  contexts?: string;
  stores?: string;
  classes?: string;
  layouts?: string;
  pages?: string;
  components?: string;
  icons?: string;
  partials?: string;
  services?: string;
  utils?: string;
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
