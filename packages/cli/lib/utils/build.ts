import {copy, pathExistsSync} from 'fs-extra/esm';
import {resolve} from 'pathe';
import {execaCommand} from 'execa';

import {
  TiniProject,
  TiniConfig,
  OfficialCompilers,
  Compiler,
  OfficialBuilders,
  Builder,
} from '@tinijs/project';

import {TINIJS_INSTALL_DIR_PATH} from './project.js';

export function getIndexHTMLPath({srcDir, tempDir, compile}: TiniConfig) {
  return compile === false ? `${srcDir}/index.html` : `${tempDir}/index.html`;
}

export async function loadCompiler(tiniProject: TiniProject) {
  const {compile} = tiniProject.config;
  // disable compile
  if (compile === false) return null;
  // custom compile
  if (compile instanceof Function) return compile(tiniProject);
  // official compile
  const {compiler = OfficialCompilers.Default, options = {}} = compile || {};
  return loadCompilerOrBuilder<Compiler>(
    `${compiler}-compiler`,
    options,
    tiniProject
  );
}

export async function loadBuilder(tiniProject: TiniProject) {
  const {build} = tiniProject.config;
  // custom build
  if (build instanceof Function) return build(tiniProject);
  // official build
  const {builder = OfficialBuilders.Parcel, options = {}} = build || {};
  return loadCompilerOrBuilder<Builder>(
    `${builder}-builder`,
    options,
    tiniProject
  );
}

export async function buildPublic({srcDir, outDir, dirs}: TiniConfig) {
  const dirName = dirs?.public || 'public';
  const inPath = resolve(srcDir, dirName);
  const outPath = resolve(outDir);
  if (!pathExistsSync(inPath)) return;
  return copy(inPath, outPath);
}

async function loadCompilerOrBuilder<Type>(
  packageName: string,
  options: any,
  tiniProject: TiniProject
) {
  const entryFilePath = resolve(
    TINIJS_INSTALL_DIR_PATH,
    packageName,
    'dist',
    'lib',
    'index.js'
  );
  if (!pathExistsSync(entryFilePath)) {
    await execaCommand(`npm i @tinijs/${packageName}`, {stdio: 'ignore'});
  }
  const {default: create} = await import(entryFilePath);
  return create(options)(tiniProject) as Type;
}
