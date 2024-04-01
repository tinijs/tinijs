import {resolve} from 'pathe';
import {defu} from 'defu';
import {createCLICommand} from '@tinijs/cli';
import {consola} from 'consola';
import {AsyncReturnType} from 'type-fest';

import {
  BuildResult,
  listAvailableComponentsAndThemeFamilies,
  outputBuildResults,
  buildGlobal,
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

export const uiBuildCommand = createCLICommand(
  {
    meta: {
      name: 'build',
      description: 'Build the UI package.',
    },
  },
  async () => {
    const {
      context: {tiniProject},
    } = cliExpansion;
    const uiConfig = tiniProject.config.ui;
    if (!uiConfig) return consola.error('No UI configuration found.');

    const packConfigs = [uiConfig].concat(
      !uiConfig.outPacks
        ? []
        : uiConfig.outPacks.map(pack =>
            pack.extends === false ? pack : defu(pack, uiConfig)
          )
    );

    const cachedAvailable = {} as Record<
      string,
      AsyncReturnType<typeof listAvailableComponentsAndThemeFamilies>
    >;
    for (const {
      sources,
      families,
      icons,
      outDir,
      react,
      packageJSON,
    } of packConfigs) {
      if (!sources?.length || !families) continue;
      const outDirPath = resolve(outDir || '.ui');
      const {
        components: availableComponents,
        themeFamilies: availableThemeFamilies,
      } = (cachedAvailable[sources.join(',')] ||=
        await listAvailableComponentsAndThemeFamilies(sources));

      // build global styles
      const globalResults = await buildGlobal();
      await outputBuildResults(outDirPath, globalResults);

      // build skins
      const skinResults = await buildSkins(
        outDirPath,
        availableThemeFamilies,
        families
      );
      await outputBuildResults(outDirPath, skinResults);

      // build bases
      const baseResults = await buildBases(
        outDirPath,
        availableThemeFamilies,
        families
      );
      await outputBuildResults(outDirPath, baseResults);

      // build components
      const componentResults = await buildComponents(
        outDirPath,
        availableComponents,
        availableThemeFamilies,
        families,
        react
      );
      await outputBuildResults(outDirPath, componentResults);

      // build icons
      let iconResults: BuildResult[] = [];
      if (icons) {
        iconResults = await buildIcons(icons, react);
        await outputBuildResults(outDirPath, iconResults);
      }

      // build setup
      const setupResult = await buildSetup();
      await outputBuildResults(outDirPath, setupResult);

      // build public api
      const publicAPIResult = await buildPublicAPI([
        setupResult,
        ...globalResults,
        ...skinResults,
        ...baseResults,
      ]);
      await outputBuildResults(outDirPath, publicAPIResult);

      // build package.json
      const packageJSONResults = await buildPackageJSON(packageJSON);
      await outputBuildResults(outDirPath, packageJSONResults);

      // transpile & remove .ts files
      await transpileAndRemoveTSFiles(outDirPath);
    }
  }
);

export default uiBuildCommand;
