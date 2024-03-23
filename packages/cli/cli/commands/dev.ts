import {concurrently} from 'concurrently';
import {watch} from 'chokidar';
import {resolve} from 'pathe';
import {consola} from 'consola';
import {execaCommand} from 'execa';
import {blueBright} from 'colorette';
import {remove, pathExistsSync} from 'fs-extra/esm';

import {TiniConfig, getTiniProject} from '@tinijs/project';

import {loadCompiler, loadBuilder, buildPublic} from '../../lib/utils/build.js';
import {createCLICommand} from '../../lib/utils/cli.js';

function checkAndbuildPublic(tiniConfig: TiniConfig) {
  setTimeout(async () => {
    if (pathExistsSync(resolve(tiniConfig.outDir))) {
      await buildPublic(tiniConfig);
    } else {
      checkAndbuildPublic(tiniConfig);
    }
  }, 2000);
}

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
                tiniConfig.tempDir,
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
        if (compiler) {
          concurrently([
            {command: builder.dev.command},
            {command: 'tini dev --watch'},
          ]);
        } else {
          await execaCommand(builder.dev.command, {stdio: 'inherit'});
        }
        const customOnServerStart = builder.dev.onServerStart;
        setTimeout(() => callbacks?.onServerStart(customOnServerStart), 2000);
      }
      // public
      checkAndbuildPublic(tiniConfig);
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
