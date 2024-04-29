import {resolve, parse} from 'pathe';
import {readFile} from 'node:fs/promises';
import type {Matcher} from 'picomatch';
import {
  TiniProject,
  getProjectDirs,
  isUnderTopDir,
  type TiniConfig,
  type Compiler,
  type Builder,
  type ProjectDirs,
  type CompileFileHookContext,
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
  const projectDirs = getProjectDirs(tiniConfig);
  process.env.NODE_ENV = targetEnv;
  process.env.TARGET_ENV = targetEnv;
  process.env.TINI_PROJECT_DIRS = JSON.stringify(projectDirs);
  process.env.TINI_COMPILE_OPTIONS = JSON.stringify(
    extractCompileOptions(tiniConfig.compile)
  );
  process.env.TINI_BUILD_OPTIONS = JSON.stringify(
    (tiniConfig.build instanceof Function
      ? undefined
      : tiniConfig.build?.options) || {}
  );
}

export function extractCompileOptions<Type>(
  compileConfig: TiniConfig['compile']
) {
  return ((compileConfig === false || compileConfig instanceof Function
    ? undefined
    : compileConfig?.options) || {}) as Type;
}

export async function parseCompileFileContext(
  path: string,
  {srcDir, compileDir, dirs}: ProjectDirs,
  ignoreMatcher?: Matcher
): Promise<CompileFileHookContext | null> {
  if (ignoreMatcher?.(path)) return null;
  const env = process.env.TARGET_ENV || 'development';
  const isDevelopment = env === 'development';
  const inPath = resolve(path);
  const outPath = resolve(
    compileDir,
    inPath.replace(`${resolve(srcDir)}/`, '')
  );
  const {base, name, ext} = parse(inPath);
  const isPublic = isUnderTopDir(inPath, srcDir, dirs.public);
  const copyOnly = !!(
    isPublic || !['.html', '.css', '.scss', '.ts', '.js'].includes(ext)
  );
  const isAppEntry = path.endsWith(`${srcDir}/index.html`);
  const isAppRoot = path.endsWith(`${srcDir}/app.ts`);
  const isActiveConfig = path.endsWith(
    `${srcDir}/${dirs.configs}/${process.env.TARGET_ENV}.ts`
  );
  return {
    env,
    isDevelopment,
    base,
    name,
    ext,
    inPath,
    outPath,
    content: copyOnly ? undefined : await readFile(inPath, 'utf8'),
    copyOnly,
    isPublic,
    isAppEntry,
    isAppRoot,
    isActiveConfig,
  };
}
