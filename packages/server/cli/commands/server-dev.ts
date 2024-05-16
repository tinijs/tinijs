import {resolve} from 'pathe';
import {gray, blueBright} from 'colorette';
import {consola} from 'consola';
import {watch} from 'chokidar';
import {execa} from 'execa';
import {createCLICommand, exposeEnvs, loadCompiler} from '@tinijs/cli';

import serverCLIExpansion from '../expansion.js';

import {onServerPublicChange} from '../utils/build.js';

export const serverDevCommand = createCLICommand(
  {
    meta: {
      name: 'dev',
      description: 'Start the development server.',
    },
    args: {
      debug: {
        alias: '-d',
        type: 'boolean',
        description: 'Log output from all commands.',
      },
    },
  },
  async (args, callbacks) => {
    const {options, tiniProject} = serverCLIExpansion.context;
    const {config: tiniConfig, hooks} = tiniProject;
    const {appWatchCommand} = options;
    const debugMode = !!args.debug;
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
    execa(
      'concurrently',
      [
        `"${watchCmd}"`,
        `"${nitroDevCmd}"`,
        '--names',
        'COMPILE,DEV',
        '--prefix-colors',
        'bgMagenta,bgBlue',
      ],
      !debugMode ? undefined : {stdio: 'inherit'}
    );
    callbacks?.onShowInfo?.([watchCmd, nitroDevCmd], debugMode);
    setTimeout(() => callbacks?.onServerStart?.(debugMode), 2000);
  },
  {
    onShowInfo: (commands: string[], debugMode: boolean) => {
      consola.info(
        `Concurrently running ${commands
          .map(command => gray(command))
          .join(' & ')}`
      );
      if (!debugMode) {
        consola.info(
          `Optionally use the flag ${gray('--debug')} to log all detail.`
        );
      }
    },
    onServerStart: (debugMode: boolean) => {
      if (debugMode) return;
      consola.info(`Server running at: ${blueBright('http://localhost:3000')}`);
    },
  }
);

export default serverDevCommand;
