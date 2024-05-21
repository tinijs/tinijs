import {defineTiniConfig} from '@tinijs/project';

export default defineTiniConfig({
  build: {
    options: {
      configPath: '../../packages/vite-builder/vite.config.js',
    },
  },

  modules: ['@tinijs/content'],

  ui: {
    sources: ['../../packages/ui/ui'],
    families: {
      shadcn: ['light', 'dark'],
      bootstrap: ['light', 'dark'],
      material: ['light', 'dark'],
      fluent: ['light', 'dark'],
      ios: ['light', 'dark'],
      spectrum: ['light', 'dark'],
      tailwind: ['light', 'dark'],
      chakra: ['light', 'dark'],
    },
  },
});
