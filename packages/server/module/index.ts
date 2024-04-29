import {defineTiniModule, checkPotentialTiniApp} from '@tinijs/project';
import {setTiniConfigOption} from '@tinijs/cli';

import {PACKAGE_NAME} from '../lib/consts/common.js';
import {
  prepareNitro,
  showConfigInstruction,
  showConfigInstructionWithoutTiniApp,
} from './utils/init.js';

export type ServerModuleOptions = {};

export default defineTiniModule<ServerModuleOptions>({
  meta: {
    name: PACKAGE_NAME,
  },
  init(tiniConfig) {
    return {
      copy: {
        assets: 'server',
      },
      scripts: {
        dev: 'tini server dev',
        build: 'tini server build',
        preview: 'tini server preview',
      },
      async run() {
        await prepareNitro();
        if (checkPotentialTiniApp(tiniConfig)) {
          try {
            await setTiniConfigOption('outDir', './server/public');
          } catch (error) {
            setTimeout(() => showConfigInstruction(), 300);
          }
        } else {
          showConfigInstructionWithoutTiniApp();
        }
      },
    };
  },
  setup() {
    // eslint-disable-next-line no-empty
  },
});
