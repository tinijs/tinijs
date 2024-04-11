import {relative} from 'pathe';
import {TiniProject, type Builder} from '@tinijs/project';

export interface BuildOptions {
  buildCommand?: string;
  devCommand?: string;
  onDevServerStart?: () => void;
}

export default function (options: BuildOptions, tiniProject: TiniProject) {
  return new ViteBuilder(options, tiniProject);
}

export class ViteBuilder implements Builder {
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
    const inputDir = compile === false ? srcDir : compileDir;
    return {
      buildCommand:
        this.options.buildCommand ||
        `vite build ${inputDir} --outDir ${relative(inputDir, outDir)}`,
      devCommand:
        this.options.devCommand ||
        `vite ${inputDir} --port 3000 --logLevel silent`,
    };
  }
}
