// eslint-disable-next-line node/no-extraneous-import
import {resolve} from 'pathe';
import {defineTiniConfig} from '@tinijs/project';

const uiPackagePath = resolve('../../packages/ui');

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
      alpha: ['light', 'dark'],
      bootstrap: ['light', 'dark'],
      material: ['light', 'dark'],
      fluent: ['light', 'dark'],
      apple: ['light', 'dark'],
      nuxt: ['light', 'dark'],
      next: ['light', 'dark'],
      horizon: ['light', 'dark'],
      spectrum: ['light', 'dark'],
      line: ['light', 'dark'],
    },
    outDir: './app/ui',
    rewritePath: path => path.replace(uiPackagePath, '@tinijs/ui/dist'),
  },
});
