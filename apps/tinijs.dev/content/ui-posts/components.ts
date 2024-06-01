import type {ComponentLoaderRegistry} from '@tinijs/core';

export const UI_POST_COMPONENT_PREFIX = 'content-ui-post';

export const UI_POST_COMPONENT_REGISTRY: ComponentLoaderRegistry = {
  token: () => import('./203 - token/index.js'),
  dialog: () => import('./504001 - dialog/index.js'),
  modal: () => import('./513002 - modal/index.js'),
};
