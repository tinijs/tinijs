import {resolve} from 'pathe';
import {consola} from 'consola';
import type {GetManifestOptions} from 'workbox-build';
import {modifyTextFile} from '@tinijs/cli';
import {defineTiniModule, getProjectDirs} from '@tinijs/project';

import {PACKAGE_NAME} from '../lib/consts.js';
import {handleSW} from './utils/setup.js';

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
        'assets/icons': `${srcDir}/${dirs.assets}/icons`,
        'assets/manifest.webmanifest': `${srcDir}/manifest.webmanifest`,
        'assets/sw.ts': `${srcDir}/sw.ts`,
      },
      run() {

        // TODO: move to injectMetaTags() in init.ts
        modifyTextFile(resolve(srcDir, 'index.html'), content => {
          const manifestUrl = './manifest.webmanifest';
          if (content.indexOf(manifestUrl) !== -1) return content;
          const template = `
        <!-- PWA -->
        <link rel="manifest" href="${manifestUrl}">
        <script src="https://cdn.jsdelivr.net/npm/pwacompat" crossorigin="anonymous" async></script>
        <link rel="icon" type="image/png" href="./assets/icons/icon-128x128.png" sizes="128x128">`;
          const themeColorMatching = content.match(
            /(<meta name="theme-color")([\s\S]*?)(>)/
          );
          if (themeColorMatching) {
            const anchorStr = themeColorMatching[0];
            return content.replace(anchorStr, anchorStr + template);
          } else {
            const anchorStr = '</head>';
            return content.replace(anchorStr, template + '\n  ' + anchorStr);
          }
        });

      },
    };
  },
  async setup(options, tini) {

    const buildSW = (hookName: string) =>
      async () => {
        consola.log(`[${PACKAGE_NAME}] Run hook ${hookName}`);
        return handleSW(hookName, options, tini.config);
      };
    tini.hook('dev:before', buildSW('dev:before'));
    tini.hook('build:after', buildSW('build:after'));

  },
});
