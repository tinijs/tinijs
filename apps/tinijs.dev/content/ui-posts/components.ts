import type {ComponentLoaderRegistry} from '@tinijs/core';

export const UI_POST_COMPONENT_PREFIX = 'content-ui-post';

export const UI_POST_COMPONENT_REGISTRY: ComponentLoaderRegistry = {
  'dialog-usage': () =>
    import('./300 - dialog/index.js').then(
      m => m.ContentUIPostDialogUsageComponent
    ),
  'modal-usage': () =>
    import('./300 - modal/index.js').then(
      m => m.ContentUIPostModalUsageComponent
    ),
};
