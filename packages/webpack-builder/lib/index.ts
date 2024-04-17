import {
  TiniProject,
  type Builder,
  type CommonBuildOptions,
} from '@tinijs/project';

export type BuildOptions = CommonBuildOptions;

export default function (options: BuildOptions, tiniProject: TiniProject) {
  return new WebpackBuilder(options, tiniProject);
}

export class WebpackBuilder implements Builder {
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
    const {outDir} = this.tiniProject.config;
    const {configPath, buildCommand, devCommand, devHost, devPort} =
      this.options;
    const configArgs = [
      '--config',
      configPath || './node_modules/@tinijs/webpack-builder/webpack.config.cjs',
    ];
    const outDirArgs = ['--output-path', outDir];
    const hostArgs = !devHost ? [] : ['--host', devHost];
    const portArgs = ['--port', `${devPort || '3000'}`];
    return {
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
    };
  }
}
