import {resolve} from 'pathe';
import {defu} from 'defu';
import {
  createCLICommand,
  outputGenFileResults,
  type GenFileResult,
} from '@tinijs/cli';
import {TINI_CONFIG_TS_FILE} from '@tinijs/project';
import {outputJSON} from 'fs-extra/esm';
import {consola} from 'consola';
import {green, gray} from 'colorette';
import type {AsyncReturnType} from 'type-fest';

import {
  listAvailableComponents,
  listAvailableThemeFamilies,
  buildGlobals,
  buildSkins,
  buildBases,
  buildComponents,
  buildSetup,
  buildPublicAPI,
  buildPackageJSON,
  transpileAndRemoveTSFiles,
  buildBundled,
} from '../utils/build.js';
import {buildIcons} from '../utils/icon.js';

import cliExpansion from '../expansion.js';

export const uiBuildCommand = createCLICommand(
  {
    meta: {
      name: 'build',
      description: 'Build UI packages.',
    },
  },
  async (args, callbacks) => {
    const {
      context: {tiniProject},
    } = cliExpansion;
    const uiConfig = tiniProject.config.ui;
    if (!uiConfig) {
      return consola.error(
        `No UI configuration found in ${TINI_CONFIG_TS_FILE}.`
      );
    }
    const cachedAvailable = {} as Record<
      string,
      {
        components: AsyncReturnType<typeof listAvailableComponents>;
        themeFamilies: AsyncReturnType<typeof listAvailableThemeFamilies>;
      }
    >;
    const packConfigs = [uiConfig].concat(
      !uiConfig.outPacks
        ? []
        : uiConfig.outPacks.map(pack =>
            pack.extends === false ? pack : defu(pack, uiConfig)
          )
    );
    let packCount = 0;
    for (const config of packConfigs) {
      if (!config.sources?.length || !config.families) continue;
      const outDir = config.outDir || 'app/ui';
      const results: GenFileResult[] = [];

      // start building
      packCount++;
      callbacks?.onStartPack?.(outDir);

      // load available components and theme families
      const outDirPath = resolve(outDir);
      const {
        components: availableComponents,
        themeFamilies: availableThemeFamilies,
      } = (cachedAvailable[config.sources.join(',')] ||= {
        components: await listAvailableComponents(config.sources),
        themeFamilies: await listAvailableThemeFamilies(config.sources),
      });

      // build globals
      const globalResults = await buildGlobals();
      results.push(...globalResults);

      // build skins
      const skinResults = await buildSkins(
        outDirPath,
        availableThemeFamilies,
        config
      );
      results.push(...skinResults);

      // build bases
      const baseResults = await buildBases(
        outDirPath,
        availableThemeFamilies,
        config
      );
      results.push(...baseResults);

      // build components
      const componentResults = await buildComponents(
        outDirPath,
        availableComponents,
        availableThemeFamilies,
        config
      );
      results.push(...componentResults);

      // build icons
      const {results: iconResults, index: iconIndex} = await buildIcons(config);
      results.push(...iconResults);

      // build setup
      const setupResult = await buildSetup(config);
      results.push(setupResult);

      // build public api & package.json
      if (config.packageJSON) {
        const publicAPIResult = await buildPublicAPI([setupResult]);
        results.push(publicAPIResult);

        const packageJSONResult = await buildPackageJSON(config.packageJSON);
        results.push(packageJSONResult);
      }

      // output build results
      await outputGenFileResults(outDirPath, results);
      // icons index
      if (config.outputIconsIndex) {
        await outputJSON(resolve(config.outputIconsIndex), iconIndex);
      }

      // transpile & remove .ts files
      const tsPaths = results
        .map(result => resolve(outDirPath, result.path))
        .filter(path => path.endsWith('.ts'));
      if (config.transpile || config.bundled) {
        await transpileAndRemoveTSFiles(outDirPath, tsPaths);
      }

      // bundled
      if (config.bundled) {
        callbacks?.onBundle?.();
        await buildBundled(outDirPath, {
          setupResult,
          skinResults,
          componentResults,
        });
      }
    }
    callbacks?.onEnd?.(packCount);
  },
  {
    onStartPack: (outDir: string) => {
      console.log();
      consola.info(`Build package to ${gray(outDir)}.`);
    },
    onBundle: () => consola.info('Bundle for CDN usage.'),
    onEnd: (packCount: number) => {
      console.log();
      consola.success(`Built ${green(packCount)} UI packages successfully!`);
      console.log();
    },
  }
);

export default uiBuildCommand;
