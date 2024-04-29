import {createHooks} from 'hookable';
import {defu} from 'defu';
import initJiti, {type JITI} from 'jiti';
import {resolve} from 'pathe';
import {pathExistsSync} from 'fs-extra/esm';

import type {AppConfig, AppHooks} from '../types/app.js';
import type {BuildHooks} from '../types/build.js';
import type {CLIConfig, CLIHooks} from '../types/cli.js';
import type {ModuleConfig} from '../types/module.js';
import type {CompileHooks} from '../types/compile.js';
import type {ServerConfig, ServerHooks} from '../types/server.js';
import type {UIConfig} from '../types/ui.js';

import {
  DEFAULT_SRC_DIR,
  DEFAULT_COMPILE_DIR,
  DEFAULT_OUT_DIR,
  getProjectDirs,
} from '../utils/dir.js';
import {setupModules} from '../utils/module.js';

// @ts-ignore
const jiti = initJiti(import.meta.url) as JITI;

export interface TiniIntegrationMeta {
  name: string;
}

export type TiniIntegration<
  Local,
  Options extends Record<string, unknown> = {},
> = Array<string | Local | [string | Local, Options?]>;

export interface TiniHooks
  extends CLIHooks,
    CompileHooks,
    BuildHooks,
    ServerHooks,
    AppHooks {}

export type TiniModules = TiniIntegration<ModuleConfig>;

export interface TiniConfig extends AppConfig {
  hooks?: Partial<TiniHooks>;
  modules?: TiniModules;
  cli?: CLIConfig;
  ui?: UIConfig;
  server?: ServerConfig;
}

let TINI_PROJECT: TiniProject | null = null;

export const TINI_CONFIG_TS_FILE = 'tini.config.ts';
export const TINI_CONFIG_JS_FILE = 'tini.config.js';

export function defineTiniConfig(config: Partial<TiniConfig>) {
  return config;
}

export function getTiniConfigFilePath(dir = '.') {
  const tsFilePath = resolve(dir, TINI_CONFIG_TS_FILE);
  const jsFilePath = resolve(dir, TINI_CONFIG_JS_FILE);
  const configFilePath = pathExistsSync(tsFilePath)
    ? tsFilePath
    : pathExistsSync(jsFilePath)
      ? jsFilePath
      : null;
  return configFilePath;
}

export function getTiniConfigFilePathOrThrow(dir?: string) {
  const tiniConfigPath = getTiniConfigFilePath(dir);
  if (!tiniConfigPath) throw new Error('No valid Tini config file found!');
  return tiniConfigPath;
}

export async function loadTiniConfig(dir?: string) {
  const defaultConfig: TiniConfig = {
    srcDir: DEFAULT_SRC_DIR,
    compileDir: DEFAULT_COMPILE_DIR,
    outDir: DEFAULT_OUT_DIR,
  };
  const configFilePath = getTiniConfigFilePath(dir);
  if (!configFilePath) {
    return defaultConfig;
  }
  const {default: fileConfig = {}} = (await jiti.import(
    configFilePath,
    {}
  )) as {
    default?: TiniConfig;
  };
  return defu(fileConfig, defaultConfig);
}

export async function getTiniProject(dir?: string) {
  return (TINI_PROJECT ||= await createTiniProject(await loadTiniConfig(dir)));
}

export async function createTiniProject(config: TiniConfig) {
  const tiniProject = new TiniProject(config);
  // setup modules
  await setupModules(tiniProject);
  // add hooks
  if (tiniProject.config.hooks) {
    tiniProject.hooks.addHooks(tiniProject.config.hooks);
  }
  // result
  return tiniProject;
}

export function checkPotentialTiniApp(tiniConfig: TiniConfig) {
  const configFilePath = getTiniConfigFilePath();
  if (!configFilePath) return false;
  const {srcDir} = getProjectDirs(tiniConfig);
  const indexHTMLExists = pathExistsSync(resolve(srcDir, 'index.html'));
  if (!indexHTMLExists) return false;
  const appTSExists = pathExistsSync(resolve(srcDir, 'app.ts'));
  if (!appTSExists) return false;
  return true;
}

export function isIntegratedItemExistsInConfig(
  integration: TiniIntegration<{meta: TiniIntegrationMeta}>,
  name: string
) {
  return integration.some(item => {
    if (typeof item === 'string') return item === name;
    if (!(item instanceof Array)) {
      return item.meta.name === name;
    } else {
      if (typeof item[0] === 'string') {
        return item[0] === name;
      } else {
        return item[0].meta.name === name;
      }
    }
  });
}

export class TiniProject {
  constructor(public readonly config: TiniConfig) {}

  readonly hooks = createHooks<TiniHooks>();
  readonly hook = this.hooks.hook;
}
