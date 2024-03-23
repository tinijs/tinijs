import {defineTiniCLIExpansion, resolveCommand} from '@tinijs/cli';

import {PACKAGE_NAME} from '../lib/consts/common.js';

export default defineTiniCLIExpansion({
  meta: {
    name: PACKAGE_NAME,
  },
  setup() {
    return {
      content: () => import('./commands/content.js').then(resolveCommand),
    };
  },
});
