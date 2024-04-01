import {blueBright} from 'colorette';
import {consola} from 'consola';

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

export const moduleCommand = createCLICommand(
  {
    meta: {
      name: 'module',
      description: 'Add a module to the current project.',
    },
    args: {
      packageName: {
        type: 'positional',
        description: 'The package name to install.',
      },
      tag: {
        alias: 't',
        type: 'string',
        description: 'Use the custom version of the package.',
      },
    },
  },
  async (args, callbacks) => {
    if (!isGitClean()) return errorUncleanGit();
    const {config: tiniConfig} = await getTiniProject();
    // install packages
    await installPackage(args.packageName, args.tag);
    // handle init
    const moduleConfig = await loadVendorModule(args.packageName);
    if (moduleConfig?.init) {
      const {copy, scripts, buildCommand, run} = moduleConfig.init(tiniConfig);
      // copy assets
      if (copy) await copyAssets(args.packageName, copy);
      // add scripts
      if (scripts) await updateScripts(scripts, buildCommand);
      // run
      if (run) await initRun(run);
    }
    // done
    callbacks?.onEnd(args.packageName);
  },
  {
    onEnd: (packageName: string) =>
      consola.success(`Add module ${blueBright(packageName)} successfully.`),
  }
);

export default moduleCommand;
