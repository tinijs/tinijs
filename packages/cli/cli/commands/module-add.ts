import {blueBright} from 'colorette';
import ora from 'ora';

import {getTiniProject, loadVendorModule} from '@tinijs/project';

import {errorUncleanGit} from '../utils/message.js';
import {
  installPackage,
  copyAssets,
  updateScripts,
  initRun,
} from '../utils/module.js';
import {isGitClean} from '../utils/git.js';
import {createCLICommand} from '../utils/cli.js';

const SPINNER = ora();

export const moduleAddCommand = createCLICommand(
  {
    meta: {
      name: 'module-add',
      description: 'Add a module to the current project.',
    },
    args: {
      packageName: {
        type: 'positional',
        description: 'The package name to install.',
      },
      version: {
        alias: 'v',
        type: 'string',
        description: 'Use the custom version of the package.',
      },
    },
  },
  async (args, callbacks) => {
    if (!isGitClean()) return errorUncleanGit();
    const {config: tiniConfig} = await getTiniProject();
    // install packages
    await installPackage(args.packageName, args.version);

    // handle init
    callbacks?.onStart?.(args.packageName);
    const moduleConfig = await loadVendorModule(args.packageName);
    if (moduleConfig?.init) {
      const {copy, scripts, buildCommand, run} = moduleConfig.init(tiniConfig);
      // copy assets
      if (copy) {
        callbacks?.onCopyAssets?.();
        await copyAssets(args.packageName, copy);
      }
      // add scripts
      if (scripts) {
        callbacks?.onUpdateScripts?.();
        await updateScripts(scripts, buildCommand);
      }
      // run
      if (run) {
        callbacks?.onInitRun?.();
        await initRun(run);
      }
    }
    // done
    callbacks?.onEnd?.(args.packageName);
  },
  {
    onStart: (packageName: string) => {
      SPINNER.start(
        `Load initial instruction for module ${blueBright(packageName)}.`
      );
    },
    onCopyAssets: () => (SPINNER.text = 'Copy assets.'),
    onUpdateScripts: () => (SPINNER.text = 'Update scripts.'),
    onInitRun: () => (SPINNER.text = 'Run initial tasks.'),
    onEnd: (packageName: string) =>
      SPINNER.succeed(`Add module ${blueBright(packageName)} successfully.\n`),
  }
);

export default moduleAddCommand;
