import {readFile} from 'node:fs/promises';
import {resolve} from 'pathe';
import {getManifest} from 'workbox-build';
import typescript from 'typescript';
import {build as esBuild} from 'esbuild';
import {outputFile} from 'fs-extra/esm';
import {getProjectDirs, type TiniConfig} from '@tinijs/project';

import type {PWAModuleOptions} from '../index.js';

const {transpileModule, ScriptTarget, ModuleKind} = typescript;

export async function processSW(
  {precaching}: PWAModuleOptions,
  tiniConfig: TiniConfig,
  isBuild: boolean
) {
  const {srcDir, outDir, dirs} = getProjectDirs(tiniConfig);
  const destDir = isBuild ? outDir : `${srcDir}/${dirs.public}`;
  // read sw.ts & transpile
  const {outputText} = transpileModule(
    await readFile(resolve(srcDir, 'sw.ts'), 'utf8'),
    {
      compilerOptions: {
        noEmit: false,
        sourceMap: false,
        module: ModuleKind.ESNext,
        target: ScriptTarget.ESNext,
        lib: ['ESNext', 'WebWorker'],
        isolatedModules: true,
        verbatimModuleSyntax: true,
        skipLibCheck: true,
      },
    }
  );
  let jsCode = outputText;
  // inject precaching entries
  if (isBuild && precaching !== false) {
    const {manifestEntries} = await getManifest({
      globDirectory: outDir,
      ...(precaching || {
        globPatterns: [
          '**/*.{html,css,js,ico,svg,webp,avif,jpg,jpeg,png,woff,woff2,ttf,otf}',
        ],
        globIgnores: ['tini-content/**/*', 'sw.js'],
      }),
    });
    jsCode = [
      "import {precacheAndRoute} from 'workbox-precaching';",
      `precacheAndRoute(${JSON.stringify(manifestEntries)});`,
      jsCode,
    ].join('\n\n');
  }
  // save sw.js and bundle
  await outputFile(resolve(destDir, 'sw.js'), jsCode);
  await esBuild({
    entryPoints: [`${destDir}/sw.js`],
    allowOverwrite: true,
    bundle: true,
    sourcemap: isBuild,
    minify: isBuild,
    outdir: destDir,
  });
}
