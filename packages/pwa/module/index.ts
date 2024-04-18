import {resolve} from 'pathe';
import {modifyTextFile} from '@tinijs/cli';
import {defineTiniModule, getProjectDirs} from '@tinijs/project';

export default defineTiniModule({
  meta: {
    name: '@tinijs/pwa',
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
  async setup(options, tini) {},
});
