import {resolve, parse} from 'pathe';
import {readFile} from 'node:fs/promises';
import {outputFile, copy} from 'fs-extra/esm';
import {load} from 'cheerio';
import {
  TiniProject,
  type Compiler,
  type CompileFileHookContext,
} from '@tinijs/project';
import {listDir, cleanDir} from '@tinijs/cli';

export interface CompileOptions {
  skipMinifyHTMLLiterals?: boolean;
  precompileGeneric?: 'none' | 'lite' | 'full';
}

export default function (options: CompileOptions, tiniProject: TiniProject) {
  return new DefaultCompiler(options, tiniProject);
}

export class DefaultCompiler implements Compiler {
  constructor(
    public options: CompileOptions,
    private tiniProject: TiniProject
  ) {}

  async compile() {
    const srcPath = resolve(this.tiniProject.config.srcDir);
    await cleanDir(this.tiniProject.config.compileDir);
    const paths = await listDir(srcPath);
    await this.tiniProject.hooks.callHook('compile:before');
    for (let i = 0; i < paths.length; i++) {
      await this.compileFile(paths[i]);
    }
    await this.tiniProject.hooks.callHook('compile:after');
  }

  async compileFile(inPath: string) {
    const {base, ext} = parse(inPath);
    const outPath = resolve(
      this.tiniProject.config.compileDir,
      inPath.replace(`${resolve(this.tiniProject.config.srcDir)}/`, '')
    );
    const context: CompileFileHookContext | null =
      this.isUnderTopDir(inPath, 'public') ||
      !['.html', '.css', '.scss', '.ts', '.js'].includes(ext)
        ? {base, inPath, outPath, content: ''}
        : {
            base,
            inPath,
            outPath,
            content: await readFile(inPath, 'utf8'),
          };

    if (context) {
      // build file
      await this.tiniProject.hooks.callHook('compile:beforeFile', context);
      await this.builtinFileBuilder(context);
      await this.tiniProject.hooks.callHook('compile:afterFile', context);

      // save file
      if (!context.content) {
        copy(context.inPath, context.outPath);
      } else {
        outputFile(context.outPath, context.content);
      }
    }
  }

  private async builtinFileBuilder(context: CompileFileHookContext) {
    // eslint-disable-next-line no-empty
  }

  private isUnderTopDir(path: string, topDir: string) {
    return ~path.indexOf(
      `/${this.tiniProject.config.srcDir}/${
        (this.tiniProject.config.dirs as Record<string, string>)?.[topDir] ||
        topDir
      }/`
    );
  }
}
