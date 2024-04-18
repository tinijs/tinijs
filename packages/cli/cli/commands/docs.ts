import {consola} from 'consola';
import {blueBright} from 'colorette';
import open from 'open';

import {createCLICommand} from '../utils/cli.js';

import {HOME_URL} from './info.js';

export const docsCommand = createCLICommand(
  {
    meta: {
      name: 'docs',
      description: 'Open documentation.',
    },
  },
  (args, callbacks) => {
    callbacks?.onOpen(HOME_URL);
    open(HOME_URL);
  },
  {
    onOpen: (url: string) =>
      consola.info(`Documetation link: ${blueBright(url)}`),
  }
);

export default docsCommand;
