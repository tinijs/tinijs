import {resolve} from 'pathe';
import {execa} from 'execa';
import {consola} from 'consola';
import {gray, green} from 'colorette';
import {remove} from 'fs-extra/esm';

import {getTiniProject, getProjectDirs} from '@tinijs/project';

import {exposeEnvs, loadCompiler, loadBuilder} from '../utils/build.js';
import {createCLICommand} from '../utils/cli.js';

export const watchCommand = createCLICommand(
  {
    meta: {
      name: 'watch',
      description: 'Watch and build the app.',
    },
    args: {
      clean: {
        alias: 'c',
        type: 'boolean',
        description: 'Clean the output dir.',
      },
      lazy: {
        alias: 'l',
        type: 'boolean',
        description: 'No initial actions, only watch for changes.',
      },
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
    const {entryDir, outDir} = getProjectDirs(tiniConfig);
    //  preparation
    exposeEnvs(tiniConfig, 'development');
    const compiler = await loadCompiler(tiniProject);
    const builder = await loadBuilder(tiniProject);
    // clean
    if (args.clean) await remove(resolve(outDir));
    // start watch
    await hooks.callHook('watch:before');
    if (builder.watch instanceof Function) {
      await builder.watch();
    } else {
      const watchCommand = builder.watch.command;
      if (tiniConfig.compile !== false) {
        const debugMode = !!args.debug;
        // initial actions
        if (!args.lazy) {
          await hooks.callHook('dev:before');
          await compiler?.compile();
        }
        // run compile and watch concurrently
        const compileCmd = 'tini compile --watch --lazy';
        const watchCmd =
          typeof watchCommand === 'string'
            ? watchCommand
            : watchCommand.join(' ');
        execa(
          'concurrently',
          [
            `"${compileCmd}"`,
            `"${watchCmd}"`,
            '--names',
            'COMPILE,WATCH',
            '--prefix-colors',
            'bgMagenta,bgBlue',
            '--kill-others',
          ],
          !debugMode ? undefined : {stdio: 'inherit'}
        );
        callbacks?.onShowInfo?.([compileCmd, watchCmd], debugMode);
        // watch start
        callbacks?.onWatchStart?.(entryDir, outDir, debugMode);
      } else {
        const [cmd, ...args] =
          typeof watchCommand !== 'string'
            ? watchCommand
            : watchCommand.split(' ');
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
    onWatchStart: (entryDir: string, outDir: string, debugMode: boolean) => {
      if (debugMode) return;
      consola.info(
        `Watch ${green(entryDir)} and build app to ${green(outDir)}.`
      );
    },
  }
);

export default watchCommand;
