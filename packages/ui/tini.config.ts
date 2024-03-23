import {defineTiniConfig} from '@tinijs/project';

import uiCLIExpansion from './cli/expand.js';

export default defineTiniConfig({
  ui: {
    outDir: '.tini/ui',
    react: true,
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
  },

  cli: {
    expand: [uiCLIExpansion],
  },
});
