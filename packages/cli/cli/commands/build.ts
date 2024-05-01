import {resolve} from 'pathe';
import {execa} from 'execa';
import {consola} from 'consola';
import {gray, green} from 'colorette';
import {remove} from 'fs-extra/esm';

import {getTiniProject, getProjectDirs} from '@tinijs/project';

import {exposeEnvs, loadCompiler, loadBuilder} from '../utils/build.js';
import {createCLICommand} from '../utils/cli.js';

export const buildCommand = createCLICommand(
  {
    meta: {
      name: 'build',
      description: 'Build the app.',
    },
    args: {
      target: {
        alias: 't',
        type: 'string',
        description: 'Target: production (default), stage, qa, ...',
      },
      clean: {
        alias: 'c',
        type: 'boolean',
        description: 'Clean the output dir.',
      },
    },
  },
  async (args, callbacks) => {
    const tiniProject = await getTiniProject();
    const {config: tiniConfig, hooks} = tiniProject;
    const {srcDir, compileDir, outDir} = getProjectDirs(tiniConfig);
    //  preparation
    exposeEnvs(tiniConfig, args.target || 'production');
    const compiler = await loadCompiler(tiniProject);
    const builder = await loadBuilder(tiniProject);
    // clean
    if (args.clean) await remove(resolve(outDir));
    // start build
    await hooks.callHook('build:before');
    if (builder.build instanceof Function) {
      await builder.build();
    } else {
      // compile
      await compiler?.compile();
      // build
      const buildCommand = builder.build.command;
      const [cmd, ...args] =
        typeof buildCommand !== 'string'
          ? buildCommand
          : buildCommand.split(' ');
      callbacks?.onShowInfo?.(`${cmd} ${args.join(' ')}`, {
        yes: tiniConfig.compile !== false,
        srcDir,
        compileDir,
      });
      await execa(cmd, args, {stdio: 'inherit'});
    }
    await hooks.callHook('build:after');
  },
  {
    onShowInfo: (
      command: string,
      compile: {
        yes: boolean;
        srcDir: string;
        compileDir: string;
      }
    ) => {
      if (compile.yes) {
        consola.info(
          `Compile app from ${green(compile.srcDir)} to ${green(
            compile.compileDir
          )}.`
        );
      }
      consola.info(`Build app using ${gray(command)}`);
    },
  }
);

export default buildCommand;
