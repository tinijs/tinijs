import {defineTiniConfig} from '@tinijs/project';

import uiCLIExpansion from './cli/expand.js';

export default defineTiniConfig({
  ui: {
    sources: ['./ui'],
    pick: {
      families: {
        bootstrap: {
          skins: ['light', 'dark', 'xxx'],
        },
        material: {
          skins: ['zzz'],
        },
      },
      bases: ['*'],
    },
    icons: ['./test-icons'],
    outDir: '.tini/ui',
    outPacks: [
      {
        react: true,
        outDir: '.tini/ui-react',
      },
      {
        extends: false,
        outDir: '.tini/ui-blank',
      },
    ],
  },

  cli: {
    expand: [uiCLIExpansion],
  },
});
