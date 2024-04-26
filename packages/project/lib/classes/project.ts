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

export function defineTiniConfig(config: Partial<TiniConfig>) {
  return config;
}

export async function getTiniProject() {
  return (TINI_PROJECT ||= await createTiniProject(await loadTiniConfig()));
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

export function getTiniConfigFilePath() {
  const tsFile = 'tini.config.ts';
  const jsFile = 'tini.config.js';
  const tsFilePath = resolve(tsFile);
  const jsFilePath = resolve(jsFile);
  const configFilePath = pathExistsSync(tsFilePath)
    ? tsFilePath
    : pathExistsSync(jsFilePath)
      ? jsFilePath
      : null;
  return configFilePath;
}

export async function loadTiniConfig() {
  const defaultConfig: TiniConfig = {
    srcDir: DEFAULT_SRC_DIR,
    compileDir: DEFAULT_COMPILE_DIR,
    outDir: DEFAULT_OUT_DIR,
  };
  const configFilePath = getTiniConfigFilePath();
  if (!configFilePath) {
    return defaultConfig;
  }
  const {default: fileConfig = {}} = (await jiti.import(
    configFilePath,
    {}
  )) as {
    default?: TiniConfig;
  };
  return defu(defaultConfig, fileConfig);
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
