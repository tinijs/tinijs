import {createCLICommand, resolveCommand} from '../utils/cli.js';

export const moduleCommand = createCLICommand({
  meta: {
    name: 'module',
    description: 'Tools for the working with extendable modules.',
  },
  subCommands: {
    add: () => import('./module-add.js').then(resolveCommand),
  },
});

export default moduleCommand;
