import {readdir, readFile} from 'node:fs/promises';
import {pathExistsSync, readJSON, remove} from 'fs-extra/esm';
import typescript from 'typescript';
import {resolve, parse, relative} from 'pathe';
import {execa} from 'execa';
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

import {getSkinUtils, getCommonStyles} from './global.js';

const {ModuleKind, ScriptTarget} = typescript;

export type AvailableElement = AvailableFile;

export interface AvailableThemeFamily {
  bases: Record<string, AvailableFile>;
  skins: Record<string, AvailableFile>;
  souls: Record<string, AvailableFile>;
}

export interface ElementBuildInstructions {
  raw?: boolean;
  elements?: string[];
  reactEvents?: Record<string, string>;
  reactAnyProp?: boolean;
}

export interface AvailableElementsAndThemeFamilies {
  elements: Record<string, AvailableElement>;
  themeFamilies: Record<string, AvailableThemeFamily>;
}

export const DEFAULT_OUT_DIR = './app/ui';

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

export function resolveSourceDir(sourceDir: string) {
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

export async function listAvailableElements(sourceDirs: string[]) {
  const result = {} as Record<string, AvailableElement>;
  for (const sourceDir of sourceDirs) {
    const elementsDir = resolve(resolveSourceDir(sourceDir), 'elements');
    (!pathExistsSync(elementsDir) ? [] : await readdir(elementsDir))
      .filter(jtsFilter)
      .forEach(file => {
        const parsed = parse(file);
        result[parsed.name] = {
          path: resolve(elementsDir, file),
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

export async function buildGlobals() {
  const results: GenFileResult[] = [];

  // skin utils
  const skinUtilsExportName = 'skinUtils';
  const skinUtilsFile = 'globals/skin-utils.ts';
  const skinUtilsTS = createGenFile()
    .addImport('lit', ['css'])
    .addImport('@tinijs/core', [
      'generateOfficialColorTokens',
      'generateOfficialGradientTokens',
    ])
    .addBlock(
      `export const ${skinUtilsExportName} =`,
      `css\`${getSkinUtils()}\``
    );
  results.push(skinUtilsTS.toResult(skinUtilsFile));

  // common styles
  const commonStylesExportName = 'commonStyles';
  const commonStylesFile = 'globals/common-styles.ts';
  const commonStylesTS = createGenFile()
    .addImport('lit', ['css'])
    .addBlock(
      `export const ${commonStylesExportName} =`,
      `css\`${getCommonStyles()}\``
    );
  results.push(commonStylesTS.toResult(commonStylesFile));

  // index
  const indexTS = createGenFile()
    .addImport(`./${tsToJS(skinUtilsFile)}`, [skinUtilsExportName])
    .addImport(`./${tsToJS(commonStylesFile)}`, [commonStylesExportName])
    .addBlock(
      'export',
      `{ ${[skinUtilsExportName, commonStylesExportName].join(', ')} }`
    )
    .addBlock(
      'export const availableGlobals =',
      `[
        ${skinUtilsExportName},
        ${commonStylesExportName},
      ]`
    );
  results.push(indexTS.toResult('global.ts'));

  // result
  return results;
}

export async function buildSkins(
  ourDir: string,
  themeFamilies: Record<string, AvailableThemeFamily>,
  config: UIConfig
) {
  const results: GenFileResult[] = [];

  const indexTS = createGenFile({
    availableSkins: {} as Record<string, string>,
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
          const skinTS = createGenFile();
          const skinNames = parseName(skinId);
          const importName = `${familyNames.varName}${skinNames.className}Skin`;
          const importPath = await rewriteImportPath(
            availableSkin.path,
            `${ourDir}/skins`,
            config.rewritePath
          );
          skinTS.addExport(importPath, [`default as ${importName}`]);
          results.push(skinTS.toResult(`skins/${familyId}-${skinId}.ts`));
          // add to index
          indexTS.addImport(`./skins/${familyId}-${skinId}.js`, [importName]);
          indexTS.data.availableSkins[`${familyId}/${skinId}`] = importName;
        }
      }
    }
  }

  indexTS
    .addBlock(
      'export',
      `{ ${Object.values(indexTS.data.availableSkins).join(', ')} }`
    )
    .addBlock('export const availableSkins =', [indexTS.data.availableSkins]);
  results.push(indexTS.toResult('skin.ts'));

  // result
  return results;
}

export async function buildBases(
  ourDir: string,
  themeFamilies: Record<string, AvailableThemeFamily>,
  config: UIConfig
) {
  const results: GenFileResult[] = [];

  const pickedFamilies = config.families || {};
  const allBases = Array.from(
    Object.keys(pickedFamilies).reduce((result, familyId) => {
      for (const baseId of Object.keys(themeFamilies[familyId]?.bases || {})) {
        result.add(baseId);
      }
      return result;
    }, new Set<string>())
  );

  const indexTS = createGenFile({
    availableBases: {} as Record<string, string>,
  });

  for (const [familyId] of Object.entries(pickedFamilies)) {
    const familyTS = createGenFile();
    const familyNames = parseName(familyId);
    const familyTSExportNames: string[] = [];
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
        familyTS.addImport(importPath, importName);
        familyTSExportNames.push(importName);
      }
    }
    const familyExportName = `${familyNames.varName}Bases`;
    if (familyTSExportNames.length) {
      familyTS.addBlock('export', `{ ${familyTSExportNames.join(', ')} }`);
    }
    familyTS.addBlock(`export const ${familyExportName} =`, [
      familyTSExportNames,
    ]);
    results.push(familyTS.toResult(`bases/${familyId}.ts`));
    // add to index
    indexTS.addImport(`./bases/${familyId}.js`, [familyExportName]);
    indexTS.data.availableBases[familyId] = familyExportName;
  }

  indexTS
    .addBlock(
      'export',
      `{ ${Object.values(indexTS.data.availableBases).join(', ')} }`
    )
    .addBlock('export const availableBases =', [indexTS.data.availableBases]);
  results.push(indexTS.toResult('base.ts'));

  // result
  return results;
}

export async function buildElements(
  ourDir: string,
  elements: Record<string, AvailableElement>,
  themeFamilies: Record<string, AvailableThemeFamily>,
  config: UIConfig
) {
  const results: GenFileResult[] = [];

  const indexTS = createGenFile({
    availableElements: [] as string[],
  });

  for (const [elementId, {path: elementPath}] of Object.entries(elements)) {
    const elementTS = createGenFile({
      depElements: [] as string[],
      themingSouls: {} as Record<string, string>,
    });

    // load build instructions
    const buildInstructions: ElementBuildInstructions = safeDestr(
      (await readFile(elementPath, 'utf8')).match(
        /\/\*\*\*([\s\S]*?)\*\*\*\//
      )?.[1] || '{}'
    );

    // dep elements
    if (buildInstructions.elements) {
      buildInstructions.elements.forEach(depElementId => {
        const depElements = parseName(depElementId);
        const depElementImportName = `Tini${depElements.className}Element`;
        const depElementImportPath = `./${depElementId}.js`;
        elementTS.addImport(depElementImportPath, [depElementImportName]);
        elementTS.data.depElements.push(depElementImportName);
      });
    }

    // original element
    const elementNames = parseName(elementId);
    const elementImportName = `Tini${elementNames.className}Element`;
    const elementImportPath = await rewriteImportPath(
      elementPath,
      `${ourDir}/elements`,
      config.rewritePath
    );
    elementTS.addImport(elementImportPath, 'OriginalElement');
    elementTS.addExport(elementImportPath, '*');
    indexTS.addImport(`./elements/${elementId}.js`, [elementImportName]);
    indexTS.data.availableElements.push(elementImportName);

    // element souls
    elementTS.addImport('@tinijs/core', ['processThemingEntry']);
    for (const [familyId] of Object.entries(config.families || {})) {
      const availableSoul = themeFamilies[familyId]?.souls[elementId];
      if (availableSoul) {
        const familyNames = parseName(familyId);
        const soulImportName = `${familyNames.varName}Soul`;
        const soulImportPath = await rewriteImportPath(
          availableSoul.path,
          `${ourDir}/elements`,
          config.rewritePath
        );
        elementTS.addImport(soulImportPath, soulImportName);
        elementTS.data.themingSouls[familyId] =
          `processThemingEntry(${soulImportName})`;
      }
    }

    // construct element file
    elementTS.addBlock(
      `export class ${elementImportName} extends OriginalElement`,
      `{
  static readonly elementName: string = '${elementNames.tagName}';
  static readonly defaultTagName: string = 'tini-${elementNames.tagName}';
  ${
    buildInstructions.raw
      ? ''
      : `static readonly theming = ${genObjectFromRaw(
          elementTS.data.themingSouls
        )};`
  }
  ${
    !buildInstructions.elements
      ? ''
      : `static readonly elements = ${genArrayFromRaw(
          elementTS.data.depElements
        )};`
  }
}`
    );

    // add framework specific
    if (config.framework === 'react') {
      elementTS
        .addImport('react', 'React')
        .addImport('@lit/react', ['createComponent']);

      elementTS.addBlock(
        `export const Tini${elementNames.className} =`,
        `createComponent(${genObjectFromRaw({
          react: 'React',
          elementClass: `Tini${elementNames.className}Element${
            !buildInstructions.reactAnyProp ? '' : ' as any'
          }`,
          tagName: `'tini-${elementNames.tagName}'`,
          ...(!buildInstructions.reactEvents
            ? {}
            : {events: JSON.stringify(buildInstructions.reactEvents)}),
        })})`
      );
    }

    results.push(elementTS.toResult(`elements/${elementId}.ts`));
  }

  indexTS
    .addBlock('export', `{ ${indexTS.data.availableElements.join(', ')} }`)
    .addBlock('export const availableElements =', [
      indexTS.data.availableElements,
    ]);
  results.push(indexTS.toResult('element.ts'));

  // result
  return results;
}

export async function buildSetup({manualSkinSelection}: UIConfig) {
  const setupTS = createGenFile();

  // imports
  setupTS
    .addImport('@tinijs/core', [
      'listify',
      'initUI',
      'registerElements',
      'mergeRecordStyles',
      'mergeDirectOrRecordStyles',
      'type RegisterElementsList',
      'type UI',
      'type UIInit',
      'type CSSResultOrNativeOrRaw',
    ])
    .addImport('./global.js', ['availableGlobals'])
    .addImport('./base.js', ['availableBases']);
  if (!manualSkinSelection) {
    setupTS.addImport('./skin.js', ['availableSkins']);
  }

  // exports
  setupTS.addExport('@tinijs/core', [
    'registerElements',
    'resolvePendingElements',
  ]);
  if (manualSkinSelection) {
    setupTS.addExport('./skin.js', '*');
  }

  // blocks
  setupTS
    .addBlock('export interface AppWithUI', '{ui: UI}')
    .addBlock(
      'export type UISetup = ',
      (manualSkinSelection ? 'UIInit' : 'Partial<UIInit>') +
        ' & {elements?: RegisterElementsList, resolvePending?: Parameters<typeof registerElements>[1]}'
    )
    .addBlock(
      `export function setupUI({host, globals, skins, shares, options, elements, resolvePending}: UISetup${
        manualSkinSelection ? '' : ' = {}'
      })`,
      `{
  const ui = initUI({
    host,
    globals: [
      ...availableGlobals,
      ...listify<CSSResultOrNativeOrRaw>(globals)
    ],
    skins: ${
      manualSkinSelection ? 'skins' : 'mergeRecordStyles(availableSkins, skins)'
    },
    shares: mergeDirectOrRecordStyles(availableBases, shares),
    options,
  });
  if (elements?.length) {
    registerElements(elements, resolvePending);
  }
  return ui;
}`
    );

  // result
  return setupTS.toResult('setup.ts');
}

export async function buildLit() {
  const litTS = createGenFile();
  // exports
  litTS.addExport('lit', ['html', 'css']);
  // result
  return litTS.toResult('lit.ts');
}

export async function buildPackageJSON(
  packageJSON: NonNullable<UIConfig['packageJSON']>,
  withIcons: boolean
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
      './setup.js': './setup.js',
      './global.js': './global.js',
      './globals/*': './globals/*',
      './base.js': './base.js',
      './bases/*': './bases/*',
      './skin.js': './skin.js',
      './skins/*': './skins/*',
      './element.js': './element.js',
      './elements/*': './elements/*',
      ...(!withIcons
        ? {}
        : {
            './icon.js': './icon.js',
            './icons/*': './icons/*',
          }),
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

export async function buildBundled(outDir: string) {
  await remove(resolve(outDir, 'bundled'));
  await execa(
    'esbuild',
    [
      '**/*.js',
      '--outdir=bundled',
      '--format=esm',
      '--sourcemap',
      '--bundle',
      '--splitting',
      '--minify',
    ],
    {stdio: 'inherit', cwd: outDir}
  );
}
