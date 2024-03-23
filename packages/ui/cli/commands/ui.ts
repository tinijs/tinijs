import {createCLICommand, resolveCommand} from '@tinijs/cli';

export const uiCommand = createCLICommand({
  meta: {
    name: 'ui',
    description: 'Tools for the Tini UI.',
  },
  subCommands: {
    build: () => import('./ui-build.js').then(resolveCommand),
  },
});

export default uiCommand;
