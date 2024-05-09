import {execa} from 'execa';
import {getProjectDirs} from '@tinijs/project';
import {createCLICommand} from '@tinijs/cli';

import serverCLIExpansion from '../expansion.js';

import {loadNitroConfig} from '../utils/nitro.js';
import {buildApp, preNitroBuild, postNitroBuild} from '../utils/build.js';

export const serverBuildCommand = createCLICommand(
  {
    meta: {
      name: 'build',
      description: 'Build the server.',
    },
  },
  async () => {
    const {options, tiniProject} = serverCLIExpansion.context;
    const {outDir: appOutDir} = getProjectDirs(tiniProject.config);
    const {output: nitroOutput} = await loadNitroConfig();
    // build client app
    await buildApp(options.appBuildCommand);
    // build using Nitro
    const indexHTMLContent = await preNitroBuild(appOutDir);
    await execa('nitro', ['build', '--dir', 'server'], {stdio: 'inherit'});
    await postNitroBuild(nitroOutput.dir, indexHTMLContent);
  }
);

export default serverBuildCommand;
