import {consola} from 'consola';
import {blueBright, green, gray} from 'colorette';

export function errorUncleanGit() {
  consola.error(
    `Unclean GIT working directory, please ${green('commit')} or ${green(
      'stash'
    )} changes first.`
  );
}

export function warnManualRegisterModule(moduleName: string) {
  consola.warn(
    'Unable to modify Tini config, please add the following code manually:'
  );
  consola.box(
    `// File: ${blueBright('tini.config.ts')}\n
${gray('export default defineTiniConfig({')}
  modules: [${green(`'${moduleName}'`)}]
${gray('});')}`
  );
}
