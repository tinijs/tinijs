import {consola} from 'consola';
import {blueBright, green, gray} from 'colorette';
import type {GetManifestOptions} from 'workbox-build';
import {defineTiniModule, getProjectDirs} from '@tinijs/project';

import {PACKAGE_NAME} from '../lib/consts.js';
import {
  injectMetaTags,
  injectServiceWorker,
  modifyTiniConfigModules,
} from './utils/init.js';
import {processSW} from './utils/setup.js';

export interface PWAModuleOptions {
  precaching?: false | Partial<GetManifestOptions>;
}

export default defineTiniModule({
  meta: {
    name: PACKAGE_NAME,
  },
  init(tiniConfig) {
    const {srcDir, dirs} = getProjectDirs(tiniConfig);
    return {
      copy: {
        'assets/icons': `${srcDir}/${dirs.public}/pwa-icons`,
        'assets/manifest.webmanifest': `${srcDir}/manifest.webmanifest`,
        'assets/sw.ts': `${srcDir}/sw.ts`,
      },
      async run() {
        await injectMetaTags(srcDir);
        await injectServiceWorker(srcDir);
        try {
          await modifyTiniConfigModules();
        } catch (error) {
          setTimeout(() => {
            consola.warn(
              'Unable to modify config automatically, please add the following code manually:'
            );
            consola.box(
              `${blueBright('// tini.config.ts')}\n
${gray('export default defineTiniConfig({')}
  modules: [${green(`'${PACKAGE_NAME}'`)}]
${gray('});')}`
            );
          }, 300);
        }
      },
    };
  },
  async setup(options, tini) {
    const buildSW = (hookName: string) => async () => {
      consola.info(`[${PACKAGE_NAME}] Run hook ${hookName}`);
      return processSW(options, tini.config, hookName === 'build:after');
    };
    tini.hook('dev:before', buildSW('dev:before'));
    tini.hook('build:after', buildSW('build:after'));
  },
});
