import {resolve} from 'pathe';
import {execaCommand} from 'execa';
import {remove} from 'fs-extra/esm';

import {getTiniProject} from '@tinijs/project';

import {loadCompiler, loadBuilder, buildPublic} from '../utils/build.js';
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
    process.env.NODE_ENV = targetEnv;
    process.env.TARGET_ENV = targetEnv;
    const tiniProject = await getTiniProject();
    const {config: tiniConfig, hooks} = tiniProject;
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
      await execaCommand(builder.build.command, {stdio: 'inherit'});
    }
    await buildPublic(tiniConfig);
    await hooks.callHook('build:after');
  }
);

export default buildCommand;
