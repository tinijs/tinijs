import {resolve} from 'pathe';
import {gray, blueBright} from 'colorette';
import {consola} from 'consola';
import {concurrently} from 'concurrently';
import {watch} from 'chokidar';
import {createCLICommand, exposeEnvs, loadCompiler} from '@tinijs/cli';

import serverCLIExpansion from '../expand.js';

import {onServerPublicChange} from '../utils/build.js';

export const serverDevCommand = createCLICommand(
  {
    meta: {
      name: 'dev',
      description: 'Start the development server.',
    },
  },
  async (args, callbacks) => {
    const {options, tiniProject} = serverCLIExpansion.context;
    const {config: tiniConfig, hooks} = tiniProject;
    const {appBuildCommand, appWatchCommand} = options;
    //  preparation
    exposeEnvs(tiniConfig, 'development');
    const compiler = await loadCompiler(tiniProject);
    // initial actions
    await hooks.callHook('dev:before');
    await compiler?.compile();
    // watch for index.html changes
    watch(resolve('server', 'public'), {ignoreInitial: true})
      .on('add', onServerPublicChange)
      .on('change', onServerPublicChange);
    // watch client app and start Nitro dev server
    const watchCmd = !appWatchCommand
      ? 'tini watch --lazy'
      : typeof appWatchCommand === 'string'
        ? appWatchCommand
        : appWatchCommand.join(' ');
    const nitroDevCmd = 'nitro dev --dir server --port 3000';
    concurrently([{command: watchCmd}, {command: nitroDevCmd}]);
    callbacks?.onShowDebug?.([watchCmd, nitroDevCmd]);
    setTimeout(() => callbacks?.onServerStart?.(), 3000);
  },
  {
    onShowDebug: (commands: string[]) =>
      consola.info(
        `Concurrently running ${commands
          .map(command => gray(command))
          .join(' & ')}`
      ),
    onServerStart: () =>
      consola.info(`Server running at: ${blueBright('http://localhost:3000')}`),
  }
);

export default serverDevCommand;
