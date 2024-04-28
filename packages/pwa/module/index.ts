import {consola} from 'consola';
import {blueBright} from 'colorette';
import type {GetManifestOptions} from 'workbox-build';
import {
  defineTiniModule,
  getProjectDirs,
  checkPotentialTiniApp,
} from '@tinijs/project';
import {
  registerTiniConfigModule,
  errorModuleRequireTiniApp,
  warnManualRegisterModule,
  infoRunHook,
} from '@tinijs/cli';

import {PACKAGE_NAME} from '../lib/consts.js';
import {injectMetaTags, injectServiceWorker} from './utils/init.js';
import {processSW} from './utils/setup.js';

export interface PWAModuleOptions {
  precaching?: false | Partial<GetManifestOptions>;
}

export default defineTiniModule({
  meta: {
    name: PACKAGE_NAME,
  },
  init(tiniConfig) {
    if (!checkPotentialTiniApp(tiniConfig)) {
      return {
        run() {
          errorModuleRequireTiniApp(PACKAGE_NAME);
        },
      };
    }
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
          await registerTiniConfigModule(PACKAGE_NAME);
        } catch (error) {
          setTimeout(() => warnManualRegisterModule(PACKAGE_NAME), 300);
        }
      },
    };
  },
  async setup(options, tini) {
    const buildSW = (hookName: string) => async () => {
      infoRunHook(PACKAGE_NAME, hookName);
      return processSW(options, tini.config, hookName === 'build:after');
    };
    tini.hook('dev:before', buildSW('dev:before'));
    tini.hook('build:after', buildSW('build:after'));
  },
});
