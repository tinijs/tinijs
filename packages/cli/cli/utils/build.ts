import {
  TiniProject,
  getProjectDirs,
  type TiniConfig,
  type Compiler,
  type Builder,
} from '@tinijs/project';

export async function loadCompiler(
  tiniProject: TiniProject,
  ignoreDisabled = false
) {
  const {compile} = tiniProject.config;
  // disable compile
  if (!ignoreDisabled && compile === false) return null;
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

export function exposeEnvs(tiniConfig: TiniConfig, targetEnv: string) {
  const {srcDir, outDir, compileDir, entryDir, dirs} =
    getProjectDirs(tiniConfig);
  process.env.NODE_ENV = targetEnv;
  process.env.TARGET_ENV = targetEnv;
  process.env.TINI_SRC_DIR = srcDir;
  process.env.TINI_COMPILE_DIR = compileDir;
  process.env.TINI_OUT_DIR = outDir;
  process.env.TINI_ENTRY_DIR = entryDir;
  process.env.TINI_DIRS_PUBLIC = dirs.public;
}
