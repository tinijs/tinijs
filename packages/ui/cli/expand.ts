import {defineTiniCLIExpansion, resolveCommand} from '@tinijs/cli';

import {PACKAGE_NAME} from '../lib/consts/common.js';

export default defineTiniCLIExpansion({
  meta: {
    name: PACKAGE_NAME,
  },
  setup() {
    return {
      ui: () => import('./commands/ui.js').then(resolveCommand),
    };
  },
});
