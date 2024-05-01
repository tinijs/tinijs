import {execa} from 'execa';
import {resolve} from 'pathe';
import {gray, green, cyan} from 'colorette';
import {consola} from 'consola';
import {pathExistsSync} from 'fs-extra/esm';
import {getTiniConfigFilePath} from '@tinijs/project';

import {downloadAndUnzip} from '../utils/download.js';
import {loadCLIPackageJSON} from '../utils/project.js';
import {createCLICommand} from '../utils/cli.js';

async function fetchLatestReleaseTag(repo: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${repo}/releases/latest`;
  const response = await fetch(url);
  if (!response.ok) return null;
  const data = await response.json();
  return !data.tag_name ? null : data.tag_name;
}

export const newCommand = createCLICommand(
  {
    meta: {
      name: 'new',
      description: 'Create a new project.',
    },
    args: {
      projectName: {
        type: 'positional',
        description: 'The project name.',
      },
      template: {
        alias: 't',
        type: 'string',
        description: 'Use a custom template instead the default.',
      },
      version: {
        alias: 'v',
        type: 'string',
        description: 'Use a custom version of the template.',
      },
      skipInstall: {
        alias: 'i',
        type: 'boolean',
        description: 'Do not run npm install.',
      },
      skipGit: {
        alias: 'g',
        type: 'boolean',
        description: 'Do not initialize a git repository.',
      },
    },
  },
  async (args, callbacks) => {
    // process project name
    const projectName = args.projectName
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, ' ')
      .replace(/ /g, '-');
    const projectPath = resolve(projectName);
    if (pathExistsSync(projectPath)) {
      return callbacks?.onProjectExists?.(projectName);
    }
    // process template
    const template = args.template || 'bare';
    const repo = template.includes('/')
      ? template
      : `tinijs/${template}-starter`;
    const tag = args.version || (await fetchLatestReleaseTag(repo));
    if (!tag) return callbacks?.onInvalidTag?.(repo);
    // download and unzip
    const resourceUrl = `https://api.github.com/repos/${repo}/zipball/${tag}`;
    callbacks?.onBeforeCreate?.(projectName, resourceUrl);
    try {
      await downloadAndUnzip(resourceUrl, projectPath + '/download.zip');
    } catch (error) {
      return callbacks?.onCorruptedResource?.();
    }
    // post process
    const execaOptions = {
      stdio: 'inherit',
      cwd: projectPath,
    } as const;
    if (!args.skipInstall) {
      // install dependencies
      await execa('npm', ['i', '--loglevel', 'error'], execaOptions);
    }
    if (!args.skipGit) {
      // init git
      await execa('git', ['init'], execaOptions);
    }
    // instruction
    const {version: tiniVersion} = await loadCLIPackageJSON();
    const tiniConfigPath = getTiniConfigFilePath(projectPath);
    callbacks?.onEnd?.(projectName, tiniVersion, tiniConfigPath);
  },
  {
    onProjectExists: (projectName: string) =>
      consola.error(
        `A project with the name "${green(projectName)}" is already exist!`
      ),
    onInvalidTag: (repo: string) =>
      consola.error(`No release version found for repo ${repo}!`),
    onCorruptedResource: () =>
      consola.error(
        'Failed to download or extract, please check the resource!'
      ),
    onBeforeCreate: (projectName: string, resourceUrl: string) => {
      consola.info(`Create a new TiniJS project: ${green(projectName)}`);
      consola.info(`From: ${gray(resourceUrl)}`);
    },
    onEnd: (
      projectName: string,
      tiniVersion: string | undefined,
      tiniConfigPath: string | null
    ) =>
      !tiniConfigPath
        ? consola.success('Project created successfully!')
        : consola.log(`
${gray(`TiniJS v${tiniVersion || '0.0.0'}`)}
✨ Thank you for using TiniJS! ✨

What's next?
› ${cyan('cd ' + projectName)}
› Start development: ${cyan('npm run dev')}
› Build production: ${cyan('npm run build')}
› Preview production: ${cyan('npm run preview')}
› For more, please visit: ${cyan('https://tinijs.dev')}
    `),
  }
);

export default newCommand;
