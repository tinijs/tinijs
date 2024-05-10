import type {ComponentLoaderRegistry} from '@tinijs/core';

export const UI_POST_COMPONENT_PREFIX = 'content-ui-post';

export const UI_POST_COMPONENT_REGISTRY: ComponentLoaderRegistry = {
  'dialog-usage': () =>
    import('./315 - dialog/index.js').then(
      m => m.ContentUIPostDialogUsageComponent
    ),
};
