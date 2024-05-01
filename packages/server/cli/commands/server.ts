import {createCLICommand, resolveCommand} from '@tinijs/cli';

export const serverCommand = createCLICommand({
  meta: {
    name: 'server',
    description: 'Tools for Tini Server.',
  },
  subCommands: {
    dev: () => import('./server-dev.js').then(resolveCommand),
    build: () => import('./server-build.js').then(resolveCommand),
    preview: () => import('./server-preview.js').then(resolveCommand),
  },
});

export default serverCommand;
