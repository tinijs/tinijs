import {resolve} from 'pathe';
import type {PackageJson} from 'type-fest';
import {readJSON} from 'fs-extra/esm';

import {modifyJSONFile} from './file.js';
import cliPackageJSON = require('../../package.json');

export const TINIJS_INSTALL_DIR_PATH = resolve('node_modules', '@tinijs');

export function getTargetEnv() {
  return process.env.TARGET_ENV || 'development';
}

export async function loadCLIPackageJSON() {
  return cliPackageJSON as PackageJson;
}

export async function loadProjectPackageJSON() {
  return readJSON(resolve('package.json')) as Promise<PackageJson>;
}

export async function modifyProjectPackageJSON(
  modifier: (currentData: PackageJson) => Promise<PackageJson>
) {
  return modifyJSONFile('package.json', modifier, {spaces: 2});
}
