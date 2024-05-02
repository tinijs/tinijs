import {resolve} from 'pathe';
import {defu} from 'defu';
import {
  createCLICommand,
  outputGenFileResults,
  type GenFileResult,
} from '@tinijs/cli';
import {TINI_CONFIG_TS_FILE} from '@tinijs/project';
import {consola} from 'consola';
import {green} from 'colorette';
import ora from 'ora';
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
} from '../utils/build.js';
import {buildIcons} from '../utils/icon.js';

import cliExpansion from '../expand.js';

const SPINNER = ora();

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
    callbacks?.onStart?.(packConfigs.length);
    for (const config of packConfigs) {
      if (!config.sources?.length || !config.families) continue;
      const results: GenFileResult[] = [];

      // load available components and theme families
      const outDirPath = resolve(config.outDir || '.ui');
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
      const iconResults = await buildIcons(config);
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

      // transpile & remove .ts files
      if (config.transpile) {
        await transpileAndRemoveTSFiles(
          outDirPath,
          results
            .map(result => resolve(outDirPath, result.path))
            .filter(path => path.endsWith('.ts'))
        );
      }
    }
    callbacks?.onEnd?.(packConfigs.length);
  },
  {
    onStart: (packCount: number) => {
      SPINNER.start(`Building ${green(packCount)} UI packages.`);
    },
    onEnd: (packCount: number) =>
      SPINNER.succeed(`Built ${green(packCount)} UI packages successfully.`),
  }
);

export default uiBuildCommand;
