import {readdir, readFile} from 'node:fs/promises';
import {pathExistsSync, readJSON} from 'fs-extra/esm';
import typescript from 'typescript';
import {resolve, parse, relative} from 'pathe';
import {safeDestr} from 'destr';
import type {PackageJson} from 'type-fest';
import {genObjectFromRaw, genArrayFromRaw} from 'knitwork';
import {
  parseName,
  tsToJS,
  jtsFilter,
  createGenFile,
  loadProjectPackageJSON,
  transpileAndOutputFiles,
  removeFiles,
  type AvailableFile,
  type GenFileResult,
} from '@tinijs/cli';
import type {UIConfig} from '@tinijs/project';

import {
  getCommonColors,
  getCommonGradients,
  getSkinUtils,
  getDefaultGlobal,
} from './global.js';

const {ModuleKind, ScriptTarget} = typescript;

export type AvailableComponent = AvailableFile;

export interface AvailableThemeFamily {
  bases: Record<string, AvailableFile>;
  skins: Record<string, AvailableFile>;
  souls: Record<string, AvailableFile>;
}

export interface ComponentBuildInstructions {
  raw?: boolean;
  components?: string[];
  reactEvents?: Record<string, string>;
  reactAnyProp?: boolean;
}

export const TS_CONFIG = {
  declaration: true,
  sourceMap: true,
  module: ModuleKind.NodeNext,
  target: ScriptTarget.ESNext,
  lib: ['ESNext', 'DOM'],
  experimentalDecorators: true,
  useDefineForClassFields: false,
  isolatedModules: true,
  verbatimModuleSyntax: true,
  skipLibCheck: true,
};

function resolveSourceDir(sourceDir: string) {
  return /^\.\.?(\/|\\)/.test(sourceDir)
    ? resolve(sourceDir)
    : resolve('node_modules', sourceDir, 'dist', 'ui');
}

async function rewriteImportPath(
  fromPath: string,
  toDir: string,
  rewritePath?: UIConfig['rewritePath']
) {
  fromPath = resolve(tsToJS(fromPath));
  if (!rewritePath) {
    return relative(toDir, fromPath);
  } else {
    // from node_modules
    if (fromPath.includes('node_modules/')) {
      return fromPath.split('node_modules/')[1];
    }
    // custom rewrite
    const newPath =
      rewritePath instanceof Function ? rewritePath(fromPath) : null;
    if (newPath) return newPath;
    // from current project
    const currentPath = resolve();
    if (fromPath.startsWith(currentPath)) {
      const packageName = ((globalThis as any).currentPackageName ||=
        await loadProjectPackageJSON().then(({name}) => name)) as string;
      return fromPath.replace(currentPath, `${packageName}/dist`);
    }
    // no rewrite
    throw new Error(`No rewrite available for the path "${fromPath}".`);
  }
}

export async function listAvailableComponents(sourceDirs: string[]) {
  const result = {} as Record<string, AvailableComponent>;
  for (const sourceDir of sourceDirs) {
    const componentsDir = resolve(resolveSourceDir(sourceDir), 'components');
    (!pathExistsSync(componentsDir) ? [] : await readdir(componentsDir))
      .filter(jtsFilter)
      .forEach(file => {
        const parsed = parse(file);
        result[parsed.name] = {
          path: resolve(componentsDir, file),
          parsed,
        };
      });
  }
  return result;
}

export async function listAvailableThemeFamilies(sourceDirs: string[]) {
  const result = {} as Record<string, AvailableThemeFamily>;
  for (const sourceDir of sourceDirs) {
    const stylesDir = resolve(resolveSourceDir(sourceDir), 'styles');
    const familyIds = (
      !pathExistsSync(stylesDir) ? [] : await readdir(stylesDir)
    ).filter(item => !~item.indexOf('.'));
    for (const familyId of familyIds) {
      result[familyId] ||= {bases: {}, skins: {}, souls: {}};
      // bases
      const basesDir = resolve(stylesDir, familyId, 'bases');
      (!pathExistsSync(basesDir) ? [] : await readdir(basesDir))
        .filter(jtsFilter)
        .forEach(file => {
          const parsed = parse(file);
          result[familyId].bases[parsed.name] = {
            path: resolve(basesDir, file),
            parsed,
          };
        });
      // skins
      const skinsDir = resolve(stylesDir, familyId, 'skins');
      (!pathExistsSync(skinsDir) ? [] : await readdir(skinsDir))
        .filter(jtsFilter)
        .forEach(file => {
          const parsed = parse(file);
          result[familyId].skins[parsed.name] = {
            path: resolve(skinsDir, file),
            parsed,
          };
        });
      // souls
      const soulsDir = resolve(stylesDir, familyId, 'souls');
      (!pathExistsSync(soulsDir) ? [] : await readdir(soulsDir))
        .filter(jtsFilter)
        .forEach(file => {
          const parsed = parse(file);
          result[familyId].souls[parsed.name] = {
            path: resolve(soulsDir, file),
            parsed,
          };
        });
    }
  }
  return result;
}

export async function buildGlobal() {
  const results: GenFileResult[] = [];

  const globalTS = createGenFile()
    .addImport('lit', ['css'])
    .addBlock(
      'export const globalStyles =',
      `[
        css\`${[
          getCommonColors(),
          getCommonGradients(),
          getSkinUtils(),
          getDefaultGlobal(),
        ].join('\n')}\`,
      ]`
    );
  results.push(globalTS.toResult('styles/global.ts'));

  return results;
}

export async function buildSkins(
  ourDir: string,
  themeFamilies: Record<string, AvailableThemeFamily>,
  config: UIConfig
) {
  const results: GenFileResult[] = [];

  const indexTS = createGenFile({
    exportNames: [] as string[],
    mainExportValue: {} as Record<string, string>,
  });
  for (const [familyId, pickedSkins] of Object.entries(config.families || {})) {
    const family = themeFamilies[familyId];
    if (family) {
      const familyNames = parseName(familyId);
      for (const skinId of pickedSkins !== true
        ? pickedSkins
        : Object.keys(family.skins)) {
        const availableSkin = family.skins[skinId];
        if (availableSkin) {
          const skinNames = parseName(skinId);
          const importName = `${familyNames.varName}${skinNames.className}Skin`;
          const importPath = await rewriteImportPath(
            availableSkin.path,
            `${ourDir}/skins`,
            config.rewritePath
          );
          indexTS.data.exportNames.push(importName);
          indexTS.addImport(importPath, importName);
          indexTS.data.mainExportValue[`${familyId}/${skinId}`] = importName;
        }
      }
    }
  }
  indexTS
    .addBlock('export', `{ ${indexTS.data.exportNames.join(', ')} }`)
    .addBlock('export const availableSkins =', [indexTS.data.mainExportValue]);
  results.push(indexTS.toResult('styles/skin.ts'));

  // result
  return results;
}

export async function buildBases(
  ourDir: string,
  themeFamilies: Record<string, AvailableThemeFamily>,
  config: UIConfig
) {
  const results: GenFileResult[] = [];

  const allBases = Object.values(themeFamilies).reduce(
    (result, {bases}) => [...result, ...Object.keys(bases)],
    [] as string[]
  );

  const indexTS = createGenFile({
    mainExportValue: {} as Record<string, string>,
  });
  for (const [familyId] of Object.entries(config.families || {})) {
    const familyNames = parseName(familyId);
    const familyTSExportNames: string[] = [];
    const familyTSExportDefaultValue: string[] = [];
    for (const baseId of allBases) {
      const availableBase = themeFamilies[familyId]?.bases[baseId];
      if (availableBase) {
        const baseNames = parseName(baseId);
        const importName = `${familyNames.varName}${baseNames.className}Base`;
        const importPath = await rewriteImportPath(
          availableBase.path,
          `${ourDir}/bases`,
          config.rewritePath
        );
        indexTS.addImport(importPath, importName);
        familyTSExportDefaultValue.push(importName);
      }
    }
    if (familyTSExportNames.length) {
      indexTS.addBlock('export', `{ ${familyTSExportNames.join(', ')} }`);
    }
    indexTS.addBlock(`export const ${familyNames.varName}Base =`, [
      familyTSExportDefaultValue,
    ]);

    indexTS.data.mainExportValue[familyId] = `${familyNames.varName}Base`;
  }

  indexTS.addBlock('export const availableBases =', [
    indexTS.data.mainExportValue,
  ]);
  results.push(indexTS.toResult('styles/base.ts'));

  // result
  return results;
}

export async function buildComponents(
  ourDir: string,
  components: Record<string, AvailableComponent>,
  themeFamilies: Record<string, AvailableThemeFamily>,
  config: UIConfig
) {
  const results: GenFileResult[] = [];

  for (const [componentId, {path: componentPath}] of Object.entries(
    components
  )) {
    const componentTS = createGenFile({
      componentsValue: [] as string[],
      themingValue: {} as Record<string, string>,
    });

    const buildInstructions: ComponentBuildInstructions = safeDestr(
      (await readFile(componentPath, 'utf8')).match(
        /\/\*\*\*([\s\S]*?)\*\*\*\//
      )?.[1] || '{}'
    );
    if (buildInstructions.components) {
      buildInstructions.components.forEach(componentId => {
        const componentNames = parseName(componentId);
        const componentImportName = `Tini${componentNames.className}Component`;
        const componentImportPath = `./${componentId}.js`;
        componentTS.addImport(componentImportPath, [componentImportName]);
        componentTS.data.componentsValue.push(componentImportName);
      });
    }

    const componentNames = parseName(componentId);
    const componentImportName = `Tini${componentNames.className}Component`;
    const componentImportPath = await rewriteImportPath(
      componentPath,
      `${ourDir}/components`,
      config.rewritePath
    );
    componentTS.addImport(componentImportPath, 'OriginalComponent');
    componentTS.addExport(componentImportPath, '*');

    for (const [familyId] of Object.entries(config.families || {})) {
      const availableSoul = themeFamilies[familyId]?.souls[componentId];
      if (availableSoul) {
        const familyNames = parseName(familyId);
        const soulImportName = `${familyNames.varName}Soul`;
        const soulImportPath = await rewriteImportPath(
          availableSoul.path,
          `${ourDir}/components`,
          config.rewritePath
        );
        componentTS.addImport(soulImportPath, soulImportName);
        componentTS.data.themingValue[familyId] = soulImportName;
      }
    }

    componentTS.addBlock(
      `export class ${componentImportName} extends OriginalComponent`,
      `{
  static readonly componentName: string = '${componentNames.tagName}';
  static readonly defaultTagName: string = 'tini-${componentNames.tagName}';
  ${
    buildInstructions.raw
      ? ''
      : `static readonly theming = ${genObjectFromRaw(
          componentTS.data.themingValue
        )};`
  }
  ${
    !buildInstructions.components
      ? ''
      : `static readonly components = ${genArrayFromRaw(
          componentTS.data.componentsValue
        )};`
  }
}`
    );

    if (config.framework === 'react') {
      componentTS
        .addImport('react', 'React')
        .addImport('@lit/react', ['createComponent']);

      componentTS.addBlock(
        `export const Tini${componentNames.className} =`,
        `createComponent(${genObjectFromRaw({
          react: 'React',
          elementClass: `Tini${componentNames.className}Component${
            !buildInstructions.reactAnyProp ? '' : ' as any'
          }`,
          tagName: `'tini-${componentNames.tagName}'`,
          ...(!buildInstructions.reactEvents
            ? {}
            : {events: JSON.stringify(buildInstructions.reactEvents)}),
        })})`
      );
    }

    results.push(componentTS.toResult(`components/${componentId}.ts`));
  }

  // result
  return results;
}

export async function buildSetup(config: UIConfig) {
  const setupTS = createGenFile();

  // imports
  setupTS
    .addTypeImport('lit', ['CSSResultOrNative'])
    .addImport('defu', ['defu'])
    .addImport('@tinijs/core', ['listify', 'initUI', 'type UI', 'type UIInit'])
    .addImport('./styles/global.js', ['globalStyles'])
    .addImport('./styles/base.js', ['availableBases']);
  if (!config.manualSkinSelection) {
    setupTS.addImport('./styles/skin.js', ['availableSkins']);
  }

  // blocks
  setupTS.addBlock('export interface AppWithUI', '{ui: UI}').addBlock(
    `export function setupUI(
    customConfig: Pick<
      UIInit,
      'host' | 'global' | 'skins' | 'shares' | 'options'
    >${config.manualSkinSelection ? '' : ' = {}'}
  )`,
    `{
return initUI({
  host: customConfig.host,
  global: [
    ...globalStyles,
    ...listify<CSSResultOrNative>(customConfig.global || [])
  ],
  skins: ${
    config.manualSkinSelection
      ? 'customConfig.skins'
      : '{...availableSkins, ...customConfig.skins}'
  },
  shares: defu(
    Object.entries(customConfig.shares || {}).reduce(
      (result, [key, value]) => {
        result[key] = listify<CSSResultOrNative>(value);
        return result;
      },
      {} as Record<string, CSSResultOrNative[]>
    ),
    availableBases,
  ),
  options: customConfig.options,
});
}`
  );

  // result
  return setupTS.toResult('setup.ts');
}

export async function buildPublicAPI(results: GenFileResult[]) {
  return {
    path: 'public-api.ts',
    content: results
      .map(({path}) => `export * from './${tsToJS(path)}';`)
      .join('\n'),
  } as GenFileResult;
}

export async function buildPackageJSON(
  packageJSON: NonNullable<UIConfig['packageJSON']>
) {
  const jsonContent: PackageJson = {
    ...(packageJSON === true
      ? await loadProjectPackageJSON()
      : packageJSON instanceof Function
        ? packageJSON(await loadProjectPackageJSON())
        : typeof packageJSON === 'string'
          ? await readJSON(resolve(packageJSON))
          : packageJSON),
    type: 'module',
    exports: {
      '.': './public-api.js',
      './components/*': './components/*',
      './icons/*': './icons/*',
    },
    files: ['*'],
  };
  return {
    path: 'package.json',
    content: JSON.stringify(jsonContent, null, 2) + '\n',
  } as GenFileResult;
}

export async function transpileAndRemoveTSFiles(
  outDir: string,
  tsFilePaths: string[]
) {
  const ourDirPath = resolve(outDir);
  // transpile
  await transpileAndOutputFiles(tsFilePaths, TS_CONFIG as any, outDir, path =>
    path.replace(`${ourDirPath}/`, '')
  );
  // remove .ts files
  await removeFiles(tsFilePaths);
}
