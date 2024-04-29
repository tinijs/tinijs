import {resolve} from 'pathe';
import {outputFile, copy} from 'fs-extra/esm';
import picomatch from 'picomatch';
import {minifyHTMLLiterals} from 'minify-html-literals';
import {compileStringAsync, type StringOptions} from 'sass';
import {
  TiniProject,
  getProjectDirs,
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
  compileTaggedHTML?:
    | false
    | {
        minify?: false;
      };
  compileTaggedCSS?: false | Omit<StringOptions<'async'>, 'style'>;
}

export default function (options: CompileOptions, tiniProject: TiniProject) {
  return new DefaultCompiler(options, tiniProject);
}

export class DefaultCompiler implements Compiler {
  constructor(
    public options: CompileOptions,
    private tiniProject: TiniProject
  ) {}

  private get projectDirs() {
    return getProjectDirs(this.tiniProject.config);
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
    const {compileTaggedHTML, compileTaggedCSS} = this.options;
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

  private async handleTaggedHTML(
    context: CompileFileHookContext,
    options: Exclude<CompileOptions['compileTaggedHTML'], false>
  ) {
    const templateMatching = context.content!.match(
      /(return html`)([\s\S]*?)(`;)/
    );
    if (!templateMatching) return; // no return html`...`
    const {isDevelopment} = context;
    // minify template literals
    if (!isDevelopment) {
      const matchedTemplate = templateMatching[0];
      let minifiedTemplate: string | undefined;
      // minify
      try {
        if (options?.minify !== false) {
          const result = minifyHTMLLiterals(matchedTemplate);
          if (!result) throw new Error('Run minifyHTMLLiterals() failed.');
          minifiedTemplate = result.code;
        }
      } catch (error) {
        // eslint-disable-next-line no-empty
      }
      // replace original with minified
      if (minifiedTemplate) {
        context.content = context.content!.replace(
          matchedTemplate,
          minifiedTemplate
        );
      }
    }
  }

  private async handleTaggedCSS(
    context: CompileFileHookContext,
    options: Exclude<CompileOptions['compileTaggedCSS'], false>
  ) {
    const cssMatchingArr = context.content!.match(/(css`)([\s\S]*?)(`,|`;)/g);
    if (!cssMatchingArr?.length) return; // no css``
    const {isDevelopment} = context;
    // compile scss
    for (let i = 0; i < cssMatchingArr.length; i++) {
      const cssMatching = cssMatchingArr[i];
      if (cssMatching.includes('/* no-sass */')) continue;
      // extract original
      let originalValue = cssMatching.replace('css`', '');
      originalValue = originalValue.substring(0, originalValue.length - 2);
      // compile scss
      let compiledValue: string;
      try {
        compiledValue = (
          await compileStringAsync(originalValue, {
            loadPaths: ['node_modules', this.projectDirs.srcDir],
            ...options,
            style: isDevelopment ? 'expanded' : 'compressed',
          })
        ).css;
      } catch (err) {
        compiledValue = isDevelopment
          ? originalValue
          : originalValue.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' ');
      }
      // replacing original with compiled
      context.content = context.content!.replace(originalValue, compiledValue);
    }
  }
}
