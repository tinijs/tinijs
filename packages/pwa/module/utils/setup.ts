import {readFile} from 'node:fs/promises';
import {resolve} from 'pathe';
import {getManifest} from 'workbox-build';
import typescript from 'typescript';
import {build as esBuild} from 'esbuild';
import {outputFile} from 'fs-extra/esm';
import {getProjectDirs, type TiniConfig} from '@tinijs/project';

import type {PWAModuleOptions} from '../index.js';

const {transpileModule, ScriptTarget, ModuleKind} = typescript;

export async function handleSW(
  hookName: string,
  {precaching}: PWAModuleOptions,
  tiniConfig: TiniConfig
) {
  const {srcDir, outDir} = getProjectDirs(tiniConfig);
  // read sw.ts
  const tsCode = await readFile(resolve(srcDir, 'sw.ts'), 'utf8');
  // transpile
  let {outputText: code} = transpileModule(tsCode, {
    compilerOptions: {
      noEmit: false,
      sourceMap: false,
      module: ModuleKind.NodeNext,
      target: ScriptTarget.ESNext,
      lib: ['ESNext'],
      isolatedModules: true,
      verbatimModuleSyntax: true,
      skipLibCheck: true,
    },
  });
  // inject precaching entries
  if (precaching !== false) {
    const {manifestEntries} = await getManifest({
      globDirectory: outDir,
      ...(precaching || {
        globPatterns: [
          '**\/*.{html,css,js,ico,svg,webp,avif,jpe?g,png,woff2?,ttf,otf}',
          '!tini-content/**/*',
        ]
      })
    });
    code =
      `
  import {precacheAndRoute} from 'workbox-precaching';
  precacheAndRoute(${JSON.stringify(manifestEntries)});
    \n` + code;
  }
  // save file
  await outputFile(resolve(outDir, 'sw.js'), code);
  // bundle
  await esBuild({
    entryPoints: [`${outDir}/sw.js`],
    allowOverwrite: true,
    bundle: true,
    sourcemap: true,
    minify: true,
    outdir: outDir,
  });
}
