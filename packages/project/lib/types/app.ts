import {HookCallback} from 'hookable';

import {CompileConfig, CustomCompileConfig} from './compile.js';
import {BuildConfig, CustomBuildConfig} from './build.js';

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
  outDir: string;
  tempDir: string;
  dirs?: AppDirs;
  compile?: false | CompileConfig | CustomCompileConfig;
  build?: BuildConfig | CustomBuildConfig;
}

export interface AppHooks {
  'app:foo': () => ReturnType<HookCallback>;
}
