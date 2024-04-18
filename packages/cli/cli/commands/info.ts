import {type as osType} from 'node:os';
import {resolve} from 'pathe';
import {blueBright} from 'colorette';

import {loadCLIPackageJSON, loadProjectPackageJSON} from '../utils/project.js';
import {createCLICommand} from '../utils/cli.js';

export const HOME_URL = 'https://tinijs.dev';

export const infoCommand = createCLICommand(
  {
    meta: {
      name: 'info',
      description: 'Print project information.',
    },
  },
  async (args, callbacks) => {
    const cwd = resolve('.');
    const {version: cliVersion} = await loadCLIPackageJSON();
    const {devDependencies, peerDependencies, dependencies} =
      await loadProjectPackageJSON();
    const tinijsPackages = Object.entries({
      ...devDependencies,
      ...peerDependencies,
      ...dependencies,
    }).filter(([name]) => name.startsWith('@tinijs/'));
    const info = `
Working directory: ${blueBright(cwd)}

💻 System:
  - OS: ${osType()}
  - Node: ${process.version}
  - CLI: v${cliVersion}

🥚 Packages:
  - ${tinijsPackages
    .map(([name, version]) => `${name}: ${version}`)
    .join('\n  - ')}

------------------------------
👉 Report an issue: ${blueBright('https://github.com/tinijs/tinijs/issues/new')}
👉 Suggest an improvement: ${blueBright('https://discord.gg/EABbZVbPAb')}
👉 Read documentation: ${blueBright(HOME_URL)}
`;
    callbacks?.onPrint(info);
  },
  {
    onPrint: (info: string) => console.log(info),
  }
);

export default infoCommand;
