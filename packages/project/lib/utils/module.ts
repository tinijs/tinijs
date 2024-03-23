import {defu} from 'defu';
import {resolve} from 'pathe';
import {pathExistsSync} from 'fs-extra/esm';

import {TiniProject} from '../classes/project.js';

import {ModuleConfig} from '../types/module.js';

export function defineTiniModule<Options extends Record<string, unknown>>(
  config: ModuleConfig<Options>
) {
  return config;
}

export async function setupModules(tiniProject: TiniProject) {
  const modulesConfig = tiniProject.config.modules || [];
  for (const item of modulesConfig) {
    const [localOrVendor, options = {}] = item instanceof Array ? item : [item];
    const moduleConfig =
      localOrVendor instanceof Object
        ? localOrVendor
        : await loadVendorModule(localOrVendor);
    await moduleConfig?.setup(
      defu(moduleConfig.defaults, options),
      tiniProject
    );
  }
}

export async function loadVendorModule(packageName: string) {
  const entryPath = resolve(
    'node_modules',
    packageName,
    'dist',
    'module',
    'index.js'
  );
  if (!pathExistsSync(entryPath)) return null;
  const {default: defaulExport} = await import(entryPath);
  if (!defaulExport?.meta || !defaulExport?.setup) return null;
  return defaulExport as ModuleConfig;
}
