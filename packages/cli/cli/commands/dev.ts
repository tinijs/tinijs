import {consola} from 'consola';
import {execa} from 'execa';
import {blueBright, gray} from 'colorette';

import {getTiniProject, type OnDevServerStartContext} from '@tinijs/project';

import {exposeEnvs, loadCompiler, loadBuilder} from '../utils/build.js';
import {createCLICommand} from '../utils/cli.js';

export const devCommand = createCLICommand(
  {
    meta: {
      name: 'dev',
      description: 'Start the dev server.',
    },
    args: {
      debug: {
        alias: '-d',
        type: 'boolean',
        description: 'Log output from all commands (only if using a compiler).',
      },
    },
  },
  async (args, callbacks) => {
    const tiniProject = await getTiniProject();
    const {config: tiniConfig, hooks} = tiniProject;
    // preparation
    exposeEnvs(tiniConfig, 'development');
    const compiler = await loadCompiler(tiniProject);
    const builder = await loadBuilder(tiniProject);
    // start dev
    await hooks.callHook('dev:before');
    if (builder.dev instanceof Function) {
      await builder.dev();
    } else {
      const devCommand = builder.dev.command;
      if (tiniConfig.compile !== false) {
        const debugMode = !!args.debug;
        // initial compile
        await compiler?.compile();
        // run compile and dev concurrently
        const compileCmd = 'tini compile --watch --lazy';
        const devCmd =
          typeof devCommand === 'string' ? devCommand : devCommand.join(' ');
        execa(
          'concurrently',
          [
            `"${compileCmd}"`,
            `"${devCmd}"`,
            '--names',
            'COMPILE,DEV',
            '--prefix-colors',
            'bgMagenta,bgBlue',
            '--kill-others',
          ],
          !debugMode ? undefined : {stdio: 'inherit'}
        );
        callbacks?.onShowInfo?.([compileCmd, devCmd], debugMode);
        // server start
        const customOnServerStart = builder.dev.onServerStart;
        setTimeout(
          () =>
            callbacks?.onServerStart?.(
              {
                ...builder.options,
                debugMode,
              },
              customOnServerStart
            ),
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
    onServerStart: (
      context: OnDevServerStartContext,
      customCallback?: (context: OnDevServerStartContext) => void
    ) => {
      if (customCallback) return customCallback(context);
      if (context.debugMode) return;
      consola.info(
        `Server running at: ${blueBright(
          `http://${context.devHost || 'localhost'}:${
            context.devPort || '3000'
          }`
        )}`
      );
    },
  }
);

export default devCommand;
