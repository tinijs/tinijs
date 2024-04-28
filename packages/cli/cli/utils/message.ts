import {consola} from 'consola';
import {blueBright, green, gray, magenta} from 'colorette';
import {TINI_CONFIG_TS_FILE} from '@tinijs/project';

export function errorUncleanGit() {
  consola.error(
    `Unclean GIT working directory, please ${green('commit')} or ${green(
      'stash'
    )} changes first.`
  );
}

export function infoRunHook(sourceName: string, hookName: string) {
  consola.info(`[${magenta(sourceName)}] Run hook ${green(hookName)}`);
}

export function warnManualRegisterModule(moduleName: string) {
  consola.warn(
    'Unable to modify Tini config, please add the following code manually:'
  );
  consola.box(
    `// File: ${blueBright(TINI_CONFIG_TS_FILE)}\n
${gray('export default defineTiniConfig({')}
  modules: [${green(`'${moduleName}'`)}]
${gray('});')}`
  );
}

export function errorModuleRequireTiniApp(moduleName: string) {
  consola.error(
    `Module ${blueBright(moduleName)} requires a valid Tini app to work.`
  );
}
