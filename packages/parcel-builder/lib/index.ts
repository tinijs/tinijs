import {TiniProject, Builder} from '@tinijs/project';
import {getIndexHTMLPath} from '@tinijs/cli';

export interface BuildOptions {
  buildCommand?: string;
  devCommand?: string;
  onDevServerStart?: () => void;
}

export default function (options: BuildOptions = {}) {
  return function (tiniProject: TiniProject) {
    return new ParcelBuilder(options, tiniProject);
  };
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
    const {outDir} = this.tiniProject.config;
    const indexHTMLPath = getIndexHTMLPath(this.tiniProject.config);
    return {
      buildCommand:
        this.options.buildCommand ||
        `parcel build "${indexHTMLPath}" --dist-dir ${outDir} --no-cache`,
      devCommand:
        this.options.devCommand ||
        `parcel "${indexHTMLPath}" --dist-dir ${outDir} --port 3000 --no-cache --log-level none`,
    };
  }
}
