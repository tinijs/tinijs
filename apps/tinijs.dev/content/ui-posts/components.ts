import type {ComponentLoaderRegistry} from '@tinijs/core';

export const UI_POST_COMPONENT_PREFIX = 'content-ui-post';

export const UI_POST_COMPONENT_REGISTRY: ComponentLoaderRegistry = {
  playground: () => import('./102 - playground/index.js'),
  token: () => import('./201 - design-tokens/index.js'),
  box: () => import('./401 - box/index.js'),
  flex: () => import('./402 - flex/index.js'),
  grid: () => import('./403 - grid/index.js'),
  container: () => import('./404 - container/index.js'),
  dialog: () => import('./504001 - dialog/index.js'),
  modal: () => import('./513002 - modal/index.js'),
};
