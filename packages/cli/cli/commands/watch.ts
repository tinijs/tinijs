import {resolve} from 'pathe';
import {execa} from 'execa';
import {consola} from 'consola';
import {gray, green} from 'colorette';
import {remove} from 'fs-extra/esm';
import {concurrently} from 'concurrently';

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
      lazy: {
        alias: 'l',
        type: 'boolean',
        description: 'No initial actions, only watch for changes.',
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
        concurrently([{command: compileCmd}, {command: watchCmd}]);
        callbacks?.onShowDebug?.([compileCmd, watchCmd]);
        // watch start
        callbacks?.onWatchStart?.(entryDir, outDir);
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
    onShowDebug: (commands: string[]) =>
      consola.info(
        `Concurrently running ${commands
          .map(command => gray(command))
          .join(' & ')}`
      ),
    onWatchStart: (entryDir: string, outDir: string) =>
      consola.info(
        `Watch ${green(entryDir)} and build app to ${green(outDir)}.`
      ),
  }
);

export default watchCommand;
