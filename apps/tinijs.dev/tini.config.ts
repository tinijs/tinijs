import {defineTiniConfig} from '@tinijs/project';

export default defineTiniConfig({
  ui: {
    sources: ['@tinijs/ui'],
    families: {
      bootstrap: ['light', 'dark'],
    },
    packageJSON: {
      name: 'ui',
      version: '0.0.0'
    }
  },

  cli: {
    expand: ['@tinijs/ui'],
  },
});
