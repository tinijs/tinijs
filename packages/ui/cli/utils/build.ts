import {readdir, readFile} from 'node:fs/promises';
import {pathExistsSync, outputFile, readJSON} from 'fs-extra/esm';
import typescript from 'typescript';
import {ParsedPath} from 'node:path';
import {resolve, parse, relative} from 'pathe';
import {
  genImport,
  genExport,
  genObjectFromRaw,
  genArrayFromRaw,
} from 'knitwork';
import {safeDestr} from 'destr';
import {parseName, loadProjectPackageJSON} from '@tinijs/cli';
import {UIConfig} from '@tinijs/project';

import {getSkinCommon, getDefaultGlobal} from './global.js';

const {ModuleKind, ScriptTarget} = typescript;

type GenImportParams = Parameters<typeof genImport>;
type GenExportParams = Parameters<typeof genExport>;
type GenObjectParams = Parameters<typeof genObjectFromRaw>;
type GenArrayParams = Parameters<typeof genArrayFromRaw>;

export interface ComponentBuildInstructions {
  raw?: boolean;
  components?: string[];
  reactEvents?: Record<string, string>;
  reactAnyProp?: boolean;
}

export interface BuildDef {
  imports: Array<GenImportParams>;
  exports?: Array<GenExportParams>;
  blocks: Array<[string, string | GenObjectParams | GenArrayParams]>;
}

export interface BuildResult {
  path: string;
  content: string;
}

interface AvailableItem {
  path: string;
  parsed: ParsedPath;
}
export type AvailableComponent = AvailableItem;
export interface AvailableThemeFamily {
  bases: Record<string, AvailableItem>;
  skins: Record<string, AvailableItem>;
  souls: Record<string, AvailableItem>;
}

export const TS_CONFIG = {
  declaration: true,
  sourceMap: true,
  module: ModuleKind.NodeNext,
  target: ScriptTarget.ESNext,
  lib: ['ESNext', 'DOM'],
  experimentalDecorators: true,
  useDefineForClassFields: false,
};

function jtsOnlyFilter(file: string) {
  return file.endsWith('.ts') || file.endsWith('.js');
}

function renameTSToJS(path: string) {
  return path.replace(/\.ts$/, '.js');
}

function resolveSourceDir(sourceDir: string) {
  return /^\.\.?(\/|\\)/.test(sourceDir)
    ? resolve(sourceDir)
    : resolve('node_modules', sourceDir, 'dist', 'ui');
}

export function constructFileContent(def: BuildDef) {
  const imports = def.imports.map(args => genImport(...args));
  const exports_ = !def.exports
    ? []
    : def.exports.map(args => genExport(...args));
  const blocks = def.blocks.map(([key, value]) => {
    if (value instanceof Array) {
      if (value[0] instanceof Array) {
        return `${key} ${genArrayFromRaw(...(value as GenArrayParams))};`;
      } else {
        return `${key} ${genObjectFromRaw(...(value as GenObjectParams))};`;
      }
    } else {
      return `${key} ${value};`;
    }
  });
  return [imports.join('\n'), exports_.join('\n'), blocks.join('\n\n')].join(
    '\n\n'
  );
}

export async function outputBuildResults(
  outDir: string,
  resultOrResults: BuildResult | BuildResult[]
) {
  for (const result of resultOrResults instanceof Array
    ? resultOrResults
    : [resultOrResults]) {
    await outputFile(resolve(outDir, result.path), result.content);
  }
}

export async function listAvailableComponentsAndThemeFamilies(
  sourceDirs: string[]
) {
  return {
    components: await listAvailableComponents(sourceDirs),
    themeFamilies: await listAvailableThemeFamilies(sourceDirs),
  };
}

export async function listAvailableComponents(sourceDirs: string[]) {
  const result = {} as Record<string, AvailableComponent>;
  for (const sourceDir of sourceDirs) {
    const componentsDir = resolve(resolveSourceDir(sourceDir), 'components');
    (!pathExistsSync(componentsDir) ? [] : await readdir(componentsDir))
      .filter(jtsOnlyFilter)
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
        .filter(jtsOnlyFilter)
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
        .filter(jtsOnlyFilter)
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
        .filter(jtsOnlyFilter)
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
  const file: BuildDef = {
    imports: [],
    blocks: [],
  };

  file.imports.push(['lit', ['css']]);

  file.blocks.push([
    'export const globalStyles =',
    `css\`${getSkinCommon()}${getDefaultGlobal()}\``,
  ]);

  return {
    path: 'global.ts',
    content: constructFileContent(file),
  } as BuildResult;
}

export async function buildSkins(
  ourDir: string,
  themeFamilies: Record<string, AvailableThemeFamily>,
  pick: NonNullable<UIConfig['pick']>
) {
  const results: BuildResult[] = [];

  const indexTS: BuildDef = {
    imports: [],
    blocks: [],
  };
  const indexTSExportNames: string[] = [];
  const indexTSExportDefaultValue: Record<string, string> = {};
  for (const [familyId, {skins: pickedSkins}] of Object.entries(
    pick.families
  )) {
    const family = themeFamilies[familyId];
    if (family) {
      const familyNames = parseName(familyId);
      for (const skinId of pickedSkins) {
        const availableSkin = family.skins[skinId];
        if (availableSkin) {
          const skinNames = parseName(skinId);
          const importName = `${familyNames.varName}${skinNames.className}SkinStyles`;
          const importPath = relative(
            resolve(ourDir, 'skins'),
            renameTSToJS(availableSkin.path)
          );
          indexTSExportNames.push(importName);
          indexTS.imports.push([importPath, importName]);
          indexTSExportDefaultValue[`${familyId}/${skinId}`] = importName;
        }
      }
    }
  }
  indexTS.blocks.push(['export', `{ ${indexTSExportNames.join(', ')} }`]);
  indexTS.blocks.push([
    'export const availableSkins =',
    [indexTSExportDefaultValue],
  ]);
  results.push({
    path: 'skins/index.ts',
    content: constructFileContent(indexTS),
  });

  // result
  return results;
}

export async function buildBases(
  ourDir: string,
  themeFamilies: Record<string, AvailableThemeFamily>,
  pick: NonNullable<UIConfig['pick']>
) {
  const results: BuildResult[] = [];

  const pickedBases = !pick.bases
    ? []
    : !~pick.bases.indexOf('*')
      ? pick.bases
      : Object.values(themeFamilies).reduce(
          (result, {bases}) => [...result, ...Object.keys(bases)],
          [] as string[]
        );

  const indexTS: BuildDef = {
    imports: [],
    blocks: [],
  };
  const indexTSExportDefaultValue: Record<string, string> = {};
  for (const [familyId] of Object.entries(pick.families)) {
    const familyNames = parseName(familyId);
    const familyTS: BuildDef = {
      imports: [],
      blocks: [],
    };
    const familyTSExportNames: string[] = [];
    const familyTSExportDefaultValue: string[] = [];
    for (const baseId of pickedBases) {
      const availableBase = themeFamilies[familyId]?.bases[baseId];
      if (availableBase) {
        const baseNames = parseName(baseId);
        const importName = `${familyNames.varName}${baseNames.className}BaseStyles`;
        const importPath = relative(
          resolve(ourDir, 'bases'),
          renameTSToJS(availableBase.path)
        );
        familyTSExportNames.push(importName);
        familyTS.imports.push([importPath, importName]);
        familyTSExportDefaultValue.push(importName);
      }
    }
    if (familyTSExportNames.length) {
      familyTS.blocks.push(['export', `{ ${familyTSExportNames.join(', ')} }`]);
    }
    familyTS.blocks.push([
      `export const ${familyNames.varName}BaseStyles =`,
      [familyTSExportDefaultValue],
    ]);
    results.push({
      path: `bases/${familyId}.ts`,
      content: constructFileContent(familyTS),
    });

    const importName = `${familyNames.varName}BaseStyles`;
    const importPath = `./${familyId}.js`;
    indexTS.imports.push([importPath, [importName]]);
    indexTSExportDefaultValue[familyId] = importName;
  }

  indexTS.blocks.push([
    'export const basesMetadata =',
    [
      {
        pickedBases: JSON.stringify(pickedBases),
      },
    ],
  ]);
  indexTS.blocks.push([
    'export const availableBases =',
    [indexTSExportDefaultValue],
  ]);
  results.push({
    path: 'bases/index.ts',
    content: constructFileContent(indexTS),
  });

  // result
  return results;
}

export async function buildComponents(
  ourDir: string,
  components: Record<string, AvailableComponent>,
  themeFamilies: Record<string, AvailableThemeFamily>,
  pick: NonNullable<UIConfig['pick']>,
  react?: boolean
) {
  const results: BuildResult[] = [];

  for (const [componentId, {path: componentPath}] of Object.entries(
    components
  )) {
    const componentTS: BuildDef = {
      imports: [],
      exports: [],
      blocks: [],
    };

    const buildInstructions: ComponentBuildInstructions = safeDestr(
      (await readFile(componentPath, 'utf8')).match(
        /\/\*\*\*([\s\S]*?)\*\*\*\//
      )?.[1] || '{}'
    );

    const componentTSComponentsValue = [] as string[];
    if (buildInstructions.components) {
      buildInstructions.components.forEach(componentId => {
        const componentNames = parseName(componentId);
        const componentImportName = `Tini${componentNames.className}Component`;
        const componentImportPath = `./${componentId}.js`;
        componentTS.imports.push([componentImportPath, componentImportName]);
        componentTSComponentsValue.push(componentImportName);
      });
    }

    const componentNames = parseName(componentId);
    const componentImportName = `Tini${componentNames.className}Component`;
    const componentImportPath = relative(
      resolve(ourDir, 'components'),
      renameTSToJS(componentPath)
    );
    componentTS.imports.push([componentImportPath, 'OriginalComponent']);
    componentTS.exports!.push([componentImportPath, '*']);

    const componentTSThemingValue = {} as Record<string, string>;
    for (const [familyId] of Object.entries(pick.families)) {
      const availableSoul = themeFamilies[familyId]?.souls[componentId];
      if (availableSoul) {
        const familyNames = parseName(familyId);
        const importName = `${familyNames.varName}Soul`;
        const importPath = relative(
          resolve(ourDir, 'components'),
          renameTSToJS(availableSoul.path)
        );
        componentTS.imports.push([importPath, importName]);
        componentTSThemingValue[familyId] = importName;
      }
    }

    componentTS.blocks.push([
      `export class ${componentImportName} extends OriginalComponent`,
      `{
  static readonly componentName: string = '${componentNames.tagName}';
  static readonly defaultTagName: string = 'tini-${componentNames.tagName}';
  ${
    buildInstructions.raw
      ? ''
      : `static readonly theming = ${genObjectFromRaw(
          componentTSThemingValue
        )};`
  }
  ${
    !buildInstructions.components
      ? ''
      : `static readonly components = ${genArrayFromRaw(
          componentTSComponentsValue
        )};`
  }
}`,
    ]);

    if (react) {
      componentTS.imports.push(
        ['react', 'React'],
        ['@lit/react', ['createComponent']]
      );

      componentTS.blocks.push([
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
        })})`,
      ]);
    }

    results.push({
      path: `components/${componentId}.ts`,
      content: constructFileContent(componentTS),
    });
  }

  // result
  return results;
}

export async function buildSetup() {
  const file: BuildDef = {
    imports: [],
    blocks: [],
  };

  file.imports.push(['@tinijs/core', ['initUI', 'listifyStyles']]);
  file.imports.push(['./global.js', ['globalStyles']]);
  file.imports.push(['./skins/index.js', ['availableSkins']]);
  file.imports.push(['./bases/index.js', ['availableBases', 'basesMetadata']]);

  file.blocks.push([
    'export async function setupUI()',
    `{
    return initUI({
      global: globalStyles,
      skins: availableSkins,
      shares: availableBases,
      internal: {
        basesMetadata,
      }
    });
  }`,
  ]);

  return {
    path: 'setup.ts',
    content: constructFileContent(file),
  } as BuildResult;
}

export async function buildPublicAPI(results: BuildResult[]) {
  const contentArr: string[] = results.map(
    ({path}) => `export * from './${renameTSToJS(path)}';`
  );
  return {
    path: 'public-api.ts',
    content: contentArr.join('\n'),
  } as BuildResult;
}

export async function buildDistributable(
  distributable: NonNullable<UIConfig['distributable']>
) {
  const result: BuildResult[] = [];

  const {packageJSON} = (
    distributable === true ? {} : distributable
  ) as Exclude<typeof distributable, true>;

  // package.json
  const projectPackageJSON = await loadProjectPackageJSON();
  result.push({
    path: 'package.json',
    content: JSON.stringify(
      {
        ...projectPackageJSON,
        ...(!packageJSON
          ? {}
          : typeof packageJSON !== 'string'
            ? packageJSON
            : await readJSON(resolve(packageJSON))),
        scripts: {},
        dependencies: {},
        devDependencies: {},
        peerDependencies: {},
        type: 'module',
        exports: {
          '.': './public-api.js',
          './icons/*': './icons/*',
        },
        files: ['*'],
      },
      null,
      2
    ),
  });

  return result;
}
