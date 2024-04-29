import {defineTiniCLIExpansion, resolveCommand} from '@tinijs/cli';

import {PACKAGE_NAME} from '../lib/consts/common.js';

export type ServerCLIExpansionOptions = {
  appWatchCommand?: string | string[];
  appBuildCommand?: string | string[];
};

export default defineTiniCLIExpansion<ServerCLIExpansionOptions>({
  meta: {
    name: PACKAGE_NAME,
  },
  setup() {
    return {
      server: () => import('./commands/server.js').then(resolveCommand),
    };
  },
});
