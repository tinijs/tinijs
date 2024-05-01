import {readFile} from 'node:fs/promises';
import {remove, outputFile, copy} from 'fs-extra/esm';
import {execa} from 'execa';
import {resolve} from 'pathe';

import type {ServerCLIExpansionOptions} from '../expand.js';

export async function buildApp(
  appBuildCommand: ServerCLIExpansionOptions['appBuildCommand'],
  quietly = false
) {
  const [appBuildCmd, ...appBuildArgs] = !appBuildCommand
    ? ['tini', 'build']
    : appBuildCommand instanceof Array
      ? appBuildCommand
      : appBuildCommand.split(' ');
  await execa(
    appBuildCmd,
    appBuildArgs,
    quietly ? undefined : {stdio: 'inherit'}
  );
}

export async function preNitroBuild(appOutDir: string) {
  const indexHTMLPath = resolve(appOutDir, 'index.html');
  const indexHTMLContent = await readFile(indexHTMLPath, 'utf8');
  await remove(indexHTMLPath);
  return indexHTMLContent;
}

export async function postNitroBuild(outDir: string, indexHTMLContent: string) {
  return outputFile(resolve(outDir, 'server', 'index.html'), indexHTMLContent);
}

export async function onServerPublicChange(path: string) {
  if (!path.endsWith('/server/public/index.html')) return;
  await copy(path, resolve('server', '.nitro', 'dev', 'index.html'));
  await remove(path);
}
