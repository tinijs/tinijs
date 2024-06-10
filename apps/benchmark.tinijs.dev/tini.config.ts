import {defineTiniConfig} from '@tinijs/project';

export default defineTiniConfig({
  build: {
    options: {
      configPath: '../../packages/vite-builder/vite.config.js',
    },
  },

  ui: {
    sources: ['../../packages/ui/ui'],
    families: {
      bootstrap: ['light'],
    },
  },
});
