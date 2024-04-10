import {defineTiniConfig, UIConfig} from '@tinijs/project';

import uiCLIExpansion from './cli/expand.js';

const bootstrapUIPack: NonNullable<UIConfig['outPacks']>[0] = {
  extends: false,
  outDir: './build/bootstrap',
  sources: ['./ui'],
  families: {
    bootstrap: true,
  },
  manualSkinSelection: true,
  transpile: true,
  rewritePath: true,
  packageJSON: ({name, version}) => ({
    name: `${name}-bootstrap`,
    version: `${version}`,
    dependencies: {
      [`${name}`]: `${version}`,
    },
  }),
};

export default defineTiniConfig({
  ui: {
    sources: ['./ui'],
    families: {
      bootstrap: ['light', 'dark'],
    },
    outDir: '.ui',
    // packageJSON: {
    //   name: '@tinijs/ui-app',
    //   version: '0.0.0',
    // },
    // icons: ['./test-icons'],
    outPacks: [bootstrapUIPack],
  },

  cli: {
    expand: [uiCLIExpansion],
  },
});
