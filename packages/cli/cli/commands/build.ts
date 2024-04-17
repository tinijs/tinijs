import {resolve} from 'pathe';
import {execa} from 'execa';
import {remove} from 'fs-extra/esm';

import {getTiniProject} from '@tinijs/project';

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
        description: 'Target: production (default), qa1, any, ...',
      },
    },
  },
  async args => {
    const targetEnv = args.target || 'production';
    const tiniProject = await getTiniProject();
    const {config: tiniConfig, hooks} = tiniProject;
    //  preparation
    exposeEnvs(tiniConfig, targetEnv);
    const compiler = await loadCompiler(tiniProject);
    const builder = await loadBuilder(tiniProject);
    // clean
    await remove(resolve(tiniConfig.outDir));
    // compile
    await compiler?.compile();
    // build
    await hooks.callHook('build:before');
    if (builder.build instanceof Function) {
      await builder.build();
    } else {
      const buildCommand = builder.build.command;
      const [cmd, ...args] =
        typeof buildCommand !== 'string'
          ? buildCommand
          : buildCommand.split(' ');
      await execa(cmd, args, {stdio: 'inherit'});
    }
    await hooks.callHook('build:after');
  }
);

export default buildCommand;
