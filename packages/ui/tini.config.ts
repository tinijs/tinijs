import {defineTiniConfig} from '@tinijs/project';

import uiCLIExpansion from './cli/expand.js';

export default defineTiniConfig({
  ui: {
    sources: ['./ui'],
    families: {
      bootstrap: ['light', 'dark'],
      // material: skins: ['xxx'],
    },
    outDir: '.ui',
    packageJSON: {
      name: '@tinijs/ui-app',
      version: '0.0.0',
    },
    // icons: ['./test-icons'],
    // outPacks: [
    //   {
    //     react: true,
    //     outDir: './mode_modules/ui/react',
    //   },
    //   {
    //     extends: false,
    //     outDir: './mode_modules/ui/blank',
    //   },
    // ],
  },

  cli: {
    expand: [uiCLIExpansion],
  },
});
