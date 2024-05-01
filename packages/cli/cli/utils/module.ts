import {resolve} from 'pathe';
import {copy as copyFileOrDir, pathExistsSync} from 'fs-extra/esm';
import {execa} from 'execa';

import type {ModuleInit} from '@tinijs/project';

import {modifyProjectPackageJSON} from './project.js';

export async function installPackage(packageName: string, version?: string) {
  return execa(
    'npm',
    [
      'i',
      `${packageName}${!version ? '' : `@${version}`}`,
      '--loglevel',
      'error',
    ],
    {stdio: 'inherit'}
  );
}

export async function copyAssets(
  packageName: string,
  copy: NonNullable<ModuleInit['copy']>
) {
  for (const from in copy) {
    const fromPath = resolve('node_modules', packageName, from);
    const toPath = resolve(copy[from]);
    if (pathExistsSync(fromPath)) {
      await copyFileOrDir(fromPath, toPath);
    }
  }
}

export async function updateScripts(
  scripts: NonNullable<ModuleInit['scripts']>,
  devCommand?: ModuleInit['devCommand'],
  buildCommand?: ModuleInit['buildCommand']
) {
  let multipleDevCommands = false;
  await modifyProjectPackageJSON(async data => {
    // scripts.dev
    const devCommands = [
      (data.scripts as any).dev,
      !devCommand ? undefined : devCommand,
    ].filter(Boolean);
    multipleDevCommands = devCommands.length > 1;
    const dev = !multipleDevCommands
      ? devCommands[0]
      : `concurrently ${devCommands.map(item => `"${item}"`).join(' ')}`;
    // scripts.build
    const build = [
      (data.scripts as any).build,
      !buildCommand ? undefined : buildCommand,
    ]
      .filter(Boolean)
      .join(' && ');
    // update scripts
    data.scripts = {
      ...data.scripts,
      ...(!dev ? {} : {dev}),
      ...(!build ? {} : {build}),
      ...scripts,
    };
    // save updated package.json
    return data;
  });
  // install concurrently
  if (multipleDevCommands) {
    await installPackage('concurrently');
  }
}

export async function initRun(run: NonNullable<ModuleInit['run']>) {
  if (run instanceof Function) return run();
  if (!run.startsWith('npx ')) return execa('npm', ['run', run]);
  const [command, ...args] = run.slice(4).split(' ');
  return execa(command, args);
}
