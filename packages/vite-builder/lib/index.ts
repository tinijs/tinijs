import {pathExistsSync} from 'fs-extra/esm';
import {relative} from 'pathe';
import {
  TiniProject,
  type Builder,
  type CommonBuildOptions,
} from '@tinijs/project';

export type BuildOptions = CommonBuildOptions;

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

  get build() {
    return {
      command: this.commands.buildCommand,
    };
  }

  get dev() {
    return {
      command: this.commands.devCommand,
      onServerStart: this.options.onDevServerStart,
    };
  }

  private get commands() {
    const {srcDir, compileDir, outDir, compile} = this.tiniProject.config;
    const {configPath, buildCommand, devCommand, devHost, devPort} =
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
      buildCommand:
        buildCommand ||
        ['vite', 'build', inputDir, ...configArgs, ...outDirArgs].filter(
          Boolean
        ),
      devCommand:
        devCommand ||
        ['vite', inputDir, ...configArgs, ...hostArgs, ...portArgs].filter(
          Boolean
        ),
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
