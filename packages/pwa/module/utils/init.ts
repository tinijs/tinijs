import {getTiniConfigFilePath} from '@tinijs/project';
import {
  modifyHTMLFile,
  modifyComponentAlikeFile,
  modifyConfigAlikeFile,
} from '@tinijs/cli';

import {PACKAGE_NAME} from '../../lib/consts.js';

export async function injectMetaTags(srcDir: string) {
  const manifestUrl = './manifest.webmanifest';
  const template = `
    <!-- PWA -->
    <link rel="manifest" href="${manifestUrl}">
    <script src="https://cdn.jsdelivr.net/npm/pwacompat" crossorigin="anonymous" async></script>
    <link rel="icon" type="image/png" href="/pwa-icons/icon-128x128.png" sizes="128x128">
  `;
  return modifyHTMLFile(`${srcDir}/index.html`, ({$head}) => {
    if ($head.find(`link[rel="manifest"][href="${manifestUrl}"]`).length)
      return;
    const $themeColorMeta = $head.find('meta[name="theme-color"]');
    if ($themeColorMeta.length) {
      $themeColorMeta.after(template);
    } else {
      $head.append(template);
    }
  });
}

export async function injectServiceWorker(srcDir: string) {
  return modifyComponentAlikeFile(`${srcDir}/app.ts`, 'AppRoot', modify =>
    modify
      .addImport(
        `import {registerServiceWorker, type AppWithSW} from '${PACKAGE_NAME}';`,
        '@tinijs/core'
      )
      .addImplements('AppWithSW')
      .addProperty('readonly sw = registerServiceWorker();')
  );
}

export async function modifyTiniConfigModules() {
  const tiniConfigPath = getTiniConfigFilePath();
  if (!tiniConfigPath) throw new Error('Cannot find Tini config file');
  return modifyConfigAlikeFile(tiniConfigPath, modify =>
    modify.addArrayItem('modules', `'${PACKAGE_NAME}'`)
  );
}
