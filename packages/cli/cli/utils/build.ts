import {copy, pathExistsSync} from 'fs-extra/esm';
import {resolve} from 'pathe';

import {
  TiniProject,
  type TiniConfig,
  type Compiler,
  type Builder,
} from '@tinijs/project';

export async function loadCompiler(tiniProject: TiniProject) {
  const {compile} = tiniProject.config;
  // disable compile
  if (compile === false) return null;
  // custom compile
  if (compile instanceof Function) return compile(tiniProject);
  // official compile
  const {compiler = '@tinijs/default-compiler', options = {}} = compile || {};
  const {default: defaulExport} = await import(`${compiler}/compiler`);
  return defaulExport(options, tiniProject) as Compiler;
}

export async function loadBuilder(tiniProject: TiniProject) {
  const {build} = tiniProject.config;
  // custom build
  if (build instanceof Function) return build(tiniProject);
  // official build
  const {builder = '@tinijs/vite-builder', options = {}} = build || {};
  const {default: defaulExport} = await import(`${builder}/builder`);
  return defaulExport(options, tiniProject) as Builder;
}

export async function buildPublic({srcDir, outDir, dirs}: TiniConfig) {
  const dirName = dirs?.public || 'public';
  const inPath = resolve(srcDir, dirName);
  const outPath = resolve(outDir);
  if (!pathExistsSync(inPath)) return;
  return copy(inPath, outPath);
}
