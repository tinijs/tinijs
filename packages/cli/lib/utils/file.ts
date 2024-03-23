import {resolve} from 'pathe';
import recursiveReaddir from 'recursive-readdir';
import {readFile} from 'node:fs/promises';
import {ensureDir, remove, outputFile, readJSON, writeJSON} from 'fs-extra/esm';
import {Promisable} from 'type-fest';

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
