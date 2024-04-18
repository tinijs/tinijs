import {pathExistsSync} from 'fs-extra/esm';
import {
  TiniProject,
  type Builder,
  type CommonBuildOptions,
} from '@tinijs/project';

export type BuildOptions = CommonBuildOptions;

export default function (options: BuildOptions, tiniProject: TiniProject) {
  return new ParcelBuilder(options, tiniProject);
}

export class ParcelBuilder implements Builder {
  private readonly DEFAULT_PARCEL_CONFIG_FILE =
    './node_modules/@tinijs/parcel-builder/.parcelrc';
  private readonly LOCAL_PARCEL_CONFIG_FILE = this.getLocalParcelConfigFile();

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
    const indexFilePath =
      compile === false ? `${srcDir}/index.html` : `${compileDir}/index.html`;
    const configArgs = [
      '--config',
      configPath ||
        this.LOCAL_PARCEL_CONFIG_FILE ||
        this.DEFAULT_PARCEL_CONFIG_FILE,
    ];
    const outDirArgs = ['--dist-dir', outDir];
    const hostArgs = !devHost ? [] : ['--host', devHost];
    const portArgs = ['--port', `${devPort || '3000'}`];
    return {
      buildCommand:
        buildCommand ||
        ['parcel', 'build', indexFilePath, ...configArgs, ...outDirArgs].filter(
          Boolean
        ),
      devCommand:
        devCommand ||
        [
          'parcel',
          indexFilePath,
          ...configArgs,
          ...outDirArgs,
          ...hostArgs,
          ...portArgs,
        ].filter(Boolean),
    };
  }

  private getLocalParcelConfigFile() {
    const rcPath = './.parcelrc';
    return !pathExistsSync(rcPath) ? null : rcPath;
  }
}
