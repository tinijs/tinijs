import {consola} from 'consola';
import {bold, blueBright} from 'colorette';
import open from 'open';

import {createCLICommand} from '../../lib/utils/cli.js';

export const docsCommand = createCLICommand(
  {
    meta: {
      name: 'docs',
      description: 'Open documentation.',
    },
  },
  (args, callbacks) => {
    const HOME_URL = 'https://tinijs.dev';
    callbacks?.onOpen(HOME_URL);
    open(HOME_URL);
  },
  {
    onOpen: (url: string) =>
      consola.info(`Documetation link: ${bold(blueBright(url))}`),
  }
);

export default docsCommand;
