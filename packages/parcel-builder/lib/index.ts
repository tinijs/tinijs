import {TiniProject, type Builder} from '@tinijs/project';

export interface BuildOptions {
  configPath?: string;
  buildCommand?: string | string[];
  devCommand?: string | string[];
  devPort?: number;
  devHost?: string;
  onDevServerStart?: () => void;
}

export default function (options: BuildOptions, tiniProject: TiniProject) {
  return new ParcelBuilder(options, tiniProject);
}

export class ParcelBuilder implements Builder {
  constructor(
    private options: BuildOptions,
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
    const configArg = !configPath ? '' : `--config ${configPath}`;
    const outDirArg = `--dist-dir ${outDir}`;
    const hostArg = !devHost ? '' : `--host ${devHost}`;
    const portArg = `--port ${devPort || '3000'}`;
    return {
      buildCommand:
        buildCommand ||
        ['parcel', 'build', indexFilePath, configArg, outDirArg].filter(
          Boolean
        ),
      devCommand:
        devCommand ||
        ['parcel', indexFilePath, configArg, hostArg, portArg].filter(Boolean),
    };
  }
}
