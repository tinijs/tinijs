import {createCLICommand, resolveCommand} from '@tinijs/cli';

export const contentCommand = createCLICommand({
  meta: {
    name: 'content',
    description: 'Tools for the content module.',
  },
  subCommands: {
    build: () => import('./content-build.js').then(resolveCommand),
  },
});

export default contentCommand;
