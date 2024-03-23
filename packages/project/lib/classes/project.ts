import {createHooks} from 'hookable';
import {ProxifiedModule, loadFile, writeFile} from 'magicast';
import {defu} from 'defu';
import initJiti, {JITI} from 'jiti';
import {resolve} from 'pathe';
import {pathExistsSync} from 'fs-extra/esm';

import {AppConfig, AppHooks} from '../types/app.js';
import {BuildHooks} from '../types/build.js';
import {CLIConfig, CLIHooks} from '../types/cli.js';
import {ModuleConfig} from '../types/module.js';
import {CompileHooks} from '../types/compile.js';
import {ServerConfig, ServerHooks} from '../types/server.js';
import {UIConfig} from '../types/ui.js';

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

function getConfigFilePath() {
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
    srcDir: 'app',
    outDir: '.tini/outputs/app',
    tempDir: '.tini/compiles/app',
  };
  const configFilePath = getConfigFilePath();
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

export async function modifyTiniConfig(
  modifier: (
    proxifiedModule: ProxifiedModule<TiniConfig>
  ) => Promise<ProxifiedModule<TiniConfig>>
) {
  const configFilePath = getConfigFilePath();
  if (!configFilePath) {
    throw new Error('No Tini config file available in the current project.');
  }
  const proxifiedModule = await modifier(
    await loadFile<TiniConfig>(configFilePath)
  );
  return writeFile(proxifiedModule, configFilePath);
}

export class TiniProject {
  constructor(public readonly config: TiniConfig) {}

  readonly hooks = createHooks<TiniHooks>();
  readonly hook = this.hooks.hook;
}
