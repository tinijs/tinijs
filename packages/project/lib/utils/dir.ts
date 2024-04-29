import type {TiniConfig} from '../classes/project.js';

export type ProjectDirs = ReturnType<typeof getProjectDirs>;

export const DEFAULT_SRC_DIR = 'app';
export const DEFAULT_COMPILE_DIR = '.app';
export const DEFAULT_OUT_DIR = '.output';

export function getProjectDirs({
  srcDir,
  compileDir,
  outDir,
  compile,
  dirs,
}: TiniConfig) {
  return {
    srcDir,
    compileDir,
    outDir,
    entryDir: compile === false ? srcDir : compileDir,
    dirs: {
      assets: dirs?.assets || 'assets',
      configs: dirs?.configs || 'configs',
      consts: dirs?.consts || 'consts',
      classes: dirs?.classes || 'classes',
      services: dirs?.services || 'services',
      layouts: dirs?.layouts || 'layouts',
      pages: dirs?.pages || 'pages',
      components: dirs?.components || 'components',
      icons: dirs?.icons || 'icons',
      partials: dirs?.partials || 'partials',
      utils: dirs?.utils || 'utils',
      stores: dirs?.stores || 'stores',
      types: dirs?.types || 'types',
      public: dirs?.public || 'public',
      vendor: dirs?.vendor || 'vendor',
    },
  };
}

export function isUnderTopDir(path: string, srcDir: string, topDir: string) {
  return path.includes(`/${srcDir}/${topDir}/`);
}
