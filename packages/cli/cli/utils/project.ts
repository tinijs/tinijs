import {resolve, parse} from 'pathe';
import {fileURLToPath} from 'node:url';
import type {PackageJson} from 'type-fest';
import {readJSON, pathExistsSync} from 'fs-extra/esm';

import {modifyJSONFile} from './modify.js';

export const TINIJS_INSTALL_DIR_PATH = resolve('node_modules', '@tinijs');

export async function loadCLIPackageJSON() {
  const path = resolve(
    parse(fileURLToPath(import.meta.url)).dir,
    '../../../package.json'
  );
  return (!pathExistsSync(path) ? {} : readJSON(path)) as Promise<PackageJson>;
}

export async function loadProjectPackageJSON() {
  const path = resolve('package.json');
  return (!pathExistsSync(path) ? {} : readJSON(path)) as Promise<PackageJson>;
}

export async function modifyProjectPackageJSON(
  modifier: (currentData: PackageJson) => Promise<PackageJson>
) {
  return modifyJSONFile('package.json', modifier, {spaces: 2});
}
