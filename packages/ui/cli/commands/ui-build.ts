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
  buildDistributable,
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
      outDir,
      sources,
      pick,
      icons,
      react,
      distributable,
    } of packConfigs) {
      if (!sources?.length || !pick) continue;
      const ourDir = resolve(outDir || './node_modules/@tinijs/app-ui');
      const {
        components: availableComponents,
        themeFamilies: availableThemeFamilies,
      } = (cachedAvailable[sources.join(',')] ||=
        await listAvailableComponentsAndThemeFamilies(sources));

      // build global styles
      const globalResult = await buildGlobal();
      await outputBuildResults(ourDir, globalResult);

      // build skins
      const skinResults = await buildSkins(
        ourDir,
        availableThemeFamilies,
        pick
      );
      await outputBuildResults(ourDir, skinResults);

      // build bases
      const baseResults = await buildBases(
        ourDir,
        availableThemeFamilies,
        pick
      );
      await outputBuildResults(ourDir, baseResults);

      // build components
      const componentResults = await buildComponents(
        ourDir,
        availableComponents,
        availableThemeFamilies,
        pick,
        react
      );
      await outputBuildResults(ourDir, componentResults);

      // build icons
      let iconResults: BuildResult[] = [];
      if (icons) {
        iconResults = await buildIcons(icons, react);
        await outputBuildResults(ourDir, iconResults);
      }

      // build setup
      const setupResult = await buildSetup();
      await outputBuildResults(ourDir, setupResult);

      // build public-api
      const publicAPIResult = await buildPublicAPI([
        setupResult,
        globalResult,
        ...skinResults,
        ...baseResults,
        ...componentResults,
        ...iconResults,
      ]);
      await outputBuildResults(ourDir, publicAPIResult);

      // build distributable package
      if (distributable) {
        const distributableResults = await buildDistributable(distributable);
        await outputBuildResults(ourDir, distributableResults);
      }
    }
  }
);

export default uiBuildCommand;
