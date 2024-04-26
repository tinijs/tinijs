import {pathExistsSync} from 'fs-extra/esm';
import {relative} from 'pathe';
import {
  TiniProject,
  type Builder,
  type CommonBuildOptions,
} from '@tinijs/project';

export interface BuildOptions extends CommonBuildOptions {
  transformTemplates?: boolean;
  sourcemap?: boolean | 'hidden';
}

export default function (options: BuildOptions, tiniProject: TiniProject) {
  return new ViteBuilder(options, tiniProject);
}

export class ViteBuilder implements Builder {
  private readonly DEFAULT_VITE_CONFIG_FILE =
    './node_modules/@tinijs/vite-builder/vite.config.js';
  private readonly LOCAL_VITE_CONFIG_FILE = this.getLocalViteConfigFile();

  constructor(
    public options: BuildOptions,
    private tiniProject: TiniProject
  ) {}

  get dev() {
    return {
      command: this.commands.devCommand,
      onServerStart: this.options.onDevServerStart,
    };
  }

  get build() {
    return {
      command: this.commands.buildCommand,
    };
  }

  private get commands() {
    const {srcDir, compileDir, outDir, compile} = this.tiniProject.config;
    const {configPath, devCommand, devHost, devPort, buildCommand} =
      this.options;
    const inputDir = compile === false ? srcDir : compileDir;
    const configArgs = [
      '--config',
      configPath ||
        this.LOCAL_VITE_CONFIG_FILE ||
        this.DEFAULT_VITE_CONFIG_FILE,
    ];
    const outDirArgs = ['--outDir', relative(inputDir, outDir)];
    const hostArgs = !devHost ? [] : ['--host', devHost];
    const portArgs = ['--port', `${devPort || '3000'}`];
    return {
      devCommand:
        devCommand ||
        ['vite', inputDir, ...configArgs, ...hostArgs, ...portArgs].filter(
          Boolean
        ),
      buildCommand:
        buildCommand ||
        [
          'vite',
          'build',
          inputDir,
          ...configArgs,
          ...outDirArgs,
          '--emptyOutDir',
        ].filter(Boolean),
    };
  }

  private getLocalViteConfigFile() {
    const jsPath = './vite.config.js';
    const tsPath = './vite.config.ts';
    if (pathExistsSync(jsPath)) return jsPath;
    if (pathExistsSync(tsPath)) return tsPath;
    return null;
  }
}
