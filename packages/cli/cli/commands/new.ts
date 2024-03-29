import {execaCommand} from 'execa';
import {resolve} from 'pathe';
import {gray, green, cyan} from 'colorette';
import {consola} from 'consola';
import {pathExistsSync} from 'fs-extra/esm';

import {downloadAndUnzip} from '../../lib/utils/download.js';
import {loadCLIPackageJSON} from '../../lib/utils/project.js';
import {createCLICommand} from '../../lib/utils/cli.js';

export const newCommand = createCLICommand(
  {
    meta: {
      name: 'new',
      description: 'Create a new project.',
    },
    args: {
      projectName: {
        type: 'positional',
        description: 'Project name.',
      },
      latest: {
        alias: 'l',
        type: 'boolean',
        description: 'Install the latest template.',
      },
      source: {
        alias: 's',
        type: 'string',
        description: 'Use a custom template instead the official.',
      },
      tag: {
        alias: 't',
        type: 'string',
        description: 'Use a custom version of the tempalte.',
      },
      skipGit: {
        alias: 'g',
        type: 'boolean',
        description: 'Do not initialize a git repository.',
      },
      skipUI: {
        alias: 'u',
        type: 'boolean',
        description: 'Do not run: "tini ui use".',
      },
    },
  },
  async (args, callbacks) => {
    const {version: tiniVersion} = await loadCLIPackageJSON();
    const source = args.source || 'tinijs/skeleton';
    const tag = args.latest ? 'latest' : args.tag || `v${tiniVersion}`;
    const resourceUrl = `https://github.com/${source}/archive/refs/tags/${tag}.zip`;
    const projectName = args.projectName
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, ' ')
      .replace(/ /g, '-');
    const projectPath = resolve(projectName);
    // exists
    if (pathExistsSync(projectPath)) {
      return callbacks?.onProjectExists(projectName);
    }
    callbacks?.onBeforeCreate(projectName, resourceUrl);
    // download
    await downloadAndUnzip(resourceUrl, projectPath + '/download.zip');
    const execaOptions = {
      stdio: 'inherit',
      cwd: projectPath,
    } as const;
    // install dependencies
    await execaCommand('npm i --loglevel=error', execaOptions);
    // tini ui use
    if (!args.skipUI) {
      await execaCommand('tini ui use --build-only --skip-help', execaOptions);
    }
    // init git
    if (!args.skipGit) {
      await execaCommand('git init', execaOptions);
    }
    // instruction
    callbacks?.onEnd(projectName, tiniVersion as string);
  },
  {
    onProjectExists: (projectName: string) =>
      consola.error(
        `A project with the name "${green(projectName)}" is already exist!`
      ),
    onBeforeCreate: (projectName: string, resourceUrl: string) => {
      consola.info(
        `\nCreate a new TiniJS project: ${green(projectName)}`,
        true
      );
      consola.info(`From: ${gray(resourceUrl)}\n`, true);
    },
    onEnd: (projectName: string, tiniVersion: string) =>
      consola.log(`
${gray('TiniJS ' + tiniVersion)}
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
