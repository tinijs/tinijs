import {watch} from 'chokidar';
import {resolve} from 'pathe';
import {consola} from 'consola';
import {green} from 'colorette';
import {remove} from 'fs-extra/esm';
import picomatch from 'picomatch';

import {getTiniProject, getProjectDirs} from '@tinijs/project';

import {
  exposeEnvs,
  loadCompiler,
  extractCompileOptions,
  parseCompileFileContext,
} from '../utils/build.js';
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
      target: {
        alias: 't',
        type: 'string',
        description: 'Target: development (default), production, ...',
      },
    },
  },
  async (args, callbacks) => {
    const tiniProject = await getTiniProject();
    const {config: tiniConfig, hooks} = tiniProject;
    const projectDirs = getProjectDirs(tiniConfig);
    const {srcDir, compileDir} = projectDirs;
    const compileOptions = extractCompileOptions<{
      ignorePatterns?: string[];
    }>(tiniConfig.compile);
    // preparation
    exposeEnvs(tiniConfig, args.target || 'development');
    const compiler = await loadCompiler(tiniProject, true);
    // compile
    if (!compiler) {
      callbacks?.onUnavailable();
    } else {
      await compiler.compile();
      if (!args.watch) {
        callbacks?.onSingleCompile(compileDir);
      } else {
        watch(resolve(srcDir), {ignoreInitial: true})
          .on('add', path => {
            callbacks?.onCompileFile('add', path);
            compiler.compileFile(resolve(path));
          })
          .on('change', path => {
            callbacks?.onCompileFile('change', path);
            compiler.compileFile(resolve(path));
          })
          .on('unlink', async path => {
            callbacks?.onCompileFile('unlink', path);
            const ignoreMatcher = !compileOptions.ignorePatterns
              ? undefined
              : picomatch(compileOptions.ignorePatterns);
            const context = await parseCompileFileContext(
              path,
              projectDirs,
              ignoreMatcher
            );
            if (!context) return;
            await hooks.callHook('compile:beforeRemoveFile', context);
            await remove(context.outPath);
            await hooks.callHook('compile:afterRemoveFile', context);
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
