import {defineTiniCLIExpansion, resolveCommand} from '@tinijs/cli';

import {PACKAGE_NAME} from '../lib/consts/common.js';

export type ContentCLIExpansionOptions = {};

export default defineTiniCLIExpansion<ContentCLIExpansionOptions>({
  meta: {
    name: PACKAGE_NAME,
  },
  setup() {
    return {
      content: () => import('./commands/content.js').then(resolveCommand),
    };
  },
});
