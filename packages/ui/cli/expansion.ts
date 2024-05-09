import {defineTiniCLIExpansion, resolveCommand} from '@tinijs/cli';

import {PACKAGE_NAME} from '../lib/consts/common.js';

export type UICLIExpansionOptions = {};

export default defineTiniCLIExpansion<UICLIExpansionOptions>({
  meta: {
    name: PACKAGE_NAME,
  },
  setup() {
    return {
      ui: () => import('./commands/ui.js').then(resolveCommand),
    };
  },
});
