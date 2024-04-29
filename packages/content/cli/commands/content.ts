import {createCLICommand, resolveCommand} from '@tinijs/cli';

export const contentCommand = createCLICommand({
  meta: {
    name: 'content',
    description: 'Tools for Tini Content.',
  },
  subCommands: {
    build: () => import('./content-build.js').then(resolveCommand),
  },
});

export default contentCommand;
