import {concurrently} from 'concurrently';
import {consola} from 'consola';
import {execa} from 'execa';
import {blueBright, gray} from 'colorette';

import {getTiniProject} from '@tinijs/project';

import {exposeEnvs, loadBuilder} from '../utils/build.js';
import {createCLICommand} from '../utils/cli.js';

export const devCommand = createCLICommand(
  {
    meta: {
      name: 'dev',
      description: 'Start the dev server.',
    },
  },
  async (args, callbacks) => {
    const tiniProject = await getTiniProject();
    const {config: tiniConfig, hooks} = tiniProject;
    // preparation
    exposeEnvs(tiniConfig, 'development');
    const builder = await loadBuilder(tiniProject);
    // start dev
    await hooks.callHook('dev:before');
    if (builder.dev instanceof Function) {
      await builder.dev();
    } else {
      const devCommand = builder.dev.command;
      if (tiniConfig.compile !== false) {
        const compileCmd = 'tini compile --watch';
        const devCmd =
          typeof devCommand === 'string' ? devCommand : devCommand.join(' ');
        concurrently([{command: compileCmd}, {command: devCmd}]);
        callbacks?.onShowDebug([compileCmd, devCmd]);
        const customOnServerStart = builder.dev.onServerStart;
        setTimeout(
          () => callbacks?.onServerStart(builder.options, customOnServerStart),
          2000
        );
      } else {
        const [cmd, ...args] =
          typeof devCommand !== 'string' ? devCommand : devCommand.split(' ');
        await execa(cmd, args, {stdio: 'inherit'});
      }
    }
  },
  {
    onShowDebug: (commands: string[]) =>
      consola.info(
        `Concurrently running ${commands
          .map(command => gray(command))
          .join(' & ')}`
      ),
    onServerStart: (
      {devHost, devPort}: Record<string, any>,
      customCallback?: () => void
    ) =>
      customCallback
        ? customCallback()
        : consola.info(
            `Server running at: ${blueBright(
              `http://${devHost || 'localhost'}:${devPort || '3000'}`
            )}`
          ),
  }
);

export default devCommand;
