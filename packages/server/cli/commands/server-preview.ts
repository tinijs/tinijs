import {relative, resolve} from 'pathe';
import {execa} from 'execa';
import {createCLICommand} from '@tinijs/cli';

import {loadNitroConfig} from '../utils/nitro.js';

export const serverDevCommand = createCLICommand(
  {
    meta: {
      name: 'preview',
      description: 'Preview the production build.',
    },
  },
  async () => {
    const {output: nitroOutput} = await loadNitroConfig();
    const serverIndex = resolve(
      relative('.', nitroOutput.dir),
      'server',
      'index.mjs'
    );
    execa('node', [serverIndex], {stdio: 'inherit'});
  }
);

export default serverDevCommand;
