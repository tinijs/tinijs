import {watch} from 'chokidar';
import {resolve} from 'pathe';
import {consola} from 'consola';
import {green} from 'colorette';
import {remove} from 'fs-extra/esm';

import {getTiniProject} from '@tinijs/project';

import {loadCompiler} from '../utils/build.js';
import {createCLICommand} from '../utils/cli.js';

export const compileCommand = createCLICommand(
  {
    meta: {
      name: 'compile',
      description: 'Compile a TiniJS app.',
    },
    args: {
      watch: {
        alias: 'w',
        type: 'boolean',
        description: 'Also watch for changes.',
      },
    },
  },
  async (args, callbacks) => {
    const tiniProject = await getTiniProject();
    const {config: tiniConfig} = tiniProject;
    const {srcDir, compileDir} = tiniConfig;
    const compiler = await loadCompiler(tiniProject, true);
    if (!compiler) {
      callbacks?.onUnavailable();
    } else {
      await compiler.compile();
      if (!args.watch) {
        callbacks?.onSingleCompile(compileDir);
      } else {
        const srcDirPath = resolve(srcDir);
        watch(srcDirPath, {ignoreInitial: true})
          .on('add', path => {
            callbacks?.onCompileFile('add', path);
            compiler.compileFile(resolve(path));
          })
          .on('change', path => {
            callbacks?.onCompileFile('change', path);
            compiler.compileFile(resolve(path));
          })
          .on('unlink', path => {
            callbacks?.onCompileFile('unlink', path);
            remove(
              resolve(compileDir, resolve(path).replace(`${srcDirPath}/`, ''))
            );
          });
        callbacks?.onCompileAndWatch(compileDir);
      }
    }
  },
  {
    onUnavailable: () =>
      consola.error(
        'No compiler available, use @tinijs/default-compiler or your own compiler.'
      ),
    onSingleCompile: (compileDir: string) =>
      consola.success(`App compiled to ${green(compileDir)}.`),
    onCompileAndWatch: (compileDir: string) =>
      consola.success(
        `App compiled to ${green(compileDir)} and watching for changes.`
      ),
    onCompileFile: (mode: string, path: string) =>
      consola.info(`[${mode}] ${green(path)}`),
  }
);

export default compileCommand;
