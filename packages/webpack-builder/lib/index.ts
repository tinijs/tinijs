import {pathExistsSync} from 'fs-extra/esm';
import {
  TiniProject,
  getProjectDirs,
  type Builder,
  type CommonBuildOptions,
} from '@tinijs/project';

export interface BuildOptions extends CommonBuildOptions {
  sourcemap?: 'source-map' | 'hidden-source-map';
}

export default function (options: BuildOptions, tiniProject: TiniProject) {
  return new WebpackBuilder(options, tiniProject);
}

export class WebpackBuilder implements Builder {
  private readonly DEFAULT_WEBPACK_CONFIG_FILE =
    './node_modules/@tinijs/webpack-builder/webpack.config.js';
  private readonly LOCAL_WEBPACK_CONFIG_FILE = this.getLocalWebpackConfigFile();

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

  get watch() {
    return {
      command: this.commands.watchCommand,
    };
  }

  get build() {
    return {
      command: this.commands.buildCommand,
    };
  }

  private get commands() {
    const {outDir} = getProjectDirs(this.tiniProject.config);
    const {
      configPath,
      devCommand,
      devHost,
      devPort,
      watchCommand,
      buildCommand,
    } = this.options;
    const configArgs = [
      '--config',
      configPath ||
        this.LOCAL_WEBPACK_CONFIG_FILE ||
        this.DEFAULT_WEBPACK_CONFIG_FILE,
    ];
    const outDirArgs = ['--output-path', outDir];
    const hostArgs = !devHost ? [] : ['--host', devHost];
    const portArgs = ['--port', `${devPort || '3000'}`];
    return {
      devCommand:
        devCommand ||
        [
          'webpack',
          'serve',
          ...configArgs,
          ...hostArgs,
          ...portArgs,
          '--history-api-fallback',
          '--mode',
          'development',
        ].filter(Boolean),
      watchCommand:
        watchCommand ||
        [
          'webpack',
          'watch',
          ...configArgs,
          ...outDirArgs,
          '--mode',
          'development',
        ].filter(Boolean),
      buildCommand:
        buildCommand ||
        [
          'webpack',
          'build',
          ...configArgs,
          ...outDirArgs,
          '--mode',
          'production',
        ].filter(Boolean),
    };
  }

  private getLocalWebpackConfigFile() {
    const jsPath = './webpack.config.js';
    const tsPath = './webpack.config.ts';
    if (pathExistsSync(jsPath)) return jsPath;
    if (pathExistsSync(tsPath)) return tsPath;
    return null;
  }
}
