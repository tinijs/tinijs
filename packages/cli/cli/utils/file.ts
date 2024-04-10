import {resolve} from 'pathe';
import {ParsedPath} from 'node:path';
import {readFile} from 'node:fs/promises';
import recursiveReaddir from 'recursive-readdir';
import {ensureDir, remove, outputFile, readJSON, writeJSON} from 'fs-extra/esm';
import {
  genImport,
  genExport,
  genObjectFromRaw,
  genArrayFromRaw,
} from 'knitwork';
import {Promisable} from 'type-fest';

export interface AvailableFile {
  path: string;
  parsed: ParsedPath;
}

export type GenImportParams = Parameters<typeof genImport>;
export type GenExportParams = Parameters<typeof genExport>;
export type GenObjectParams = Parameters<typeof genObjectFromRaw>;
export type GenArrayParams = Parameters<typeof genArrayFromRaw>;

export interface GenFileContent {
  imports: Array<GenImportParams>;
  exports: Array<GenExportParams>;
  blocks: Array<[string, string | GenObjectParams | GenArrayParams]>;
}

export interface GenFileResult {
  path: string;
  content: string;
}

export function removeFiles(filePaths: string[]) {
  return Promise.all(filePaths.map(filePath => remove(filePath)));
}

export async function cleanDir(dirPath: string) {
  await remove(dirPath);
  return ensureDir(dirPath);
}

export async function listDir(dirPath: string, ignores?: string[]) {
  return recursiveReaddir(dirPath, ignores);
}

export async function modifyTextFile(
  filePath: string,
  modifier: (content: string) => Promisable<string>
) {
  filePath = resolve(filePath);
  const content = await readFile(filePath, 'utf8');
  return outputFile(filePath, await modifier(content));
}

export async function modifyJSONFile<Type>(
  filePath: string,
  modifier: (content: Type) => Promisable<Type>,
  options?: Parameters<typeof writeJSON>[2]
) {
  filePath = resolve(filePath);
  const data = (await readJSON(filePath)) as Type;
  return writeJSON(filePath, await modifier(data), options);
}

export function tsToJS(filePath: string) {
  return filePath.replace(/\.ts$/, '.js');
}

export function jsFilter(filePath: string) {
  return filePath.endsWith('.js');
}

export function tsFilter(filePath: string) {
  return filePath.endsWith('.ts') && !filePath.endsWith('.d.ts');
}

export function jtsFilter(filePath: string) {
  return jsFilter(filePath) || tsFilter(filePath);
}

export function constructGenFileContent(def: GenFileContent) {
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

export async function outputGenFileResults(
  outDir: string,
  resultOrResults: GenFileResult | GenFileResult[]
) {
  for (const result of resultOrResults instanceof Array
    ? resultOrResults
    : [resultOrResults]) {
    await outputFile(resolve(outDir, result.path), result.content);
  }
}

export function createGenFile<Data>(data: Data = {} as Data) {
  return new GenFile(data);
}

export class GenFile<Data> {
  private _file: GenFileContent = {
    imports: [],
    exports: [],
    blocks: [],
  };

  constructor(public data: Data) {}

  addImport(...args: GenImportParams) {
    this._file.imports.push(args);
    return this as GenFile<Data>;
  }

  addExport(...args: GenExportParams) {
    this._file.exports.push(args);
    return this as GenFile<Data>;
  }

  addBlock(key: string, value: string | GenObjectParams | GenArrayParams) {
    this._file.blocks.push([key, value]);
    return this as GenFile<Data>;
  }

  toResult(path: string): GenFileResult {
    return {
      path,
      content: constructGenFileContent(this._file),
    };
  }
}
