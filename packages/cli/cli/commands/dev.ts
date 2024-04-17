import {concurrently} from 'concurrently';
import {watch} from 'chokidar';
import {resolve} from 'pathe';
import {consola} from 'consola';
import {execa} from 'execa';
import {blueBright} from 'colorette';
import {remove} from 'fs-extra/esm';

import {getTiniProject} from '@tinijs/project';

import {loadCompiler, loadBuilder} from '../utils/build.js';
import {createCLICommand} from '../utils/cli.js';

export const devCommand = createCLICommand(
  {
    meta: {
      name: 'dev',
      description: 'Start the dev server.',
    },
    args: {
      watch: {
        alias: 'w',
        type: 'boolean',
        description: 'Watch mode only.',
      },
    },
  },
  async (args, callbacks) => {
    const tiniProject = await getTiniProject();
    const {config: tiniConfig} = tiniProject;
    const compiler = await loadCompiler(tiniProject);
    // watch mode
    if (args.watch) {
      if (compiler) {
        const srcDirPath = resolve(tiniConfig.srcDir);
        watch(srcDirPath, {ignoreInitial: true})
          .on('add', path => compiler.compileFile(resolve(path)))
          .on('change', path => compiler.compileFile(resolve(path)))
          .on('unlink', path =>
            remove(
              resolve(
                tiniConfig.compileDir,
                resolve(path).replace(`${srcDirPath}/`, '')
              )
            )
          );
      } else {
        callbacks?.onUselessWatch?.();
      }
    } else {
      const builder = await loadBuilder(tiniProject);
      // compile
      await compiler?.compile();
      // start dev server
      if (builder.dev instanceof Function) {
        await builder.dev();
      } else {
        const devCommand = builder.dev.command;
        if (compiler) {
          concurrently([
            {
              command:
                typeof devCommand === 'string'
                  ? devCommand
                  : devCommand.join(' '),
            },
            {command: 'tini dev --watch'},
          ]);
          const customOnServerStart = builder.dev.onServerStart;
          setTimeout(() => callbacks?.onServerStart(customOnServerStart), 2000);
        } else {
          const [cmd, ...args] =
            typeof devCommand !== 'string' ? devCommand : devCommand.split(' ');
          await execa(cmd, args, {stdio: 'inherit'});
        }
      }
    }
  },
  {
    onUselessWatch: () =>
      consola.warn('The --watch option is useless while compile is disabled.'),
    onServerStart: (customCallback?: () => void) =>
      customCallback
        ? customCallback()
        : consola.info(
            `Server running at: ${blueBright('http://localhost:3000')}`
          ),
  }
);

export default devCommand;
