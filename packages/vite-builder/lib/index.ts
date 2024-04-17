import {relative} from 'pathe';
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
  return new ViteBuilder(options, tiniProject);
}

export class ViteBuilder implements Builder {
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
    const inputDir = compile === false ? srcDir : compileDir;
    const configArg = !configPath ? '' : `--config ${configPath}`;
    const outDirArg = `--outDir ${relative(inputDir, outDir)}`;
    const hostArg = !devHost ? '' : `--host ${devHost}`;
    const portArg = `--port ${devPort || '3000'}`;
    return {
      buildCommand:
        buildCommand ||
        ['vite', 'build', inputDir, configArg, outDirArg].filter(Boolean),
      devCommand:
        devCommand ||
        ['vite', inputDir, configArg, hostArg, portArg].filter(Boolean),
    };
  }
}
