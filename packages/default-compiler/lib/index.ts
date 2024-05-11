import {resolve} from 'pathe';
import {outputFile, copy} from 'fs-extra/esm';
import picomatch from 'picomatch';
import {minifyHTMLLiterals} from 'minify-html-literals';
import {compileStringAsync, type StringOptions} from 'sass';
import {
  TiniProject,
  getProjectDirs,
  type ProjectDirs,
  type Compiler,
  type CompileFileHookContext,
  type CommonCompileOptions,
} from '@tinijs/project';
import {
  listDir,
  cleanDir,
  extractCompileOptions,
  parseCompileFileContext,
} from '@tinijs/cli';

export interface CompileOptions extends CommonCompileOptions {
  rewriteImports: false | ((item: ParsedImport) => string | null | undefined);
  compileTaggedHTML?:
    | false
    | {
        minify?: false;
      };
  compileTaggedCSS?: false | Omit<StringOptions<'async'>, 'style'>;
}

export interface ParsedImport {
  statement: string;
  path: string;
  rewriter: ImportRewriter;
}

export default function (options: CompileOptions, tiniProject: TiniProject) {
  return new DefaultCompiler(options, tiniProject);
}

export class ImportRewriter {
  constructor(
    private srcDir: string,
    private deepLevel: number
  ) {}

  rewriteProjectPath(dir: string, path: string) {
    if (!path.includes(`../${dir}/`)) return;
    return path.replace(`../${dir}/`, `${'../'.repeat(this.deepLevel)}${dir}/`);
  }

  rewriteAppPath(dir: string, path: string) {
    if (!path.includes(`./${dir}/`)) return;
    if (path.startsWith('./')) {
      return path.replace(
        `./${dir}/`,
        `${'../'.repeat(this.deepLevel)}${this.srcDir}/${dir}/`
      );
    } else {
      return path.replace(
        `../${dir}/`,
        `${'../'.repeat(this.deepLevel + 1)}${this.srcDir}/${dir}/`
      );
    }
  }
}

export class DefaultCompiler implements Compiler {
  private projectDirs!: ProjectDirs;
  private outputDeepLevel!: number;
  private importRewriter!: ImportRewriter;
  constructor(
    public options: CompileOptions,
    private tiniProject: TiniProject
  ) {
    this.projectDirs = getProjectDirs(this.tiniProject.config);
    this.outputDeepLevel = this.projectDirs.compileDir.startsWith('../')
      ? 1 // inside the current project only
      : this.projectDirs.compileDir
          .split('/')
          .filter(item => item && item !== '.').length;
    this.importRewriter = new ImportRewriter(
      this.projectDirs.srcDir,
      this.outputDeepLevel
    );
  }

  async compile() {
    const {srcDir, compileDir} = this.projectDirs;
    const {hooks} = this.tiniProject;
    await cleanDir(compileDir);
    const paths = await listDir(resolve(srcDir));
    await hooks.callHook('compile:before');
    for (let i = 0; i < paths.length; i++) {
      await this.compileFile(paths[i]);
    }
    await hooks.callHook('compile:after');
  }

  async compileFile(path: string) {
    const {config: tiniConfig, hooks} = this.tiniProject;
    const compileOptions = extractCompileOptions<CompileOptions>(
      tiniConfig.compile
    );
    const ignoreMatcher = !compileOptions.ignorePatterns
      ? undefined
      : picomatch(compileOptions.ignorePatterns);
    const context = await parseCompileFileContext(
      path,
      this.projectDirs,
      ignoreMatcher
    );
    if (!context) return;
    // builtin compile file
    await hooks.callHook('compile:beforeCompileFile', context);
    await this.builtinFileCompile(context);
    await hooks.callHook('compile:afterCompileFile', context);
    // save file
    await hooks.callHook('compile:beforeOutputFile', context);
    if (!context.content) {
      await copy(context.inPath, context.outPath);
    } else {
      await outputFile(context.outPath, context.content);
    }
    await hooks.callHook('compile:afterOutputFile', context);
  }

  private async builtinFileCompile(context: CompileFileHookContext) {
    if (!context.content) return;
    const {rewriteImports, compileTaggedHTML, compileTaggedCSS} = this.options;
    const {dirs} = this.projectDirs;

    // inject config envs & replace config imports
    if (context.isActiveConfig) {
      this.injectConfigEnvs(context);
    }
    if (!context.isDevelopment) {
      context.content = context.content.replace(
        new RegExp(`./${dirs.configs}/development.js';`, 'g'),
        `./${dirs.configs}/${context.env}.js';`
      );
    }

    // .ts, .js
    if (['.ts', '.js'].includes(context.ext)) {
      if (rewriteImports !== false)
        this.rewriteImports(context, rewriteImports);
      if (compileTaggedHTML !== false)
        await this.handleTaggedHTML(context, compileTaggedHTML);
      if (compileTaggedCSS !== false)
        await this.handleTaggedCSS(context, compileTaggedCSS);
    }
  }

  private injectConfigEnvs(context: CompileFileHookContext) {
    const envMatchingArr = context.content!.match(
      /process\.env\.([\s\S]*?)(,|\n)/g
    );
    if (!envMatchingArr?.length) return;
    envMatchingArr.forEach(envMatching => {
      const replaceStr = envMatching.replace(/,|\n/g, '');
      context.content = context.content!.replace(
        replaceStr,
        `"${process.env[replaceStr.replace('process.env.', '')]}"`
      );
    });
  }

  private rewriteImports(
    context: CompileFileHookContext,
    customRewrite: Exclude<CompileOptions['rewriteImports'], false>
  ) {
    const importMatchingArr = context.content!.match(
      /import\s+(?:{[^{}]+}|.*?)\s*(?:from)?\s*['"].*?['"]|import\(.*?\)/g
    );
    if (!importMatchingArr?.length) return; // no imports
    importMatchingArr.forEach(statement => {
      const pathMatching = statement.match(/['"](.*?)['"]/);
      if (!pathMatching) return;
      const parsedImport: ParsedImport = {
        statement,
        path: pathMatching[1],
        rewriter: this.importRewriter,
      };
      // custom
      const potentialCustomStatement = customRewrite?.(parsedImport);
      if (potentialCustomStatement) {
        return (context.content = context.content!.replace(
          statement,
          potentialCustomStatement
        ));
      }
      // built-in
      const potentialBuiltinStatement = this.builtinRewrite(parsedImport);
      if (potentialBuiltinStatement) {
        return (context.content = context.content!.replace(
          statement,
          potentialBuiltinStatement
        ));
      }
      return;
    });
  }

  private async handleTaggedHTML(
    context: CompileFileHookContext,
    options: Exclude<CompileOptions['compileTaggedHTML'], false>
  ) {
    const templateMatchingArr = context.content!.match(
      /(return html`)([\s\S]*?)(`;)/g
    );
    if (!templateMatchingArr) return; // no return html`...`
    // minify template literals
    if (options?.minify !== false) {
      for (const matchedTemplate of templateMatchingArr) {
        try {
          const result = minifyHTMLLiterals(matchedTemplate);
          if (result) {
            context.content = context.content!.replace(
              matchedTemplate,
              result.code
            );
          }
        } catch (error) {
          if (!context.isDevelopment) throw error;
        }
      }
    }
  }

  private async handleTaggedCSS(
    context: CompileFileHookContext,
    options: Exclude<CompileOptions['compileTaggedCSS'], false>
  ) {
    const cssMatchingArr = context.content!.match(/(css`)([\s\S]*?)(`,|`;)/g);
    if (!cssMatchingArr?.length) return; // no css``
    // compile scss
    for (const matchedCSS of cssMatchingArr) {
      if (matchedCSS.includes('/* no-sass */')) continue;
      // extract original
      let originalValue = matchedCSS.replace('css`', '');
      originalValue = originalValue.substring(0, originalValue.length - 2);
      // compile scss
      try {
        const compiledValue = (
          await compileStringAsync(originalValue, {
            loadPaths: ['node_modules', this.projectDirs.srcDir],
            ...options,
            style: 'compressed',
          })
        ).css;
        // replacing original with compiled
        context.content = context.content!.replace(
          originalValue,
          compiledValue
        );
      } catch (error) {
        if (!context.isDevelopment) throw error;
      }
    }
  }

  private builtinRewrite({statement, path, rewriter}: ParsedImport) {
    if (this.outputDeepLevel === 1) return;
    // known paths
    for (const [dir, isAppPath] of [
      // root dirs
      ['content'],
      ['server'],
      // app dirs
      ['ui', true],
    ] as Array<[string, boolean?]>) {
      const potentialPath = !isAppPath
        ? rewriter.rewriteProjectPath(dir, path)
        : rewriter.rewriteAppPath(dir, path);
      if (potentialPath) {
        return statement.replace(path, potentialPath);
      }
    }
    // else
    return;
  }
}
