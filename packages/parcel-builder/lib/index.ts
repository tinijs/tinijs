import {TiniProject, Builder} from '@tinijs/project';

export interface BuildOptions {
  buildCommand?: string;
  devCommand?: string;
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
      command: this.options.buildCommand || this.commands.buildCommand,
    };
  }

  get dev() {
    return {
      command: this.options.devCommand || this.commands.devCommand,
      onServerStart: this.options.onDevServerStart,
    };
  }

  private get commands() {
    const {srcDir, compileDir, outDir, compile} = this.tiniProject.config;
    const indexFilePath =
      compile === false ? `${srcDir}/index.html` : `${compileDir}/index.html`;
    return {
      buildCommand:
        this.options.buildCommand ||
        `parcel build ${indexFilePath} --dist-dir ${outDir} --no-cache`,
      devCommand:
        this.options.devCommand ||
        `parcel ${indexFilePath} --dist-dir ${outDir} --port 3000 --no-cache --log-level none`,
    };
  }
}
